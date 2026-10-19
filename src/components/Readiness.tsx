import { useEffect, useState } from 'react';
import { Gauge, RotateCcw } from 'lucide-react';
import { ALL_DOMAINS, DOMAIN_LABELS, QUESTIONS } from '@/data/questions';
import { loadAnswers, resetAnswers, type AnswerRecord } from '@/lib/storage';

export default function Readiness() {
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);

  useEffect(() => {
    setAnswers(loadAnswers());
  }, []);

  const stats = ALL_DOMAINS.map((domain) => {
    const domainTotal = QUESTIONS.filter((q) => q.domain === domain).length;
    const domainAnswers = answers.filter((a) => a.domain === domain);
    const answered = domainAnswers.length;
    const correct = domainAnswers.filter((a) => a.correct).length;
    const pct = answered === 0 ? 0 : Math.round((correct / answered) * 100);
    return { domain, domainTotal, answered, correct, pct };
  });

  const overall =
    answers.length === 0
      ? 0
      : Math.round((answers.filter((a) => a.correct).length / answers.length) * 100);

  const handleReset = () => {
    resetAnswers();
    setAnswers([]);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-sky-500/15 flex items-center justify-center">
          <Gauge className="w-5 h-5 text-sky-400" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white">Readiness</h2>
          <p className="text-sm text-slate-400">Track your progress across AZ-900 domains.</p>
        </div>
      </div>

      <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6 mb-6">
        <div className="flex items-end justify-between mb-2">
          <p className="text-sm text-slate-300">Overall readiness</p>
          <p className="text-3xl font-semibold text-white">{overall}%</p>
        </div>
        <div className="h-2.5 bg-slate-900 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-sky-500 to-emerald-500 transition-all duration-500"
            style={{ width: `${overall}%` }}
          />
        </div>
        <p className="text-xs text-slate-500 mt-2">
          Based on {answers.length} answered {answers.length === 1 ? 'question' : 'questions'}.
        </p>
      </div>

      <div className="space-y-4">
        {stats.map(({ domain, domainTotal, answered, correct, pct }) => (
          <div key={domain} className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5">
            <div className="flex items-end justify-between mb-2">
              <p className="text-sm font-medium text-white">{DOMAIN_LABELS[domain]}</p>
              <p className="text-sm text-slate-300">
                {correct}/{answered} correct ·{' '}
                <span className="text-sky-400 font-semibold">{pct}%</span>
                <span className="text-slate-500"> · {domainTotal} questions in bank</span>
              </p>
            </div>
            <div className="h-2 bg-slate-900 rounded-full overflow-hidden">
              <div
                className="h-full bg-sky-500 transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleReset}
          className="inline-flex items-center gap-2 bg-slate-800 hover:bg-red-500/20 hover:text-red-300 text-slate-300 border border-slate-700 hover:border-red-500/50 font-medium px-4 py-2.5 rounded-lg transition-colors text-sm"
        >
          <RotateCcw className="w-4 h-4" />
          Reset my progress
        </button>
      </div>
    </div>
  );
}
