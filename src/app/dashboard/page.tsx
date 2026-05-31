'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SUBJECTS, GRADES, LANGUAGES } from '@/lib/constants';
import { getTopicsByGradeAndSubject } from '@/lib/curriculum-data';
import { getQuestionsByGradeAndSubject } from '@/lib/exam-bank';
import { loadModel, getModelStats } from '@/lib/learning-model';
import type { Grade, Subject, Language, ExamQuestion } from '@/types';

// Sound and interactive components
import { playClick, playCorrect, playIncorrect, playSuccess, startBackingBeat, stopBackingBeat, isBeatPlaying } from '@/lib/sound-manager';
import VisualMathHelper from '@/components/VisualMathHelper';
import BlackboardNote from '@/components/BlackboardNote';
import Terminal from '@/components/Terminal';
import MotherTongueCard from '@/components/MotherTongueCard';
import Piano from '@/components/Piano';
import HandwritingPractice from '@/components/HandwritingPractice';
import { translateUI } from '@/lib/ui-translations';
import { getEarnedToys, TOYS_LIST, awardToy, resetToys } from '@/lib/toys-service';
import type { Toy } from '@/lib/toys-service';

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
  
  const translatedName = translateUI(subject, language);
  const translatedDesc = translateUI(`${subject}_desc`, language);
  
  const handleSelect = () => {
    playClick();
    onSelect(subject);
  };

  return (
    <button
      className="subject-card"
      onClick={handleSelect}
      style={{ '--card-accent': info.color, textAlign: 'left', width: '100%', cursor: 'pointer', border: `1px solid ${info.color}20` } as React.CSSProperties}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
        <div style={{ width: 52, height: 52, borderRadius: 14, background: `${info.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem' }}>{info.icon}</div>
        <div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', marginBottom: 2 }}>{translatedName}</h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{topics.length} topics · {questions.length} questions</span>
        </div>
      </div>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '0.75rem' }}>{translatedDesc}</p>
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

  useEffect(() => {
    if (showResult) {
      playSuccess();
      const pct = Math.round((score / questions.length) * 100);
      if (pct >= 70) {
        let toyId = 'toy_puppy';
        if (pct === 100) {
          toyId = 'toy_digger'; // Perfect score awards Excavator!
        }
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('robokid-award-toy', { detail: { toyId } }));
        }
      }
    }
  }, [showResult, score, questions.length]);

  if (!q) return null;

  const handleSelect = (option: string) => {
    if (answered) return;
    setSelected(option);
    setAnswered(true);
    
    if (option === q.correctAnswer) {
      playCorrect();
      setScore(s => s + 1);
    } else {
      playIncorrect();
    }
  };

  const handleNext = () => {
    playClick();
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
          <button className="btn btn-primary" onClick={() => { playClick(); setCurrent(0); setScore(0); setShowResult(false); setSelected(null); setAnswered(false); }}>Try Again</button>
          <button className="btn btn-secondary" onClick={() => { playClick(); onClose(); }}>Back</button>
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
      
      {/* Visual Assistant for Mangoes / Bananas / Shapes */}
      <VisualMathHelper question={q.question} />

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
  const [terminalOutput, setTerminalOutput] = useState<string>('');

  const lessons = [
    { 
      title: '🖨️ Hello World', 
      code: 'print("Habari RoboKid!")\nprint("I am learning to code!")', 
      desc: 'Your first program! Tell the computer to say hello.',
      blackboard: {
        title: 'Python: Hello World',
        notes: [
          'print() tells the computer to display text!',
          'Whatever is inside the quotes " " is printed.',
          'Try typing it in the terminal yourself!'
        ],
        formula: 'print("Your Message Here")'
      }
    },
    { 
      title: '🧮 Math Robot', 
      code: 'mangoes = 3\nmore = 2\ntotal = mangoes + more\nprint(f"Wanjiku has {total} mangoes!")', 
      desc: 'Teach the robot to solve math problems with variables.',
      blackboard: {
        title: 'Variables & Math',
        notes: [
          'Variables are box containers for data.',
          'Wanjiku has mangoes = 3.',
          'total adds variables together!'
        ],
        formula: 'total = mangoes + more'
      }
    },
    { 
      title: '🔄 Counting Loop', 
      code: 'for i in range(1, 6):\n    print(f"Counting: {i}")\nprint("Done! 🎉")', 
      desc: 'Make the robot count using a loop — just like counting passengers on a matatu!',
      blackboard: {
        title: 'Python Loops',
        notes: [
          'Loops repeat actions automatically.',
          'for i in range(1, 6) counts from 1 to 5.',
          'It saves us writing print() 5 times!'
        ],
        formula: 'for i in range(start, end):'
      }
    },
    { 
      title: '🎨 Drawing Shapes', 
      code: 'import robot\nrobot.draw_shape("square", color="purple")\nprint("🟦 A colorful square appears!")', 
      desc: 'Use Python commands to draw colorful shapes on screen.',
      blackboard: {
        title: 'Drawing Shapes',
        notes: [
          'Robots can draw with simple commands.',
          'draw_shape() takes a shape and color.',
          'Try drawing a triangle or circle!'
        ],
        formula: 'draw_shape("square", color="purple")'
      }
    },
  ];

  const handleSelectLesson = (idx: number) => {
    playClick();
    setActiveLesson(idx);
    setTerminalOutput('');
  };

  return (
    <div className="glass-card" style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(16,185,129,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>💻</div>
        <div>
          <h3 style={{ fontFamily: 'var(--font-fun)', fontSize: '1.1rem' }}>Code Lab Terminal</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Interactive Python console with local schools examples</p>
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {lessons.map((l, i) => (
          <button key={i} onClick={() => handleSelectLesson(i)} style={{
            padding: '0.4rem 1rem', borderRadius: 'var(--radius-full)', fontSize: '0.8rem',
            background: i === activeLesson ? 'var(--color-environment)' : 'var(--bg-glass)',
            color: i === activeLesson ? 'white' : 'var(--text-secondary)',
            border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)',
            fontWeight: 600, transition: 'all 0.2s'
          }}>{l.title}</button>
        ))}
      </div>

      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>{lessons[activeLesson].desc}</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
        {/* Left: Blackboard note */}
        <BlackboardNote 
          title={lessons[activeLesson].blackboard.title}
          notes={lessons[activeLesson].blackboard.notes}
          formula={lessons[activeLesson].blackboard.formula}
        />

        {/* Right: Code editor and prompt */}
        <div>
          <div style={{ background: '#0D1117', borderRadius: '12px 12px 0 0', padding: '1rem', fontFamily: 'monospace', fontSize: '0.85rem', color: '#E6EDF3', border: '1px solid #30363D', borderBottom: 'none' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 700 }}>PYTHON EDITOR:</span>
            <div style={{ marginTop: '0.5rem' }}>
              {lessons[activeLesson].code.split('\n').map((line, i) => (
                <div key={i}>
                  <span style={{ color: '#6E7681', marginRight: '1rem', userSelect: 'none' }}>{i + 1}</span>
                  <span>{line}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Interactive CRT Terminal */}
          <Terminal 
            initialCode={lessons[activeLesson].code} 
            onCodeRun={(out) => setTerminalOutput(out)}
          />
        </div>
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
    { src: '/african-marketplace-math.png', label: '🏪 Market Math' },
    { src: '/african-farming-garden.png', label: '🌻 School Garden' },
    { src: '/kenyan-flag-shield.png', label: '🛡️ Kenya Shield' },
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

// ---------- Dashboard Toys & Cartoons Tab ----------
function ToysAndCartoonsTab() {
  const [activeSection, setActiveSection] = useState<'shelf' | 'cartoons'>('shelf');
  const [earnedList, setEarnedList] = useState<string[]>([]);
  const [selectedToy, setSelectedToy] = useState<Toy | null>(null);
  const [selectedVid, setSelectedVid] = useState('n_J7wTfBvN0');

  useEffect(() => {
    setEarnedList(getEarnedToys());
    const handleUpdate = () => {
      setEarnedList(getEarnedToys());
    };
    window.addEventListener('robokid-award-toy', handleUpdate);
    return () => window.removeEventListener('robokid-award-toy', handleUpdate);
  }, []);

  const speakToyDescription = (toy: Toy) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(`${toy.name}. ${toy.description}. Here is a fun fact: ${toy.funFact}`);
      utterance.pitch = 1.35;
      utterance.rate = 1.05;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSelectToy = (toy: Toy) => {
    playClick();
    setSelectedToy(toy);
    speakToyDescription(toy);
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to lock all your toys and start over?")) {
      playClick();
      resetToys();
      setEarnedList([]);
      setSelectedToy(null);
    }
  };

  const videos = [
    { id: 'n_J7wTfBvN0', title: 'Ubongo Kids — Learning Math and Coding Concepts!', creator: 'Ubongo Kids', duration: '12:45', thumbnail: '🦁' },
    { id: 'OqK5l4S0Wk8', title: 'Akili and Me — Counting Numbers & Fruit Matching!', creator: 'Akili and Me', duration: '8:30', thumbnail: '🍌' },
    { id: 'h4cQpP3YmZc', title: 'How do Robots Work? Simple Robotics Guide for Kids', creator: 'RoboKid Academy', duration: '10:15', thumbnail: '🤖' },
    { id: '2mN0-1c39rY', title: 'Artificial Intelligence for Kids - What is AI?', creator: 'CrashCourse Kids', duration: '5:40', thumbnail: '🧠' },
    { id: 'E7B15-xR_d8', title: 'The Hare and the Tortoise (Kenyan Savanna Edition)', creator: 'African Folk Tales', duration: '14:20', thumbnail: '🐢' },
    { id: 'q3H0_wPZpOM', title: 'Awesome Lego Robotics & Projects for Young Minds', creator: 'Lego Education', duration: '9:15', thumbnail: '🚀' },
    { id: 'R-DXZ7_9D1M', title: 'How Electronic Sensors Work in Modern Cars & Robots', creator: 'SciShow Kids', duration: '6:30', thumbnail: '📡' },
    { id: 'X5p1v5w6y88', title: 'Easy Coding Tutorial: Building Game in Scratch!', creator: 'Scratch Coding', duration: '11:20', thumbnail: '💻' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Sub navigation toggler */}
      <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
        <button 
          onClick={() => { playClick(); setActiveSection('shelf'); }}
          style={{
            background: 'none', border: 'none', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer',
            color: activeSection === 'shelf' ? 'var(--color-primary-light)' : 'var(--text-secondary)',
            borderBottom: activeSection === 'shelf' ? '3px solid var(--color-primary)' : 'none',
            paddingBottom: '0.5rem', fontFamily: 'var(--font-fun)',
          }}
        >
          🏆 My Toys Closet ({earnedList.length}/{TOYS_LIST.length})
        </button>
        <button 
          onClick={() => { playClick(); setActiveSection('cartoons'); }}
          style={{
            background: 'none', border: 'none', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer',
            color: activeSection === 'cartoons' ? 'var(--color-primary-light)' : 'var(--text-secondary)',
            borderBottom: activeSection === 'cartoons' ? '3px solid var(--color-primary)' : 'none',
            paddingBottom: '0.5rem', fontFamily: 'var(--font-fun)',
          }}
        >
          🍿 Cartoon & AI Theater
        </button>
      </div>

      {activeSection === 'shelf' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0, maxWidth: '80%' }}>
              Answer quiz questions correctly, finish coding challenges, or complete piano lessons to unlock cute virtual toys! Click on unlocked toys to hear about them!
            </p>
            {earnedList.length > 0 && (
              <button 
                onClick={handleReset}
                className="btn btn-secondary btn-sm"
                style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#F87171', borderColor: 'rgba(239, 68, 68, 0.2)' }}
              >
                Reset Toyshelf
              </button>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
            {TOYS_LIST.map(toy => {
              const earned = earnedList.includes(toy.id);
              const isSelected = selectedToy?.id === toy.id;
              
              return (
                <div
                  key={toy.id}
                  onClick={() => earned && handleSelectToy(toy)}
                  style={{
                    padding: '1.25rem 0.5rem',
                    borderRadius: '16px',
                    textAlign: 'center',
                    cursor: earned ? 'pointer' : 'default',
                    background: earned 
                      ? (isSelected ? 'rgba(99, 102, 241, 0.2)' : 'var(--bg-glass-strong)') 
                      : 'rgba(255, 255, 255, 0.02)',
                    border: earned
                      ? (isSelected ? `2px solid ${toy.color}` : '1px solid var(--border-subtle)')
                      : '1px dashed rgba(255, 255, 255, 0.1)',
                    transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                    transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    opacity: earned ? 1 : 0.6,
                    boxShadow: earned && isSelected ? `0 0 15px ${toy.color}` : 'none'
                  }}
                  className={earned ? 'hover-bounce' : ''}
                >
                  <div style={{ 
                    fontSize: '3rem', 
                    marginBottom: '0.5rem', 
                    filter: earned ? 'none' : 'grayscale(100%) brightness(30%)',
                    transform: earned && isSelected ? 'rotate(10deg)' : 'none',
                    transition: 'transform 0.2s'
                  }}>
                    {toy.emoji}
                  </div>
                  <h4 style={{ fontSize: '0.85rem', color: earned ? '#FFF' : 'var(--text-muted)', margin: 0, fontWeight: 700 }}>
                    {earned ? toy.name : 'Locked Toy'}
                  </h4>
                </div>
              );
            })}
          </div>

          {selectedToy && (
            <div 
              style={{ 
                background: 'var(--bg-glass-strong)', 
                border: `2px solid ${selectedToy.color}`, 
                borderRadius: '20px', 
                padding: '1.5rem',
                display: 'flex',
                gap: '1.5rem',
                alignItems: 'center',
                flexWrap: 'wrap',
                animation: 'pianoFloat 0.3s ease'
              }}
            >
              <div style={{ fontSize: '5rem', background: 'rgba(255,255,255,0.05)', width: '100px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>
                {selectedToy.emoji}
              </div>
              <div style={{ flex: 1, minWidth: '240px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontFamily: 'var(--font-fun)', fontSize: '1.3rem', color: '#FFF', margin: 0 }}>
                    {selectedToy.name} Unlocked! 🏆
                  </h3>
                  <button 
                    onClick={() => speakToyDescription(selectedToy)}
                    className="btn btn-secondary btn-sm"
                    style={{ padding: '4px 10px', fontSize: '0.75rem', gap: '4px' }}
                  >
                    🔊 Read Aloud
                  </button>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: '0.5rem 0 1rem 0', lineHeight: 1.4 }}>
                  {selectedToy.description}
                </p>
                <div style={{ background: 'rgba(251, 146, 60, 0.05)', borderLeft: '3px solid #FB923C', padding: '0.75rem 1rem', borderRadius: '0 8px 8px 0' }}>
                  <span style={{ fontSize: '0.75rem', color: '#FB923C', fontWeight: 800, textTransform: 'uppercase', display: 'block', marginBottom: '0.2rem' }}>💡 Fun AI & Robotics Fact:</span>
                  <p style={{ color: 'var(--text-primary)', fontSize: '0.85rem', margin: 0, lineHeight: 1.4 }}>
                    {selectedToy.funFact}
                  </p>
                </div>
              </div>
            </div>
          )}

          {!selectedToy && (
            <div style={{ textAlign: 'center', padding: '2rem', background: 'var(--bg-glass)', borderRadius: '16px', border: '1px dashed var(--border-subtle)' }}>
              <span style={{ fontSize: '3rem' }}>🔍</span>
              <h4 style={{ fontFamily: 'var(--font-fun)', color: 'var(--text-secondary)', margin: '0.5rem 0' }}>Click an unlocked toy above to view details!</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', margin: 0 }}>Your toys are automatically saved to your shelf forever.</p>
            </div>
          )}
        </div>
      )}

      {activeSection === 'cartoons' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          <div style={{ gridColumn: 'span 2', minWidth: '320px' }}>
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-subtle)', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}>
              <iframe
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                src={`https://www.youtube-nocookie.com/embed/${selectedVid}?autoplay=0&rel=0&showinfo=0`}
                title="RoboKid Safe Player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                sandbox="allow-scripts allow-same-origin allow-presentation"
                allowFullScreen
              />
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', marginTop: '1rem', color: '#fff' }}>
              {videos.find(v => v.id === selectedVid)?.title}
            </h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h4 style={{ fontFamily: 'var(--font-display)', color: 'var(--text-muted)' }}>Robotics & AI Theatre 📺</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '420px', overflowY: 'auto', paddingRight: '4px' }}>
              {videos.map(v => (
                <div key={v.id} onClick={() => { playClick(); setSelectedVid(v.id); }} style={{
                  display: 'flex', gap: '0.75rem', padding: '0.5rem', borderRadius: '8px', cursor: 'pointer',
                  background: selectedVid === v.id ? 'rgba(251, 146, 60, 0.1)' : 'var(--bg-glass)',
                  border: selectedVid === v.id ? '1px solid #FB923C' : '1px solid var(--border-subtle)',
                  transition: 'all 0.15s'
                }}>
                  <div style={{ width: '60px', height: '45px', background: '#1e293b', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>{v.thumbnail}</div>
                  <div>
                    <h5 style={{ fontSize: '0.8rem', color: '#fff', margin: 0, lineHeight: 1.3 }}>{v.title}</h5>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{v.creator}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------- Smart Phonetic TTS Engine ----------
function speakLocalizedText(text: string, language: Language) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  
  let adjustedText = text;
  let voiceLang = 'en-US';
  
  if (language === 'kiswahili') {
    voiceLang = 'sw-KE';
  } else if (language === 'kikuyu') {
    adjustedText = text
      .replace(/ĩ/g, 'e')
      .replace(/ũ/g, 'o')
      .replace(/g/g, 'gh')
      .replace(/th/g, 'dh');
    voiceLang = 'it-IT'; // Italian or Spanish voice pronounces Kikuyu vowels beautifully!
  } else if (language === 'luo') {
    adjustedText = text.replace(/ny/g, 'ni').replace(/dh/g, 'th');
    voiceLang = 'es-ES'; // Spanish voice handles Luo vowel patterns well
  } else if (language === 'somali') {
    adjustedText = text.replace(/c/g, 'ah').replace(/x/g, 'h');
    voiceLang = 'ar-SA'; // Arabic-themed phonetics
  }

  const utterance = new SpeechSynthesisUtterance(adjustedText);
  const voices = window.speechSynthesis.getVoices();
  let selectedVoice = voices.find(v => v.lang.toLowerCase().startsWith(voiceLang.split('-')[0].toLowerCase()));
  
  if (!selectedVoice && language === 'kiswahili') {
    selectedVoice = voices.find(v => v.lang.startsWith('sw') || v.lang.startsWith('en'));
  }
  
  if (selectedVoice) {
    utterance.voice = selectedVoice;
  }
  
  utterance.pitch = 1.25;
  utterance.rate = 0.85; // Slow down for children to learn correct syllables
  
  window.speechSynthesis.speak(utterance);
}

// ---------- Dashboard Lugha & Tracing Section ----------
function LughaSection({ language }: { language: Language }) {
  const [subTab, setSubTab] = useState<'cards' | 'tracing' | 'dictionary'>('cards');
  const [newWord, setNewWord] = useState('');
  const [wordBank, setWordBank] = useState<{ english: string; kiswahili: string; kikuyu: string; luo: string; somali: string }[]>([]);
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('robokid_word_bank');
    if (stored) {
      setWordBank(JSON.parse(stored));
    }
  }, []);

  const handleTranslateNewWord = async () => {
    if (!newWord.trim()) return;
    playClick();
    setIsTranslating(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'translation',
          topic: newWord.trim(),
          language: 'english'
        })
      });
      const data = await response.json();
      if (data && data.content) {
        const lines = data.content.split('\n');
        const getVal = (prefix: string) => {
          const found = lines.find((l: string) => l.includes(prefix));
          return found ? found.split(':')[1]?.trim() : '';
        };
        const parsed = {
          english: getVal('English') || newWord,
          kiswahili: getVal('Kiswahili') || '',
          kikuyu: getVal('Gĩkũyũ') || getVal('Kikuyu') || '',
          luo: getVal('Dholuo') || getVal('Luo') || '',
          somali: getVal('Somali') || ''
        };

        const updated = [parsed, ...wordBank];
        setWordBank(updated);
        localStorage.setItem('robokid_word_bank', JSON.stringify(updated));
        setNewWord('');
        playSuccess();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsTranslating(false);
    }
  };

  const handleClearWordBank = () => {
    const confirmMsg = language === 'kiswahili' ? 'Je, ungependa kufuta kamusi yako ya maneno?' :
                       language === 'kikuyu' ? 'Nĩũgũthambia ibuku rĩaku rĩa ciugo?' :
                       language === 'luo' ? 'I dwaro rucho buk mari mar weche?' :
                       language === 'somali' ? 'Ma rabtaa inaad nadiifiso qaamuuskaaga?' :
                       'Clear your personal dictionary?';

    if (confirm(confirmMsg)) {
      playClick();
      localStorage.removeItem('robokid_word_bank');
      setWordBank([]);
    }
  };

  const subTabLabels = {
    cards: {
      english: '🗣️ Flashcards',
      kiswahili: '🗣️ Kadi za Msamiati',
      kikuyu: '🗣️ Kadi cia Ciugo',
      luo: '🗣️ Kadi mar Weche',
      somali: '🗣️ Kaararka Erayada'
    },
    tracing: {
      english: '✍️ Tracing Lab',
      kiswahili: '✍️ Karakana ya Kuandika',
      kikuyu: '✍️ Wĩra wa Kwandĩka',
      luo: '✍️ Kar Ndiko',
      somali: '✍️ Waaxda Qorista'
    },
    dictionary: {
      english: '📖 My Word Bank',
      kiswahili: '📖 Benki ya Maneno',
      kikuyu: '📖 Akiba ya Ciugo',
      luo: '📖 Buk mar Weche',
      somali: '📖 Kaydkayga Erayada'
    }
  };

  const dictLabels = {
    title: {
      english: 'MY DICTIONARY',
      kiswahili: 'KAMUSI YANGU',
      kikuyu: 'IBUKU RĨAKWA RĨA CIUGO',
      luo: 'BUK MARA MAR WECHE',
      somali: 'QAAMUUSKAYGA'
    },
    learned: {
      english: 'words learned',
      kiswahili: 'maneno yaliyojifunza',
      kikuyu: 'ciugo cia kũmenya',
      luo: 'weche ma apuonjra',
      somali: 'erayada la bartay'
    },
    clear: {
      english: 'Clear Dictionary',
      kiswahili: 'Futa Kamusi',
      kikuyu: 'Thambia Ibuku',
      luo: 'Ruch Buk',
      somali: 'Nadiifi Qaamuuska'
    },
    emptyTitle: {
      english: 'Your personal word bank is empty!',
      kiswahili: 'Benki yako ya maneno ni tupu!',
      kikuyu: 'Akiba yaku ya ciugo nĩ mũthuuri!',
      luo: 'Buk mari mar weche onge gimoro!',
      somali: 'Kaydkaaga erayadu waa maran yahay!'
    },
    emptyDesc: {
      english: 'Type an English word above to start compiling your mother tongue dictionary.',
      kiswahili: 'Andika neno la Kiingereza hapo juu ili kuanza kukusanya kamusi ya lugha yako ya mama.',
      kikuyu: 'Andĩka kiugo kĩa Gĩthungũ igũrũ nĩguo wambĩrĩrie gũkũria ibuku rĩaku rĩa kĩmũriũ.',
      luo: 'Ket wach mar Dho-Rachar malo ka to ichak loso buk mari mar dhoru.',
      somali: 'Qor eray Ingiriisi ah xagga sare si aad u bilowdo dhisidda qaamuuskaaga afka hooyo.'
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Sub tabs */}
      <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem', flexWrap: 'wrap' }}>
        {(['cards', 'tracing', 'dictionary'] as const).map(tabKey => (
          <button 
            key={tabKey}
            onClick={() => { playClick(); setSubTab(tabKey); }}
            style={{
              background: 'none', border: 'none', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer',
              color: subTab === tabKey ? 'var(--color-primary-light)' : 'var(--text-secondary)',
              borderBottom: subTab === tabKey ? '3px solid var(--color-primary)' : 'none',
              paddingBottom: '0.5rem', fontFamily: 'var(--font-fun)',
            }}
          >
            {subTabLabels[tabKey][language]}
          </button>
        ))}
      </div>

      {subTab === 'cards' && <MotherTongueCard />}
      {subTab === 'tracing' && <HandwritingPractice language={language} />}
      {subTab === 'dictionary' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div className="glass-card" style={{ padding: '1.5rem', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ fontFamily: 'var(--font-fun)', fontSize: '1.2rem', color: '#FFF', margin: 0 }}>
              {translateUI('personal_dictionary_title', language)}
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
              {translateUI('personal_dictionary_desc', language)}
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', width: '100%', flexWrap: 'wrap' }}>
              <input
                type="text"
                value={newWord}
                onChange={e => setNewWord(e.target.value)}
                placeholder={translateUI('personal_dictionary_placeholder', language)}
                disabled={isTranslating}
                style={{
                  flex: 1,
                  minWidth: '200px',
                  padding: '0.75rem 1rem',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid var(--border-subtle)',
                  color: '#FFF',
                  fontFamily: 'var(--font-body)',
                  outline: 'none',
                  fontSize: '0.95rem'
                }}
              />
              <button
                onClick={handleTranslateNewWord}
                disabled={isTranslating}
                className="btn btn-primary"
                style={{ padding: '0.75rem 1.5rem', whiteSpace: 'nowrap' }}
              >
                {isTranslating ? (language === 'kiswahili' ? '🔍 Inatafsiri...' : '🔍 Mining...') : translateUI('personal_dictionary_btn', language)}
              </button>
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <h4 style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0, fontWeight: 700 }}>
                {dictLabels.title[language]} ({wordBank.length} {dictLabels.learned[language]})
              </h4>
              {wordBank.length > 0 && (
                <button 
                  onClick={handleClearWordBank} 
                  className="btn btn-secondary btn-sm"
                  style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#F87171', borderColor: 'rgba(239, 68, 68, 0.2)' }}
                >
                  {dictLabels.clear[language]}
                </button>
              )}
            </div>

            {wordBank.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem 1.5rem', background: 'var(--bg-glass)', borderRadius: '16px', border: '1px dashed var(--border-subtle)' }}>
                <span style={{ fontSize: '3rem' }}>📖</span>
                <h4 style={{ fontFamily: 'var(--font-fun)', color: 'var(--text-secondary)', margin: '0.5rem 0' }}>{dictLabels.emptyTitle[language]}</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', margin: 0 }}>{dictLabels.emptyDesc[language]}</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
                {wordBank.map((item, idx) => (
                  <div key={idx} className="glass-card" style={{ padding: '1.25rem', border: '1px solid var(--border-subtle)', borderRadius: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                      <h4 style={{ color: 'var(--color-primary-light)', margin: 0, fontSize: '1.05rem', textTransform: 'capitalize' }}>
                        🇬🇧 {item.english}
                      </h4>
                      <button 
                        onClick={() => {
                          playClick();
                          const activeTrans = language === 'kiswahili' ? item.kiswahili : language === 'kikuyu' ? item.kikuyu : language === 'luo' ? item.luo : language === 'somali' ? item.somali : item.english;
                          speakLocalizedText(activeTrans, language);
                        }}
                        style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.9rem' }}
                      >
                        🔊
                      </button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.85rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Kiswahili:</span>
                        <strong style={{ color: '#FFF' }}>{item.kiswahili || '-'}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Gĩkũyũ:</span>
                        <strong style={{ color: '#FFF' }}>{item.kikuyu || '-'}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Dholuo:</span>
                        <strong style={{ color: '#FFF' }}>{item.luo || '-'}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Somali:</span>
                        <strong style={{ color: '#FFF' }}>{item.somali || '-'}</strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ---------- Textbook Lesson Notes & Exams ----------
interface LessonNote {
  id: string;
  title: string;
  icon: string;
  notes: string[];
  helperQuestion?: string;
  cbeExam?: {
    question: string;
    options: string[];
    correct: string;
    explanation: string;
  };
}

const LESSONS_BY_STAGE: Record<string, LessonNote[]> = {
  'g1-3': [
    {
      id: 'g13-n1',
      title: '🍎 Healthy Food Choices',
      icon: '🥗',
      notes: [
        'Eating good food keeps us strong and prevents diseases!',
        'We need Carbohydrates for energy (e.g. Ugali, Rice, Chapati).',
        'We need Proteins to grow muscles (e.g. Beans, Eggs, Milk, Fish).',
        'We need Vitamins to stay healthy (e.g. Mangoes, Bananas, Oranges).',
        'Remember to wash your hands with clean water before eating!'
      ],
      helperQuestion: '2 bananas and 3 mangoes',
      cbeExam: {
        question: 'Which of the following foods gives us energy to run and play?',
        options: ['A) Milk', 'B) Beans', 'C) Ugali', 'D) Spinach'],
        correct: 'C',
        explanation: 'Ugali is a carbohydrate which provides our bodies with clean energy!'
      }
    },
    {
      id: 'g13-n2',
      title: '🦒 Animals and Their Habitats',
      icon: '🐾',
      notes: [
        'Wild animals live in nature reserves and national parks in Kenya.',
        'Lions (Simba) sleep under acacia trees in the open Maasai Mara savanna.',
        'Giraffes (Twiga) eat green leaves from high branches using their long necks.',
        'Hippos (Kiboko) spend the hot sunny days floating in lake waters.',
        'We must protect animals and never destroy their forest homes.'
      ],
      helperQuestion: '3 lions and 2 giraffes',
      cbeExam: {
        question: 'Where would you find Simba (the lion) in Kenya?',
        options: ['A) Floating in Lake Victoria', 'B) In the open savanna grasslands', 'C) On top of Mount Kenya', 'D) In a school garden'],
        correct: 'B',
        explanation: 'Lions live in grasslands and savanna environments like the Maasai Mara.'
      }
    }
  ],
  'g4-6': [
    {
      id: 'g46-n1',
      title: '🌱 Soil and Kitchen Gardens',
      icon: '🌻',
      notes: [
        'Soil is where we plant vegetables and fruits for our food.',
        'Terracing and cover cropping are ways we stop soil erosion (loss).',
        'Kitchen gardens (sack gardens) let us grow food in small spaces at school!',
        'Organic manure (compost) feeds soil with nutrients to grow healthy plants.',
        'Worms and insects help keep soil loose and healthy.'
      ],
      helperQuestion: '4 apples and 2 oranges',
      cbeExam: {
        question: 'How can we prevent soil from washing away when it rains?',
        options: ['A) Watering the soil more', 'B) Planting cover crops and trees', 'C) Digging up the soil', 'D) Leaving the soil bare'],
        correct: 'B',
        explanation: 'Plants roots hold the soil particles together, stopping erosion!'
      }
    },
    {
      id: 'g46-n2',
      title: '📐 Geometric Shapes & Drawing',
      icon: '📐',
      notes: [
        'Geometry is the branch of math studying shapes and spaces.',
        'A square has exactly 4 equal straight sides and 4 corners.',
        'A circle is perfectly round and curved. It has no straight edges.',
        'A triangle has 3 sides and 3 angles. Its angles sum up to 180 degrees!',
        'You can draw shapes using simple loops and algorithms!'
      ],
      helperQuestion: 'drawing a square, circle, and triangle',
      cbeExam: {
        question: 'Which of the following shapes has 3 sides and 3 corners?',
        options: ['A) Circle', 'B) Square', 'C) Triangle', 'D) Rectangle'],
        correct: 'C',
        explanation: 'Triangles are defined by having exactly 3 sides and 3 angles!'
      }
    }
  ],
  'advanced': [
    {
      id: 'adv-n1',
      title: '🤖 How Artificial Intelligence Learns',
      icon: '🧠',
      notes: [
        'Artificial Intelligence uses computers to do smart tasks.',
        'Neural networks are computing networks inspired by the human brain.',
        'Computers learn by looking at patterns in millions of data examples.',
        'Weights adjust when errors are found, similar to trial-and-error learning.',
        'This allows robots to recognize faces, drive cars, and translate languages.'
      ],
      helperQuestion: '5 stars',
      cbeExam: {
        question: 'What is a neural network in Artificial Intelligence?',
        options: ['A) A metal spider web on robots', 'B) An algorithm inspired by how the human brain learns', 'C) A system to catch fish in the ocean', 'D) A type of computer keyboard'],
        correct: 'B',
        explanation: 'Neural networks mimic biological neurons to process complex patterns and learn!'
      }
    },
    {
      id: 'adv-n2',
      title: '🔌 Sensors & Actuators in Robotics',
      icon: '⚙️',
      notes: [
        'Robots interact with the physical world using sensors (inputs).',
        'Distance sensors (ultrasonic) bounce sound waves to detect walls.',
        'Light sensors allow robots to follow black lines on floors.',
        'Actuators (outputs like motors) receive signals to perform movements.',
        'Microcontrollers (like Arduino) connect the sensors and motors together.'
      ],
      helperQuestion: 'drawing a square',
      cbeExam: {
        question: 'Which component does a robot use to measure how far away a wall is?',
        options: ['A) Motor', 'B) Battery', 'C) Distance sensor', 'D) Display screen'],
        correct: 'C',
        explanation: 'Distance sensors (ultrasonic) send sound pulses to compute distances.'
      }
    }
  ]
};

function TextbookNotesPanel({ stage, selectedGrade }: { stage: string; selectedGrade: Grade }) {
  const list = LESSONS_BY_STAGE[stage] || LESSONS_BY_STAGE['g1-3'];
  const [activeLessonIdx, setActiveLessonIdx] = useState(0);
  const [cbeAnswered, setCbeAnswered] = useState(false);
  const [cbeSelected, setCbeSelected] = useState<string | null>(null);
  const [cbeFeedback, setCbeFeedback] = useState<string | null>(null);

  const lesson = list[activeLessonIdx];

  const handleCbeSelect = (optionChar: string) => {
    if (cbeAnswered) return;
    setCbeSelected(optionChar);
    setCbeAnswered(true);
    if (optionChar === lesson.cbeExam?.correct) {
      playCorrect();
      setCbeFeedback('🎉 Correct! ' + lesson.cbeExam?.explanation);
    } else {
      playIncorrect();
      setCbeFeedback('❌ Incorrect. ' + lesson.cbeExam?.explanation);
    }
  };

  return (
    <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', borderRadius: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <span style={{ fontSize: '2.5rem' }}>📚</span>
        <div>
          <h2 style={{ fontFamily: 'var(--font-fun)', fontSize: '1.5rem' }}>CBC Textbook Notes & CBE Exams</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Read rationalized lessons and test yourself with current exams.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {/* Left: Lessons Outline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <h4 style={{ fontFamily: 'var(--font-display)', color: 'var(--text-muted)' }}>Lessons Outline:</h4>
          {list.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => { playClick(); setActiveLessonIdx(idx); setCbeAnswered(false); setCbeSelected(null); setCbeFeedback(null); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem',
                borderRadius: '16px',
                border: activeLessonIdx === idx ? '2px solid var(--color-primary)' : '1px solid var(--border-subtle)',
                background: activeLessonIdx === idx ? 'rgba(99,102,241,0.1)' : 'var(--bg-glass)',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s',
              }}
            >
              <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
              <div>
                <h4 style={{ color: '#FFF', fontSize: '0.9rem', marginBottom: 2 }}>{item.title}</h4>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Read &amp; Test</span>
              </div>
            </button>
          ))}
        </div>

        {/* Right: Chalkboard notes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <BlackboardNote
            title={lesson.title}
            notes={lesson.notes}
          />
          {lesson.helperQuestion && (
            <div style={{ background: 'var(--bg-glass)', padding: '1rem', borderRadius: '16px', border: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>VISUAL MATHEMATICAL HELPER:</span>
              <VisualMathHelper question={lesson.helperQuestion} />
            </div>
          )}
        </div>
      </div>

      {/* CBE Exam card */}
      {lesson.cbeExam && (
        <div style={{ background: 'var(--bg-glass-strong)', borderRadius: '20px', padding: '1.5rem', border: '1px solid rgba(99,102,241,0.2)' }}>
          <span className="badge badge-warning" style={{ marginBottom: '0.75rem' }}>📝 CBE Practice Exam</span>
          <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: '#FFF', marginBottom: '1rem', lineHeight: 1.5 }}>
            {lesson.cbeExam.question}
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1rem' }}>
            {lesson.cbeExam.options.map(opt => {
              const optionChar = opt.trim().substring(0, 1);
              const isSelected = cbeSelected === optionChar;
              const isCorrect = optionChar === lesson.cbeExam?.correct;
              let bg = 'var(--bg-glass)';
              let border = '1px solid var(--border-subtle)';
              
              if (cbeAnswered && isCorrect) {
                bg = 'rgba(16,185,129,0.15)';
                border = '1px solid #10B981';
              } else if (cbeAnswered && isSelected && !isCorrect) {
                bg = 'rgba(239,68,68,0.15)';
                border = '1px solid #EF4444';
              } else if (isSelected) {
                bg = 'rgba(99,102,241,0.15)';
                border = '1px solid var(--color-primary)';
              }

              return (
                <button
                  key={opt}
                  onClick={() => handleCbeSelect(optionChar)}
                  style={{
                    padding: '0.75rem 1rem',
                    borderRadius: '12px',
                    background: bg,
                    border,
                    color: 'var(--text-primary)',
                    textAlign: 'left',
                    cursor: cbeAnswered ? 'default' : 'pointer',
                    fontSize: '0.85rem',
                    transition: 'all 0.15s',
                  }}
                >
                  {opt}
                </button>
              );
            })}
          </div>
          {cbeFeedback && (
            <p style={{
              fontSize: '0.85rem',
              color: cbeFeedback.includes('Correct') ? '#34D399' : '#F87171',
              fontFamily: 'var(--font-fun)',
              lineHeight: 1.5
            }}>{cbeFeedback}</p>
          )}
        </div>
      )}
    </div>
  );
}

// ---------- Main Dashboard ----------
export default function DashboardPage() {
  const router = useRouter();
  const [stage, setStage] = useState<string>('g1-3');
  const [selectedGrade, setSelectedGrade] = useState<Grade>(1);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('english');
  const [activeSubject, setActiveSubject] = useState<Subject | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [activeTab, setActiveTab] = useState<'learn' | 'notes' | 'quiz' | 'code' | 'music' | 'ai' | 'generate' | 'gallery' | 'videos' | 'lugha'>('learn');
  const [isBeatActive, setIsBeatActive] = useState(false);
  const [isGatedLoaded, setIsGatedLoaded] = useState(false);
  const [isBrightTheme, setIsBrightTheme] = useState(false);
  const [celebratedToy, setCelebratedToy] = useState<Toy | null>(null);

  // Listen to virtual toy award events
  useEffect(() => {
    const handleAward = (e: Event) => {
      const customEvent = e as CustomEvent<{ toyId: string }>;
      const toyId = customEvent.detail.toyId;
      const { success, toy } = awardToy(toyId);
      if (success && toy) {
        setCelebratedToy(toy);
      }
    };
    window.addEventListener('robokid-award-toy', handleAward);
    return () => window.removeEventListener('robokid-award-toy', handleAward);
  }, []);

  // Initialize theme state on load
  useEffect(() => {
    const saved = localStorage.getItem('robokid-theme');
    if (saved === 'bright') {
      setIsBrightTheme(true);
      document.documentElement.classList.add('bright-theme');
    }
  }, []);

  const toggleTheme = () => {
    playClick();
    if (isBrightTheme) {
      localStorage.setItem('robokid-theme', 'dark');
      document.documentElement.classList.remove('bright-theme');
      setIsBrightTheme(false);
    } else {
      localStorage.setItem('robokid-theme', 'bright');
      document.documentElement.classList.add('bright-theme');
      setIsBrightTheme(true);
    }
  };

  // Check stage gating on load
  useEffect(() => {
    const storedStage = localStorage.getItem('robokid-stage');
    const storedGrade = localStorage.getItem('robokid-selected-grade');
    
    if (!storedStage) {
      router.push('/select-grade');
    } else {
      setStage(storedStage);
      if (storedGrade) {
        setSelectedGrade(Number(storedGrade) as Grade);
      } else {
        setSelectedGrade(storedStage === 'g1-3' ? 1 : storedStage === 'g4-6' ? 4 : 7);
      }
      setIsGatedLoaded(true);
    }
  }, [router]);

  const toggleBackingTrack = () => {
    playClick();
    if (isBeatActive) {
      stopBackingBeat();
      setIsBeatActive(false);
    } else {
      startBackingBeat();
      setIsBeatActive(true);
    }
  };

  // Stop beat when leaving dashboard
  useEffect(() => {
    return () => {
      stopBackingBeat();
    };
  }, []);

  if (!isGatedLoaded) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#050816' }}>
        <MiniRobot mood="thinking" size={80} />
      </div>
    );
  }

  // Filter grades to show in selector based on selected stage
  const visibleGrades = GRADES.filter(g => {
    if (stage === 'g1-3') return g.grade >= 1 && g.grade <= 3;
    if (stage === 'g4-6') return g.grade >= 4 && g.grade <= 6;
    if (stage === 'advanced') return g.grade === 7;
    return g.grade <= 3;
  });

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
              <button 
                onClick={toggleBackingTrack} 
                className="btn btn-secondary btn-sm" 
                style={{
                  background: isBeatActive ? 'rgba(16, 185, 129, 0.2)' : 'var(--bg-glass)',
                  borderColor: isBeatActive ? '#10B981' : 'var(--border-subtle)',
                  color: isBeatActive ? '#10B981' : 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                {isBeatActive ? '🎵 Beats On' : '🔇 Beats Off'}
              </button>
            </li>
            <li>
              <button 
                onClick={toggleTheme} 
                className="btn btn-secondary btn-sm" 
                style={{
                  background: isBrightTheme ? 'rgba(251, 191, 36, 0.2)' : 'var(--bg-glass)',
                  borderColor: isBrightTheme ? '#FBBF24' : 'var(--border-subtle)',
                  color: isBrightTheme ? '#D97706' : 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                {isBrightTheme ? '🎒 Bright Mode' : '🌌 Dark Mode'}
              </button>
            </li>
            <li>
              <div className="language-toggle">
                {LANGUAGES.map(lang => (
                  <button key={lang.code} className={`language-btn ${selectedLanguage === lang.code ? 'active' : ''}`} onClick={() => { playClick(); setSelectedLanguage(lang.code); }}>
                    {lang.flag} {lang.code.substring(0, 2).toUpperCase()}
                  </button>
                ))}
              </div>
            </li>
          </ul>
        </div>
      </nav>

      <div className="container" style={{ paddingBottom: '4rem' }}>
        {/* Flashy Marquee */}
        <div className="marquee-wrapper" style={{
          background: 'linear-gradient(90deg, rgba(99,102,241,0.1) 0%, rgba(236,72,153,0.1) 50%, rgba(99,102,241,0.1) 100%)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '16px',
          padding: '0.6rem 1rem',
          marginBottom: '2rem',
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          boxShadow: '0 0 15px rgba(99, 102, 241, 0.05)'
        }}>
          <div style={{
            background: 'var(--gradient-robot)',
            color: 'white',
            padding: '0.2rem 0.6rem',
            borderRadius: '8px',
            fontSize: '0.75rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            marginRight: '1rem',
            whiteSpace: 'nowrap',
            boxShadow: '0 0 10px rgba(236,72,153,0.3)',
            zIndex: 10
          }}>
            ⚡ NEWS
          </div>
          <div style={{
            overflow: 'hidden',
            width: '100%',
            position: 'relative',
            display: 'flex',
            alignItems: 'center'
          }}>
            <div style={{
              display: 'inline-block',
              whiteSpace: 'nowrap',
              animation: 'marqueeContinuous 30s linear infinite',
              paddingLeft: '100%',
              fontSize: '0.9rem',
              fontWeight: 600,
              color: '#FFF',
              textShadow: '0 0 8px rgba(255,255,255,0.2)'
            }}>
              {translateUI('marquee_welcome', selectedLanguage)}
            </div>
          </div>
        </div>

        {/* Welcome Header */}
        <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <MiniRobot mood="happy" size={56} />
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800 }}>
              {translateUI('welcome_prefix', selectedLanguage)} RoboKid! 🎉
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              {translateUI('current_stage_label', selectedLanguage)} <strong style={{ color: '#FB923C', textTransform: 'uppercase' }}>{translateUI('stage_' + stage, selectedLanguage)}</strong> · Grade {selectedGrade} · {LANGUAGES.find(l => l.code === selectedLanguage)?.label}
            </p>
          </div>
          
          <button 
            onClick={() => { playClick(); router.push('/select-grade'); }} 
            className="btn btn-secondary btn-sm"
            style={{ marginLeft: 'auto', border: '1px dashed #6366f1', color: '#818cf8' }}
          >
            🔄 {translateUI('switch_stage', selectedLanguage)}
          </button>
        </div>

        {/* Grade Selector (only shows grade options for current stage) */}
        {visibleGrades.length > 1 && (
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
            {visibleGrades.map(g => (
              <button key={g.grade} onClick={() => { playClick(); setSelectedGrade(g.grade); setActiveSubject(null); setShowQuiz(false); }} style={{
                padding: '0.6rem 1.5rem', borderRadius: 'var(--radius-full)', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.9rem',
                background: selectedGrade === g.grade ? g.color : 'var(--bg-glass)', color: selectedGrade === g.grade ? '#050816' : 'var(--text-secondary)',
                border: selectedGrade === g.grade ? 'none' : '1px solid var(--border-subtle)', cursor: 'pointer',
                transition: 'all var(--transition-fast)', transform: selectedGrade === g.grade ? 'scale(1.05)' : 'scale(1)',
              }}>
                {g.emoji} {g.label}
              </button>
            ))}
          </div>
        )}

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: '0.25rem', padding: '4px', background: 'var(--bg-glass)', borderRadius: 'var(--radius-full)', marginBottom: '2rem', border: '1px solid var(--border-subtle)', width: 'fit-content', flexWrap: 'wrap' }}>
          {[
            { key: 'learn' as const, label: '📚 Learn' },
            { key: 'notes' as const, label: '📖 Textbook Notes' },
            { key: 'quiz' as const, label: '📝 Exams' },
            { key: 'code' as const, label: '💻 Code Lab' },
            { key: 'music' as const, label: '🎹 Music Lab' },
            { key: 'ai' as const, label: '🤖 AI' },
            { key: 'generate' as const, label: '✨ Generate' },
            { key: 'gallery' as const, label: '🎨 Gallery' },
            { key: 'videos' as const, label: '🧸 Toys & Cartoons' },
            { key: 'lugha' as const, label: '👅 Lugha Yetu' }
          ].map(tab => (
            <button key={tab.key} onClick={() => { playClick(); setActiveTab(tab.key as any); setShowQuiz(false); setActiveSubject(null); }} style={{
              padding: '0.5rem 1.25rem', borderRadius: 'var(--radius-full)', fontSize: '0.9rem', fontWeight: 500,
              background: activeTab === tab.key ? 'var(--color-primary)' : 'transparent',
              color: activeTab === tab.key ? 'white' : 'var(--text-secondary)',
              border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)',
              transition: 'all var(--transition-fast)',
            }}>
              {translateUI('tab_' + (tab.key === 'videos' ? 'toys' : tab.key), selectedLanguage)}
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
            <button onClick={() => { playClick(); setActiveSubject(null); }} className="btn btn-secondary btn-sm" style={{ marginBottom: '1.5rem' }}>
              ← Back to Subjects
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ width: 64, height: 64, borderRadius: 16, background: `${SUBJECTS[activeSubject].color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>{SUBJECTS[activeSubject].icon}</div>
              <div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem' }}>{SUBJECTS[activeSubject].name}</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Grade {selectedGrade} · {getTopicsByGradeAndSubject(selectedGrade, activeSubject).length} topics</p>
              </div>
              {quizQuestions.length > 0 && (
                <button className="btn btn-primary btn-sm" onClick={() => { playClick(); setShowQuiz(true); }} style={{ marginLeft: 'auto' }}>
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
            <button onClick={() => { playClick(); setShowQuiz(false); }} className="btn btn-secondary btn-sm" style={{ marginBottom: '1.5rem' }}>
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
                  <button key={subject} className="glass-card" onClick={() => { playClick(); setActiveSubject(subject); setShowQuiz(true); setActiveTab('learn'); }} style={{
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

        {activeTab === 'videos' && <ToysAndCartoonsTab />}

        {activeTab === 'lugha' && <LughaSection language={selectedLanguage} />}

        {activeTab === 'music' && <Piano />}

        {activeTab === 'notes' && <TextbookNotesPanel stage={stage} selectedGrade={selectedGrade} />}
        
        {/* Flashy Localhost Button & Footer */}
        <footer style={{
          marginTop: '5rem',
          paddingTop: '2rem',
          borderTop: '1px solid var(--border-subtle)',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            RoboKid AI CBC Learning Hub © 2026. Made with ❤️ in Kenya.
          </p>
          <a 
            href="http://localhost:3000" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="localhost-button"
            onClick={playSuccess}
          >
            🚀 Open Localhost Server (http://localhost:3000)
          </a>
        </footer>
      </div>

      {/* 🌟 TOY AWARD CELEBRATION MODAL 🌟 */}
      {celebratedToy && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          background: 'rgba(5, 8, 22, 0.95)', zIndex: 9999, display: 'flex',
          alignItems: 'center', justifyContent: 'center', padding: '2rem',
          animation: 'fadeIn 0.3s ease'
        }}>
          {/* Confetti styling */}
          <style>{`
            @keyframes confettiFall {
              0% { transform: translateY(-50px) rotate(0deg); opacity: 1; }
              100% { transform: translateY(105vh) rotate(360deg); opacity: 0; }
            }
            .confetti-piece {
              position: absolute;
              width: 10px;
              height: 10px;
              border-radius: 50%;
              animation: confettiFall 4s linear infinite;
            }
          `}</style>
          
          {/* Scatter Confetti Pieces */}
          {Array.from({ length: 40 }).map((_, i) => {
            const left = `${Math.random() * 100}%`;
            const delay = `${Math.random() * 4}s`;
            const color = ['#FF4B5C', '#FF8A5B', '#FFC75F', '#4E9F3D', '#1089FF', '#845EC2', '#FF96AD'][i % 7];
            return (
              <div 
                key={i} 
                className="confetti-piece" 
                style={{ left, top: '-20px', background: color, animationDelay: delay }} 
              />
            );
          })}

          <div 
            className="glass-card animate-bounce-subtle" 
            style={{
              padding: '3rem 2rem',
              maxWidth: '480px',
              textAlign: 'center',
              borderRadius: '32px',
              border: `3px solid ${celebratedToy.color}`,
              boxShadow: `0 0 40px ${celebratedToy.color}`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.25rem',
              background: '#0B0F19'
            }}
          >
            <div style={{ fontSize: '7rem', filter: 'drop-shadow(0 0 15px rgba(255,255,255,0.4))' }}>
              {celebratedToy.emoji}
            </div>
            <h2 style={{ fontFamily: 'var(--font-fun)', fontSize: '2rem', color: '#FFF', margin: 0, textShadow: '0 0 10px rgba(99,102,241,0.5)' }}>
              🌟 Toy Unlocked! 🌟
            </h2>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: celebratedToy.color, margin: 0 }}>
              {celebratedToy.name}
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.5, margin: 0 }}>
              {celebratedToy.description}
            </p>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '16px', border: '1px solid var(--border-subtle)', width: '100%' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>🎯 How you unlocked it:</span>
              <span style={{ color: '#34D399', fontSize: '0.9rem', fontWeight: 600 }}>{celebratedToy.howToUnlock}</span>
            </div>
            
            <div style={{ display: 'flex', gap: '0.75rem', width: '100%', marginTop: '1rem' }}>
              <button 
                onClick={() => {
                  playClick();
                  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                    window.speechSynthesis.cancel();
                    const utterance = new SpeechSynthesisUtterance(celebratedToy.audioText);
                    utterance.pitch = 1.35;
                    utterance.rate = 1.0;
                    window.speechSynthesis.speak(utterance);
                  }
                }}
                className="btn btn-secondary"
                style={{ flex: 1, padding: '0.75rem', fontSize: '0.95rem' }}
              >
                🔊 Make Sound
              </button>
              <button 
                onClick={() => {
                  playClick();
                  setCelebratedToy(null);
                  setActiveTab('videos');
                }}
                className="btn btn-primary"
                style={{ flex: 1, padding: '0.75rem', fontSize: '0.95rem', background: celebratedToy.color, borderColor: celebratedToy.color }}
              >
                Put on my Shelf
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
