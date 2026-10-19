import type { DomainCode } from '@/data/questions';

export interface AnswerRecord {
  questionId: string;
  domain: DomainCode;
  correct: boolean;
  timestamp: number;
}

const KEY = 'az900-quiz-answers';

export function loadAnswers(): AnswerRecord[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveAnswer(record: AnswerRecord): void {
  const all = loadAnswers();
  const filtered = all.filter((a) => a.questionId !== record.questionId);
  filtered.push(record);
  localStorage.setItem(KEY, JSON.stringify(filtered));
}

export function latestAnswerPerQuestion(): Map<string, AnswerRecord> {
  const map = new Map<string, AnswerRecord>();
  for (const a of loadAnswers()) {
    const existing = map.get(a.questionId);
    if (!existing || a.timestamp >= existing.timestamp) {
      map.set(a.questionId, a);
    }
  }
  return map;
}

export function resetAnswers(): void {
  localStorage.removeItem(KEY);
}
