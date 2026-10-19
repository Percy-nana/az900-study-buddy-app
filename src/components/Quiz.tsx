import { useMemo, useState } from 'react';
import { Brain, CheckCircle2, XCircle, RotateCcw, ArrowRight, Trophy } from 'lucide-react';
import {
  QUESTIONS,
  ALL_DOMAINS,
  DOMAIN_LABELS,
  type DomainCode,
  type Question,
  type QuestionOption,
} from '@/data/questions';
import { loadAnswers, saveAnswer, latestAnswerPerQuestion, type AnswerRecord } from '@/lib/storage';

type Filter = 'All domains' | 'Questions I got wrong' | DomainCode;

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'All domains', label: 'All domains' },
  ...ALL_DOMAINS.map((d) => ({ value: d as Filter, label: DOMAIN_LABELS[d] })),
  { value: 'Questions I got wrong', label: 'Questions I got wrong' },
];

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

interface ShuffledQuestion extends Question {
  shuffledOptions: { option: QuestionOption; originalIndex: number }[];
  correctShuffledIndex: number;
}

function shuffleQuestion(q: Question): ShuffledQuestion {
  const indexed = q.options.map((option, originalIndex) => ({ option, originalIndex }));
  const shuffled = shuffle(indexed);
  const correctShuffledIndex = shuffled.findIndex((s) => s.option.correct);
  return { ...q, shuffledOptions: shuffled, correctShuffledIndex };
}

export default function Quiz() {
  const [filter, setFilter] = useState<Filter>('All domains');
  const [started, setStarted] = useState(false);
  const [queue, setQueue] = useState<ShuffledQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);

  const start = () => {
    const latest = latestAnswerPerQuestion();
    let pool = [...QUESTIONS];
    if (filter === 'Questions I got wrong') {
      const wrongIds = new Set(
        [...latest.values()].filter((a) => !a.correct).map((a) => a.questionId)
      );
      pool = pool.filter((q) => wrongIds.has(q.id));
    } else if (filter !== 'All domains') {
      pool = pool.filter((q) => q.domain === (filter as DomainCode));
    }
    if (pool.length === 0) {
      setQueue([]);
      setStarted(true);
      return;
    }

    setQueue(pool.map(shuffleQuestion));
    setIndex(0);
    setSelected(null);
    setLocked(false);
    setAnswers([]);
    setStarted(true);
  };

  const current = queue[index];

  const choose = (i: number) => {
    if (locked || !current) return;
    setSelected(i);
    setLocked(true);
    const correct = i === current.correctShuffledIndex;
    const record: AnswerRecord = {
      questionId: current.id,
      domain: current.domain,
      correct,
      timestamp: Date.now(),
    };
    saveAnswer(record);
    setAnswers((prev) => [...prev, record]);
  };

  const next = () => {
    if (index + 1 >= queue.length) {
      setStarted(false);
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
    setLocked(false);
  };

  const score = useMemo(() => answers.filter((a) => a.correct).length, [answers]);

  if (!started) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center">
            <Brain className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Quiz</h2>
            <p className="text-sm text-slate-400">Pick a domain and test your AZ-900 knowledge.</p>
          </div>
        </div>

        <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Domain</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as Filter)}
              className="w-full bg-slate-900/60 border border-slate-700 text-white rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
            >
              {FILTERS.map((f) => (
                <option key={f.value} value={f.value}>
                  {f.label}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={start}
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-medium px-5 py-2.5 rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Start
          </button>
        </div>
      </div>
    );
  }

  if (queue.length === 0) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-8 text-center">
          <Trophy className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
          <p className="text-white text-lg font-semibold">No questions to show</p>
          <p className="text-slate-400 text-sm mt-1 mb-4">
            You have no incorrect saved answers in this filter yet. Try another domain or answer some
            questions first.
          </p>
          <button
            onClick={() => setStarted(false)}
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-medium px-5 py-2.5 rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Back
          </button>
        </div>
      </div>
    );
  }

  const finished = index >= queue.length - 1 && locked;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center">
            <Brain className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Quiz</h2>
            <p className="text-xs text-slate-400">
              Question {index + 1} of {queue.length}
            </p>
          </div>
        </div>
        <span className="text-sm text-slate-300">
          Score: <span className="text-emerald-400 font-semibold">{score}</span>
        </span>
      </div>

      <div className="mb-6">
        <span className="inline-block text-xs font-semibold uppercase tracking-wide text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-3 py-1">
          {DOMAIN_LABELS[current.domain]}
        </span>
      </div>

      <div className="h-1.5 bg-slate-800 rounded-full mb-6 overflow-hidden">
        <div
          className="h-full bg-emerald-500 transition-all duration-300"
          style={{ width: `${((index + (locked ? 1 : 0)) / queue.length) * 100}%` }}
        />
      </div>

      <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6">
        <p className="text-white font-medium text-lg mb-5">{current.question}</p>

        <div className="space-y-3">
          {current.shuffledOptions.map(({ option }, i) => {
            const isAnswer = option.correct;
            const isPicked = i === selected;
            const showCorrect = locked && isAnswer;
            const showWrong = locked && isPicked && !isAnswer;

            let cls =
              'border-slate-700 bg-slate-900/40 hover:border-emerald-500/50 hover:bg-slate-900/70';
            if (showCorrect) cls = 'border-emerald-500 bg-emerald-500/10';
            else if (showWrong) cls = 'border-red-500 bg-red-500/10';
            else if (locked) cls = 'border-slate-700 bg-slate-900/40 opacity-60';

            return (
              <button
                key={i}
                onClick={() => choose(i)}
                disabled={locked}
                className={`w-full text-left px-4 py-3 rounded-lg border transition-all flex items-start gap-3 ${cls}`}
              >
                <span className="mt-0.5">
                  {showCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : showWrong ? (
                    <XCircle className="w-5 h-5 text-red-400" />
                  ) : (
                    <span className="w-5 h-5 rounded-full border border-slate-600 text-xs flex items-center justify-center text-slate-400">
                      {String.fromCharCode(65 + i)}
                    </span>
                  )}
                </span>
                <span className="text-sm text-slate-200">{option.text}</span>
              </button>
            );
          })}
        </div>

        {locked && (
          <div className="mt-6 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Why each option
            </h4>
            {current.shuffledOptions.map(({ option }, i) => {
              const isAnswer = option.correct;
              const isPicked = i === selected;
              let cls = 'border-slate-700 bg-slate-900/30 text-slate-400';
              if (isAnswer) cls = 'border-emerald-500/40 bg-emerald-500/5 text-slate-200';
              else if (isPicked) cls = 'border-red-500/40 bg-red-500/5 text-slate-200';
              return (
                <div key={i} className={`text-sm rounded-lg p-3 border ${cls}`}>
                  <span className="font-semibold text-white">
                    {String.fromCharCode(65 + i)}:{' '}
                  </span>
                  <span className="font-medium text-slate-100">{option.text}</span>
                  <p className="mt-1 text-slate-300">{option.why}</p>
                </div>
              );
            })}
          </div>
        )}

        {locked && (
          <div className="mt-6 flex justify-end">
            {finished ? (
              <button
                onClick={() => setStarted(false)}
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-medium px-5 py-2.5 rounded-lg transition-colors"
              >
                <Trophy className="w-4 h-4" />
                See results
              </button>
            ) : (
              <button
                onClick={next}
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-medium px-5 py-2.5 rounded-lg transition-colors"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>

      {finished && (
        <div className="mt-6 bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/30 rounded-2xl p-6 text-center">
          <Trophy className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
          <p className="text-white text-lg font-semibold">Quiz complete</p>
          <p className="text-slate-300 text-sm mt-1">
            You scored <span className="text-emerald-400 font-semibold">{score}</span> out of{' '}
            {queue.length}.
          </p>
        </div>
      )}
    </div>
  );
}
