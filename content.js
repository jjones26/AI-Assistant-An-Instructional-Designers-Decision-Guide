/**
 * content.js
 * AI Assistant: An Instructional Designer's Decision Guide
 *
 * All module pages defined as structured data.
 * Each page has a type that determines how app.js renders it:
 *
 *   "cover"       — Title page with module overview
 *   "objectives"  — Learning objectives list
 *   "content"     — Information + callouts + optional scenario
 *   "question"    — Single inline question with feedback
 *   "assessment"  — Final multi-question knowledge check
 *   "results"     — Computed results and takeaways
 *
 * Questions have a `correct` index and per-choice `feedback`.
 */

const PAGES = [

  // ──────────────────────────────────────────────────────────
  // PAGE 1 — Cover
  // ──────────────────────────────────────────────────────────
  {
    id: "cover",
    navLabel: "Introduction",
    type: "cover",
    eyebrow: "Interactive Learning Module",
    title: "AI Assistant: An Instructional Designer's Decision Guide",
    description: "Artificial intelligence tools are reshaping how instructional designers work — accelerating drafts, generating ideas, and reducing time on routine tasks. But faster isn't always better, and more isn't always more. This module helps you build the judgment to know when AI helps, when it hurts, and when it puts learners at risk.",
    meta: [
      { icon: "clock", text: "~15 minutes" },
      { icon: "pages", text: "12 pages" },
      { icon: "quiz", text: "5 knowledge checks + final quiz" }
    ],
    audienceLabel: "Who this is for",
    audience: "Instructional designers and learning professionals who use or are considering using AI tools in their design and development workflow."
  },

  // ──────────────────────────────────────────────────────────
  // PAGE 2 — Objectives
  // ──────────────────────────────────────────────────────────
  {
    id: "objectives",
    navLabel: "Learning Objectives",
    type: "objectives",
    title: "What you'll be able to do",
    subtitle: "By the end of this module, you should be able to:",
    objectives: [
      "Identify appropriate uses of AI throughout the instructional design process.",
      "Recognize limitations and risks associated with AI-generated content.",
      "Apply best practices for incorporating AI ethically and effectively."
    ]
  },

  // ──────────────────────────────────────────────────────────
  // PAGE 3 — AI in the ID Process (content + question)
  // ──────────────────────────────────────────────────────────
  {
    id: "ai-in-id",
    navLabel: "AI in the ID Process",
    type: "content",
    sections: [
      {
        eyebrow: "Where We Are",
        heading: "AI has entered the ID workflow",
        body: `<p>AI tools are now capable of generating learning objectives, drafting scenario dialogue, writing quiz questions, producing image assets, and even suggesting course structures. For time-pressed designers, the appeal is obvious.</p>
               <p>But AI tools are not instructional designers. They don't understand your audience, your client's organizational culture, your performance gap, or your SME's nuanced domain knowledge. They generate plausible-sounding output — and plausible is not the same as right.</p>`
      },
      {
        type: "callout",
        text: "<strong>The core principle:</strong> AI is a drafting accelerator, not a design expert. Your professional judgment is what makes AI-assisted work worth using."
      },
      {
        heading: "Where AI adds genuine value",
        body: `<p>Used well, AI can meaningfully reduce time on lower-judgment tasks, freeing you to spend more time on the work that actually requires an ID professional.</p>`,
        list: [
          "<strong>Brainstorming:</strong> Generating a wide range of scenario ideas, topic angles, or activity formats quickly.",
          "<strong>First drafts:</strong> Getting raw material on the page for objectives, dialogue, or quiz items — even if heavy revision follows.",
          "<strong>Variation generation:</strong> Creating distractor options, alternative phrasings, or scenario branches.",
          "<strong>Formatting and structure:</strong> Turning a wall of SME notes into organized chunks."
        ]
      }
    ],
    question: {
      id: "q1",
      prompt: "An instructional designer uses AI to generate a complete set of learning objectives for a new compliance module and sends them to the client without review. What's the most significant risk?",
      choices: [
        "The objectives might use slightly different wording than the client prefers.",
        "The objectives may sound credible but be misaligned with the actual performance gap, audience, and organizational context.",
        "The client might notice they were AI-generated and lose confidence.",
        "AI-generated objectives tend to be too long for most compliance modules."
      ],
      correct: 1,
      feedback: [
        "Wording preferences are easy to fix in revision. The deeper risk is structural, not stylistic.",
        "Correct. AI has no knowledge of your specific audience, their existing gaps, what the organization actually needs learners to do differently, or what will satisfy the compliance requirement. It generates objectives that sound reasonable — but reasonable and right are different things. Every AI-generated objective needs to be evaluated against real design criteria before it goes anywhere.",
        "Transparency matters, but it's a secondary concern here. The primary risk is that the objectives may simply be wrong for the situation.",
        "Length is a formatting issue, not a substantive risk. The problem isn't how many words — it's whether the objectives reflect what this audience actually needs."
      ]
    }
  },

  // ──────────────────────────────────────────────────────────
  // PAGE 4 — Writing with AI (content + scenario + question)
  // ──────────────────────────────────────────────────────────
  {
    id: "writing-with-ai",
    navLabel: "Writing with AI",
    type: "content",
    sections: [
      {
        eyebrow: "Content Development",
        heading: "Drafting objectives, dialogue, and scenarios",
        body: `<p>Writing is where most instructional designers first reach for AI — and for good reason. Staring at a blank doc is time-consuming, and AI can break the paralysis fast.</p>
               <p>The key is understanding what you're actually getting. AI outputs reflect the average of what exists in its training data — which means it tends toward the generic, the expected, and the risk-averse. That's fine for a first draft. It's not fine as a final product.</p>`
      },
      {
        type: "callout",
        variant: "tip",
        text: "<strong>Practical tip:</strong> Give AI richer context and you get better raw material. Instead of \"write learning objectives for a sales training,\" try \"write learning objectives for a B2B software sales rep who is six months into the role, has completed product training, and needs to improve discovery conversations with technical buyers.\""
      },
      {
        heading: "Scenario dialogue",
        body: `<p>Scenario dialogue is one of AI's stronger use cases in ID — it can generate a range of character voices and conflict setups quickly. But AI dialogue has recognizable failure modes: characters who speak in exposition, conflicts that feel contrived, and emotional beats that don't ring true.</p>
               <p>Read any AI-generated dialogue aloud before using it. If it sounds like someone explaining a situation rather than living in it, rewrite it.</p>`
      },
      {
        type: "scenario",
        label: "Scenario",
        text: `<p>Priya is designing a branching scenario for a module on difficult performance conversations. She needs a scene where a manager avoids giving direct feedback to an underperforming employee. She asks AI to write the scene and receives a 200-word exchange in about 10 seconds.</p>
               <p>The dialogue is grammatically clean and hits the instructional beat, but the manager character sounds like they're narrating their own avoidance: "I just don't want to make things awkward, so I'll change the subject." No real manager talks like that.</p>`
      }
    ],
    question: {
      id: "q2",
      prompt: "What should Priya do with the AI-generated dialogue?",
      choices: [
        "Use it as written — it hits the instructional goal and dialogue quality is subjective.",
        "Discard it and write the scene from scratch.",
        "Use it as a structural starting point, rewrite the manager's lines so the avoidance is shown through behavior rather than stated explicitly, and read the revised version aloud to check.",
        "Ask AI to revise it until it sounds more natural, then use the result without further review."
      ],
      correct: 2,
      feedback: [
        "Hitting the instructional goal is necessary but not sufficient. Dialogue that feels inauthentic teaches learners to recognize a fake scenario, not a real situation. They disengage.",
        "Discarding it entirely throws away time savings without a clear quality reason. The structure AI provided can still be useful — the problem is craft, not concept.",
        "Right. The structural beat is there — manager avoiding feedback. The problem is execution: showing avoidance through realistic behavior is more effective than having a character announce their avoidance. Reading aloud is the single best way to catch dialogue that reads fine on paper but sounds wrong spoken. This is exactly how to work with AI on dialogue.",
        "Asking AI to fix AI output creates a loop. If the underlying issue is that AI tends to have characters explain their internal states rather than demonstrate them through behavior, more AI passes won't fix that. You need a human reader with craft judgment in the loop."
      ]
    }
  },

  // ──────────────────────────────────────────────────────────
  // PAGE 5 — Assessments & Accuracy (content + question)
  // ──────────────────────────────────────────────────────────
  {
    id: "assessments",
    navLabel: "Assessments & Accuracy",
    type: "content",
    sections: [
      {
        eyebrow: "Knowledge Checks & Quizzes",
        heading: "The accuracy problem with AI-generated assessment items",
        body: `<p>AI is good at generating quiz questions that look right. Subject-verb agreement is clean, the format follows conventions, and the distractors sound like plausible wrong answers. The problem is that AI can be confidently wrong about factual details — especially in regulatory, clinical, legal, or technical domains.</p>
               <p>A question with a subtly incorrect answer, or a distractor that is actually correct, teaches learners the wrong thing. For compliance training especially, that has real consequences.</p>`
      },
      {
        type: "callout",
        variant: "warn",
        text: "<strong>Watch for this:</strong> AI hallucination — where a model generates specific-sounding facts that are simply fabricated — is particularly dangerous in assessment items. A question about OSHA recordkeeping thresholds or HIPAA notification timelines may look authoritative while citing the wrong regulation entirely."
      },
      {
        heading: "A responsible workflow for AI-assisted assessment",
        list: [
          "<strong>Generate more than you need.</strong> Ask for 10–12 items when you need 5. Evaluate each against your content and objectives before selecting.",
          "<strong>Verify against primary sources.</strong> For any regulatory, legal, or technical claim in a question or answer choice, verify against the actual source document — not just your course content.",
          "<strong>Don't let AI verify itself.</strong> Asking AI to check its own output is circular. The model that generated the error will often generate a confident explanation of why it's correct.",
          "<strong>SME review is a checkpoint, not your QA.</strong> Your job is to deliver verified content for SME review — not to hand raw AI output to the SME and let them find the errors."
        ]
      }
    ],
    question: {
      id: "q3",
      prompt: "You've used AI to generate five knowledge check questions for a module on clinical documentation requirements. Before sending to the SME for review, what's the most important step?",
      choices: [
        "Run a readability check to ensure the questions are at the right level.",
        "Verify each question and answer option against the actual clinical documentation standards — not just the course content.",
        "Ask AI to review the questions for accuracy.",
        "Send them as-is — the SME will catch any errors."
      ],
      correct: 1,
      feedback: [
        "Readability matters, but it's a style check. The more urgent issue is factual accuracy — a readable question with a wrong answer is worse than a slightly dense question with a right answer.",
        "Correct. For clinical or regulatory content, AI-generated questions must be checked against authoritative source material, not just compared to your course content. Your course content may itself have gaps or imprecisions — the source document is the ground truth. Do this before the SME sees the items.",
        "This is the circular verification problem. AI generated the questions; it will almost always agree that they're correct. Its confidence in its own output is not evidence of accuracy.",
        "This puts an unfair burden on the SME and risks your credibility. If the SME finds multiple errors in your AI-generated items, it signals that your QA process broke down. Your job is to deliver materials that are ready for expert review — not materials that still need error-finding."
      ]
    }
  },

  // ──────────────────────────────────────────────────────────
  // PAGE 6 — Visual Assets (content + question)
  // ──────────────────────────────────────────────────────────
  {
    id: "visual-assets",
    navLabel: "Visual Assets",
    type: "content",
    sections: [
      {
        eyebrow: "AI Image Generation",
        heading: "Using AI for eLearning visuals",
        body: `<p>AI image generation has become a genuinely useful tool for instructional designers working on tight budgets or timelines. Getting workplace-appropriate, diverse, situation-specific imagery without a stock subscription or a photo shoot is a real advantage.</p>
               <p>But AI-generated images have consistent quality issues that require deliberate review — not a quick glance.</p>`
      },
      {
        heading: "What to review, and why",
        list: [
          "<strong>Anatomy.</strong> Hands are the most common failure point — extra fingers, fused digits, unnatural positioning. Always check hands closely.",
          "<strong>Text in images.</strong> AI-generated text within images (signs, labels, screens) is almost always garbled or nonsensical.",
          "<strong>Background artifacts.</strong> Strange objects appearing in backgrounds, impossible architecture, items that fade out or repeat unnaturally.",
          "<strong>Representation.</strong> AI image models can reflect and amplify bias — defaulting to certain demographics for leadership roles, others for service roles. Review with intention.",
          "<strong>Brand alignment.</strong> AI can't know your client's visual standards. Confirm generated imagery fits the context before presenting it."
        ]
      },
      {
        type: "callout",
        text: "<strong>On transparency:</strong> Clients have a right to know when their training contains AI-generated imagery. Many organizations have policies on this. Disclose AI use early in the project — don't wait for them to ask."
      }
    ],
    question: {
      id: "q4",
      prompt: "A designer generates 40 AI images for a workplace safety course and quickly scans them before adding them to the course. Several images pass the scan and are added. A learner later points out that a safety sign in one image reads nonsense text. What process failure does this represent?",
      choices: [
        "The designer should have used stock photography instead.",
        "AI image generation is too unreliable for eLearning and should never be used.",
        "The scan wasn't systematic — specific known failure points (text in images, hands, backgrounds) require deliberate checking, not a general visual scan.",
        "The learner shouldn't have been looking at background details."
      ],
      correct: 2,
      feedback: [
        "Stock photography is a reasonable alternative, but the issue here isn't the tool choice — it's the review process. The same problem could occur with stock if images weren't reviewed carefully.",
        "AI image generation has real quality risks but is a legitimate tool with appropriate review. The failure here was the review process, not the tool itself.",
        "Correct. A 'quick scan' catches obvious problems but misses known failure patterns that require you to specifically look for them. Text in images, anatomy (especially hands), and background coherence each need deliberate inspection — not incidental notice. A systematic checklist approach prevents this.",
        "Learners engage with all visible content. A safety sign with garbled text undermines course credibility and, in a safety context, could cause real confusion."
      ]
    }
  },

  // ──────────────────────────────────────────────────────────
  // PAGE 7 — Accessibility (content + question)
  // ──────────────────────────────────────────────────────────
  {
    id: "accessibility",
    navLabel: "Accessibility",
    type: "content",
    sections: [
      {
        eyebrow: "Accessible Design",
        heading: "AI and accessibility: a tool, not a solution",
        body: `<p>AI can assist with accessibility tasks — generating alt text descriptions, suggesting caption improvements, or flagging potential contrast issues. At scale, this assistance matters: reviewing 80 images by hand is slow, and AI can produce a reasonable first-pass description for many of them.</p>
               <p>The critical word is "first pass." AI-generated accessibility content requires human review, particularly where the instructional stakes are high.</p>`
      },
      {
        heading: "The stakes aren't equal across all content",
        body: `<p>A decorative image with generic alt text is a minor issue. An image of an evacuation route, an equipment diagram, or a step in a clinical procedure with wrong or missing alt text is a safety issue. The review effort you apply should reflect that difference.</p>
               <p>A practical approach: use AI to generate alt text for all images, then review thoroughly for any image where the described content is directly instructional — procedures, safety steps, data visualizations, diagrams. Spot-check the rest.</p>`
      },
      {
        type: "callout",
        variant: "warn",
        text: "<strong>Don't do this:</strong> Assuming learners who use screen readers are a small minority and therefore accessibility quality doesn't matter as much. Accessibility is a legal requirement under ADA and Section 508 — and more importantly, it's the right thing to do. Learners who rely on assistive technology have exactly the same right to complete, accurate content."
      }
    ],
    question: {
      id: "q5",
      prompt: "You're producing a module on fire evacuation procedures. You use AI to generate alt text for 65 images and don't have time to review all of them before the deadline. What's the most responsible approach?",
      choices: [
        "Deliver with all AI-generated alt text and add a note that it may be incomplete.",
        "Remove all images and describe them in the body text instead.",
        "Prioritize thorough review of images showing evacuation routes, exits, and safety equipment — where alt text errors have direct safety implications — and spot-check the others.",
        "Request a deadline extension to review all 65 images individually."
      ],
      correct: 2,
      feedback: [
        "A disclaimer doesn't make the content accessible or legally compliant. It signals that quality control was skipped.",
        "Removing images eliminates the accessibility problem but also removes instructional value that visual content often uniquely provides. This is a last resort, not a first response.",
        "Correct. This is a risk-tiered approach: your review time goes where the consequence of an error is highest. Evacuation routes, emergency equipment, and procedural steps have real safety implications if a screen reader user gets wrong or incomplete information. A learner following incorrect alt text on an exit route diagram is not a minor UX problem. Prioritize accordingly.",
        "Requesting an extension is a legitimate option if the content is critical enough — and for safety content, it may be the right call. But if the deadline is fixed, a tiered review approach lets you manage it without abandoning quality control entirely."
      ]
    }
  },

  // ──────────────────────────────────────────────────────────
  // PAGE 8 — Data Privacy (content + question)
  // ──────────────────────────────────────────────────────────
  {
    id: "data-privacy",
    navLabel: "Data Privacy",
    type: "content",
    sections: [
      {
        eyebrow: "Privacy & Confidentiality",
        heading: "What not to put into AI tools",
        body: `<p>Every time you paste content into an AI tool, you're sending that content to a third party. Consumer-tier AI tools — the free or standard versions of most commercial chatbots — typically use your inputs to train or improve their models, and they do not sign Business Associate Agreements (BAAs) or Data Processing Agreements (DPAs) with you.</p>
               <p>This has real implications for instructional designers working with sensitive source material.</p>`
      },
      {
        heading: "Categories that should never go into consumer AI tools",
        list: [
          "<strong>Protected Health Information (PHI)</strong> — patient names, records, diagnoses, treatment notes. This is a HIPAA violation.",
          "<strong>Personally Identifiable Information (PII)</strong> — employee names, performance records, HR case details.",
          "<strong>Confidential business information</strong> — proprietary processes, unreleased product details, strategic plans.",
          "<strong>Client intellectual property</strong> — unpublished training materials, internal policies, trade secrets."
        ]
      },
      {
        type: "callout",
        variant: "tip",
        text: "<strong>The solution for PHI and PII:</strong> De-identify first. Replace names, dates, locations, and identifying details with fictional equivalents before pasting into any AI tool. The instructional value of the case stays intact; the legal and ethical risk is removed."
      },
      {
        body: `<p>If your organization uses an enterprise AI deployment, verify with your IT department whether a BAA or DPA is in place before inputting sensitive content — and document that you checked. Don't assume enterprise = compliant.</p>`
      }
    ],
    question: {
      id: "q6",
      prompt: "A healthcare client sends you three real patient case studies — including names, diagnoses, and treatment notes — to use as the basis for clinical scenario development. You want to use AI to help adapt them. What do you do?",
      choices: [
        "Paste them directly into your AI tool since you're only using them internally for design work.",
        "De-identify the case studies first — replace all PHI with fictional equivalents — then use AI to help shape the scenarios.",
        "Ask your AI tool if it stores inputs, and proceed if it says it doesn't.",
        "Use the case studies only in the final course, not in your AI drafting process."
      ],
      correct: 1,
      feedback: [
        "The intended use doesn't change the legal reality. Pasting PHI into a consumer AI tool is a HIPAA violation regardless of what you plan to do with the output. \"Internal use\" is not a carve-out.",
        "Correct. De-identification is the right solution — it's not a workaround, it's the designed approach. Once patient-identifiable information is replaced with fictional equivalents, the case has no PHI, and you can work with AI freely. You don't lose the clinical instructional value; you just remove the legal and ethical exposure.",
        "An AI tool's disclosure about data storage cannot be relied upon for compliance purposes. Consumer tools may have privacy policies, but those policies are not BAAs — they don't satisfy HIPAA requirements. Don't make legal compliance decisions based on a chatbot's self-report.",
        "The issue isn't just where the final content appears — it's what you put into the AI tool during development. Even if the final course never shows PHI, inputting it during drafting is still a violation."
      ]
    }
  },

  // ──────────────────────────────────────────────────────────
  // PAGE 9 — Human Review (content + question)
  // ──────────────────────────────────────────────────────────
  {
    id: "human-review",
    navLabel: "Human Review & QA",
    type: "content",
    sections: [
      {
        eyebrow: "Quality Assurance",
        heading: "Why AI makes QA more important, not less",
        body: `<p>There's a counterintuitive dynamic with AI-assisted content: because AI produces polished, well-organized output quickly, it can make content feel more finished than it actually is. A draft that reads smoothly is psychologically harder to scrutinize than one that obviously needs work.</p>
               <p>This is exactly why QA discipline matters more when AI is involved — not less.</p>`
      },
      {
        heading: "The SME review is not optional",
        body: `<p>Subject matter expert review exists to catch what instructional designers can't catch: factual errors, outdated information, nuance that doesn't transfer from a general description to a specific domain context. AI-generated content introduces more opportunities for these errors, not fewer.</p>
               <p>A colleague saying "it looks good" is not SME review. A deadline is not a reason to skip it. The question to ask yourself is: if a learner acts on wrong information from this course, what happens? The answer tells you how serious the QA obligation is.</p>`
      },
      {
        type: "callout",
        variant: "warn",
        text: "<strong>Common rationalization to resist:</strong> \"AI output is so good now that SME review is a formality.\" AI output is increasingly fluent — but fluency is not accuracy. A model that has processed millions of documents about clinical procedures can generate a confident, well-written description of the wrong procedure. Fluent wrong is worse than obviously rough right."
      },
      {
        heading: "A practical QA checklist for AI-assisted ID work",
        list: [
          "Verify all factual claims against primary or authoritative sources.",
          "Confirm learning objectives align with the actual performance gap — not just what sounds relevant.",
          "Read all dialogue aloud before finalizing.",
          "Check every image systematically for AI artifacts and representation issues.",
          "Confirm no PHI or confidential content was used in AI prompts.",
          "Complete SME review before delivery — no exceptions for deadline pressure."
        ]
      }
    ],
    question: {
      id: "q7",
      prompt: "Your team used AI heavily throughout a new module — brainstorming, objectives, dialogue, quiz items. A colleague suggests skipping the SME review to hit the delivery date, saying the content looks polished and thorough. What's the right response?",
      choices: [
        "Agree — if the content looks correct and the team is confident, SME review is a formality.",
        "Skip SME review but add a disclaimer that the content was AI-assisted.",
        "Conduct the review — even an abbreviated, focused review on the highest-risk content is better than none. Have the deadline conversation with the stakeholder.",
        "Deliver on time and schedule a post-delivery review for corrections."
      ],
      correct: 2,
      feedback: [
        "\"Looking correct\" and \"being correct\" are different, especially for AI-assisted content. The team's confidence in AI output is not equivalent to a domain expert's verification. Fluency is not accuracy.",
        "A disclaimer shifts responsibility to learners in a way that isn't fair or professional. It also signals that the design process broke down. Disclaimers don't make inaccurate content acceptable.",
        "Correct. This is the professional response on both counts. The SME review is the quality control mechanism — and the delivery date is a constraint to negotiate, not a reason to remove quality control. Having a direct conversation with a stakeholder about needing one more day for review is a manageable professional situation. Delivering a course with unreviewed AI-generated content and having a learner act on a factual error is not.",
        "Post-delivery corrections mean learners have already encountered — and possibly acted on — inaccurate content. In compliance, safety, or clinical training, that's not recoverable with a patch."
      ]
    }
  },

  // ──────────────────────────────────────────────────────────
  // PAGE 10 — Ethics & Transparency (content — no question)
  // ──────────────────────────────────────────────────────────
  {
    id: "ethics",
    navLabel: "Ethics & Transparency",
    type: "content",
    sections: [
      {
        eyebrow: "Professional Ethics",
        heading: "The ethics of AI-assisted instructional design",
        body: `<p>Using AI tools in your work is not an ethical issue by itself. Hiding it from clients who have a right to know is. Delivering unverified content that affects learner safety or compliance is. Using tools that expose learner data to unauthorized third parties is.</p>
               <p>The ethical questions in AI-assisted ID work aren't about whether to use AI — they're about honesty, accountability, and who bears the consequences when something goes wrong.</p>`
      },
      {
        heading: "Disclose early, not defensively",
        body: `<p>Most clients are not opposed to AI use — many expect it. What erodes trust is discovering that you used tools or approaches they weren't told about. If your organization or client has AI policies, know them before you start. If they don't, establishing clear expectations at the project kickoff protects everyone.</p>
               <p>The same applies to visual content. Clients making decisions about their brand presentation have a reasonable interest in knowing that images are AI-generated rather than photographed. Tell them.</p>`
      },
      {
        type: "callout",
        variant: "tip",
        text: "<strong>A good default:</strong> Document your AI use the same way you would document any significant tool or vendor choice in a project — briefly, clearly, and as a matter of course. Not as a confession, but as part of professional practice."
      },
      {
        heading: "Your name is on the work",
        body: `<p>When a module ships, you are accountable for what's in it — not the AI tool that helped draft it. If a quiz question teaches the wrong regulation, that's your name on the course. If a scenario dialogue misrepresents a protected class in a way that training reviewers flag as problematic, that's your project.</p>
               <p>AI tools don't have professional reputations. You do. That accountability is why professional judgment can't be outsourced.</p>`
      }
    ]
  },

  // ──────────────────────────────────────────────────────────
  // PAGE 11 — Final Assessment
  // ──────────────────────────────────────────────────────────
  {
    id: "assessment",
    navLabel: "Knowledge Check",
    type: "assessment",
    title: "Knowledge Check",
    subtitle: "Answer all five questions, then review your results.",
    questions: [
      {
        id: "aq1",
        prompt: "Which of the following is the most appropriate use of AI in the instructional design process?",
        choices: [
          "Generating final learning objectives and using them as written.",
          "Generating a range of scenario ideas that you then evaluate, filter, and adapt.",
          "Writing assessment questions for compliance training and submitting them directly to the client.",
          "Creating alt text for safety-procedure images and using it without review."
        ],
        correct: 1,
        feedback: [
          "AI can draft objectives, but they require evaluation against audience, context, performance gap, and design criteria before they're ready to use. \"As written\" skips the step that makes them useful.",
          "Correct. Using AI to generate options you then evaluate, filter, and adapt is the right workflow across virtually all ID tasks. AI provides quantity and speed; your judgment provides quality and alignment.",
          "Compliance content requires verification against authoritative source material before it goes anywhere. Raw AI output to a client skips that step entirely.",
          "Alt text for safety-procedure images requires human review — errors here can have real safety consequences for screen reader users."
        ]
      },
      {
        id: "aq2",
        prompt: "What is the primary risk of using consumer-tier AI tools when working with real patient case studies provided by a healthcare client?",
        choices: [
          "The AI may not understand clinical terminology accurately.",
          "Pasting patient information into consumer AI tools likely violates HIPAA and exposes PHI to unauthorized third parties.",
          "The resulting scenarios may feel generic rather than realistic.",
          "The client may prefer that designers work manually with sensitive materials."
        ],
        correct: 1,
        feedback: [
          "Clinical terminology accuracy is a concern for the quality of the output — but it's not the primary risk. The regulatory issue is more serious.",
          "Correct. Consumer AI tools are not HIPAA-covered entities and do not have BAAs in place. Pasting PHI into these tools — regardless of intended use — is a violation. De-identification is the required step before AI involvement.",
          "Scenario quality is a real concern but a secondary one. The legal and ethical exposure comes first.",
          "Client preference matters, but the more fundamental issue is legal compliance. It's not just a preference question."
        ]
      },
      {
        id: "aq3",
        prompt: "An instructional designer asks AI to review a set of quiz questions it just generated, to verify their accuracy. What's the core problem with this approach?",
        choices: [
          "AI review takes too long compared to manual review.",
          "AI tools may not have access to the course content.",
          "The same model that generated the questions will evaluate them — if the original information was wrong, the evaluation will likely confirm it as correct.",
          "AI can only review multiple-choice formats, not other question types."
        ],
        correct: 2,
        feedback: [
          "The time issue isn't the core problem. The verification method is fundamentally flawed regardless of how fast it is.",
          "Context access is an operational limitation, but it doesn't address the deeper problem of circular verification.",
          "Correct. This is the circular verification problem. AI models generate confident-sounding output regardless of accuracy — asking the same model to evaluate its own output won't surface errors caused by the model's own knowledge limitations or hallucinations. Independent verification against primary sources is required.",
          "This is not accurate — AI can review many question formats. The problem is methodological, not format-based."
        ]
      },
      {
        id: "aq4",
        prompt: "Why does the quality of AI-assisted eLearning content still require the same SME review process as non-AI content?",
        choices: [
          "Because clients expect SME review as a deliverable, regardless of content quality.",
          "Because AI output is fluent and well-organized, which can make it harder to spot errors — and it has no mechanism to know if its information is accurate for your specific context.",
          "Because AI tools used in ID work are not yet reliable enough to produce readable content.",
          "Because SME review is required for legal compliance in most industries."
        ],
        correct: 1,
        feedback: [
          "Client expectations matter, but they're not the substantive reason. The issue is about content quality and accuracy, not process optics.",
          "Correct. Fluency is the trap. AI produces smooth, organized, confident-sounding text — and that makes it psychologically harder to scrutinize. But fluency is not accuracy. SME review exists to catch what AI can't: factual errors, outdated information, contextual misalignment, and domain nuance. AI use increases the need for this check, not decreases it.",
          "Modern AI tools produce very readable content — readability is not the concern. Accuracy and alignment are.",
          "SME review may be contractually required in some contexts, but the fundamental reason is content quality, not legal mandate."
        ]
      },
      {
        id: "aq5",
        prompt: "Which statement best describes the ethical obligation an instructional designer has when using AI tools in client work?",
        choices: [
          "AI use should be disclosed only if the client specifically asks about it.",
          "AI tools are standard in the industry now, so disclosure is generally not expected.",
          "Designers should disclose AI use proactively, verify content accuracy before delivery, protect client data, and take professional accountability for the final work.",
          "Ethical obligations are met as long as AI-generated content passes a quality review."
        ],
        correct: 2,
        feedback: [
          "Reactive disclosure — only when asked — puts clients in a position where they can't make informed decisions about their own project. Proactive transparency is the professional standard.",
          "Industry normalization doesn't eliminate disclosure obligations. Clients have policies, preferences, and reasonable interests in knowing how their work was produced.",
          "Correct. This captures the full picture: transparency with clients, accuracy verification before delivery, data protection throughout the process, and personal accountability for the finished product. None of these are optional — and quality review alone doesn't satisfy all of them.",
          "Quality review addresses accuracy but not transparency, data protection, or the accountability question. All of these are part of the ethical obligation."
        ]
      }
    ]
  },

  // ──────────────────────────────────────────────────────────
  // PAGE 12 — Results (computed by app.js)
  // ──────────────────────────────────────────────────────────
  {
    id: "results",
    navLabel: "Results",
    type: "results",
    takeaways: [
      {
        icon: "✓",
        heading: "AI drafts. You decide.",
        body: "AI accelerates the generation of objectives, dialogue, quiz items, and images. Your expertise and professional judgment determine what's worth using — and what needs to change."
      },
      {
        icon: "⚠",
        heading: "Fluency is not accuracy.",
        body: "AI produces confident, well-organized output even when the underlying information is wrong. SME review and primary-source verification remain essential for any content where accuracy matters."
      },
      {
        icon: "🔒",
        heading: "Protect sensitive data.",
        body: "PHI, PII, and confidential business information should never be pasted into consumer AI tools. De-identify before you draft."
      },
      {
        icon: "♿",
        heading: "Accessibility requires human judgment.",
        body: "AI-generated alt text, captions, and descriptions need human review — especially for safety-critical or highly instructional content where errors have real consequences."
      },
      {
        icon: "↗",
        heading: "Transparency builds trust.",
        body: "Clients and stakeholders deserve to know when AI is part of the production process. Disclose early, document clearly, and treat AI use as a standard project communication — not a confession."
      },
      {
        icon: "◎",
        heading: "You are accountable for the work.",
        body: "AI tools don't have professional reputations. You do. The quality, accuracy, and ethical integrity of the final product are yours to own — regardless of which tools helped build it."
      }
    ]
  }

]; // end PAGES
