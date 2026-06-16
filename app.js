/**
 * app.js
 * AI Assistant: An Instructional Designer's Decision Guide
 *
 * Controls all module state, screen transitions, scoring,
 * and results generation. Written in vanilla JS — no dependencies.
 *
 * Architecture:
 *   - MODULE_STATE: single source of truth for all session data
 *   - showScreen(): manages transitions between the 4 screens
 *   - loadScenario(): injects scenario content into the DOM
 *   - selectChoice(): handles learner selection + shows feedback
 *   - advanceScenario(): moves to next scenario or results
 *   - buildResults(): renders the final summary screen
 */


// ─────────────────────────────────────────────────────────────
// MODULE STATE
// ─────────────────────────────────────────────────────────────

const MODULE_STATE = {
  currentScenarioIndex: 0,
  results: [],           // { scenarioId, choiceIndex, verdict, choiceText, scenarioTag }
  selectedChoiceIndex: null,
  isAnswered: false
};


// ─────────────────────────────────────────────────────────────
// SCREEN MANAGEMENT
// ─────────────────────────────────────────────────────────────

/**
 * Transitions from one screen to another with a fade.
 * @param {string} screenId - the id of the target screen element
 */
function showScreen(screenId) {
  const allScreens = document.querySelectorAll('.screen');
  const progressBar = document.getElementById('progressBarContainer');

  allScreens.forEach(s => {
    s.classList.remove('active', 'exiting');
  });

  // Show progress bar on scenario + feedback screens
  const showProgress = (screenId === 'screen-scenario' || screenId === 'screen-feedback');
  progressBar.classList.toggle('visible', showProgress);

  // Small delay lets the exit animation start before entering
  requestAnimationFrame(() => {
    const target = document.getElementById(screenId);
    if (target) {
      target.classList.add('active');
    }
  });
}


// ─────────────────────────────────────────────────────────────
// PROGRESS BAR
// ─────────────────────────────────────────────────────────────

function updateProgressBar(scenarioIndex) {
  const total = SCENARIOS.length;
  const pct = Math.round(((scenarioIndex) / total) * 100);

  const fill = document.getElementById('progressBarFill');
  const label = document.getElementById('progressLabel');

  fill.style.width = pct + '%';
  label.textContent = `Scenario ${scenarioIndex + 1} of ${total}`;

  document.getElementById('progressBarContainer')
    .setAttribute('aria-valuenow', pct);
}


// ─────────────────────────────────────────────────────────────
// MODULE ENTRY POINTS
// ─────────────────────────────────────────────────────────────

/** Called by the Start button on the intro screen. */
function startModule() {
  MODULE_STATE.currentScenarioIndex = 0;
  MODULE_STATE.results = [];
  showScreen('screen-scenario');
  loadScenario(0);
}

/** Called by the Retake button on results screen. */
function restartModule() {
  MODULE_STATE.currentScenarioIndex = 0;
  MODULE_STATE.results = [];
  MODULE_STATE.isAnswered = false;
  MODULE_STATE.selectedChoiceIndex = null;
  showScreen('screen-intro');
}


// ─────────────────────────────────────────────────────────────
// SCENARIO LOADER
// ─────────────────────────────────────────────────────────────

/**
 * Injects scenario content into the scenario screen DOM.
 * @param {number} index - index into SCENARIOS array
 */
function loadScenario(index) {
  const scenario = SCENARIOS[index];
  if (!scenario) return;

  MODULE_STATE.isAnswered = false;
  MODULE_STATE.selectedChoiceIndex = null;

  // Update progress bar
  updateProgressBar(index);

  // ── Context panel ──
  document.getElementById('contextTag').textContent = `${scenario.icon}  ${scenario.tag}`;
  document.getElementById('contextSituation').innerHTML =
    `<p><strong>Situation:</strong> ${scenario.situation}</p>`;

  // Illustration: a simple icon block (avoids image dependency)
  document.getElementById('contextIllustration').innerHTML =
    `<div class="scenario-icon-block" aria-hidden="true">${scenario.icon}</div>`;

  // ── Decision panel ──
  const num = String(index + 1).padStart(2, '0');
  document.getElementById('decisionNumber').textContent = num;
  document.getElementById('decisionQuestion').textContent = scenario.question;

  // Render choices
  const choicesList = document.getElementById('choicesList');
  choicesList.innerHTML = '';

  scenario.choices.forEach((choice, i) => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.setAttribute('data-index', i);
    btn.setAttribute('aria-pressed', 'false');
    btn.innerHTML = `
      <span class="choice-letter">${String.fromCharCode(65 + i)}</span>
      <span class="choice-text">${choice.text}</span>
    `;
    btn.addEventListener('click', () => selectChoice(i));
    choicesList.appendChild(btn);
  });

  // Scroll to top on mobile
  window.scrollTo({ top: 0, behavior: 'smooth' });
}


// ─────────────────────────────────────────────────────────────
// CHOICE SELECTION
// ─────────────────────────────────────────────────────────────

/**
 * Handles learner selecting a choice.
 * Records the result, marks UI state, and shows feedback screen.
 * @param {number} choiceIndex - index of selected choice
 */
function selectChoice(choiceIndex) {
  if (MODULE_STATE.isAnswered) return;

  const scenario = SCENARIOS[MODULE_STATE.currentScenarioIndex];
  const choice = scenario.choices[choiceIndex];

  MODULE_STATE.isAnswered = true;
  MODULE_STATE.selectedChoiceIndex = choiceIndex;

  // Record result
  MODULE_STATE.results.push({
    scenarioId: scenario.id,
    scenarioTag: scenario.tag,
    scenarioIcon: scenario.icon,
    question: scenario.question,
    choiceIndex,
    choiceText: choice.text,
    verdict: choice.verdict,
    explanation: choice.explanation,
    principle: choice.principle
  });

  // Visually mark selected choice
  document.querySelectorAll('.choice-btn').forEach((btn, i) => {
    btn.disabled = true;
    btn.setAttribute('aria-pressed', i === choiceIndex ? 'true' : 'false');
    if (i === choiceIndex) {
      btn.classList.add('choice-btn--selected', `choice-btn--${choice.verdict}`);
    }
  });

  // Brief pause then show feedback
  setTimeout(() => showFeedback(choice, choiceIndex), 400);
}


// ─────────────────────────────────────────────────────────────
// FEEDBACK SCREEN
// ─────────────────────────────────────────────────────────────

const VERDICT_CONFIG = {
  best:    { label: "✓ Best Choice",       className: "verdict--best",    description: "This approach reflects strong AI-assisted ID practice." },
  good:    { label: "↑ Good Approach",     className: "verdict--good",    description: "Solid practice — there's a slightly stronger option." },
  caution: { label: "⚠ Use Caution",       className: "verdict--caution", description: "This approach has meaningful risks worth understanding." },
  avoid:   { label: "✗ Avoid This",        className: "verdict--avoid",   description: "This choice creates problems that outweigh any time savings." }
};

/**
 * Populates and shows the feedback screen.
 * @param {Object} choice - the selected choice object
 * @param {number} choiceIndex - used to label the choice
 */
function showFeedback(choice, choiceIndex) {
  const config = VERDICT_CONFIG[choice.verdict];
  const isLast = MODULE_STATE.currentScenarioIndex === SCENARIOS.length - 1;

  // Verdict banner
  const verdictEl = document.getElementById('feedbackVerdict');
  verdictEl.className = `feedback-verdict ${config.className}`;
  verdictEl.innerHTML = `
    <span class="verdict-label">${config.label}</span>
    <span class="verdict-desc">${config.description}</span>
  `;

  // Choice echo
  const letter = String.fromCharCode(65 + choiceIndex);
  document.getElementById('feedbackChoiceEcho').innerHTML =
    `You chose: <span class="choice-echo-letter">${letter}</span> <em>${escapeHtml(choice.text)}</em>`;

  // Explanation
  document.getElementById('feedbackExplanation').textContent = choice.explanation;

  // Principle callout
  document.getElementById('feedbackPrinciple').innerHTML =
    `<span class="principle-icon">💡</span> <strong>Key Principle:</strong> ${escapeHtml(choice.principle)}`;

  // Next button label
  const nextBtn = document.getElementById('nextBtn');
  nextBtn.textContent = isLast ? 'See My Results →' : 'Next Scenario →';

  showScreen('screen-feedback');
}


// ─────────────────────────────────────────────────────────────
// SCENARIO ADVANCEMENT
// ─────────────────────────────────────────────────────────────

/** Called by the Next/Results button on the feedback screen. */
function advanceScenario() {
  const nextIndex = MODULE_STATE.currentScenarioIndex + 1;

  if (nextIndex >= SCENARIOS.length) {
    buildResults();
    showScreen('screen-results');
  } else {
    MODULE_STATE.currentScenarioIndex = nextIndex;
    showScreen('screen-scenario');
    loadScenario(nextIndex);
  }
}


// ─────────────────────────────────────────────────────────────
// RESULTS BUILDER
// ─────────────────────────────────────────────────────────────

/** Calculates score and populates the results screen. */
function buildResults() {
  const results = MODULE_STATE.results;
  const bestCount = results.filter(r => r.verdict === 'best').length;
  const goodCount = results.filter(r => r.verdict === 'good').length;
  const cautionCount = results.filter(r => r.verdict === 'caution').length;
  const avoidCount = results.filter(r => r.verdict === 'avoid').length;

  const total = SCENARIOS.length;
  const pct = Math.round((bestCount / total) * 100);

  // ── Score ring animation ──
  const ring = document.getElementById('scoreRingFill');
  const circumference = 2 * Math.PI * 50; // r=50
  ring.style.strokeDasharray = circumference;
  ring.style.strokeDashoffset = circumference;

  // Animate after paint
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const offset = circumference - (pct / 100) * circumference;
      ring.style.strokeDashoffset = offset;
    });
  });

  document.getElementById('scoreNumber').textContent = bestCount;

  // ── Badge & intro text ──
  let badge, intro;
  if (pct >= 75) {
    badge = '🏅 AI-Savvy Designer';
    intro = `You made strong, considered decisions in most scenarios. You understand that AI accelerates the ID process without replacing professional judgment, ethical responsibility, or quality control.`;
  } else if (pct >= 50) {
    badge = '📐 On the Right Track';
    intro = `You're developing a solid foundation for responsible AI use in instructional design. A few scenarios revealed common pitfalls — reviewing the key principles below will sharpen your practice.`;
  } else {
    badge = '📚 Building Awareness';
    intro = `These scenarios surface some of the trickiest decisions in AI-assisted instructional design. The key takeaways below are worth revisiting — responsible AI use is a learnable skill, and awareness is the first step.`;
  }

  document.getElementById('resultsBadge').textContent = badge;
  document.getElementById('resultsIntro').textContent = intro;

  // ── Breakdown list ──
  const breakdown = document.getElementById('resultsBreakdown');
  breakdown.innerHTML = '';

  results.forEach(r => {
    const config = VERDICT_CONFIG[r.verdict];
    const row = document.createElement('div');
    row.className = `breakdown-row breakdown-row--${r.verdict}`;
    row.innerHTML = `
      <div class="breakdown-icon">${r.scenarioIcon}</div>
      <div class="breakdown-content">
        <div class="breakdown-tag">${r.scenarioTag}</div>
        <div class="breakdown-choice">${escapeHtml(r.choiceText)}</div>
        <div class="breakdown-principle"><em>${escapeHtml(r.principle)}</em></div>
      </div>
      <div class="breakdown-verdict ${config.className.replace('verdict--','breakdown-verdict--')}">${config.label}</div>
    `;
    breakdown.appendChild(row);
  });

  // ── Stat chips ──
  const statsHtml = `
    <div class="result-stats">
      <div class="stat-chip stat-chip--best"><span>${bestCount}</span> Best</div>
      <div class="stat-chip stat-chip--good"><span>${goodCount}</span> Good</div>
      <div class="stat-chip stat-chip--caution"><span>${cautionCount}</span> Caution</div>
      <div class="stat-chip stat-chip--avoid"><span>${avoidCount}</span> Avoid</div>
    </div>
  `;
  document.getElementById('resultsBreakdown').insertAdjacentHTML('beforebegin', statsHtml);

  // ── Takeaways grid ──
  const grid = document.getElementById('takeawaysGrid');
  grid.innerHTML = '';

  TAKEAWAYS.forEach(t => {
    const card = document.createElement('div');
    card.className = 'takeaway-card';
    card.innerHTML = `
      <div class="takeaway-icon">${t.icon}</div>
      <h4 class="takeaway-heading">${t.heading}</h4>
      <p class="takeaway-body">${t.body}</p>
    `;
    grid.appendChild(card);
  });
}


// ─────────────────────────────────────────────────────────────
// UTILITIES
// ─────────────────────────────────────────────────────────────

/** Basic HTML escape to prevent XSS from data strings. */
function escapeHtml(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}


// ─────────────────────────────────────────────────────────────
// KEYBOARD NAVIGATION
// ─────────────────────────────────────────────────────────────

/**
 * Allow keyboard users to select choices with 1/2/3 or A/B/C.
 */
document.addEventListener('keydown', (e) => {
  const scenarioScreen = document.getElementById('screen-scenario');
  if (!scenarioScreen.classList.contains('active')) return;
  if (MODULE_STATE.isAnswered) return;

  const keyMap = { '1': 0, 'a': 0, '2': 1, 'b': 1, '3': 2, 'c': 2 };
  const key = e.key.toLowerCase();

  if (keyMap.hasOwnProperty(key)) {
    selectChoice(keyMap[key]);
  }
});

/**
 * Allow Enter/Space to advance from feedback screen.
 */
document.addEventListener('keydown', (e) => {
  const feedbackScreen = document.getElementById('screen-feedback');
  if (!feedbackScreen.classList.contains('active')) return;

  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    advanceScenario();
  }
});


// ─────────────────────────────────────────────────────────────
// REDUCED MOTION SUPPORT
// ─────────────────────────────────────────────────────────────

/**
 * If the user prefers reduced motion, remove animation classes
 * from the intro graphic.
 */
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.orbit-ring, .orbit-dot').forEach(el => {
    el.style.animationDuration = '0s';
  });
}
