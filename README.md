# AI Assistant: An Instructional Designer's Decision Guide

An interactive branching scenario module for learning professionals exploring how to use AI effectively and responsibly in instructional design work.

## Overview

This portfolio piece simulates eight real workplace decision scenarios across the full instructional design process. Learners make choices, receive immediate expert feedback, and leave with a personalized results summary and key takeaways.

**Audience:** Instructional designers and learning professionals  
**Duration:** ~12 minutes  
**Format:** Branching scenario with immediate feedback  
**Delivery:** Static site — deployable on GitHub Pages with zero dependencies

## Learning Objectives

- Identify appropriate uses of AI throughout the instructional design process
- Recognize limitations and risks associated with AI-generated content
- Apply best practices for incorporating AI ethically and effectively

## Scenario Topics

1. Writing Learning Objectives
2. Brainstorming & Ideation
3. Drafting Scenario Dialogue
4. Creating Assessments & Knowledge Checks
5. Generating Visual Assets
6. Accessibility Considerations
7. Data Privacy & Confidentiality
8. Human Review & Quality Assurance

## Project Structure

```
ai-decision-guide/
├── index.html       # Structure and screen layout
├── styles.css       # Design system, animations, responsive styles
├── scenarios.js     # All scenario data, choices, feedback, takeaways
├── app.js           # Module logic, state management, screen transitions
└── README.md
```

## Deployment

This project requires no build step or dependencies.

1. Fork or clone this repository
2. Enable GitHub Pages (Settings → Pages → Deploy from branch → main / root)
3. Your module will be live at `https://yourusername.github.io/repository-name/`

Or serve locally:
```bash
# Python
python -m http.server 8000

# Node.js
npx serve .
```

## Design Notes

Built with vanilla HTML, CSS, and JavaScript — intentionally dependency-free for maximum portability and maintainability. The visual design uses a deep navy + electric teal palette with DM Serif Display / DM Sans typography to create a professional, distinctive aesthetic without relying on any UI framework.

The animated orbit graphic on the intro screen is the module's signature visual element — three concentric rings representing the human-AI collaboration dynamic (orbit, not replacement).

Accessibility features: keyboard navigation (A/B/C or 1/2/3 to select), `prefers-reduced-motion` support, ARIA live regions, skip link, visible focus states throughout.

## Created By

**Jake Jones** — Instructional Designer & Developer  
[jacobjones.dev](https://jacobjones.dev)
