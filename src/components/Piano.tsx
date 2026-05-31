'use client';

import { useState, useEffect } from 'react';
import { playPianoNote, playSuccess } from '@/lib/sound-manager';

// Frequencies for our 8 white keys and 5 black keys
const WHITE_KEYS = [
  { note: 'C4', label: 'Do', freq: 261.63, color: '#FF4B5C', icon: '🔴' }, // Red
  { note: 'D4', label: 'Re', freq: 293.66, color: '#FF8A5B', icon: '🟠' }, // Orange
  { note: 'E4', label: 'Mi', freq: 329.63, color: '#FFC75F', icon: '🟡' }, // Yellow
  { note: 'F4', label: 'Fa', freq: 349.23, color: '#4E9F3D', icon: '🟢' }, // Green
  { note: 'G4', label: 'Sol', freq: 392.00, color: '#1089FF', icon: '🔵' }, // Blue
  { note: 'A4', label: 'La', freq: 440.00, color: '#845EC2', icon: '🟣' }, // Purple
  { note: 'B4', label: 'Ti', freq: 493.88, color: '#B39CD0', icon: '🌸' }, // Indigo
  { note: 'C5', label: 'Do⁺', freq: 523.25, color: '#FF96AD', icon: '🩷' }, // Pink
];

const BLACK_KEYS = [
  { note: 'C#4', freq: 277.18, leftOffset: '10.5%' },
  { note: 'D#4', freq: 311.13, leftOffset: '22.5%' },
  { note: 'F#4', freq: 369.99, leftOffset: '47.5%' },
  { note: 'G#4', freq: 415.30, leftOffset: '59.5%' },
  { note: 'A#4', freq: 466.16, leftOffset: '71.5%' },
];

const SONGS = [
  {
    title: '🎵 Jambo Bwana (Welcome Song)',
    description: 'Learn the famous Kenyan greeting song!',
    notes: [
      'G4', 'E4', 'G4', 'E4', 'G4', 'A4', 'G4', 'E4',
      'A4', 'F4', 'A4', 'F4', 'A4', 'B4', 'A4', 'F4',
      'G4', 'E4', 'G4', 'E4', 'G4', 'A4', 'G4', 'E4',
      'E4', 'D4', 'C4', 'D4', 'E4', 'E4', 'E4'
    ]
  },
  {
    title: '⭐ Twinkle Twinkle Little Star',
    description: 'A classic star counting song!',
    notes: [
      'C4', 'C4', 'G4', 'G4', 'A4', 'A4', 'G4',
      'F4', 'F4', 'E4', 'E4', 'D4', 'D4', 'C4',
      'G4', 'G4', 'F4', 'F4', 'E4', 'E4', 'D4',
      'G4', 'G4', 'F4', 'F4', 'E4', 'E4', 'D4',
      'C4', 'C4', 'G4', 'G4', 'A4', 'A4', 'G4',
      'F4', 'F4', 'E4', 'E4', 'D4', 'D4', 'C4'
    ]
  },
  {
    title: '🐑 Mary Had a Little Lamb',
    description: 'Play a tune about a fluffy little friend!',
    notes: [
      'E4', 'D4', 'C4', 'D4', 'E4', 'E4', 'E4',
      'D4', 'D4', 'D4', 'E4', 'G4', 'G4',
      'E4', 'D4', 'C4', 'D4', 'E4', 'E4', 'E4',
      'E4', 'D4', 'D4', 'E4', 'D4', 'C4'
    ]
  }
];

export default function Piano() {
  const [activeSongIdx, setActiveSongIdx] = useState<number | null>(null);
  const [currentNoteIdx, setCurrentNoteIdx] = useState(0);
  const [lastPlayedNote, setLastPlayedNote] = useState<string | null>(null);
  const [sparkles, setSparkles] = useState<{ id: number; left: string; color: string }[]>([]);

  // Synthesize robot commentary when completing a song
  const speakRoboticComment = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      // Retrieve voices and pick a robotic sounding one if possible
      const voices = window.speechSynthesis.getVoices();
      const englishVoice = voices.find(v => v.lang.includes('en') && v.name.includes('Google'));
      if (englishVoice) utterance.voice = englishVoice;
      utterance.pitch = 1.35; // Slightly high-pitched robot
      utterance.rate = 1.05;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleKeyPress = (note: string, freq: number, keyColor: string) => {
    playPianoNote(freq);
    setLastPlayedNote(note);
    
    // Add dynamic animation sparkle
    const newSparkle = {
      id: Date.now(),
      left: `${Math.random() * 80 + 10}%`,
      color: keyColor,
    };
    setSparkles(prev => [...prev, newSparkle].slice(-15)); // Limit active particles

    // Handle interactive lesson logic
    if (activeSongIdx !== null) {
      const song = SONGS[activeSongIdx];
      const targetNote = song.notes[currentNoteIdx];
      
      if (note === targetNote) {
        // Correct note played
        const nextIdx = currentNoteIdx + 1;
        if (nextIdx >= song.notes.length) {
          // Song completed!
          playSuccess();
          speakRoboticComment(`Amazing! You completed ${song.title.split(' ').slice(1).join(' ')}. You are a super music star!`);
          setActiveSongIdx(null);
          setCurrentNoteIdx(0);
        } else {
          setCurrentNoteIdx(nextIdx);
        }
      }
    }
  };

  const startSongLesson = (idx: number) => {
    setActiveSongIdx(idx);
    setCurrentNoteIdx(0);
    setLastPlayedNote(null);
    speakRoboticComment(`Let's play ${SONGS[idx].title.split(' ').slice(1).join(' ')}! Press the highlighted keys.`);
  };

  const resetLesson = () => {
    setActiveSongIdx(null);
    setCurrentNoteIdx(0);
    setLastPlayedNote(null);
  };

  // Keyboard shortcut listener for white keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const shortcuts: Record<string, typeof WHITE_KEYS[0]> = {
        'a': WHITE_KEYS[0],
        's': WHITE_KEYS[1],
        'd': WHITE_KEYS[2],
        'f': WHITE_KEYS[3],
        'g': WHITE_KEYS[4],
        'h': WHITE_KEYS[5],
        'j': WHITE_KEYS[6],
        'k': WHITE_KEYS[7],
      };
      
      const target = shortcuts[e.key.toLowerCase()];
      if (target) {
        handleKeyPress(target.note, target.freq, target.color);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSongIdx, currentNoteIdx]);

  const activeTargetNote = activeSongIdx !== null ? SONGS[activeSongIdx].notes[currentNoteIdx] : null;

  return (
    <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', borderRadius: '24px', position: 'relative' }}>
      
      {/* Sparkle container */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100px', pointerEvents: 'none', overflow: 'hidden' }}>
        {sparkles.map(sp => (
          <div
            key={sp.id}
            style={{
              position: 'absolute',
              bottom: 0,
              left: sp.left,
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: sp.color,
              boxShadow: `0 0 15px ${sp.color}`,
              animation: 'pianoFloat 1s cubic-bezier(0.1, 0.8, 0.3, 1) forwards',
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes pianoFloat {
          0% { transform: translateY(100px) scale(1); opacity: 1; }
          100% { transform: translateY(0px) scale(0.2); opacity: 0; }
        }
        @keyframes pulseHighlight {
          0%, 100% { box-shadow: 0 0 8px rgba(255,255,255,0.4), inset 0 0 5px rgba(255,255,255,0.2); transform: scale(1); }
          50% { box-shadow: 0 0 25px #FFF, inset 0 0 15px rgba(255,255,255,0.6); transform: scale(0.98); }
        }
      `}</style>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <span style={{ fontSize: '2.5rem' }}>🎹</span>
        <div>
          <h2 style={{ fontFamily: 'var(--font-fun)', fontSize: '1.5rem' }}>RoboKid Music Lab</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Learn simple piano lessons and play beautiful notes!</p>
        </div>
      </div>

      {/* Lesson Selector */}
      <div style={{ background: 'var(--bg-glass)', padding: '1rem', borderRadius: '16px', border: '1px solid var(--border-subtle)' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          🏫 Choose a Simple Piano Lesson:
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
          {SONGS.map((song, idx) => (
            <button
              key={idx}
              onClick={() => startSongLesson(idx)}
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '12px',
                border: activeSongIdx === idx ? '2px solid var(--color-primary)' : '1px solid var(--border-subtle)',
                background: activeSongIdx === idx ? 'rgba(99,102,241,0.15)' : 'var(--bg-glass-strong)',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s',
              }}
            >
              <h4 style={{ fontSize: '0.85rem', color: '#FFF', marginBottom: '0.2rem' }}>{song.title}</h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{song.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Song Notes Visualizer */}
      {activeSongIdx !== null && (
        <div style={{ background: '#0D1117', border: '1px solid #30363D', borderRadius: '16px', padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700 }}>SONG PROGRESS:</span>
            <button onClick={resetLesson} style={{ background: 'none', border: 'none', color: '#F87171', fontSize: '0.8rem', cursor: 'pointer', fontWeight: 600 }}>🛑 Quit Lesson</button>
          </div>
          
          {/* Note Stream */}
          <div style={{ display: 'flex', gap: '0.35rem', overflowX: 'auto', padding: '0.5rem 0', scrollbarWidth: 'none' }}>
            {SONGS[activeSongIdx].notes.map((note, idx) => {
              const isCurrent = idx === currentNoteIdx;
              const isPast = idx < currentNoteIdx;
              let bg = 'rgba(255,255,255,0.03)';
              let border = '1px solid var(--border-subtle)';
              let color = 'var(--text-muted)';
              let scale = '1';
              
              if (isCurrent) {
                bg = 'var(--color-primary)';
                border = '2px solid #FFF';
                color = '#FFF';
                scale = '1.2';
              } else if (isPast) {
                bg = 'rgba(16,185,129,0.15)';
                border = '1px solid #10B981';
                color = '#34D399';
              }

              const whiteKeyInfo = WHITE_KEYS.find(k => k.note === note);
              return (
                <div
                  key={idx}
                  style={{
                    minWidth: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    background: bg,
                    border,
                    color,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    transform: `scale(${scale})`,
                    transition: 'all 0.2s',
                  }}
                >
                  <span>{whiteKeyInfo?.label || note.substring(0, 1)}</span>
                  <span style={{ fontSize: '0.5rem', opacity: 0.6 }}>{note}</span>
                </div>
              );
            })}
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '0.75rem', textAlign: 'center' }}>
            👉 Play the key labeled <strong style={{ color: 'var(--color-primary-light)' }}>{WHITE_KEYS.find(k => k.note === activeTargetNote)?.label} ({activeTargetNote})</strong> to advance!
          </p>
        </div>
      )}

      {/* Visual Keyboard Wrapper */}
      <div style={{ position: 'relative', width: '100%', maxWidth: '640px', margin: '0 auto', background: '#0F172A', borderRadius: '16px', padding: '10px', boxShadow: '0 10px 30px rgba(0,0,0,0.6)' }}>
        
        {/* White Keys */}
        <div style={{ display: 'flex', gap: '4px', width: '100%' }}>
          {WHITE_KEYS.map(key => {
            const isTarget = activeTargetNote === key.note;
            const keyHighlight = isTarget ? {
              animation: 'pulseHighlight 1.5s infinite',
              border: '3px solid #FFF',
              transform: 'scale(0.98)',
            } : {};

            return (
              <button
                key={key.note}
                onClick={() => handleKeyPress(key.note, key.freq, key.color)}
                style={{
                  flex: 1,
                  height: '180px',
                  borderRadius: '0 0 10px 10px',
                  background: key.color,
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  paddingBottom: '1rem',
                  color: '#000',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  boxShadow: 'inset 0 -10px 10px rgba(0,0,0,0.15)',
                  transition: 'all 0.1s',
                  ...keyHighlight,
                }}
              >
                <span style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{key.icon}</span>
                <span style={{ fontFamily: 'var(--font-fun)', fontSize: '1rem' }}>{key.label}</span>
                <span style={{ fontSize: '0.65rem', opacity: 0.5 }}>{key.note}</span>
              </button>
            );
          })}
        </div>

        {/* Black Keys Overlaid */}
        {BLACK_KEYS.map(key => {
          return (
            <button
              key={key.note}
              onClick={() => handleKeyPress(key.note, key.freq, '#1E293B')}
              style={{
                position: 'absolute',
                top: '10px',
                left: key.leftOffset,
                width: '32px',
                height: '110px',
                background: '#1E293B',
                color: '#FFF',
                border: '1px solid #475569',
                borderRadius: '0 0 6px 6px',
                cursor: 'pointer',
                zIndex: 10,
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                paddingBottom: '0.5rem',
                fontSize: '0.6rem',
                fontWeight: 700,
                boxShadow: '0 5px 10px rgba(0,0,0,0.5), inset 0 -5px 5px rgba(0,0,0,0.3)',
              }}
            >
              {key.note}
            </button>
          );
        })}
      </div>

      {/* Keyboard Shortcuts Hint */}
      <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
        ⌨️ Try playing with your computer keyboard keys: <strong style={{ color: 'var(--color-primary-light)' }}>A, S, D, F, G, H, J, K</strong> for the white keys!
      </p>

    </div>
  );
}
