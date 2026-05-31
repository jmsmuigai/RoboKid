'use client';

import { useState, useCallback, useEffect } from 'react';
import { SUBJECTS, GRADES, LANGUAGES } from '@/lib/constants';
import { getTopicsByGradeAndSubject } from '@/lib/curriculum-data';
import { getQuestionsByGradeAndSubject } from '@/lib/exam-bank';
import { loadModel, getModelStats } from '@/lib/learning-model';
import type { Grade, Subject, Language, ExamQuestion } from '@/types';

/* ============================================================
   RoboKid Dashboard — Interactive Learning Hub
   Hands-on coding, mother tongue learning & AI-powered content
   ============================================================ */

// ---------- Mini Robot SVG ----------
function MiniRobot({ mood = 'happy', size = 60 }: { mood?: string; size?: number }) {
  const mouthPath = mood === 'happy' ? 'M12 22 Q18 28 24 22' : mood === 'thinking' ? 'M12 24 L24 24' : 'M12 22 Q18 28 24 22';
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <rect x="6" y="8" width="24" height="20" rx="6" fill="url(#mrb)" stroke="#6366F1" strokeWidth="1" />
      <circle cx="6" cy="4" r="3" fill="#EC4899"><animate attributeName="r" values="3;4;3" dur="2s" repeatCount="indefinite" /></circle>
      <rect x="16" y="2" width="2" height="8" rx="1" fill="#6366F1" />
      <circle cx="13" cy="17" r="3" fill="#22D3EE"><animate attributeName="r" values="3;2;3" dur="3s" repeatCount="indefinite" /></circle>
      <circle cx="23" cy="17" r="3" fill="#22D3EE"><animate attributeName="r" values="3;2;3" dur="3s" repeatCount="indefinite" begin="0.5s" /></circle>
      <path d={mouthPath} stroke="#EC4899" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <defs><linearGradient id="mrb" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#1E293B" /><stop offset="100%" stopColor="#0F172A" /></linearGradient></defs>
    </svg>
  );
}

// ---------- Subject Card ----------
function DashboardSubjectCard({ subject, grade, language, onSelect }: {
  subject: Subject; grade: Grade; language: Language; onSelect: (s: Subject) => void;
}) {
  const info = SUBJECTS[subject];
  const topics = getTopicsByGradeAndSubject(grade, subject);
  const questions = getQuestionsByGradeAndSubject(grade, subject);
  return (
    <button
      className="subject-card"
      onClick={() => onSelect(subject)}
      style={{ '--card-accent': info.color, textAlign: 'left', width: '100%', cursor: 'pointer', border: `1px solid ${info.color}20` } as React.CSSProperties}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
        <div style={{ width: 52, height: 52, borderRadius: 14, background: `${info.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem' }}>{info.icon}</div>
        <div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', marginBottom: 2 }}>{info.name}</h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{topics.length} topics · {questions.length} questions</span>
        </div>
      </div>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '0.75rem' }}>{info.description}</p>
      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
        {topics.slice(0, 3).map(t => (
          <span key={t.id} style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: 20, background: `${info.color}12`, color: info.color, border: `1px solid ${info.color}25` }}>{t.title.split('—')[0].split('(')[0].trim()}</span>
        ))}
        {topics.length > 3 && <span style={{ fontSize: '0.7rem', padding: '2px 8px', color: 'var(--text-muted)' }}>+{topics.length - 3} more</span>}
      </div>
    </button>
  );
}

// ---------- Quiz Component ----------
function QuizPanel({ questions, onClose }: { questions: ExamQuestion[]; onClose: () => void }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);

  const q = questions[current];
  if (!q) return null;

  const handleSelect = (option: string) => {
    if (answered) return;
    setSelected(option);
    setAnswered(true);
    if (option === q.correctAnswer) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      setShowResult(true);
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
      setAnswered(false);
    }
  };

  if (showResult) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>{pct >= 70 ? '🎉' : pct >= 50 ? '👏' : '💪'}</div>
        <h3 style={{ fontFamily: 'var(--font-fun)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
          {pct >= 70 ? 'Excellent Work!' : pct >= 50 ? 'Good Job!' : 'Keep Practicing!'}
        </h3>
        <p style={{ fontSize: '2rem', fontFamily: 'var(--font-display)', fontWeight: 800, margin: '1rem 0' }}>
          <span style={{ color: 'var(--color-environment)' }}>{score}</span>/{questions.length}
        </p>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>You scored {pct}%</p>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
          <button className="btn btn-primary" onClick={() => { setCurrent(0); setScore(0); setShowResult(false); setSelected(null); setAnswered(false); }}>Try Again</button>
          <button className="btn btn-secondary" onClick={onClose}>Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card" style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <span className="badge badge-primary">Question {current + 1}/{questions.length}</span>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Score: {score}</span>
      </div>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>{q.question}</h3>
      {q.options && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {q.options.map((opt) => {
            const isCorrect = opt === q.correctAnswer;
            const isSelected = opt === selected;
            let bg = 'var(--bg-glass)';
            let border = 'var(--border-subtle)';
            if (answered && isCorrect) { bg = 'rgba(16,185,129,0.15)'; border = 'rgba(16,185,129,0.4)'; }
            else if (answered && isSelected && !isCorrect) { bg = 'rgba(239,68,68,0.15)'; border = 'rgba(239,68,68,0.4)'; }
            else if (isSelected) { bg = 'rgba(99,102,241,0.15)'; border = 'rgba(99,102,241,0.4)'; }
            return (
              <button key={opt} onClick={() => handleSelect(opt)} style={{
                padding: '0.85rem 1.25rem', borderRadius: 'var(--radius-md)', background: bg,
                border: `1px solid ${border}`, cursor: answered ? 'default' : 'pointer', textAlign: 'left',
                color: 'var(--text-primary)', fontFamily: 'var(--font-body)', fontSize: '0.95rem',
                transition: 'all var(--transition-fast)',
              }}>
                {opt} {answered && isCorrect && ' ✅'}{answered && isSelected && !isCorrect && ' ❌'}
              </button>
            );
          })}
        </div>
      )}
      {q.type === 'fill_blank' && !answered && (
        <input type="text" placeholder="Type your answer..." style={{
          width: '100%', padding: '0.85rem 1.25rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-glass)',
          border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', fontFamily: 'var(--font-body)',
          fontSize: '1rem', outline: 'none', marginBottom: '1rem',
        }} onKeyDown={(e) => { if (e.key === 'Enter') { handleSelect((e.target as HTMLInputElement).value); } }} />
      )}
      {q.type === 'true_false' && !answered && (
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
          {['True', 'False'].map(opt => (
            <button key={opt} className="btn btn-secondary" style={{ flex: 1 }} onClick={() => handleSelect(opt)}>{opt}</button>
          ))}
        </div>
      )}
      {answered && (
        <div style={{ background: 'rgba(99,102,241,0.08)', borderRadius: 'var(--radius-md)', padding: '1rem', marginBottom: '1rem', borderLeft: '3px solid var(--color-primary)' }}>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            <strong style={{ color: 'var(--color-primary-light)' }}>Explanation:</strong> {q.explanation}
          </p>
        </div>
      )}
      {answered && (
        <button className="btn btn-primary" onClick={handleNext} style={{ width: '100%' }}>
          {current + 1 >= questions.length ? '🎉 See Results' : 'Next Question →'}
        </button>
      )}
    </div>
  );
}

// ---------- AI Puzzle Generator ----------
function AIPuzzleGenerator({ grade, subject, language }: { grade: Grade; subject: Subject; language: Language }) {
  const [puzzle, setPuzzle] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generatePuzzle = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ grade, subject, language, contentType: 'puzzle' }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setPuzzle(data.content);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, [grade, subject, language]);

  return (
    <div className="glass-card" style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
        <MiniRobot mood={loading ? 'thinking' : 'happy'} size={48} />
        <div>
          <h3 style={{ fontFamily: 'var(--font-fun)', fontSize: '1.1rem' }}>🤖 AI Puzzle Generator</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Powered by Google Gemini</p>
        </div>
      </div>
      {!puzzle && !loading && (
        <button className="btn btn-primary" onClick={generatePuzzle} style={{ width: '100%' }}>
          ✨ Generate a {LANGUAGES.find(l => l.code === language)?.label || 'English'} Puzzle
        </button>
      )}
      {loading && (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <div style={{ fontSize: '2rem', animation: 'robotFloat 1s ease-in-out infinite' }}>🤖</div>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', fontFamily: 'var(--font-fun)' }}>RoboKid is thinking...</p>
        </div>
      )}
      {error && (
        <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 'var(--radius-md)', padding: '1rem', marginBottom: '1rem' }}>
          <p style={{ color: '#F87171', fontSize: '0.9rem' }}>⚠️ {error}</p>
        </div>
      )}
      {puzzle && (
        <div>
          <div style={{ background: 'var(--bg-glass)', borderRadius: 'var(--radius-md)', padding: '1.25rem', marginBottom: '1rem', whiteSpace: 'pre-wrap', fontSize: '0.95rem', lineHeight: 1.7 }}>
            {puzzle}
          </div>
          <button className="btn btn-secondary" onClick={() => { setPuzzle(null); generatePuzzle(); }} style={{ width: '100%' }}>
            🔄 Generate Another Puzzle
          </button>
        </div>
      )}
    </div>
  );
}

// ---------- Coding Lab ----------
function CodingLab() {
  const [activeLesson, setActiveLesson] = useState(0);
  const lessons = [
    { title: '🖨️ Hello World', code: 'print("Habari RoboKid!")\nprint("I am learning to code!")', output: 'Habari RoboKid!\nI am learning to code!', desc: 'Your first program! Tell the computer to say hello.' },
    { title: '🧮 Math Robot', code: 'mangoes = 3\nmore = 2\ntotal = mangoes + more\nprint(f"Wanjiku has {total} mangoes!")', output: 'Wanjiku has 5 mangoes!', desc: 'Teach the robot to solve math problems with variables.' },
    { title: '🔄 Counting Loop', code: 'for i in range(1, 6):\n    print(f"Counting: {i}")\nprint("Done! 🎉")', output: 'Counting: 1\nCounting: 2\nCounting: 3\nCounting: 4\nCounting: 5\nDone! 🎉', desc: 'Make the robot count using a loop — just like counting passengers on a matatu!' },
    { title: '🎨 Drawing Shapes', code: 'import turtle\nt = turtle.Turtle()\nfor _ in range(4):\n    t.forward(100)\n    t.right(90)\n# Draws a square!', output: '🟦 A square appears on screen!', desc: 'Use Python Turtle to draw shapes — like the Kenyan flag!' },
  ];

  return (
    <div className="glass-card" style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(16,185,129,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>💻</div>
        <div>
          <h3 style={{ fontFamily: 'var(--font-fun)', fontSize: '1.1rem' }}>Code Lab</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Learn Python with Kenyan examples</p>
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        {lessons.map((l, i) => (
          <button key={i} onClick={() => setActiveLesson(i)} style={{
            padding: '0.4rem 0.8rem', borderRadius: 'var(--radius-full)', fontSize: '0.8rem',
            background: i === activeLesson ? 'var(--color-environment)' : 'var(--bg-glass)',
            color: i === activeLesson ? 'white' : 'var(--text-secondary)',
            border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)',
          }}>{l.title}</button>
        ))}
      </div>

      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>{lessons[activeLesson].desc}</p>

      <div style={{ background: '#0D1117', borderRadius: 'var(--radius-md)', padding: '1.25rem', marginBottom: '0.75rem', fontFamily: 'monospace', fontSize: '0.85rem', lineHeight: 1.7, color: '#E6EDF3', border: '1px solid #30363D', overflow: 'auto' }}>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#FF5F57' }} />
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#FFBD2E' }} />
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#28C840' }} />
        </div>
        {lessons[activeLesson].code.split('\n').map((line, i) => (
          <div key={i}>
            <span style={{ color: '#6E7681', marginRight: '1rem', userSelect: 'none' }}>{i + 1}</span>
            <span>{line.replace(/print/g, '\x1b[38;5;81mprint\x1b[0m')
              .replace(/"([^"]*)"/g, '"$1"')
            }</span>
          </div>
        ))}
      </div>

      <div style={{ background: 'rgba(16,185,129,0.08)', borderRadius: 'var(--radius-md)', padding: '1rem', border: '1px solid rgba(16,185,129,0.2)', fontFamily: 'monospace', fontSize: '0.85rem', color: 'var(--color-environment-light)', whiteSpace: 'pre-wrap' }}>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>OUTPUT:</span>{'\n'}{lessons[activeLesson].output}
      </div>
    </div>
  );
}

// ---------- Content Generator (fires on button click) ----------
function ContentGenerator({ grade, language }: { grade: Grade; language: Language }) {
  const [activeType, setActiveType] = useState<string>('story');
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState('');

  const types = [
    { key: 'story', label: '📖 Story', desc: 'Kenyan stories with moral lessons' },
    { key: 'puzzle', label: '🧩 Puzzle', desc: 'Math & logic puzzles' },
    { key: 'vocabulary', label: '🔤 Vocabulary', desc: '5-language word lists' },
    { key: 'riddle', label: '🤔 Riddles', desc: 'Kitendawili for fun' },
    { key: 'funfact', label: '🌍 Fun Facts', desc: 'Amazing Kenya facts' },
    { key: 'poem', label: '📜 Poem', desc: 'Rhymes & verses' },
    { key: 'exercise', label: '📝 Exercise', desc: 'Practice questions' },
    { key: 'translation', label: '🌐 Translate', desc: 'All 5 languages' },
  ];

  const generate = useCallback(async () => {
    setLoading(true); setContent(null);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: activeType, grade, language, topic: topic || undefined }),
      });
      const data = await res.json();
      setContent(data.content || data.error || 'No content generated');
    } catch { setContent('⚠️ Generation failed. Check your internet connection.'); }
    finally { setLoading(false); }
  }, [activeType, grade, language, topic]);

  return (
    <div>
      {/* Type Selector */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '0.5rem', marginBottom: '1.5rem' }}>
        {types.map(t => (
          <button key={t.key} onClick={() => { setActiveType(t.key); setContent(null); }}
            className="glass-card" style={{
              padding: '0.75rem', cursor: 'pointer', textAlign: 'center',
              border: activeType === t.key ? '2px solid var(--color-primary)' : '1px solid var(--border-subtle)',
              background: activeType === t.key ? 'rgba(99,102,241,0.1)' : undefined,
            }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{t.label.split(' ')[0]}</div>
            <div style={{ fontSize: '0.75rem', fontWeight: 600 }}>{t.label.split(' ').slice(1).join(' ')}</div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{t.desc}</div>
          </button>
        ))}
      </div>

      {/* Topic Input */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <input type="text" value={topic} onChange={e => setTopic(e.target.value)}
          placeholder={activeType === 'translation' ? 'Text to translate...' : 'Optional topic (e.g., animals, water, family)...'}
          onKeyDown={e => e.key === 'Enter' && generate()}
          style={{
            flex: 1, padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-glass)',
            border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', fontSize: '0.9rem',
            fontFamily: 'var(--font-body)', outline: 'none',
          }} />
        <button onClick={generate} className="btn btn-primary" disabled={loading}>
          {loading ? '⏳' : '✨'} Generate
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
          <MiniRobot mood="thinking" size={64} />
          <p style={{ color: 'var(--text-secondary)', marginTop: '1rem', fontFamily: 'var(--font-fun)' }}>RoboKid is creating magic... ✨</p>
        </div>
      )}

      {/* Generated Content */}
      {content && !loading && (
        <div className="glass-card" style={{ padding: '1.5rem', border: '1px solid rgba(99,102,241,0.2)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span className="badge badge-primary">✨ AI Generated</span>
            <button onClick={generate} style={{ background: 'none', border: 'none', color: 'var(--color-primary-light)', cursor: 'pointer', fontSize: '0.8rem' }}>🔄 Regenerate</button>
          </div>
          <div style={{ whiteSpace: 'pre-wrap', fontSize: '0.95rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
            {content}
          </div>
        </div>
      )}
    </div>
  );
}

// ---------- Image Gallery ----------
function ImageGallery() {
  const images = [
    { src: '/robokid-hero-robot.png', label: '🤖 RoboKid Mascot' },
    { src: '/african-robotics-club.png', label: '🔧 Robotics Club' },
    { src: '/african-science-lab.png', label: '🔬 Science Lab' },
    { src: '/african-reading-corner.png', label: '📖 Reading Corner' },
    { src: '/african-wildlife-safari.png', label: '🦁 Wildlife Safari' },
    { src: '/african-music-dance.png', label: '🥁 Music & Dance' },
    { src: '/african-math.png', label: '🧮 Mathematics' },
    { src: '/african-nature.png', label: '🌿 Nature Explorer' },
    { src: '/african-language.png', label: '🗣️ Language Circle' },
    { src: '/african-coding.png', label: '💻 Future Coders' },
    { src: '/african-arts.png', label: '🎨 Creative Arts' },
    { src: '/african-health.png', label: '🏥 Health & Hygiene' },
    { src: '/african-encyclopedia.png', label: '📚 Encyclopedia' },
    { src: '/robokid-mascot.png', label: '🤖 Robot Friend' },
  ];

  return (
    <div>
      <div className="section-header" style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
        <h2 style={{ fontSize: '1.5rem' }}>🎨 African Gallery — <span className="text-gradient">{images.length} Illustrations</span></h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>AI-generated educational art celebrating Kenyan culture and learning</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
        {images.map((img, i) => (
          <div key={i} className="glass-card" style={{ padding: '0.5rem', overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.03)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}>
            <img src={img.src} alt={img.label} style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '8px' }} />
            <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.5rem', fontWeight: 600 }}>{img.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- Main Dashboard ----------
export default function DashboardPage() {
  const [selectedGrade, setSelectedGrade] = useState<Grade>(1);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('english');
  const [activeSubject, setActiveSubject] = useState<Subject | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [activeTab, setActiveTab] = useState<'learn' | 'quiz' | 'code' | 'ai' | 'generate' | 'gallery'>('learn');

  const subjectList: Subject[] = ['mathematics', 'environmental', 'english', 'kiswahili', 'indigenous', 'creative'];
  const quizQuestions = activeSubject ? getQuestionsByGradeAndSubject(selectedGrade, activeSubject) : [];

  return (
    <main style={{ minHeight: '100vh', paddingTop: '80px', position: 'relative', zIndex: 1 }}>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-inner">
          <a href="/" className="navbar-brand">
            <div className="navbar-brand-icon">🤖</div>
            <span>Robo<span style={{ color: 'var(--color-primary-light)' }}>Kid</span></span>
          </a>
          <ul className="navbar-links">
            <li><a href="/" className="navbar-link">Home</a></li>
            <li><a href="/games" className="navbar-link">🎮 Games</a></li>
            <li><a href="/encyclopedia" className="navbar-link">📖 Encyclopedia</a></li>
            <li><a href="/playbook" className="navbar-link">Playbook</a></li>
            <li>
              <div className="language-toggle">
                {LANGUAGES.map(lang => (
                  <button key={lang.code} className={`language-btn ${selectedLanguage === lang.code ? 'active' : ''}`} onClick={() => setSelectedLanguage(lang.code)}>
                    {lang.flag} {lang.code.substring(0, 2).toUpperCase()}
                  </button>
                ))}
              </div>
            </li>
          </ul>
        </div>
      </nav>

      <div className="container" style={{ paddingBottom: '4rem' }}>
        {/* Welcome Header */}
        <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <MiniRobot mood="happy" size={56} />
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800 }}>
              {selectedLanguage === 'kiswahili' ? 'Karibu' : selectedLanguage === 'kikuyu' ? 'Wĩ mwega' : selectedLanguage === 'luo' ? 'Ber biro' : selectedLanguage === 'somali' ? 'Soo dhawoow' : 'Welcome'}, RoboKid! 🎉
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Grade {selectedGrade} · {LANGUAGES.find(l => l.code === selectedLanguage)?.label} · {GRADES.find(g => g.grade === selectedGrade)?.age}
            </p>
          </div>
        </div>

        {/* Grade Selector */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          {GRADES.map(g => (
            <button key={g.grade} onClick={() => { setSelectedGrade(g.grade); setActiveSubject(null); setShowQuiz(false); }} style={{
              padding: '0.6rem 1.5rem', borderRadius: 'var(--radius-full)', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.9rem',
              background: selectedGrade === g.grade ? g.color : 'var(--bg-glass)', color: selectedGrade === g.grade ? '#050816' : 'var(--text-secondary)',
              border: selectedGrade === g.grade ? 'none' : '1px solid var(--border-subtle)', cursor: 'pointer',
              transition: 'all var(--transition-fast)', transform: selectedGrade === g.grade ? 'scale(1.05)' : 'scale(1)',
            }}>
              {g.emoji} {g.label}
            </button>
          ))}
        </div>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: '0.25rem', padding: '4px', background: 'var(--bg-glass)', borderRadius: 'var(--radius-full)', marginBottom: '2rem', border: '1px solid var(--border-subtle)', width: 'fit-content', flexWrap: 'wrap' }}>
          {[
            { key: 'learn' as const, label: '📚 Learn' },
            { key: 'quiz' as const, label: '📝 Quiz' },
            { key: 'code' as const, label: '💻 Code' },
            { key: 'ai' as const, label: '🤖 AI' },
            { key: 'generate' as const, label: '✨ Generate' },
            { key: 'gallery' as const, label: '🎨 Gallery' },
          ].map(tab => (
            <button key={tab.key} onClick={() => { setActiveTab(tab.key as any); setShowQuiz(false); setActiveSubject(null); }} style={{
              padding: '0.5rem 1.25rem', borderRadius: 'var(--radius-full)', fontSize: '0.9rem', fontWeight: 500,
              background: activeTab === tab.key ? 'var(--color-primary)' : 'transparent',
              color: activeTab === tab.key ? 'white' : 'var(--text-secondary)',
              border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)',
              transition: 'all var(--transition-fast)',
            }}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        {activeTab === 'learn' && !activeSubject && (
          <div className="grid-3">
            {subjectList.map(subject => (
              <DashboardSubjectCard key={subject} subject={subject} grade={selectedGrade} language={selectedLanguage} onSelect={setActiveSubject} />
            ))}
          </div>
        )}

        {activeTab === 'learn' && activeSubject && !showQuiz && (
          <div>
            <button onClick={() => setActiveSubject(null)} className="btn btn-secondary btn-sm" style={{ marginBottom: '1.5rem' }}>
              ← Back to Subjects
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ width: 64, height: 64, borderRadius: 16, background: `${SUBJECTS[activeSubject].color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>{SUBJECTS[activeSubject].icon}</div>
              <div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem' }}>{SUBJECTS[activeSubject].name}</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Grade {selectedGrade} · {getTopicsByGradeAndSubject(selectedGrade, activeSubject).length} topics</p>
              </div>
              {quizQuestions.length > 0 && (
                <button className="btn btn-primary btn-sm" onClick={() => setShowQuiz(true)} style={{ marginLeft: 'auto' }}>
                  📝 Take Quiz ({quizQuestions.length} Qs)
                </button>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {getTopicsByGradeAndSubject(selectedGrade, activeSubject).map((topic, i) => (
                <div key={topic.id} className="glass-card" style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: `${SUBJECTS[activeSubject].color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: SUBJECTS[activeSubject].color, fontSize: '0.9rem', flexShrink: 0 }}>{i + 1}</div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', marginBottom: '0.25rem' }}>{topic.title}</h3>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.75rem' }}>{topic.description}</p>
                      <div style={{ marginBottom: '0.75rem' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Learning Outcomes:</span>
                        <ul style={{ margin: '0.25rem 0 0 1.25rem', listStyle: 'disc' }}>
                          {topic.learningOutcomes.map((outcome, j) => (
                            <li key={j} style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '0.2rem' }}>{outcome}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Activities:</span>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.25rem' }}>
                          {topic.suggestedActivities.map((act, j) => (
                            <span key={j} style={{ fontSize: '0.75rem', padding: '3px 10px', borderRadius: 20, background: 'var(--bg-glass)', color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }}>{act}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'learn' && activeSubject && showQuiz && quizQuestions.length > 0 && (
          <div>
            <button onClick={() => setShowQuiz(false)} className="btn btn-secondary btn-sm" style={{ marginBottom: '1.5rem' }}>
              ← Back to {SUBJECTS[activeSubject].name}
            </button>
            <QuizPanel questions={quizQuestions} onClose={() => setShowQuiz(false)} />
          </div>
        )}

        {activeTab === 'quiz' && (
          <div>
            <div className="section-header" style={{ marginBottom: '2rem', textAlign: 'left' }}>
              <h2 style={{ fontSize: '1.5rem' }}>📝 Practice Exams — <span className="text-gradient">Grade {selectedGrade}</span></h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>KNEC KEYA-aligned assessment practice. Select a subject to begin.</p>
            </div>
            <div className="grid-3">
              {subjectList.filter(s => getQuestionsByGradeAndSubject(selectedGrade, s).length > 0).map(subject => {
                const qs = getQuestionsByGradeAndSubject(selectedGrade, subject);
                const info = SUBJECTS[subject];
                return (
                  <button key={subject} className="glass-card" onClick={() => { setActiveSubject(subject); setShowQuiz(true); setActiveTab('learn'); }} style={{
                    padding: '1.5rem', cursor: 'pointer', textAlign: 'left', border: `1px solid ${info.color}20`,
                  }}>
                    <span style={{ fontSize: '2rem' }}>{info.icon}</span>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', margin: '0.5rem 0 0.25rem' }}>{info.name}</h3>
                    <p style={{ color: info.color, fontSize: '1.5rem', fontFamily: 'var(--font-display)', fontWeight: 800 }}>{qs.length}</p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>questions available</p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'code' && <CodingLab />}

        {activeTab === 'ai' && (
          <div>
            <div className="section-header" style={{ marginBottom: '2rem', textAlign: 'left' }}>
              <h2 style={{ fontSize: '1.5rem' }}>🤖 AI Learning — <span className="text-gradient">Powered by Gemini</span></h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Generate unlimited CBC puzzles in any language. Learn in the language you think in!</p>
            </div>
            <div className="grid-2">
              {subjectList.slice(0, 4).map(subject => (
                <div key={subject}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span>{SUBJECTS[subject].icon}</span> {SUBJECTS[subject].name}
                  </h3>
                  <AIPuzzleGenerator grade={selectedGrade} subject={subject} language={selectedLanguage} />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'generate' && (
          <div>
            <div className="section-header" style={{ marginBottom: '2rem', textAlign: 'left' }}>
              <h2 style={{ fontSize: '1.5rem' }}>✨ Content Generator — <span className="text-gradient">Powered by Gemini AI</span></h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Click any content type below, enter an optional topic, and RoboKid auto-generates age-appropriate learning content in your chosen language!</p>
            </div>
            <ContentGenerator grade={selectedGrade} language={selectedLanguage} />
          </div>
        )}

        {activeTab === 'gallery' && <ImageGallery />}
      </div>
    </main>
  );
}
