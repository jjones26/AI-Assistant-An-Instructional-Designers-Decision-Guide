/**
 * app.js
 * AI Assistant: An Instructional Designer's Decision Guide
 *
 * Manages:
 *  - Page rendering from PAGES data
 *  - Sidebar navigation state
 *  - Forward/back navigation
 *  - Inline question interactions
 *  - Assessment scoring
 *  - Results page generation
 */

// ─────────────────────────────────
// STATE
// ─────────────────────────────────

const STATE = {
  currentPage: 0,
  completedPages: new Set(),
  // For inline questions: tracks which have been answered
  answeredQuestions: {},   // { questionId: choiceIndex }
  // For assessment: tracks answers before submit
  assessmentAnswers: {},   // { questionId: choiceIndex }
  assessmentSubmitted: false,
  assessmentScore: 0
};

// ─────────────────────────────────
// INIT
// ─────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  buildSidebar();
  renderPage(0);
  setupMobileNav();
});

// ─────────────────────────────────
// SIDEBAR
// ─────────────────────────────────

function buildSidebar() {
  const nav = document.getElementById('sidebarNav');
  nav.innerHTML = '';

  PAGES.forEach((page, i) => {
    const li = document.createElement('li');
    li.className = 'sidebar-nav-item';

    const btn = document.createElement('button');
    btn.className = 'sidebar-nav-btn';
    btn.id = `nav-btn-${i}`;
    btn.setAttribute('aria-current', i === 0 ? 'page' : 'false');
    btn.onclick = () => goToPage(i);

    btn.innerHTML = `
      <span class="nav-dot" aria-hidden="true"></span>
      <span class="nav-label">${page.navLabel}</span>
    `;

    li.appendChild(btn);
    nav.appendChild(li);
  });

  updateSidebar();
}

function updateSidebar() {
  const total = PAGES.length;
  const current = STATE.currentPage;
  const completed = STATE.completedPages.size;

  // Update nav buttons
  document.querySelectorAll('.sidebar-nav-btn').forEach((btn, i) => {
    btn.classList.toggle('active', i === current);
    btn.classList.toggle('completed', STATE.completedPages.has(i) && i !== current);
    btn.setAttribute('aria-current', i === current ? 'page' : 'false');
  });

  // Progress bar
  const pct = Math.round((completed / total) * 100);
  document.getElementById('sidebarProgressFill').style.width = pct + '%';
  document.getElementById('sidebarProgressText').textContent =
    `Page ${current + 1} of ${total}`;
}

// ─────────────────────────────────
// NAVIGATION
// ─────────────────────────────────

function goToPage(index) {
  if (index < 0 || index >= PAGES.length) return;

  // Mark current as completed before leaving
  STATE.completedPages.add(STATE.currentPage);
  STATE.currentPage = index;

  renderPage(index);
  updateSidebar();
  updateBottomNav();
  closeMobileNav();

  // Scroll to top
  document.getElementById('main').scrollTo({ top: 0, behavior: 'smooth' });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goForward() {
  const page = PAGES[STATE.currentPage];

  // Block advance on assessment until submitted
  if (page.type === 'assessment' && !STATE.assessmentSubmitted) {
    const allAnswered = page.questions.every(q => STATE.assessmentAnswers[q.id] !== undefined);
    if (!allAnswered) {
      showValidationHint('Answer all questions before continuing.');
      return;
    }
    submitAssessment();
    return;
  }

  goToPage(STATE.currentPage + 1);
}

function goBack() {
  if (STATE.currentPage > 0) {
    goToPage(STATE.currentPage - 1);
  }
}

function updateBottomNav() {
  const index = STATE.currentPage;
  const page = PAGES[index];
  const total = PAGES.length;

  const btnBack = document.getElementById('btnBack');
  const btnContinue = document.getElementById('btnContinue');
  const center = document.getElementById('bottomNavCenter');

  btnBack.disabled = index === 0;

  // Last page (results): hide continue, show different CTA
  if (page.type === 'results') {
    btnContinue.style.display = 'none';
    center.innerHTML = '';
  } else {
    btnContinue.style.display = '';
    btnContinue.textContent = (index === total - 2) ? 'See Results →' :
                              (page.type === 'assessment' && !STATE.assessmentSubmitted) ? 'Submit →' :
                              'Continue →';
    center.textContent = `${index + 1} / ${total}`;
  }
}

function showValidationHint(msg) {
  const center = document.getElementById('bottomNavCenter');
  center.innerHTML = `<span style="color:#DC2626;font-size:13px;">${msg}</span>`;
  setTimeout(() => updateBottomNav(), 3000);
}

// ─────────────────────────────────
// PAGE RENDERER
// ─────────────────────────────────

function renderPage(index) {
  const page = PAGES[index];
  const container = document.getElementById('pageContainer');

  let html = '';

  switch (page.type) {
    case 'cover':      html = renderCover(page); break;
    case 'objectives': html = renderObjectives(page); break;
    case 'content':    html = renderContent(page); break;
    case 'assessment': html = renderAssessment(page); break;
    case 'results':    html = renderResults(); break;
  }

  container.innerHTML = `<div class="page active" id="page-${page.id}">${html}</div>`;

  // Wire up interactions
  if (page.type === 'content' && page.question) {
    setupQuestion(page.question);
  }
  if (page.type === 'assessment') {
    setupAssessment(page);
  }

  updateBottomNav();
}

// ─────────────────────────────────
// COVER PAGE
// ─────────────────────────────────

function renderCover(page) {
  const metaIcons = {
    clock: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    pages: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`,
    quiz: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`
  };

  const metaHtml = page.meta.map(m =>
    `<div class="cover-meta-item">${metaIcons[m.icon] || ''}<span>${m.text}</span></div>`
  ).join('');

  return `
    <div class="page-cover">
      <p class="cover-eyebrow">${page.eyebrow}</p>
      <h1 class="cover-title">${page.title}</h1>
      <p class="cover-desc">${page.description}</p>
      <div class="cover-meta">${metaHtml}</div>
      <hr class="cover-divider" />
      <div class="cover-audience">
        <p class="cover-audience-label">${page.audienceLabel}</p>
        <p>${page.audience}</p>
      </div>
    </div>
  `;
}

// ─────────────────────────────────
// OBJECTIVES PAGE
// ─────────────────────────────────

function renderObjectives(page) {
  const items = page.objectives.map((obj, i) =>
    `<li class="objective-item">
       <span class="objective-num">${i + 1}</span>
       <span class="objective-text">${obj}</span>
     </li>`
  ).join('');

  return `
    <div class="page-objectives">
      <h1 class="page-title">${page.title}</h1>
      <p class="page-subtitle">${page.subtitle}</p>
      <ul class="objectives-list">${items}</ul>
    </div>
  `;
}

// ─────────────────────────────────
// CONTENT PAGE
// ─────────────────────────────────

function renderContent(page) {
  const sectionsHtml = page.sections.map(s => renderSection(s)).join('');
  const questionHtml = page.question ? renderQuestion(page.question) : '';

  return `
    <div class="page-content">
      ${sectionsHtml}
      ${questionHtml ? `<hr class="content-divider" />${questionHtml}` : ''}
    </div>
  `;
}

function renderSection(s) {
  // Callout block
  if (s.type === 'callout') {
    const variantClass = s.variant === 'warn' ? 'callout-warn' : s.variant === 'tip' ? 'callout-tip' : '';
    return `<div class="callout ${variantClass}">${s.text}</div>`;
  }
  // Scenario block
  if (s.type === 'scenario') {
    return `
      <div class="scenario-block">
        <p class="scenario-label">${s.label || 'Scenario'}</p>
        <div class="scenario-situation">${s.text}</div>
      </div>
    `;
  }

  // Regular section
  let html = '<div class="content-section">';
  if (s.eyebrow) html += `<p class="section-eyebrow">${s.eyebrow}</p>`;
  if (s.heading) html += `<h2 class="section-heading">${s.heading}</h2>`;
  if (s.body)    html += `<div class="section-body">${s.body}</div>`;
  if (s.list) {
    html += `<ul class="content-list">` +
      s.list.map(item => `<li>${item}</li>`).join('') +
      `</ul>`;
  }
  html += '</div>';
  return html;
}

// ─────────────────────────────────
// INLINE QUESTION
// ─────────────────────────────────

function renderQuestion(q) {
  const letters = ['A', 'B', 'C', 'D'];
  const choicesHtml = q.choices.map((text, i) =>
    `<button class="choice-option" data-qid="${q.id}" data-index="${i}"
             onclick="handleInlineChoice('${q.id}', ${i})">
       <span class="choice-marker">${letters[i]}</span>
       <span class="choice-text">${text}</span>
     </button>`
  ).join('');

  return `
    <div class="question-block" id="qblock-${q.id}">
      <p class="question-prompt">${q.prompt}</p>
      <div class="question-choices" id="qchoices-${q.id}" role="group" aria-label="Answer choices">
        ${choicesHtml}
      </div>
      <button class="question-submit" id="qsubmit-${q.id}"
              onclick="submitInlineQuestion('${q.id}')" disabled>
        Check Answer
      </button>
      <div class="question-feedback" id="qfeedback-${q.id}" role="alert" aria-live="polite"></div>
    </div>
  `;
}

function setupQuestion(q) {
  // If already answered in this session, restore the state
  if (STATE.answeredQuestions[q.id] !== undefined) {
    revealInlineFeedback(q.id, STATE.answeredQuestions[q.id], q);
  }
}

function handleInlineChoice(qid, index) {
  if (STATE.answeredQuestions[qid] !== undefined) return;

  // Deselect all, select clicked
  document.querySelectorAll(`[data-qid="${qid}"]`).forEach(btn => {
    btn.classList.remove('selected');
  });
  const btn = document.querySelector(`[data-qid="${qid}"][data-index="${index}"]`);
  if (btn) btn.classList.add('selected');

  // Enable submit
  const submitBtn = document.getElementById(`qsubmit-${qid}`);
  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn._pendingIndex = index;
  }
}

function submitInlineQuestion(qid) {
  const submitBtn = document.getElementById(`qsubmit-${qid}`);
  if (!submitBtn || submitBtn.disabled) return;

  const index = submitBtn._pendingIndex;
  if (index === undefined) return;

  // Find the question data
  const page = PAGES[STATE.currentPage];
  const q = page.question;
  if (!q) return;

  STATE.answeredQuestions[qid] = index;
  revealInlineFeedback(qid, index, q);
}

function revealInlineFeedback(qid, selectedIndex, q) {
  const isCorrect = selectedIndex === q.correct;

  // Style choices
  document.querySelectorAll(`[data-qid="${qid}"]`).forEach((btn, i) => {
    btn.disabled = true;
    btn.classList.add('answered');
    btn.classList.remove('selected');
    if (i === selectedIndex && isCorrect) btn.classList.add('correct');
    else if (i === selectedIndex && !isCorrect) btn.classList.add('incorrect');
    else if (i === q.correct) btn.classList.add('show-correct');
  });

  // Hide submit
  const submitBtn = document.getElementById(`qsubmit-${qid}`);
  if (submitBtn) submitBtn.style.display = 'none';

  // Show feedback
  const feedbackEl = document.getElementById(`qfeedback-${qid}`);
  if (feedbackEl) {
    feedbackEl.className = `question-feedback visible ${isCorrect ? 'feedback-correct' : 'feedback-incorrect'}`;
    feedbackEl.innerHTML = `
      <div class="feedback-verdict-line">
        ${isCorrect ? '✓ Correct' : '✗ Incorrect'}
      </div>
      ${q.feedback[selectedIndex]}
    `;
  }
}

// ─────────────────────────────────
// ASSESSMENT PAGE
// ─────────────────────────────────

function renderAssessment(page) {
  const questionsHtml = page.questions.map((q, qi) => {
    const letters = ['A', 'B', 'C', 'D'];
    const choices = q.choices.map((text, i) =>
      `<button class="choice-option" data-aqid="${q.id}" data-index="${i}"
               onclick="handleAssessmentChoice('${q.id}', ${i})">
         <span class="choice-marker">${letters[i]}</span>
         <span class="choice-text">${text}</span>
       </button>`
    ).join('');

    return `
      <div class="question-block" id="aqblock-${q.id}" style="margin-bottom:32px;">
        <p class="question-prompt" style="margin-bottom:14px;">
          <span style="color:var(--gray-400);font-weight:400;font-size:13px;">Question ${qi + 1} of ${page.questions.length}</span><br/>
          ${q.prompt}
        </p>
        <div class="question-choices" id="aqchoices-${q.id}" role="group" aria-label="Answer choices">
          ${choices}
        </div>
        <div class="question-feedback" id="aqfeedback-${q.id}" role="alert" aria-live="polite"></div>
      </div>
    `;
  }).join('<hr class="content-divider" />');

  return `
    <div class="assessment-header">
      <h2>${page.title}</h2>
      <p>${page.subtitle}</p>
    </div>
    ${questionsHtml}
  `;
}

function setupAssessment(page) {
  // If already submitted in session, restore state
  if (STATE.assessmentSubmitted) {
    revealAssessmentResults(page);
  }
}

function handleAssessmentChoice(qid, index) {
  if (STATE.assessmentSubmitted) return;

  STATE.assessmentAnswers[qid] = index;

  // Update UI: deselect all for this question, select clicked
  document.querySelectorAll(`[data-aqid="${qid}"]`).forEach(btn => {
    btn.classList.remove('selected');
  });
  const btn = document.querySelector(`[data-aqid="${qid}"][data-index="${index}"]`);
  if (btn) btn.classList.add('selected');

  updateBottomNav();
}

function submitAssessment() {
  const page = PAGES[STATE.currentPage];

  // Check all answered
  const allAnswered = page.questions.every(q => STATE.assessmentAnswers[q.id] !== undefined);
  if (!allAnswered) {
    showValidationHint('Please answer all questions first.');
    return;
  }

  STATE.assessmentSubmitted = true;

  // Score
  let score = 0;
  page.questions.forEach(q => {
    if (STATE.assessmentAnswers[q.id] === q.correct) score++;
  });
  STATE.assessmentScore = score;

  revealAssessmentResults(page);

  // Advance the continue button
  const btnContinue = document.getElementById('btnContinue');
  btnContinue.textContent = 'See Results →';
}

function revealAssessmentResults(page) {
  page.questions.forEach(q => {
    const selectedIndex = STATE.assessmentAnswers[q.id];
    if (selectedIndex === undefined) return;
    const isCorrect = selectedIndex === q.correct;

    document.querySelectorAll(`[data-aqid="${q.id}"]`).forEach((btn, i) => {
      btn.disabled = true;
      btn.classList.remove('selected');
      if (i === selectedIndex && isCorrect) btn.classList.add('correct');
      else if (i === selectedIndex && !isCorrect) btn.classList.add('incorrect');
      else if (i === q.correct) btn.classList.add('show-correct');
    });

    const feedbackEl = document.getElementById(`aqfeedback-${q.id}`);
    const isCorrect2 = selectedIndex === q.correct;
    if (feedbackEl) {
      feedbackEl.className = `question-feedback visible ${isCorrect2 ? 'feedback-correct' : 'feedback-incorrect'}`;
      feedbackEl.innerHTML = `
        <div class="feedback-verdict-line">${isCorrect2 ? '✓ Correct' : '✗ Incorrect'}</div>
        ${q.feedback[selectedIndex]}
      `;
    }
  });
}

// ─────────────────────────────────
// RESULTS PAGE
// ─────────────────────────────────

function renderResults() {
  const page = PAGES.find(p => p.type === 'results');
  const score = STATE.assessmentScore;
  const total = 5; // assessment questions
  const pct = Math.round((score / total) * 100);

  let message = '';
  if (pct === 100) {
    message = "Perfect score. You have a strong command of responsible AI use in instructional design — the judgment to move quickly without cutting corners that matter.";
  } else if (pct >= 80) {
    message = "You got most of it right. A strong foundation for AI-assisted design work. Review any questions you missed — the nuances there are worth sitting with.";
  } else if (pct >= 60) {
    message = "Solid progress. A few areas to revisit, particularly around verification and data privacy — the stakes there are high enough that getting them right matters.";
  } else {
    message = "There are a few areas worth revisiting before putting these concepts into practice. The key principles below summarize what to take with you.";
  }

  // Assessment breakdown
  const assessmentPage = PAGES.find(p => p.type === 'assessment');
  const breakdownHtml = assessmentPage ? assessmentPage.questions.map(q => {
    const selected = STATE.assessmentAnswers[q.id];
    const isCorrect = selected === q.correct;
    return `
      <div class="results-row">
        <div class="results-row-icon">${isCorrect ? '✓' : '✗'}</div>
        <div class="results-row-q">${q.prompt}</div>
        <div class="results-row-badge ${isCorrect ? 'badge-correct' : 'badge-incorrect'}">
          ${isCorrect ? 'Correct' : 'Incorrect'}
        </div>
      </div>
    `;
  }).join('') : '';

  const takeawaysHtml = page.takeaways.map(t => `
    <div class="takeaway-item">
      <span class="takeaway-icon">${t.icon}</span>
      <div><strong>${t.heading}</strong><br/>${t.body}</div>
    </div>
  `).join('');

  return `
    <div class="results-score-block">
      <div>
        <span class="results-score-num">${score}</span>
        <span class="results-score-denom"> / ${total}</span>
      </div>
      <p class="results-score-label">Knowledge Check Score</p>
    </div>
    <p class="results-message">${message}</p>

    ${breakdownHtml ? `
    <div class="results-breakdown">
      <h3 style="font-size:16px;font-weight:600;color:var(--gray-900);margin-bottom:14px;padding:0 8px;">Your Answers</h3>
      ${breakdownHtml}
    </div>` : ''}

    <div class="results-takeaways" style="max-width:620px;margin:0 auto 40px;padding:0 8px;">
      <h3>Key Takeaways</h3>
      ${takeawaysHtml}
    </div>

    <div class="results-actions">
      <button class="btn-restart" onclick="restartModule()">↺ Restart Module</button>
      <a class="btn-portfolio" href="https://jacobjones.dev" target="_blank" rel="noopener">
        View Portfolio →
      </a>
    </div>

    <div class="results-attribution">
      <p>Created by <strong>Jake Jones</strong> · Instructional Designer &amp; Developer<br/>
      <a href="https://jacobjones.dev" target="_blank" rel="noopener">jacobjones.dev</a></p>
    </div>
  `;
}

// ─────────────────────────────────
// MODULE RESTART
// ─────────────────────────────────

function restartModule() {
  STATE.currentPage = 0;
  STATE.completedPages = new Set();
  STATE.answeredQuestions = {};
  STATE.assessmentAnswers = {};
  STATE.assessmentSubmitted = false;
  STATE.assessmentScore = 0;

  buildSidebar();
  renderPage(0);
  updateBottomNav();

  window.scrollTo({ top: 0, behavior: 'instant' });
}

// ─────────────────────────────────
// MOBILE NAV
// ─────────────────────────────────

function setupMobileNav() {
  const toggle = document.getElementById('mobileNavToggle');
  const overlay = document.getElementById('mobileNavOverlay');

  toggle.addEventListener('click', () => {
    const isOpen = document.getElementById('sidebar').classList.contains('open');
    if (isOpen) closeMobileNav();
    else openMobileNav();
  });

  overlay.addEventListener('click', closeMobileNav);
}

function openMobileNav() {
  document.getElementById('sidebar').classList.add('open');
  document.getElementById('mobileNavOverlay').classList.add('visible');
  document.getElementById('mobileNavToggle').setAttribute('aria-expanded', 'true');
}

function closeMobileNav() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('mobileNavOverlay').classList.remove('visible');
  document.getElementById('mobileNavToggle').setAttribute('aria-expanded', 'false');
}
