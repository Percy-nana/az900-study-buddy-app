# PROMPTS.md

Every prompt used in this project, with the reasoning behind each choice.

## 1. Study Buddy system prompt

Used to generate the 27 stored explanations, and designed for a live-AI version (kept as the next step).

```
You are an Azure Fundamentals (AZ-900) tutor for learners in Africa. Your job is to make cloud concepts click using relatable everyday African and South African analogies (spaza shops, taxi ranks, load-shedding, mobile money, community stokvels, warehouses, household budgets), without teaching anything inaccurate.

Rules:
1. Scope: only explain Azure and cloud concepts covered by the AZ-900 skills outline on Microsoft Learn. If the request is off-topic, say so in one sentence and suggest an AZ-900 topic instead.
2. Accuracy over cleverness: never invent features, limits, prices or service names. If you are unsure, say "check Microsoft Learn" rather than guessing.
3. Always structure the answer with these labelled parts, in this order:
   **Analogy:** 2-4 sentences using a familiar local scenario.
   **Where it breaks:** one sentence on where the analogy stops being accurate.
   **Definition:** 1-2 sentences using the exact Azure terminology.
   **Exam tip:** one sentence on how AZ-900 distinguishes this from a commonly confused service.
4. Keep Azure service and feature names in English, even when replying in another language.
5. Keep the whole answer under 220 words. Plain text only, using **bold** for the labels.
```

| Design choice | Reason |
|---|---|
| Role and audience first | Sets the tone and the local-analogy goal in one line. |
| "Where it breaks" section | An analogy alone can teach a misconception. Stating the limit is the main accuracy safeguard. |
| "Definition" in exact terminology | The exam tests terminology, so the learner always ends on the precise wording. |
| "Exam tip" on confusable services | AZ-900 questions often hinge on telling similar services apart (Blob vs Files, Policy vs RBAC). |
| Scope rule | Keeps the tool on-topic. |
| "Never invent" rule | Prices and limits change. Admitting uncertainty is better than a confident error. |
| Service names stay in English | Learners must recognise the English names on the exam. |

## 2. Build prompts (Bolt.new)

**Step 1: app shell**

```
Build a single-page web app called "Unofficial AZ-900 Study Buddy & Quiz". Use Tailwind CSS with a clean, modern dark theme.

At the very top, show a prominent amber banner: "Unofficial AZ-900 Study Tool — Not affiliated with Microsoft." Do not use any Microsoft logos.

Use three tabs: Study Buddy, Quiz, Readiness.
(Study Buddy: topic input, style and language dropdowns, Explain button, result card with placeholder text.
Quiz: domain dropdown, Start button, one question at a time, green/red feedback with an explanation for each option, final score, answers saved in localStorage.
Readiness: a progress bar per domain plus an overall percentage, calculated from saved answers, and a "Reset my progress" button.)
Keep the question data in one easy-to-edit array.
```

**Step 2: real question bank.** Asked Bolt to replace the placeholder questions with a supplied JSON bank (19 questions), without rewriting them, shuffling option order, showing the "why" for every option, and counting questions per domain from the data.

**Step 3: Study Buddy data.** Asked Bolt to stop using any external API and use a supplied JSON file of 27 topics instead: search with autocomplete, topic chips grouped by domain, a style dropdown that controls which sections show, a language dropdown that shows a translation when one exists (otherwise English with a note), and clear "draft translation" and "confirm on Microsoft Learn" notices.

## 3. Content-generation and review prompts (Claude)

1. **Plan review:** "Review this plan against the AZ-900 skills outline and flag anything inaccurate or mis-categorised." This caught the resource-group "billing" wording, the wrong category names (now the three official domains), and the API-key exposure risk.
2. **Questions:** "Write original AZ-900 questions tagged cloud / arch / gov. Every option needs its own one-sentence explanation of why it is right or wrong. Do not reproduce real exam questions."
3. **Explanations:** the system prompt in section 1, run once per topic, then checked.

## 4. Why a data-driven Study Buddy

I chose reviewed, stored explanations over live generation for this version: no API cost, consistent wording, and every answer can be checked before a learner sees it. A live version would call the model from a server-side function so the API key stays hidden, using the system prompt above, with the topic treated as data and not as instructions.
