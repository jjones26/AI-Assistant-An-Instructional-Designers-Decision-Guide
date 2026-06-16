/**
 * scenarios.js
 * AI Assistant: An Instructional Designer's Decision Guide
 *
 * Data file containing all 8 decision scenarios.
 * Each scenario includes:
 *   - id, tag, icon: metadata and category label
 *   - situation: the workplace context presented to the learner
 *   - question: the decision prompt
 *   - choices[]: array of 3 options, each with:
 *       text: the choice label
 *       verdict: "best" | "good" | "caution" | "avoid"
 *       explanation: feedback paragraph explaining why
 *       principle: a short bolded takeaway
 *
 * Verdict levels map to visual treatments:
 *   best    → teal badge, full credit
 *   good    → blue badge, partial credit
 *   caution → amber badge, no credit
 *   avoid   → red badge, no credit
 */

const SCENARIOS = [

  // ─────────────────────────────────────────────────────────
  // SCENARIO 1 · Writing Learning Objectives
  // ─────────────────────────────────────────────────────────
  {
    id: 1,
    tag: "Writing Learning Objectives",
    icon: "🎯",
    situation: `You're designing a compliance module on workplace harassment prevention for a healthcare organization. Your SME has given you a two-page policy document and asked you to "turn it into training." You're starting from scratch and need to write the learning objectives first.`,
    question: "How do you use AI to help with your learning objectives?",
    choices: [
      {
        text: "Paste the policy into an AI tool and ask it to generate a full set of learning objectives — then use them as written.",
        verdict: "avoid",
        explanation: "AI can produce plausible-sounding objectives quickly, but it has no knowledge of your specific audience, their existing knowledge gaps, the performance gap the training is meant to close, or the organization's actual compliance requirements. Objectives written without that context are likely to be surface-level, unmeasurable, or misaligned with what learners actually need to do. Using them as written skips the professional judgment that makes objectives meaningful.",
        principle: "AI can draft. Only you can align objectives to audience, context, and organizational need."
      },
      {
        text: "Use AI to generate a list of potential objectives, then evaluate each one against Bloom's Taxonomy, the performance gap, and audience needs — revising heavily before finalizing.",
        verdict: "best",
        explanation: "This is exactly the right workflow. AI is a fast drafting partner, not a subject matter expert. Using it to generate raw material that you then evaluate against design criteria — Bloom's levels, measurability, audience appropriateness, job relevance — means you get speed without sacrificing quality. The AI does the heavy lifting of generating options; your expertise decides what's worth keeping and how to strengthen it.",
        principle: "Treat AI output as a first draft that requires your professional evaluation, not a finished product."
      },
      {
        text: "Skip AI for objectives entirely — write them yourself from scratch based on the policy document and a conversation with the SME.",
        verdict: "good",
        explanation: "There's nothing wrong with this approach, and it often produces the most contextually accurate objectives. The risk is time — writing objectives without a drafting aid can be slower, and you might miss angles AI would surface. Using AI to brainstorm before writing your own is a middle path worth considering, but writing from scratch with strong SME input is still sound instructional design practice.",
        principle: "AI assistance is valuable, but strong ID practice without it still produces quality outcomes."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────
  // SCENARIO 2 · Brainstorming Scenario Ideas
  // ─────────────────────────────────────────────────────────
  {
    id: 2,
    tag: "Brainstorming & Ideation",
    icon: "💡",
    situation: `You're designing a soft skills course on active listening for new managers. You have your learning objectives locked and you're trying to come up with realistic, relatable scenario situations that will resonate with the audience. You have a blank doc and two hours before your next SME check-in.`,
    question: "What's your approach to using AI for generating scenario ideas?",
    choices: [
      {
        text: "Ask AI to generate 10–15 diverse scenario concepts, then filter, combine, and adapt the ones that fit your audience and objectives — bringing the refined list to your SME for validation.",
        verdict: "best",
        explanation: "Brainstorming is one of AI's strongest use cases in the ID process. Generating a wide range of scenario starters quickly lets you move past the blank page problem, find unexpected angles, and walk into your SME meeting with concrete material to react to rather than abstract questions. The key is treating AI output as raw ideation fuel — not final content — and using SME validation to ground the ideas in workplace reality.",
        principle: "AI excels at generating quantity; your expertise and your SME provide quality control."
      },
      {
        text: "Ask AI to generate one highly detailed, fully developed scenario and use it as the basis for the entire module.",
        verdict: "caution",
        explanation: "Relying on a single AI-generated scenario introduces risk: it may reflect generic workplace situations rather than your actual audience's context, contain inaccuracies, or miss the nuance that makes a scenario feel authentic. Scenario diversity also matters for equity — AI tends to generate default characters and settings that may not represent your learner population. A richer brainstorm gives you better raw material.",
        principle: "Diversity in your idea pool leads to better, more representative final scenarios."
      },
      {
        text: "Use AI to generate scenarios for a completely different industry (e.g., manufacturing instead of healthcare management) to spark creative thinking through contrast.",
        verdict: "good",
        explanation: "This is a legitimate creative technique — using contrast and analogy to unlock new thinking. It can work well for experienced designers who know how to translate across contexts. The risk is that you spend time adapting ideas that don't actually transfer well, or that you drift from your audience's real-world experience. It's a fine tool for breaking creative blocks, but keep your audience's actual context front and center.",
        principle: "Analogical thinking can unlock creativity, but always bring ideas back to your learner's reality."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────
  // SCENARIO 3 · Drafting Scenario Dialogue
  // ─────────────────────────────────────────────────────────
  {
    id: 3,
    tag: "Drafting Scenario Dialogue",
    icon: "💬",
    situation: `You're writing a branching scenario for a sales training module. One scene requires a difficult conversation between a sales rep and a frustrated customer. You need dialogue that sounds natural, reveals the customer's emotional state without being a caricature, and demonstrates the wrong approach in a recognizable way.`,
    question: "How do you use AI to draft this dialogue?",
    choices: [
      {
        text: "Ask AI to write the full scene, provide character names, backstory, and tone guidance, then edit the output for naturalness, accuracy, and alignment with the scenario's instructional goal.",
        verdict: "best",
        explanation: "Dialogue is exactly where AI can save you significant time without sacrificing quality — as long as you edit. Giving the AI rich context (character, emotional beat, instructional goal, tone) produces much better raw output. Your job then is to read it aloud, catch anything that sounds robotic or clichéd, ensure the 'wrong' behavior is clearly recognizable without being a strawman, and verify the dialogue serves the learning objective. That editorial layer is where your expertise matters most.",
        principle: "Rich prompting + active editing produces AI dialogue worth using."
      },
      {
        text: "Use the AI-generated dialogue without editing because it passed a basic readability check.",
        verdict: "avoid",
        explanation: "Readability and instructional effectiveness are not the same thing. AI dialogue can be grammatically correct and still be flat, stereotyped, culturally tone-deaf, or misaligned with the emotional realism your scenario needs. Branching scenario dialogue shapes how learners understand and empathize with characters — that craft requires a human eye. A readability score won't catch a customer character who sounds like a movie villain rather than a real frustrated person.",
        principle: "Readability ≠ instructional quality. Edit for craft, not just correctness."
      },
      {
        text: "Write the dialogue entirely by hand and only use AI to check grammar and sentence flow afterward.",
        verdict: "good",
        explanation: "Writing dialogue by hand often produces the most authentic result, especially for experienced designers who have a strong sense of how real conversations unfold. Using AI for grammar and flow checking afterward is a reasonable and low-risk use. The tradeoff is time — AI-assisted drafting is simply faster for most people, so skipping the drafting assist means slower production without a clear quality advantage.",
        principle: "Human-crafted dialogue is often strongest; AI assists at any stage of the process."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────
  // SCENARIO 4 · Creating Assessments
  // ─────────────────────────────────────────────────────────
  {
    id: 4,
    tag: "Creating Assessments & Knowledge Checks",
    icon: "📋",
    situation: `You're building a five-question knowledge check for a module on OSHA recordkeeping requirements. The SME needs to approve the questions before development begins. You're under deadline pressure and need to draft the questions today.`,
    question: "What's the most responsible way to use AI for drafting these assessment questions?",
    choices: [
      {
        text: "Use AI to draft all five questions and distractors, but verify every question and answer option against the actual OSHA regulation — not just the training content — before sending to the SME.",
        verdict: "best",
        explanation: "AI can generate assessment questions efficiently, but it can also hallucinate plausible-sounding regulatory details that are simply wrong. For compliance content especially, every question and every distractor needs to be verified against the source regulation, not just your training material. Sending unverified compliance questions to a SME wastes their time and can damage trust in your work. Verifying first, then seeking SME approval, is the right workflow.",
        principle: "For compliance content, always verify AI-generated questions against authoritative source material."
      },
      {
        text: "Use AI to generate 10 draft questions, then select and revise the 5 strongest — checking them against content but skipping the source regulation since the SME will catch errors.",
        verdict: "caution",
        explanation: "Relying on the SME to catch factual errors puts an unfair burden on them and can erode your credibility as an ID. SMEs review for accuracy within their domain, but they shouldn't be your primary quality control mechanism for errors introduced by your drafting process. Regulatory details — especially around OSHA recordkeeping — require direct source verification, not just content-level checking.",
        principle: "Quality control is your responsibility first. SME review is a final checkpoint, not a safety net."
      },
      {
        text: "Ask AI to generate the questions and distractors, have it explain the correct answer for each, and treat that explanation as your verification.",
        verdict: "avoid",
        explanation: "Asking AI to verify its own output is circular. The same model that generated the question also generates the explanation — and if the underlying information is wrong, both will be consistently wrong in the same direction. AI cannot audit itself for factual accuracy. For regulatory content with legal and safety implications, this approach is especially risky. Independent source verification is non-negotiable.",
        principle: "AI cannot verify its own accuracy. Always cross-reference with independent authoritative sources."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────
  // SCENARIO 5 · Generating Visual Assets
  // ─────────────────────────────────────────────────────────
  {
    id: 5,
    tag: "Generating Visual Assets",
    icon: "🖼️",
    situation: `You're building a course for a mid-sized financial services company. The client wants professional photography-style images of diverse workplace scenarios throughout the module, but they have no existing photography and the budget doesn't include a photo shoot. You're considering AI image generation.`,
    question: "How should you approach AI-generated visuals for this project?",
    choices: [
      {
        text: "Use AI image generation to create workplace visuals, but review each image carefully for anatomical errors, unnatural features, implicit bias in representation, and ensure the images align with your client's brand standards before use.",
        verdict: "best",
        explanation: "AI image generation is a legitimate and often budget-appropriate solution for eLearning visuals, but it requires active quality control. Common issues include hand anatomy errors, background artifacts, culturally inconsistent details, and representation problems that may reflect training data bias. Your review needs to be deliberate, not a quick glance. Clients also deserve transparency — confirming they're aware and comfortable with AI-generated images is a professional standard.",
        principle: "AI image generation requires careful human review for quality, accuracy, and representation."
      },
      {
        text: "Use a stock photography library with a license that covers commercial eLearning use — it's safer and produces more consistent results.",
        verdict: "good",
        explanation: "This is a sound, reliable choice. Licensed stock photography avoids many of the quality risks of AI generation and typically provides clearer legal standing. The tradeoffs are cost and flexibility — stock libraries can be expensive, and finding diverse, situation-specific images that match your exact scenarios is often difficult. AI generation can fill gaps stock can't, but stock is a reasonable default when it meets the need.",
        principle: "Stock photography with verified licensing is a reliable, lower-risk visual solution."
      },
      {
        text: "Generate all images with AI, don't disclose to the client that they're AI-generated, and move on — image quality is subjective anyway.",
        verdict: "avoid",
        explanation: "Non-disclosure of AI-generated content to a client is an ethical problem regardless of image quality. Clients have a right to know what tools and approaches you're using to create their training — especially when it affects content, liability, and brand representation. Many clients have policies about AI-generated content. Discovering after the fact that you withheld this information damages trust and can have professional consequences. Transparency is not optional.",
        principle: "Transparency about AI use is a professional and ethical obligation, not a preference."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────
  // SCENARIO 6 · Accessibility Considerations
  // ─────────────────────────────────────────────────────────
  {
    id: 6,
    tag: "Accessibility Considerations",
    icon: "♿",
    situation: `You're using AI to help generate alt text descriptions for images in a course about emergency evacuation procedures. Speed matters — there are 60+ images and the deadline is tomorrow. A colleague suggests just letting AI auto-generate all the alt text without review.`,
    question: "What's the right approach for AI-generated alt text at scale?",
    choices: [
      {
        text: "Let AI generate all the alt text, then do a focused review of images where accessibility is critical to the instructional goal — evacuation routes, safety equipment, procedural steps — while spot-checking others.",
        verdict: "best",
        explanation: "A risk-tiered review approach is practical and responsible. AI-generated alt text can be accurate for straightforward visuals, but for safety-critical content, errors have real consequences. A learner using a screen reader who receives wrong or incomplete information about an evacuation route is not a minor UX problem — it's a safety issue. Prioritizing thorough review of instructionally critical images while spot-checking lower-stakes ones lets you manage the deadline without compromising where it matters most.",
        principle: "Apply your review effort in proportion to the instructional and safety stakes of each image."
      },
      {
        text: "Accept all AI-generated alt text without review because the course is for general staff and most learners won't use a screen reader anyway.",
        verdict: "avoid",
        explanation: "Accessibility is not optional and cannot be conditioned on assumptions about who will use a screen reader. This reasoning is both legally problematic under ADA/Section 508 and ethically indefensible — learners who rely on assistive technology have equal rights to accurate, usable content. For safety-procedure training specifically, inaccurate alt text can result in real harm. AI-generated alt text without review is a known quality risk that requires mitigation, not dismissal.",
        principle: "Accessibility is a right, not a feature. AI-generated alt text requires human review."
      },
      {
        text: "Skip AI entirely and write all 60+ alt descriptions by hand to ensure accuracy — request a deadline extension to do it right.",
        verdict: "good",
        explanation: "Writing all alt text by hand is the highest-quality approach and eliminates AI accuracy risk. Requesting a deadline extension to do it right is a reasonable professional judgment call, especially for safety content. The tradeoff is time and scalability — for 60+ images under realistic production timelines, a supervised AI-assist workflow may achieve the same accuracy at significantly lower cost. Neither approach is wrong; it depends on your timeline flexibility.",
        principle: "Human-authored alt text at a quality standard is always appropriate — even if AI-assisted is more practical."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────
  // SCENARIO 7 · Data Privacy
  // ─────────────────────────────────────────────────────────
  {
    id: 7,
    tag: "Data Privacy & Confidentiality",
    icon: "🔒",
    situation: `You're designing a course for a healthcare organization. Your SME sends you real patient case studies — with names, dates, diagnoses, and treatment notes — to use as the basis for clinical scenario development. You want to use AI to help adapt these into engaging learning scenarios.`,
    question: "How do you handle this content when working with AI tools?",
    choices: [
      {
        text: "Paste the case studies directly into a consumer AI tool (like the free tier of a commercial chatbot) to help you draft the scenarios quickly — the content stays within your work session anyway.",
        verdict: "avoid",
        explanation: "Pasting patient health information (PHI) into a consumer AI tool is a serious HIPAA violation, regardless of what the tool's session policy says. Consumer-tier AI tools typically do not have Business Associate Agreements (BAAs) with healthcare organizations, meaning they are not authorized to process PHI. The 'it stays in my session' assumption is also incorrect — most tools retain data for training or safety purposes unless specifically configured otherwise. This action could have significant legal and professional consequences.",
        principle: "Never input PHI or confidential data into AI tools without a verified BAA and data processing agreement."
      },
      {
        text: "De-identify the case studies first — replace all PHI with fictional details — then use AI to help adapt the de-identified version into training scenarios.",
        verdict: "best",
        explanation: "This is exactly the right approach. De-identification transforms protected health information into generic clinical content that doesn't carry HIPAA obligations. Once patient-identifiable details are replaced with fictional equivalents, AI tools can help you shape the scenarios without any regulatory risk. The underlying clinical reality of the case still informs the scenario — you're not losing the instructional value, just removing the protected elements that create legal exposure.",
        principle: "De-identify all PHI before using AI tools. The instructional value stays; the legal risk goes."
      },
      {
        text: "Ask your organization's IT department whether the enterprise AI tool you use has a BAA in place before inputting any patient data.",
        verdict: "good",
        explanation: "This is a responsible and professionally appropriate step. Enterprise AI deployments in healthcare contexts often do have BAAs in place that govern how data can be used — but you need to verify, not assume. Checking with IT before input is the right instinct. However, even with a BAA, input of PHI should be intentional, documented, and aligned with your organization's data governance policy. De-identification is often the cleaner and lower-risk path regardless.",
        principle: "Verify data processing agreements before using enterprise AI tools with sensitive content."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────
  // SCENARIO 8 · Human Review & Quality Assurance
  // ─────────────────────────────────────────────────────────
  {
    id: 8,
    tag: "Human Review & Quality Assurance",
    icon: "🔍",
    situation: `You've used AI throughout the design process — brainstorming, drafting objectives, writing dialogue, and generating knowledge check questions. A team member says the content "looks polished" and suggests you skip the SME review cycle to hit the delivery date. The AI output seems accurate and well-organized.`,
    question: "What do you do?",
    choices: [
      {
        text: "Skip the SME review — the AI-assisted content is well-organized and your colleague agrees it looks right. One less step gets you to delivery faster.",
        verdict: "avoid",
        explanation: "This is one of the most consequential mistakes an instructional designer can make with AI-assisted content. 'Looks right' and 'is right' are not the same thing — especially for subject-matter-specific content. AI generates confident, well-organized text even when details are wrong, outdated, or subtly off-target. A polished presentation is not evidence of accuracy. Skipping SME review is not a time savings; it's a quality debt that typically becomes visible at the worst possible moment — during delivery, or worse, after a learner acts on incorrect information.",
        principle: "Confident presentation is not evidence of accuracy. SME review is non-negotiable for AI-assisted content."
      },
      {
        text: "Proceed to delivery but add a disclaimer to the course that some content was AI-assisted and learners should verify key information with their manager.",
        verdict: "caution",
        explanation: "Disclaimers do not substitute for quality assurance. Telling learners to verify information with their manager shifts responsibility in a way that undermines the course's credibility and purpose. If content cannot be delivered with confidence in its accuracy, it's not ready for delivery. A disclaimer that essentially says 'this might be wrong' signals that the design process broke down — and that's not a message learners or clients should receive through a disclaimed footnote.",
        principle: "Disclaimers are not a QA substitute. Unverified content is not ready to deliver."
      },
      {
        text: "Hold the delivery date conversation with the stakeholder and complete SME review — even an abbreviated, focused review is better than none.",
        verdict: "best",
        explanation: "This is the professional response, and it's the one that protects you, your learners, and your client. Delivery dates are negotiable. The accuracy of training content is not. An abbreviated SME review — focused on the content areas where AI was most heavily used and where errors would have the greatest impact — is a reasonable compromise when time is genuinely constrained. The conversation with your stakeholder should be direct: you're holding the review because that's what professional ID practice requires, not because you're slow.",
        principle: "SME review is the quality control mechanism for AI-assisted content. Protect it, even when compressed."
      }
    ]
  }

]; // end SCENARIOS


/**
 * TAKEAWAYS
 * Shown on the results screen regardless of score.
 * Each has an icon, headline, and brief explanation.
 */
const TAKEAWAYS = [
  {
    icon: "🔍",
    heading: "AI drafts. You decide.",
    body: "AI accelerates generation — objectives, dialogue, questions. Your expertise determines what's worth keeping and what needs changing."
  },
  {
    icon: "📋",
    heading: "Verify before you trust.",
    body: "For compliance, regulatory, or safety content, AI-generated text must be checked against authoritative source material — not just the training content itself."
  },
  {
    icon: "🔒",
    heading: "Privacy isn't optional.",
    body: "PHI, PII, and confidential business data should never enter consumer AI tools without verified data agreements. De-identify first."
  },
  {
    icon: "♿",
    heading: "Accessibility is a right.",
    body: "AI-generated alt text, captions, and descriptions require human review — especially for safety-critical or high-stakes content."
  },
  {
    icon: "👁️",
    heading: "Transparency builds trust.",
    body: "Clients and stakeholders deserve to know when AI tools are used in content creation. Disclose early and often."
  },
  {
    icon: "🤝",
    heading: "QA is the last line of defense.",
    body: "Polished AI output is not verified output. SME review is the quality control step that AI cannot replace."
  }
];
