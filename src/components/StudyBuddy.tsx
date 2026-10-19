import { useMemo, useState } from 'react';
import {
  GraduationCap,
  Sparkles,
  Languages,
  Search,
  BookOpen,
  AlertTriangle,
  Info,
  Compass,
} from 'lucide-react';
import {
  EXPLANATIONS,
  ALL_DOMAINS,
  DOMAIN_LABELS,
  LANGUAGES,
  STUDY_STYLES,
  META_NOTE_EN,
  TRANSLATION_NOTE_EN,
  MISSING_LANG_NOTE_EN,
  type Topic,
  type Language,
  type StudyStyle,
  type ExplanationText,
  type DomainCode,
} from '@/data/explanations';

type SectionKey = 'analogy' | 'breaks' | 'definition' | 'tip';

const SECTION_LABELS: Record<SectionKey, string> = {
  analogy: 'Analogy',
  breaks: 'Where it breaks',
  definition: 'Definition',
  tip: 'Exam tip',
};

const STYLE_SECTIONS: Record<StudyStyle, SectionKey[]> = {
  'Simple African analogy': ['analogy', 'breaks', 'definition', 'tip'],
  'Technical summary': ['definition'],
  'Exam tips and common mix-ups': ['tip', 'definition'],
  "Explain like I'm new to cloud": ['analogy', 'definition'],
};

function resolveText(topic: Topic, language: Language): { text: ExplanationText; translated: boolean } {
  if (language === 'English') return { text: topic, translated: false };
  const tr = topic.translations?.[language];
  if (tr) return { text: tr, translated: true };
  return { text: topic, translated: false };
}

function matchesQuery(topic: Topic, q: string): boolean {
  if (!q) return false;
  const needle = q.toLowerCase();
  if (topic.topic.toLowerCase().includes(needle)) return true;
  return topic.keywords.some((k) => k.toLowerCase().includes(needle));
}

export default function StudyBuddy() {
  const [query, setQuery] = useState('');
  const [style, setStyle] = useState<StudyStyle>(STUDY_STYLES[0]);
  const [language, setLanguage] = useState<Language>('English');
  const [selected, setSelected] = useState<Topic | null>(null);
  const [touched, setTouched] = useState(false);

  const suggestions = useMemo(() => {
    if (!query.trim()) return [];
    return EXPLANATIONS.filter((t) => matchesQuery(t, query.trim())).slice(0, 6);
  }, [query]);

  const selectTopic = (topic: Topic) => {
    setSelected(topic);
    setQuery(topic.topic);
    setTouched(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    const q = query.trim().toLowerCase();
    if (!q) {
      setSelected(null);
      return;
    }
    const exact = EXPLANATIONS.find((t) => matchesQuery(t, query.trim()));
    setSelected(exact ?? null);
  };

  const fallbackSuggestions = useMemo(() => EXPLANATIONS.slice(0, 5), []);

  const sections = selected ? STYLE_SECTIONS[style] : [];
  const resolved = selected ? resolveText(selected, language) : null;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center">
          <GraduationCap className="w-5 h-5 text-amber-400" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white">Study Buddy</h2>
          <p className="text-sm text-slate-400">
            Search an Azure topic or pick a chip below. Explanations are built-in — no internet
            needed.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6 space-y-5"
      >
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Search a topic</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                if (selected) setSelected(null);
                setTouched(false);
              }}
              placeholder="e.g. shared responsibility, blob storage, RBAC"
              className="w-full bg-slate-900/60 border border-slate-700 text-white placeholder-slate-500 rounded-lg pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500"
            />
          </div>
          {suggestions.length > 0 && !selected && (
            <div className="mt-2 bg-slate-900/80 border border-slate-700 rounded-lg overflow-hidden">
              {suggestions.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => selectTopic(s)}
                  className="w-full text-left px-3 py-2 text-sm text-slate-200 hover:bg-slate-800 flex items-center gap-2 border-b border-slate-800 last:border-b-0"
                >
                  <Compass className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="flex-1">{s.topic}</span>
                  <span className="text-xs text-slate-500">{DOMAIN_LABELS[s.domain]}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Explanation style</label>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value as StudyStyle)}
              className="w-full bg-slate-900/60 border border-slate-700 text-white rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500"
            >
              {STUDY_STYLES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-1.5">
              <Languages className="w-4 h-4 text-slate-400" /> Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="w-full bg-slate-900/60 border border-slate-700 text-white rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500"
            >
              {LANGUAGES.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={!query.trim()}
          className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed text-slate-900 font-medium px-5 py-2.5 rounded-lg transition-colors"
        >
          <Sparkles className="w-4 h-4" />
          Explain
        </button>
      </form>

      <div className="mt-6 space-y-5">
        {ALL_DOMAINS.map((domain: DomainCode) => {
          const domainTopics = EXPLANATIONS.filter((t) => t.domain === domain);
          if (domainTopics.length === 0) return null;
          return (
            <div key={domain}>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
                {DOMAIN_LABELS[domain]}
              </p>
              <div className="flex flex-wrap gap-2">
                {domainTopics.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => selectTopic(t)}
                    className={`text-sm px-3 py-1.5 rounded-full border transition-colors ${
                      selected?.id === t.id
                        ? 'bg-amber-500 border-amber-500 text-slate-900'
                        : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:border-amber-500/50 hover:text-white'
                    }`}
                  >
                    {t.topic}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {touched && !selected && (
        <div className="mt-6 bg-slate-800/60 border border-slate-700 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <p className="text-sm text-slate-200">I don&apos;t have that topic yet. Try one of these:</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {fallbackSuggestions.map((t) => (
              <button
                key={t.id}
                onClick={() => selectTopic(t)}
                className="text-sm px-3 py-1.5 rounded-full bg-slate-800/60 border border-slate-700 text-slate-300 hover:border-amber-500/50 hover:text-white"
              >
                {t.topic}
              </button>
            ))}
          </div>
        </div>
      )}

      {selected && resolved && (
        <div className="mt-6 bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/30 rounded-2xl p-6">
          <div className="flex items-start justify-between gap-3 mb-1">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <h3 className="text-lg font-semibold text-white">{selected.topic}</h3>
            </div>
          </div>
          <p className="text-xs text-slate-400 mb-4">
            {DOMAIN_LABELS[selected.domain]} · {style} · {language}
          </p>

          {language !== 'English' && !resolved.translated && (
            <div className="mb-4 flex items-start gap-2 text-xs text-amber-300 bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
              <Info className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{MISSING_LANG_NOTE_EN}</span>
            </div>
          )}

          <div className="space-y-4">
            {sections.map((key) => (
              <div key={key}>
                <p className="text-xs font-semibold uppercase tracking-wide text-amber-300 mb-1">
                  {SECTION_LABELS[key]}
                </p>
                <p className="text-sm text-slate-200 leading-relaxed">{resolved.text[key]}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t border-amber-500/20 space-y-2">
            <p className="text-xs text-slate-400">{META_NOTE_EN}</p>
            {resolved.translated && (
              <p className="text-xs text-amber-300/80">{TRANSLATION_NOTE_EN}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
