import { useState } from 'react';
import { GraduationCap, Brain, Gauge } from 'lucide-react';
import StudyBuddy from '@/components/StudyBuddy';
import Quiz from '@/components/Quiz';
import Readiness from '@/components/Readiness';

type Tab = 'study' | 'quiz' | 'readiness';

const TABS: { id: Tab; label: string; icon: typeof GraduationCap }[] = [
  { id: 'study', label: 'Study Buddy', icon: GraduationCap },
  { id: 'quiz', label: 'Quiz', icon: Brain },
  { id: 'readiness', label: 'Readiness', icon: Gauge },
];

function App() {
  const [tab, setTab] = useState<Tab>('study');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="w-full bg-amber-500 text-slate-900 text-center text-sm font-medium py-2.5 px-4">
        Unofficial AZ-900 Study Tool — Not affiliated with Microsoft.
      </div>

      <header className="max-w-5xl mx-auto px-4 pt-10 pb-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          AZ-900 Study Buddy & Quiz
        </h1>
        <p className="text-slate-400 mt-2 max-w-2xl">
          A friendly, community-made study companion for the Azure Fundamentals exam. Practice,
          track your readiness, and get plain-language explanations.
        </p>
      </header>

      <nav className="max-w-5xl mx-auto px-4">
        <div className="flex gap-1 bg-slate-900/60 border border-slate-800 rounded-xl p-1.5 w-full sm:w-fit">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                tab === id
                  ? 'bg-slate-100 text-slate-900'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {tab === 'study' && <StudyBuddy />}
        {tab === 'quiz' && <Quiz />}
        {tab === 'readiness' && <Readiness />}
      </main>

      <footer className="max-w-5xl mx-auto px-4 py-8 text-center text-xs text-slate-600">
        Unofficial study tool. Not affiliated with, endorsed by, or sponsored by Microsoft.
      </footer>
    </div>
  );
}

export default App;
