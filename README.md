# AZ-900 Study Buddy & Quiz (Unofficial)

> **Unofficial community study tool. Not affiliated with, endorsed by, or sponsored by Microsoft.**
> Built for the #1MillionDevs Vibe Coding Hackathon: AZ-900 Exam Prep Edition.

**Live demo:** [ADD YOUR .bolt.host LINK]
**Pitch deck:** [ADD CANVA LINK]

## Why I built this

While preparing for AZ-900, the thing that confused me most was how **subscriptions, resource groups and resources fit together**, and where to apply permissions or budgets. I could memorise the definitions, but I could not picture the structure.

What finally made it click was thinking of a **resource group as a labelled storage box** where you keep all the related items for a specific project. Once I could picture the box, it was easier to see why you put permissions on the box instead of on every item inside it.

This tool is the one I wish I had: it explains concepts with everyday African analogies, then tests you straight away and shows *why* each answer is right or wrong.

## What it does

| Feature | Hackathon track | How it works |
|---|---|---|
| **Study Buddy** | Support | 27 AZ-900 topics. Each explanation has four parts: Analogy, Where it breaks, Definition, Exam tip. Choose a style (full, technical only, exam tips, beginner). Draft Kiswahili and isiZulu versions exist for three topics. |
| **Smart Quiz** | Practice & Assessment | 19 original questions, tagged by the three AZ-900 skills-outline domains. Every option, right or wrong, gets its own explanation. A "Questions I got wrong" mode re-quizzes only your misses. |
| **Readiness Dashboard** | Progress | Per-domain and overall accuracy calculated from your real answers (saved in your browser). |

## Design decisions

- **Analogies that don't mislead.** Every explanation has a "Where it breaks" line and ends with the exact Azure definition. An analogy alone can teach a wrong idea, so the limit is stated every time.
- **No live AI, no API cost.** The Study Buddy runs on a reviewed set of explanations stored as data, so it is free to run and the answers are consistent. The prompt for a live-AI version is documented in [PROMPTS.md](PROMPTS.md) and is the next step.
- **Honest readiness.** The dashboard says it is a rule of thumb. The real exam uses a scaled score (700 out of 1000 to pass), not a straight percentage.
- **Content integrity.** All questions and explanations are original, written from the public AZ-900 skills outline on Microsoft Learn. No real exam questions and no Microsoft logos.

## How I built it

Built with **Bolt.new** in prompt-driven steps (full prompts in [PROMPTS.md](PROMPTS.md)):

1. App shell: three tabs, unofficial banner, placeholder content.
2. Real question bank loaded from a JSON file (19 questions).
3. Study Buddy connected to a data file of 27 explanations.
4. Published from Bolt and pushed to GitHub.

I used Claude to draft the questions, explanations and prompts, and to review my first plan for accuracy problems (for example, a resource group is not a billing boundary, and categories must match the three official domains).

## Tech

- Front end generated with Bolt.new (Tailwind CSS)
- Content in editable data files (questions and explanations)
- Progress stored in the browser (`localStorage`), so nothing leaves the device

## Verification status

Content accuracy matters more than anything here. Before relying on any answer, check it against [Microsoft Learn](https://learn.microsoft.com/credentials/certifications/azure-fundamentals/).

- [ ] All 19 quiz explanations checked against Microsoft Learn
- [ ] All 27 Study Buddy topics checked against Microsoft Learn
- [ ] isiZulu and Kiswahili drafts reviewed by a native speaker

## Known limits and next steps

- The Study Buddy covers 27 topics only. Next step: a live AI explainer behind a server-side function (the API key must never be in the browser), using the prompt in PROMPTS.md.
- Progress is stored per browser and does not sync across devices. Next step: accounts and a database.
- 19 questions is a starter bank. Next step: grow to a larger bank per domain.
- The same structure could support other fundamentals exams by swapping the data files.

## Disclaimer

For study support only. May contain errors. Not an official Microsoft product or practice test.
