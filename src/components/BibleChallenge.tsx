'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  BIBLE_VERSES, BIBLE_STORIES, BIBLE_CHALLENGES,
  getVerseByLanguage, getChallengesByLanguage, getStoriesByGrade,
  getVersesByGrade, getStoryTitle, getStorySummary, getStoryLesson,
  type BibleLanguage, type BibleVerse, type BibleStory, type BibleChallenge as BibleChallengeType,
} from '@/lib/bible-data';

interface BibleChallengeProps {
  grade: number;
  initialLanguage?: BibleLanguage;
}

const LANG_LABELS: Record<BibleLanguage, string> = {
  english: '🇬🇧 English Bible',
  kiswahili: '🇰🇪 Biblia ya Kiswahili',
  kikuyu: '🏔️ Baibũri ya Gĩkũyũ',
  luo: '🐟 Muma mar Dholuo',
};

const LANG_GREETING: Record<BibleLanguage, string> = {
  english: 'Welcome to Bible Study! ✝️',
  kiswahili: 'Karibu Masomo ya Biblia! ✝️',
  kikuyu: 'Nĩwirĩkĩo Mĩthomĩre ya Baibũri! ✝️',
  luo: 'Ber Obiro Puonj Muma! ✝️',
};

const SECTION_LABELS: Record<BibleLanguage, { verses: string; stories: string; challenge: string; memory: string }> = {
  english: { verses: '📖 Verses', stories: '📚 Stories', challenge: '🎯 Challenge', memory: '🧠 Memory' },
  kiswahili: { verses: '📖 Mistari', stories: '📚 Hadithi', challenge: '🎯 Changamoto', memory: '🧠 Kumbukumbu' },
  kikuyu: { verses: '📖 Andĩko', stories: '📚 Ngano', challenge: '🎯 Kĩhoto', memory: '🧠 Mĩĩkaro' },
  luo: { verses: '📖 Wechegi', stories: '📚 Sigano', challenge: '🎯 Ritruok', memory: '🧠 Paro' },
};

function speak(text: string, lang: BibleLanguage) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = lang === 'kiswahili' ? 'sw-KE' : lang === 'kikuyu' ? 'en-KE' : lang === 'luo' ? 'en-KE' : 'en-GB';
  utter.rate = 0.85;
  utter.pitch = 1.1;
  window.speechSynthesis.speak(utter);
}

// ===================== VERSE CARD =====================
function VerseCard({ verse, lang }: { verse: BibleVerse; lang: BibleLanguage }) {
  const [expanded, setExpanded] = useState(false);
  const text = getVerseByLanguage(verse, lang);

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      style={{
        background: 'linear-gradient(135deg, rgba(120,113,108,0.12) 0%, rgba(87,83,78,0.08) 100%)',
        border: '2px solid rgba(120,113,108,0.3)',
        borderRadius: 20,
        padding: '1.25rem',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        transform: expanded ? 'scale(1.01)' : 'scale(1)',
        boxShadow: expanded ? '0 8px 32px rgba(120,113,108,0.2)' : 'none',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: expanded ? '0.75rem' : 0 }}>
        <span style={{ fontSize: '2rem' }}>{verse.emojiIcon}</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#D4A853' }}>{verse.reference}</div>
          <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: 1 }}>{verse.theme}</div>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); speak(text, lang); }}
          style={{ background: 'rgba(212,168,83,0.15)', border: '1px solid rgba(212,168,83,0.3)', borderRadius: 10, padding: '6px 10px', cursor: 'pointer', fontSize: '1rem' }}
          title="Hear this verse"
        >🔊</button>
        <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>{expanded ? '▲' : '▼'}</span>
      </div>
      {expanded && (
        <div style={{
          fontSize: '1rem',
          lineHeight: 1.8,
          color: 'rgba(255,255,255,0.9)',
          fontStyle: 'italic',
          padding: '0.75rem',
          background: 'rgba(255,255,255,0.04)',
          borderRadius: 12,
          borderLeft: '4px solid #D4A853',
        }}>
          "{text}"
        </div>
      )}
    </div>
  );
}

// ===================== STORY CARD =====================
function StoryCard({ story, lang }: { story: BibleStory; lang: BibleLanguage }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(6,182,212,0.1) 0%, rgba(59,130,246,0.08) 100%)',
      border: '2px solid rgba(6,182,212,0.25)',
      borderRadius: 20,
      overflow: 'hidden',
    }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', textAlign: 'left', background: 'transparent', border: 'none',
          padding: '1.25rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1rem',
        }}
      >
        <div style={{ fontSize: '2.5rem' }}>{story.emojiScene}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: '1.05rem', color: '#22D3EE', marginBottom: 4 }}>
            {getStoryTitle(story, lang)}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)' }}>
            {story.book} {story.chapter} · Grade {story.grade}+
          </div>
        </div>
        <div style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.4)' }}>{open ? '▲' : '▼'}</div>
      </button>

      {open && (
        <div style={{ padding: '0 1.25rem 1.25rem' }}>
          {/* Summary */}
          <div style={{
            fontSize: '0.92rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.8)',
            padding: '1rem', background: 'rgba(255,255,255,0.04)', borderRadius: 12, marginBottom: '1rem',
          }}>
            {getStorySummary(story, lang)}
          </div>

          {/* Characters */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            {story.characters.map(c => (
              <span key={c} style={{
                fontSize: '0.75rem', padding: '3px 10px', borderRadius: 20,
                background: 'rgba(6,182,212,0.12)', color: '#22D3EE', border: '1px solid rgba(6,182,212,0.25)',
              }}>👤 {c}</span>
            ))}
          </div>

          {/* Lesson */}
          <div style={{
            padding: '0.875rem', background: 'rgba(52,211,153,0.08)',
            border: '1px solid rgba(52,211,153,0.25)', borderRadius: 12,
            display: 'flex', gap: '0.75rem', alignItems: 'flex-start',
          }}>
            <span style={{ fontSize: '1.5rem' }}>💡</span>
            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: '#34D399', marginBottom: 4, letterSpacing: 1 }}>Life Lesson</div>
              <div style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>
                {getStoryLesson(story, lang)}
              </div>
            </div>
          </div>

          <button
            onClick={() => speak(getStorySummary(story, lang) + '. ' + getStoryLesson(story, lang), lang)}
            style={{
              marginTop: '0.75rem', padding: '0.5rem 1rem', borderRadius: 10, border: '1px solid rgba(34,211,238,0.3)',
              background: 'rgba(34,211,238,0.1)', color: '#22D3EE', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600,
            }}
          >🔊 Listen to Story</button>
        </div>
      )}
    </div>
  );
}

// ===================== CHALLENGE PANEL =====================
function ChallengePanel({ grade, lang }: { grade: number; lang: BibleLanguage }) {
  const challenges = getChallengesByLanguage(lang, grade);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [finished, setFinished] = useState(false);

  const q = challenges[idx];

  const handleAnswer = (opt: string) => {
    if (answered) return;
    setSelected(opt);
    setAnswered(true);
    if (opt === q.correctAnswer) setScore(s => s + q.points);
  };

  const next = () => {
    if (idx + 1 >= challenges.length) {
      setFinished(true);
    } else {
      setIdx(idx + 1);
      setSelected(null);
      setAnswered(false);
    }
  };

  const restart = () => {
    setIdx(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setFinished(false);
  };

  if (challenges.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', color: 'rgba(255,255,255,0.5)' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📖</div>
        <p>No challenges yet for this language. More coming soon!</p>
      </div>
    );
  }

  if (finished) {
    const pct = Math.round((score / challenges.reduce((a, c) => a + c.points, 0)) * 100);
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>{pct >= 80 ? '🏆' : pct >= 50 ? '🌟' : '📖'}</div>
        <h3 style={{ fontSize: '1.5rem', color: '#D4A853', marginBottom: '0.5rem' }}>
          {pct >= 80 ? 'Excellent!' : pct >= 50 ? 'Good Job!' : 'Keep Learning!'}
        </h3>
        <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '1.5rem' }}>
          You scored <strong style={{ color: '#D4A853' }}>{score} points</strong> — {pct}%
        </p>
        <button
          onClick={restart}
          style={{
            padding: '0.75rem 2rem', borderRadius: 50, border: 'none',
            background: 'linear-gradient(135deg, #D4A853, #B8860B)',
            color: '#fff', fontWeight: 700, fontSize: '1rem', cursor: 'pointer',
          }}
        >🔄 Try Again</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 600 }}>
      {/* Progress */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ flex: 1, height: 8, background: 'rgba(255,255,255,0.1)', borderRadius: 4, overflow: 'hidden' }}>
          <div style={{ width: `${((idx) / challenges.length) * 100}%`, height: '100%', background: '#D4A853', borderRadius: 4, transition: 'width 0.5s' }} />
        </div>
        <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', whiteSpace: 'nowrap' }}>
          {idx + 1}/{challenges.length} · {score}pts
        </span>
      </div>

      {/* Question */}
      <div style={{
        padding: '1.5rem', background: 'rgba(212,168,83,0.08)',
        border: '2px solid rgba(212,168,83,0.25)', borderRadius: 20, marginBottom: '1.25rem',
      }}>
        <div style={{ fontSize: '0.72rem', color: '#D4A853', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.5rem', letterSpacing: 1 }}>
          {q.type === 'fill_blank' ? '✏️ Fill in the Blank' : q.type === 'true_false' ? '✅ True or False?' : '🔗 Match the Verse'}
        </div>
        <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.9)', lineHeight: 1.7, margin: 0 }}>
          {q.question}
        </p>
        <button
          onClick={() => speak(q.question, lang)}
          style={{ marginTop: '0.75rem', padding: '4px 10px', fontSize: '0.8rem', borderRadius: 8, border: '1px solid rgba(212,168,83,0.3)', background: 'transparent', color: '#D4A853', cursor: 'pointer' }}
        >🔊 Hear question</button>
      </div>

      {/* Options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.25rem' }}>
        {(q.options || []).map(opt => {
          let bg = 'rgba(255,255,255,0.04)';
          let border = '1.5px solid rgba(255,255,255,0.1)';
          let color = 'rgba(255,255,255,0.85)';
          if (answered) {
            if (opt === q.correctAnswer) { bg = 'rgba(52,211,153,0.15)'; border = '1.5px solid #34D399'; color = '#34D399'; }
            else if (opt === selected) { bg = 'rgba(239,68,68,0.15)'; border = '1.5px solid #EF4444'; color = '#EF4444'; }
          } else if (selected === opt) {
            bg = 'rgba(212,168,83,0.15)'; border = '1.5px solid #D4A853'; color = '#D4A853';
          }
          return (
            <button
              key={opt}
              onClick={() => handleAnswer(opt)}
              disabled={answered}
              style={{
                padding: '0.85rem 1.25rem', borderRadius: 14, border, background: bg, color,
                textAlign: 'left', fontSize: '0.95rem', fontWeight: 500, cursor: answered ? 'default' : 'pointer',
                transition: 'all 0.25s ease', display: 'flex', alignItems: 'center', gap: '0.75rem',
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>
                {answered && opt === q.correctAnswer ? '✅' : answered && opt === selected && opt !== q.correctAnswer ? '❌' : '○'}
              </span>
              {opt}
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {answered && (
        <div style={{
          padding: '1rem', background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.25)',
          borderRadius: 14, marginBottom: '1rem', fontSize: '0.88rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.65,
        }}>
          <strong style={{ color: '#34D399' }}>💡 Explanation: </strong>{q.explanation}
        </div>
      )}

      {answered && (
        <button
          onClick={next}
          style={{
            width: '100%', padding: '0.875rem', borderRadius: 14, border: 'none',
            background: 'linear-gradient(135deg, #D4A853, #B8860B)',
            color: '#fff', fontWeight: 700, fontSize: '1rem', cursor: 'pointer',
          }}
        >
          {idx + 1 >= challenges.length ? '🏁 Finish' : 'Next Question →'}
        </button>
      )}
    </div>
  );
}

// ===================== MEMORY VERSE GAME =====================
function MemoryVerseGame({ grade, lang }: { grade: number; lang: BibleLanguage }) {
  const verses = getVersesByGrade(grade).slice(0, 6);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const verse = verses[currentIdx];

  const text = getVerseByLanguage(verse, lang);
  const words = text.split(' ');
  // hide ~40% of words
  const [hiddenIdxs] = useState(() => {
    const idxs = new Set<number>();
    while (idxs.size < Math.floor(words.length * 0.4)) {
      idxs.add(Math.floor(Math.random() * words.length));
    }
    return idxs;
  });

  const next = () => {
    setScore(s => s + (revealed ? 5 : 15));
    setCurrentIdx(i => Math.min(i + 1, verses.length - 1));
    setRevealed(false);
  };

  return (
    <div style={{ maxWidth: 600 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ fontSize: '2rem' }}>{verse.emojiIcon}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, color: '#D4A853', fontSize: '1rem' }}>{verse.reference}</div>
          <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)' }}>Verse {currentIdx + 1} of {verses.length} · 🏆 {score} pts</div>
        </div>
      </div>

      <div style={{
        padding: '1.5rem', background: 'rgba(212,168,83,0.07)', border: '2px dashed rgba(212,168,83,0.3)',
        borderRadius: 20, lineHeight: 2, fontSize: '1.05rem', color: 'rgba(255,255,255,0.85)', marginBottom: '1.25rem',
      }}>
        {words.map((word, i) => (
          <span key={i}>
            {revealed || !hiddenIdxs.has(i)
              ? <span style={{ color: hiddenIdxs.has(i) ? '#D4A853' : 'inherit' }}>{word} </span>
              : <span style={{
                  display: 'inline-block', minWidth: `${word.length * 0.6}em`,
                  height: '1.2em', background: 'rgba(212,168,83,0.3)', borderRadius: 4,
                  marginRight: '0.3em', verticalAlign: 'middle',
                }}/>
            }
          </span>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <button
          onClick={() => { setRevealed(true); speak(text, lang); }}
          style={{
            flex: 1, padding: '0.75rem', borderRadius: 12, border: '1px solid rgba(212,168,83,0.35)',
            background: 'rgba(212,168,83,0.1)', color: '#D4A853', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem',
          }}
        >👁️ Reveal Verse</button>
        <button
          onClick={next}
          disabled={currentIdx >= verses.length - 1 && !revealed}
          style={{
            flex: 1, padding: '0.75rem', borderRadius: 12, border: 'none',
            background: 'linear-gradient(135deg, #D4A853, #B8860B)',
            color: '#fff', cursor: 'pointer', fontWeight: 700, fontSize: '0.9rem',
          }}
        >I Know It! ✨ Next →</button>
      </div>
    </div>
  );
}

// ===================== MAIN COMPONENT =====================
export default function BibleChallenge({ grade, initialLanguage = 'english' }: BibleChallengeProps) {
  const [lang, setLang] = useState<BibleLanguage>(initialLanguage);
  const [section, setSection] = useState<'verses' | 'stories' | 'challenge' | 'memory'>('verses');
  const labels = SECTION_LABELS[lang];

  const verses = getVersesByGrade(grade);
  const stories = getStoriesByGrade(grade);

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(120,113,108,0.25) 0%, rgba(212,168,83,0.15) 50%, rgba(120,113,108,0.2) 100%)',
        border: '2px solid rgba(212,168,83,0.3)',
        borderRadius: 24, padding: '1.75rem', marginBottom: '1.5rem',
        textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '0.5rem', filter: 'drop-shadow(0 0 15px rgba(212,168,83,0.4))' }}>✝️</div>
        <h2 style={{
          fontFamily: 'var(--font-display)', fontSize: '1.75rem',
          background: 'linear-gradient(135deg, #D4A853, #F5C842)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          marginBottom: '0.25rem',
        }}>
          {LANG_GREETING[lang]}
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>
          {verses.length} verses · {stories.length} stories · Bible challenges in your language
        </p>

        {/* Animated cross pattern bg */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, pointerEvents: 'none', fontSize: '3rem', display: 'flex', flexWrap: 'wrap', gap: '1.5rem', padding: '0.5rem', overflow: 'hidden' }}>
          {Array.from({ length: 24 }).map((_, i) => <span key={i}>✝</span>)}
        </div>
      </div>

      {/* Language Switcher */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
        {(Object.keys(LANG_LABELS) as BibleLanguage[]).map(l => (
          <button
            key={l}
            onClick={() => setLang(l)}
            style={{
              padding: '0.5rem 1rem', borderRadius: 50, fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer',
              border: lang === l ? 'none' : '1px solid rgba(212,168,83,0.3)',
              background: lang === l ? 'linear-gradient(135deg, #D4A853, #B8860B)' : 'rgba(212,168,83,0.08)',
              color: lang === l ? '#fff' : '#D4A853',
              transition: 'all 0.25s',
            }}
          >
            {LANG_LABELS[l]}
          </button>
        ))}
      </div>

      {/* Section Tabs */}
      <div style={{
        display: 'flex', gap: '0.25rem', padding: 4, background: 'rgba(255,255,255,0.04)',
        borderRadius: 50, border: '1px solid rgba(255,255,255,0.08)', marginBottom: '1.5rem', width: 'fit-content',
      }}>
        {(['verses', 'stories', 'challenge', 'memory'] as const).map(s => (
          <button
            key={s}
            onClick={() => setSection(s)}
            style={{
              padding: '0.5rem 1.1rem', borderRadius: 50, fontSize: '0.85rem', fontWeight: 600,
              border: 'none', cursor: 'pointer',
              background: section === s ? 'linear-gradient(135deg, #D4A853, #B8860B)' : 'transparent',
              color: section === s ? '#fff' : 'rgba(255,255,255,0.5)',
              transition: 'all 0.25s',
            }}
          >
            {labels[s]}
          </button>
        ))}
      </div>

      {/* VERSES SECTION */}
      {section === 'verses' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
            Click any verse to expand it · 🔊 to hear it read aloud
          </p>
          {verses.map(v => <VerseCard key={v.id} verse={v} lang={lang} />)}
        </div>
      )}

      {/* STORIES SECTION */}
      {section === 'stories' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
            {stories.length} Bible stories with life lessons — click to read!
          </p>
          {stories.map(s => <StoryCard key={s.id} story={s} lang={lang} />)}
        </div>
      )}

      {/* CHALLENGE SECTION */}
      {section === 'challenge' && (
        <div>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
            Answer Bible questions in <strong style={{ color: '#D4A853' }}>{LANG_LABELS[lang]}</strong>
          </p>
          <ChallengePanel grade={grade} lang={lang} />
        </div>
      )}

      {/* MEMORY SECTION */}
      {section === 'memory' && (
        <div>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
            Practice memorizing Bible verses — some words are hidden. Can you remember them?
          </p>
          <MemoryVerseGame grade={grade} lang={lang} />
        </div>
      )}
    </div>
  );
}
