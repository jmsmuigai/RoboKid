'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { playClick } from '@/lib/sound-manager';

/* ============================================================
   RoboKid Games Hub — 10 Interactive Learning Games
   Built-in games + links to free open-source learning resources
   ============================================================ */

// ---------- Game 1: Memory Match ----------
function MemoryMatchGame() {
  const pairs = [
    { word: 'Simba', match: '🦁', hint: 'Lion' },
    { word: 'Tembo', match: '🐘', hint: 'Elephant' },
    { word: 'Twiga', match: '🦒', hint: 'Giraffe' },
    { word: 'Punda', match: '🦓', hint: 'Zebra' },
    { word: 'Kiboko', match: '🦛', hint: 'Hippo' },
    { word: 'Nyoka', match: '🐍', hint: 'Snake' },
  ];

  const [cards, setCards] = useState<{ id: number; content: string; type: string; pairId: number; flipped: boolean; matched: boolean }[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    const allCards = pairs.flatMap((p, i) => [
      { id: i * 2, content: p.word, type: 'word', pairId: i, flipped: false, matched: false },
      { id: i * 2 + 1, content: p.match, type: 'emoji', pairId: i, flipped: false, matched: false },
    ]).sort(() => Math.random() - 0.5);
    setCards(allCards);
  }, []);

  const handleClick = (id: number) => {
    if (selected.length === 2) return;
    const card = cards.find(c => c.id === id);
    if (!card || card.flipped || card.matched) return;

    const newCards = cards.map(c => c.id === id ? { ...c, flipped: true } : c);
    setCards(newCards);
    const newSelected = [...selected, id];
    setSelected(newSelected);

    if (newSelected.length === 2) {
      setMoves(m => m + 1);
      const [a, b] = newSelected.map(sid => newCards.find(c => c.id === sid)!);
      if (a.pairId === b.pairId) {
        setTimeout(() => {
          setCards(prev => prev.map(c => c.pairId === a.pairId ? { ...c, matched: true } : c));
          setScore(s => s + 10);
          setSelected([]);
        }, 500);
      } else {
        setTimeout(() => {
          setCards(prev => prev.map(c => newSelected.includes(c.id) ? { ...c, flipped: false } : c));
          setSelected([]);
        }, 800);
      }
    }
  };

  const allMatched = cards.length > 0 && cards.every(c => c.matched);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <span className="badge badge-primary">Score: {score}</span>
        <span className="badge badge-success">Moves: {moves}</span>
      </div>
      {allMatched && (
        <div style={{ textAlign: 'center', padding: '1.5rem', background: 'rgba(16,185,129,0.1)', borderRadius: 'var(--radius-lg)', marginBottom: '1rem', border: '1px solid rgba(16,185,129,0.3)' }}>
          <div style={{ fontSize: '3rem' }}>🎉</div>
          <h3 style={{ fontFamily: 'var(--font-fun)', color: 'var(--color-environment-light)' }}>Hongera! You won in {moves} moves!</h3>
        </div>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
        {cards.map(card => (
          <button key={card.id} onClick={() => handleClick(card.id)} style={{
            height: 70, borderRadius: 'var(--radius-md)', border: card.matched ? '2px solid #10B981' : '1px solid var(--border-subtle)',
            background: card.flipped || card.matched ? (card.matched ? 'rgba(16,185,129,0.15)' : 'rgba(99,102,241,0.15)') : 'var(--bg-glass)',
            cursor: card.matched ? 'default' : 'pointer', fontSize: card.type === 'emoji' ? '1.5rem' : '0.8rem',
            fontWeight: 600, color: 'var(--text-primary)', fontFamily: card.type === 'word' ? 'var(--font-fun)' : 'inherit',
            transition: 'all 0.3s ease', transform: card.flipped ? 'rotateY(0deg)' : 'rotateY(0deg)',
          }}>
            {card.flipped || card.matched ? card.content : '❓'}
          </button>
        ))}
      </div>
    </div>
  );
}

// ---------- Game 2: Math Race ----------
function MathRaceGame() {
  const [question, setQuestion] = useState({ a: 0, b: 0, op: '+', answer: 0 });
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);

  const generateQuestion = useCallback(() => {
    const ops = ['+', '-', '×'];
    const op = ops[Math.floor(Math.random() * ops.length)];
    let a: number, b: number, answer: number;
    if (op === '+') { a = Math.floor(Math.random() * 20) + 1; b = Math.floor(Math.random() * 20) + 1; answer = a + b; }
    else if (op === '-') { a = Math.floor(Math.random() * 20) + 10; b = Math.floor(Math.random() * a) + 1; answer = a - b; }
    else { a = Math.floor(Math.random() * 10) + 1; b = Math.floor(Math.random() * 10) + 1; answer = a * b; }
    setQuestion({ a, b, op, answer });
    setUserAnswer('');
    setFeedback(null);
  }, []);

  useEffect(() => {
    if (!isPlaying || timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  useEffect(() => { if (timeLeft <= 0) setIsPlaying(false); }, [timeLeft]);

  const startGame = () => { setIsPlaying(true); setScore(0); setTimeLeft(60); setStreak(0); generateQuestion(); };

  const checkAnswer = () => {
    if (parseInt(userAnswer) === question.answer) {
      setScore(s => s + (10 + streak * 2));
      setStreak(s => s + 1);
      setFeedback('✅ Correct!');
      setTimeout(generateQuestion, 300);
    } else {
      setStreak(0);
      setFeedback(`❌ It was ${question.answer}`);
      setTimeout(generateQuestion, 800);
    }
  };

  if (!isPlaying) return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      {timeLeft <= 0 && <div><div style={{ fontSize: '3rem' }}>🏁</div><h3 style={{ fontFamily: 'var(--font-fun)', fontSize: '1.5rem', margin: '0.5rem 0' }}>Final Score: {score}</h3></div>}
      <button className="btn btn-primary" onClick={startGame}>{timeLeft <= 0 ? '🔄 Play Again' : '🏃 Start Math Race!'}</button>
    </div>
  );

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <span className="badge badge-primary">Score: {score}</span>
        <span className="badge badge-warning">🔥 Streak: {streak}</span>
        <span className="badge" style={{ background: timeLeft <= 10 ? 'rgba(239,68,68,0.15)' : 'rgba(99,102,241,0.15)', color: timeLeft <= 10 ? '#F87171' : 'var(--color-primary-light)', border: `1px solid ${timeLeft <= 10 ? 'rgba(239,68,68,0.3)' : 'rgba(99,102,241,0.3)'}` }}>⏱️ {timeLeft}s</span>
      </div>
      <div style={{ fontSize: '2.5rem', fontFamily: 'var(--font-display)', fontWeight: 800, margin: '1.5rem 0' }}>
        {question.a} {question.op} {question.b} = ?
      </div>
      {feedback && <p style={{ fontFamily: 'var(--font-fun)', marginBottom: '0.5rem', color: feedback.includes('✅') ? '#10B981' : '#EF4444' }}>{feedback}</p>}
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
        <input type="number" value={userAnswer} onChange={e => setUserAnswer(e.target.value)} onKeyDown={e => e.key === 'Enter' && checkAnswer()} placeholder="?" autoFocus style={{
          width: 100, padding: '0.75rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-glass)', border: '2px solid var(--color-primary)',
          color: 'var(--text-primary)', fontSize: '1.5rem', textAlign: 'center', fontFamily: 'var(--font-display)', outline: 'none',
        }} />
        <button className="btn btn-primary" onClick={checkAnswer}>✓</button>
      </div>
    </div>
  );
}

// ---------- Game 3: Word Scramble ----------
function WordScrambleGame() {
  const words = [
    { word: 'ELEPHANT', hint: 'Tembo — largest land animal 🐘', category: 'Animals' },
    { word: 'GIRAFFE', hint: 'Twiga — tallest animal 🦒', category: 'Animals' },
    { word: 'NAIROBI', hint: 'Capital city of Kenya 🏙️', category: 'Places' },
    { word: 'TEACHER', hint: 'Mwalimu — helps you learn 👩‍🏫', category: 'People' },
    { word: 'MANGO', hint: 'Embe — sweet fruit 🥭', category: 'Food' },
    { word: 'SCHOOL', hint: 'Shule — where you learn 🏫', category: 'Places' },
    { word: 'BANANA', hint: 'Ndizi — yellow fruit 🍌', category: 'Food' },
    { word: 'ZEBRA', hint: 'Punda milia — black and white stripes 🦓', category: 'Animals' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrambled, setScrambled] = useState('');
  const [guess, setGuess] = useState('');
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const scrambleWord = useCallback((word: string) => {
    return word.split('').sort(() => Math.random() - 0.5).join('');
  }, []);

  useEffect(() => {
    setScrambled(scrambleWord(words[currentIndex].word));
    setGuess('');
    setShowHint(false);
    setFeedback(null);
  }, [currentIndex]);

  const checkGuess = () => {
    if (guess.toUpperCase() === words[currentIndex].word) {
      setScore(s => s + (showHint ? 5 : 10));
      setFeedback('🎉 Correct!');
      setTimeout(() => setCurrentIndex(i => (i + 1) % words.length), 1000);
    } else {
      setFeedback('❌ Try again!');
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <span className="badge badge-primary">Score: {score}</span>
        <span className="badge badge-success">{words[currentIndex].category}</span>
      </div>
      <div style={{ fontSize: '2rem', fontFamily: 'var(--font-fun)', letterSpacing: '0.3em', margin: '1.5rem 0', color: 'var(--color-primary-light)' }}>
        {scrambled.split('').map((l, i) => (
          <span key={i} style={{ display: 'inline-block', padding: '0.25rem 0.5rem', margin: '0 2px', background: 'var(--bg-glass)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>{l}</span>
        ))}
      </div>
      {showHint && <p style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-fun)', marginBottom: '0.5rem' }}>💡 {words[currentIndex].hint}</p>}
      {feedback && <p style={{ fontFamily: 'var(--font-fun)', marginBottom: '0.5rem', color: feedback.includes('🎉') ? '#10B981' : '#EF4444' }}>{feedback}</p>}
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <input type="text" value={guess} onChange={e => setGuess(e.target.value)} onKeyDown={e => e.key === 'Enter' && checkGuess()} placeholder="Type the word..." style={{
          padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-glass)', border: '1px solid var(--border-subtle)',
          color: 'var(--text-primary)', fontSize: '1rem', fontFamily: 'var(--font-body)', outline: 'none', textTransform: 'uppercase', width: 180,
        }} />
        <button className="btn btn-primary btn-sm" onClick={checkGuess}>Check</button>
        <button className="btn btn-secondary btn-sm" onClick={() => setShowHint(true)}>💡 Hint</button>
      </div>
    </div>
  );
}

// ---------- Game 4: Spelling Bee ----------
function SpellingBeeGame() {
  const words = [
    { word: 'UGALI', kiswahili: 'Ugali', meaning: 'Staple food made from maize flour', audio: '🔊' },
    { word: 'SHAMBA', kiswahili: 'Shamba', meaning: 'A farm or garden', audio: '🔊' },
    { word: 'MATATU', kiswahili: 'Matatu', meaning: 'Public minibus transport', audio: '🔊' },
    { word: 'SAFARI', kiswahili: 'Safari', meaning: 'A journey or trip', audio: '🔊' },
    { word: 'JAMBO', kiswahili: 'Jambo', meaning: 'Hello in Kiswahili', audio: '🔊' },
    { word: 'BABA', kiswahili: 'Baba', meaning: 'Father', audio: '🔊' },
  ];
  
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Voice recording states
  const [isRecording, setIsRecording] = useState(false);
  const [recordedUrl, setRecordedUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Speech Recognition states
  const [isListening, setIsListening] = useState(false);

  // Play robotic text-to-speech commentary
  const speakRoboticComment = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.pitch = 1.3;
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const playTargetWord = () => {
    // Say the target word out loud so the kid can hear it
    speakRoboticComment(`The word is: ${words[index].kiswahili}. Meaning: ${words[index].meaning}.`);
  };

  // Start MediaRecorder & Speech Recognition
  const startVoiceCapture = async () => {
    setRecordedUrl(null);
    audioChunksRef.current = [];
    
    // 1. Initialize MediaRecorder
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setRecordedUrl(url);
        // Stop all track nodes
        stream.getTracks().forEach(track => track.stop());
      };

      recorder.start();
      setIsRecording(true);
    } catch (err) {
      console.warn('Microphone access denied or not supported:', err);
    }

    // 2. Initialize Speech Recognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = 'sw-KE'; // Swahili recognition is highly accurate for these words!
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        // Clean up punctuation/spaces
        const cleaned = transcript.replace(/[^a-zA-Z]/g, '').toUpperCase();
        setInput(cleaned);
        setFeedback(`I heard you say: "${transcript}"`);
      };

      recognition.onerror = (e: any) => {
        console.warn('Speech recognition error:', e.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
        // Stop recording audio as well
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
          mediaRecorderRef.current.stop();
          setIsRecording(false);
        }
      };

      recognition.start();
    } else {
      setFeedback('Speech recognition not supported in this browser, but recording audio is active!');
      // Just record for 3 seconds if speech recognition is not supported
      setTimeout(() => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
          mediaRecorderRef.current.stop();
          setIsRecording(false);
        }
      }, 3500);
    }
  };

  const stopVoiceCapture = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
    setIsListening(false);
  };

  const playRecordedAudio = () => {
    if (recordedUrl) {
      const audio = new Audio(recordedUrl);
      audio.play();
    }
  };

  const check = () => {
    const target = words[index].word;
    const answer = input.toUpperCase().trim().replace(/\s+/g, '');
    
    if (answer === target) {
      const newScore = score + 10;
      setScore(newScore);
      setRevealed(true);
      setFeedback('🎉 Correct!');
      speakRoboticComment(`Excellent job! You spelled ${words[index].kiswahili} perfectly!`);
      
      if (newScore >= words.length * 10) {
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('robokid-award-toy', { detail: { toyId: 'toy_lion' } }));
        }
      }

      setTimeout(() => {
        setIndex(i => (i + 1) % words.length);
        setInput('');
        setRevealed(false);
        setFeedback(null);
        setRecordedUrl(null);
      }, 2000);
    } else {
      setFeedback(`❌ Keep trying! The correct spelling has ${target.length} letters.`);
      // Spell it letter by letter
      const spellingSpaced = target.split('').join(' ');
      speakRoboticComment(`Close! But the correct spelling of ${words[index].kiswahili} is ${spellingSpaced}. Try typing or saying it again!`);
    }
  };

  return (
    <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className="badge badge-primary">Spelling Bee Score: {score}</span>
        <button onClick={playTargetWord} className="btn btn-secondary btn-sm" style={{ padding: '4px 10px', fontSize: '0.75rem', gap: '4px' }}>
          🔊 Say Word
        </button>
      </div>

      <div style={{ background: 'var(--bg-glass)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>Meaning of the word:</p>
        <h4 style={{ fontSize: '1.15rem', color: '#FFF', margin: '0.5rem 0', fontFamily: 'var(--font-fun)' }}>&quot;{words[index].meaning}&quot;</h4>
        <p style={{ fontSize: '0.9rem', color: 'var(--color-primary-light)', fontWeight: 600 }}>Kiswahili Word: {words[index].kiswahili}</p>
      </div>

      {feedback && (
        <p style={{
          fontSize: '0.85rem',
          fontFamily: 'var(--font-fun)',
          color: feedback.includes('Correct') ? '#10B981' : feedback.includes('heard') ? 'var(--color-language-light)' : '#EF4444',
          margin: '0.25rem 0'
        }}>{feedback}</p>
      )}

      {/* Voice controls */}
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', margin: '0.5rem 0' }}>
        {!isListening && !isRecording ? (
          <button onClick={startVoiceCapture} className="btn btn-primary btn-sm" style={{ background: '#EC4899', color: '#FFF', gap: '6px' }}>
            🎤 Speak & Spell
          </button>
        ) : (
          <button onClick={stopVoiceCapture} className="btn btn-primary btn-sm" style={{ background: '#EF4444', color: '#FFF', gap: '6px', animation: 'pulseHighlight 1s infinite' }}>
            🛑 Stop Listening
          </button>
        )}

        {recordedUrl && (
          <button onClick={playRecordedAudio} className="btn btn-secondary btn-sm" style={{ gap: '6px' }}>
            🎧 Play My Voice
          </button>
        )}
      </div>

      {/* Spelling input */}
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && check()}
          placeholder="Type or speak the spelling..."
          style={{
            padding: '0.75rem 1rem',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-glass)',
            border: '2px solid var(--color-primary)',
            color: 'var(--text-primary)',
            fontSize: '1.1rem',
            outline: 'none',
            flex: 1,
            textTransform: 'uppercase',
            textAlign: 'center',
            letterSpacing: '0.1em',
            fontFamily: 'var(--font-display)',
            fontWeight: 800
          }}
        />
        <button className="btn btn-primary btn-sm" onClick={check} style={{ fontSize: '1rem', padding: '0.75rem 1.25rem' }}>Check</button>
      </div>

      <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
        💡 Tip: Click &quot;Speak &amp; Spell&quot; and say the word clearly, or spell it out letter-by-letter!
      </p>
    </div>
  );
}

// ---------- Game 5: Number Sequence ----------
function NumberSequenceGame() {
  const sequences = [
    { seq: [2, 4, 6, 8], next: 10, rule: 'Count by 2s' },
    { seq: [5, 10, 15, 20], next: 25, rule: 'Count by 5s' },
    { seq: [10, 20, 30, 40], next: 50, rule: 'Count by 10s' },
    { seq: [1, 3, 5, 7], next: 9, rule: 'Odd numbers' },
    { seq: [3, 6, 9, 12], next: 15, rule: 'Count by 3s' },
    { seq: [100, 90, 80, 70], next: 60, rule: 'Subtract 10' },
    { seq: [1, 4, 7, 10], next: 13, rule: 'Add 3' },
    { seq: [2, 4, 8, 16], next: 32, rule: 'Double each time' },
  ];
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);

  const check = () => {
    if (parseInt(answer) === sequences[index].next) {
      setScore(s => s + 10);
      setFeedback(`✅ Correct! Rule: ${sequences[index].rule}`);
      setTimeout(() => { setIndex(i => (i + 1) % sequences.length); setAnswer(''); setFeedback(null); }, 1500);
    } else {
      setFeedback(`❌ Try again!`);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <span className="badge badge-primary" style={{ marginBottom: '1rem' }}>Score: {score}</span>
      <div style={{ fontSize: '1.8rem', fontFamily: 'var(--font-display)', fontWeight: 700, margin: '1.5rem 0', display: 'flex', gap: '0.5rem', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
        {sequences[index].seq.map((n, i) => (
          <span key={i} style={{ padding: '0.5rem 1rem', background: 'var(--bg-glass)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>{n}</span>
        ))}
        <span style={{ color: 'var(--color-primary)', fontSize: '2rem' }}>→</span>
        <span style={{ padding: '0.5rem 1rem', background: 'rgba(99,102,241,0.1)', borderRadius: 'var(--radius-md)', border: '2px dashed var(--color-primary)', color: 'var(--color-primary)' }}>?</span>
      </div>
      {feedback && <p style={{ fontFamily: 'var(--font-fun)', marginBottom: '0.5rem', color: feedback.includes('✅') ? '#10B981' : '#EF4444' }}>{feedback}</p>}
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
        <input type="number" value={answer} onChange={e => setAnswer(e.target.value)} onKeyDown={e => e.key === 'Enter' && check()} placeholder="?" style={{
          width: 80, padding: '0.75rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-glass)', border: '2px solid var(--color-primary)',
          color: 'var(--text-primary)', fontSize: '1.25rem', textAlign: 'center', outline: 'none',
        }} />
        <button className="btn btn-primary btn-sm" onClick={check}>Check</button>
      </div>
    </div>
  );
}

// ---------- Game 6: Animal Quiz ----------
function AnimalQuizGame() {
  const animals = [
    { emoji: '🦁', name: 'Lion', kiswahili: 'Simba', fact: 'Lions live in groups called prides', habitat: 'Maasai Mara' },
    { emoji: '🐘', name: 'Elephant', kiswahili: 'Tembo', fact: 'Elephants are the largest land animals', habitat: 'Amboseli' },
    { emoji: '🦒', name: 'Giraffe', kiswahili: 'Twiga', fact: 'Giraffes are the tallest animals on Earth', habitat: 'Nairobi National Park' },
    { emoji: '🦓', name: 'Zebra', kiswahili: 'Punda Milia', fact: 'Every zebra has unique stripes', habitat: 'Tsavo' },
    { emoji: '🦏', name: 'Rhino', kiswahili: 'Kifaru', fact: 'Rhinos are endangered and protected in Kenya', habitat: 'Ol Pejeta' },
    { emoji: '🦛', name: 'Hippo', kiswahili: 'Kiboko', fact: 'Hippos spend most of their day in water', habitat: 'Lake Naivasha' },
    { emoji: '🐆', name: 'Cheetah', kiswahili: 'Duma', fact: 'Cheetahs are the fastest land animals', habitat: 'Maasai Mara' },
    { emoji: '🦩', name: 'Flamingo', kiswahili: 'Flamingo', fact: 'Millions of flamingos gather at Lake Nakuru', habitat: 'Lake Nakuru' },
  ];
  const [index, setIndex] = useState(0);
  const [options, setOptions] = useState<string[]>([]);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const correct = animals[index].kiswahili;
    const wrongs = animals.filter((_, i) => i !== index).sort(() => Math.random() - 0.5).slice(0, 3).map(a => a.kiswahili);
    setOptions([correct, ...wrongs].sort(() => Math.random() - 0.5));
    setAnswered(false);
  }, [index]);

  const answer = (opt: string) => {
    if (answered) return;
    setAnswered(true);
    if (opt === animals[index].kiswahili) setScore(s => s + 10);
    setTimeout(() => setIndex(i => (i + 1) % animals.length), 1500);
  };

  const a = animals[index];
  return (
    <div style={{ textAlign: 'center' }}>
      <span className="badge badge-primary" style={{ marginBottom: '1rem' }}>Score: {score}</span>
      <div style={{ fontSize: '4rem', margin: '1rem 0' }}>{a.emoji}</div>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>What is this animal called in Kiswahili?</p>
      {answered && <p style={{ fontSize: '0.85rem', color: 'var(--color-environment-light)', marginBottom: '0.5rem' }}>📍 Found in {a.habitat} · {a.fact}</p>}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
        {options.map(opt => (
          <button key={opt} onClick={() => answer(opt)} style={{
            padding: '0.75rem', borderRadius: 'var(--radius-md)', fontFamily: 'var(--font-fun)', fontSize: '1rem',
            background: answered ? (opt === a.kiswahili ? 'rgba(16,185,129,0.2)' : 'var(--bg-glass)') : 'var(--bg-glass)',
            border: answered && opt === a.kiswahili ? '2px solid #10B981' : '1px solid var(--border-subtle)',
            color: 'var(--text-primary)', cursor: answered ? 'default' : 'pointer',
          }}>{opt}</button>
        ))}
      </div>
    </div>
  );
}

// ---------- Game 7: Drag & Sort Food Groups ----------
function FoodGroupGame() {
  const foods = [
    { name: 'Ugali', emoji: '🫓', group: 'Carbs', color: '#F59E0B' },
    { name: 'Beans', emoji: '🫘', group: 'Protein', color: '#EF4444' },
    { name: 'Mango', emoji: '🥭', group: 'Vitamins', color: '#10B981' },
    { name: 'Milk', emoji: '🥛', group: 'Protein', color: '#EF4444' },
    { name: 'Rice', emoji: '🍚', group: 'Carbs', color: '#F59E0B' },
    { name: 'Spinach', emoji: '🥬', group: 'Vitamins', color: '#10B981' },
    { name: 'Chapati', emoji: '🫓', group: 'Carbs', color: '#F59E0B' },
    { name: 'Fish', emoji: '🐟', group: 'Protein', color: '#EF4444' },
    { name: 'Orange', emoji: '🍊', group: 'Vitamins', color: '#10B981' },
  ];
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [score, setScore] = useState(0);
  const [checked, setChecked] = useState(false);
  const groups = ['Carbs', 'Protein', 'Vitamins'];

  const select = (food: string, group: string) => {
    if (checked) return;
    setAnswers(prev => ({ ...prev, [food]: group }));
  };

  const checkAll = () => {
    let correct = 0;
    foods.forEach(f => { if (answers[f.name] === f.group) correct++; });
    setScore(correct * 10);
    setChecked(true);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <span className="badge badge-primary">Sort the foods!</span>
        {checked && <span className="badge badge-success">Score: {score}/{foods.length * 10}</span>}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
        {foods.map(f => (
          <div key={f.name} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 0.75rem', background: 'var(--bg-glass)', borderRadius: 'var(--radius-md)', border: checked ? (answers[f.name] === f.group ? '1px solid #10B981' : '1px solid #EF4444') : '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '1.25rem' }}>{f.emoji}</span>
            <span style={{ flex: 1, fontFamily: 'var(--font-fun)', fontSize: '0.9rem' }}>{f.name}</span>
            <div style={{ display: 'flex', gap: '0.25rem' }}>
              {groups.map(g => (
                <button key={g} onClick={() => select(f.name, g)} style={{
                  padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)', fontSize: '0.7rem', fontWeight: 600,
                  background: answers[f.name] === g ? (g === 'Carbs' ? '#F59E0B' : g === 'Protein' ? '#EF4444' : '#10B981') : 'var(--bg-glass)',
                  color: answers[f.name] === g ? '#050816' : 'var(--text-muted)', border: 'none', cursor: 'pointer',
                }}>{g}</button>
              ))}
            </div>
            {checked && <span>{answers[f.name] === f.group ? '✅' : '❌'}</span>}
          </div>
        ))}
      </div>
      {!checked && <button className="btn btn-primary" onClick={checkAll} style={{ width: '100%' }}>Check Answers</button>}
      {checked && <button className="btn btn-secondary" onClick={() => { setChecked(false); setAnswers({}); setScore(0); }} style={{ width: '100%' }}>🔄 Try Again</button>}
    </div>
  );
}

// ---------- Game 8: Color Mixer ----------
function ColorMixerGame() {
  const challenges = [
    { color1: '🔴 Red', color2: '🔵 Blue', result: 'Purple', emoji: '🟣' },
    { color1: '🔴 Red', color2: '🟡 Yellow', result: 'Orange', emoji: '🟠' },
    { color1: '🔵 Blue', color2: '🟡 Yellow', result: 'Green', emoji: '🟢' },
    { color1: '⚫ Black', color2: '⚪ White', result: 'Grey', emoji: '🩶' },
  ];
  const [index, setIndex] = useState(0);
  const [options, setOptions] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    const correct = challenges[index].result;
    const all = ['Purple', 'Orange', 'Green', 'Grey', 'Brown', 'Pink'];
    const wrongs = all.filter(c => c !== correct).sort(() => Math.random() - 0.5).slice(0, 2);
    setOptions([correct, ...wrongs].sort(() => Math.random() - 0.5));
    setFeedback(null);
  }, [index]);

  const answer = (opt: string) => {
    if (opt === challenges[index].result) {
      setScore(s => s + 10);
      setFeedback(`✅ ${challenges[index].emoji} Correct!`);
    } else {
      setFeedback(`❌ It makes ${challenges[index].result} ${challenges[index].emoji}`);
    }
    setTimeout(() => setIndex(i => (i + 1) % challenges.length), 1500);
  };

  const c = challenges[index];
  return (
    <div style={{ textAlign: 'center' }}>
      <span className="badge badge-primary" style={{ marginBottom: '1rem' }}>Score: {score}</span>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>What color do you get when you mix:</p>
      <div style={{ fontSize: '1.5rem', fontFamily: 'var(--font-fun)', margin: '1rem 0' }}>{c.color1} + {c.color2} = ?</div>
      {feedback && <p style={{ fontFamily: 'var(--font-fun)', marginBottom: '0.5rem', color: feedback.includes('✅') ? '#10B981' : '#EF4444' }}>{feedback}</p>}
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
        {options.map(o => (
          <button key={o} className="btn btn-secondary" onClick={() => answer(o)}>{o}</button>
        ))}
      </div>
    </div>
  );
}

// ---------- Game 9: Counting Challenge ----------
function CountingGame() {
  const [target, setTarget] = useState(0);
  const [items, setItems] = useState<string[]>([]);
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);

  const emojis = ['🍎', '🍌', '🥭', '🍊', '⭐', '🌸', '🐦', '🦋'];

  const generate = useCallback(() => {
    const count = Math.floor(Math.random() * 15) + 3;
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    setTarget(count);
    setItems(Array(count).fill(emoji));
    setAnswer('');
    setFeedback(null);
  }, []);

  useEffect(() => { generate(); }, []);

  const check = () => {
    if (parseInt(answer) === target) {
      setScore(s => s + 10);
      setFeedback('✅ Correct!');
      setTimeout(generate, 1000);
    } else {
      setFeedback(`❌ Count again! There are ${target}`);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <span className="badge badge-primary" style={{ marginBottom: '1rem' }}>Score: {score}</span>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>How many do you see?</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', margin: '1rem 0', padding: '1rem', background: 'var(--bg-glass)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }}>
        {items.map((item, i) => (
          <span key={i} style={{ fontSize: '1.5rem', animation: `bounceIn 0.3s ease ${i * 0.05}s both` }}>{item}</span>
        ))}
      </div>
      {feedback && <p style={{ fontFamily: 'var(--font-fun)', marginBottom: '0.5rem', color: feedback.includes('✅') ? '#10B981' : '#EF4444' }}>{feedback}</p>}
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
        <input type="number" value={answer} onChange={e => setAnswer(e.target.value)} onKeyDown={e => e.key === 'Enter' && check()} placeholder="?" style={{
          width: 80, padding: '0.75rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-glass)', border: '2px solid var(--color-primary)',
          color: 'var(--text-primary)', fontSize: '1.25rem', textAlign: 'center', outline: 'none',
        }} />
        <button className="btn btn-primary btn-sm" onClick={check}>Count!</button>
      </div>
    </div>
  );
}

// ---------- Game 10: Story Builder ----------
function StoryBuilderGame() {
  const stories = [
    {
      title: 'The Clever Hare',
      sentences: ['Once upon a time, Sungura the hare lived near Lake Victoria.', 'One day, he met Simba the lion who was very hungry.', 'Sungura said, "I know where to find delicious fish!"', 'He led the lion to the lake and the lion learned to fish.', 'From that day, they became friends and shared meals together.'],
      moral: 'Cleverness and kindness can turn enemies into friends.'
    },
    {
      title: 'Wanjiku\'s Garden',
      sentences: ['Wanjiku planted seeds in her shamba during the rainy season.', 'She watered them every morning before going to school.', 'After three weeks, small green shoots appeared from the soil.', 'Soon, beautiful tomatoes and sukuma wiki grew tall.', 'Wanjiku shared the vegetables with her whole village.'],
      moral: 'Patience and hard work bring great rewards.'
    },
  ];
  const [storyIndex] = useState(Math.floor(Math.random() * stories.length));
  const [order, setOrder] = useState<number[]>([]);
  const [available, setAvailable] = useState<number[]>([]);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setAvailable(stories[storyIndex].sentences.map((_, i) => i).sort(() => Math.random() - 0.5));
    setOrder([]);
    setChecked(false);
  }, [storyIndex]);

  const addToOrder = (i: number) => {
    if (checked) return;
    setOrder(prev => [...prev, i]);
    setAvailable(prev => prev.filter(x => x !== i));
  };
  const removeFromOrder = (i: number) => {
    if (checked) return;
    setAvailable(prev => [...prev, i]);
    setOrder(prev => prev.filter(x => x !== i));
  };

  const isCorrect = order.every((v, i) => v === i) && order.length === stories[storyIndex].sentences.length;

  return (
    <div>
      <h4 style={{ fontFamily: 'var(--font-fun)', marginBottom: '0.5rem' }}>📖 {stories[storyIndex].title}</h4>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>Arrange the sentences in the correct order:</p>
      
      {order.length > 0 && (
        <div style={{ marginBottom: '1rem', borderLeft: '3px solid var(--color-primary)', paddingLeft: '1rem' }}>
          {order.map((idx, pos) => (
            <div key={idx} onClick={() => removeFromOrder(idx)} style={{ padding: '0.5rem', marginBottom: '0.25rem', fontSize: '0.85rem', color: checked ? (idx === pos ? '#10B981' : '#EF4444') : 'var(--text-primary)', cursor: 'pointer', background: 'var(--bg-glass)', borderRadius: 'var(--radius-sm)' }}>
              {pos + 1}. {stories[storyIndex].sentences[idx]} {checked && (idx === pos ? '✅' : '❌')}
            </div>
          ))}
        </div>
      )}

      {available.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1rem' }}>
          {available.map(idx => (
            <button key={idx} onClick={() => addToOrder(idx)} style={{ padding: '0.5rem 0.75rem', fontSize: '0.85rem', background: 'var(--bg-glass)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', color: 'var(--text-secondary)', cursor: 'pointer', textAlign: 'left' }}>
              + {stories[storyIndex].sentences[idx]}
            </button>
          ))}
        </div>
      )}

      {order.length === stories[storyIndex].sentences.length && !checked && (
        <button className="btn btn-primary" onClick={() => setChecked(true)} style={{ width: '100%' }}>Check Order</button>
      )}
      {checked && (
        <div style={{ background: isCorrect ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', padding: '1rem', borderRadius: 'var(--radius-md)', border: `1px solid ${isCorrect ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}` }}>
          <p style={{ fontFamily: 'var(--font-fun)', color: isCorrect ? '#10B981' : '#EF4444' }}>{isCorrect ? '🎉 Perfect!' : '🔄 Try again!'}</p>
          {isCorrect && <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>💡 Moral: {stories[storyIndex].moral}</p>}
        </div>
      )}
    </div>
  );
}

// ---------- External Resources ----------
const externalResources = [
  { name: 'Scratch Jr', url: 'https://www.scratchjr.org/', icon: '🐱', desc: 'Visual block coding for ages 5-7', category: 'Coding', color: '#F59E0B' },
  { name: 'PhET Simulations', url: 'https://phet.colorado.edu/en/simulations/filter?type=html&sort=alpha&view=grid&grades=elementary-school', icon: '🔬', desc: 'Free science & math simulations', category: 'Science', color: '#10B981' },
  { name: 'GCompris', url: 'https://gcompris.net/index-en.html', icon: '🎮', desc: '100+ educational activities for ages 2-10', category: 'Multi-subject', color: '#6366F1' },
  { name: 'Khan Academy Kids', url: 'https://learn.khanacademy.org/khan-academy-kids/', icon: '📚', desc: 'Free reading, math & social skills', category: 'Reading & Math', color: '#EC4899' },
  { name: 'Code.org', url: 'https://studio.code.org/courses', icon: '💻', desc: 'Hour of Code and coding adventures', category: 'Coding', color: '#EF4444' },
  { name: 'ABCmouse', url: 'https://www.abcmouse.com/', icon: '🐭', desc: 'Reading, math, art, music for ages 2-8', category: 'Multi-subject', color: '#8B5CF6' },
  { name: 'Duolingo ABC', url: 'https://www.duolingo.com/abc', icon: '🦉', desc: 'Learn to read English with fun stories', category: 'Reading', color: '#22D3EE' },
  { name: 'NASA Kids Club', url: 'https://www.nasa.gov/learning-resources/for-kids-and-students/', icon: '🚀', desc: 'Space exploration & science activities', category: 'Science', color: '#06B6D4' },
  { name: 'National Geographic Kids', url: 'https://kids.nationalgeographic.com/', icon: '🌍', desc: 'Animals, science, and geography', category: 'Environment', color: '#F59E0B' },
  { name: 'Coolmath Games', url: 'https://www.coolmathgames.com/', icon: '🧮', desc: 'Fun brain training & math puzzles', category: 'Mathematics', color: '#A78BFA' },
];

// ---------- Main Games Hub Page ----------
export default function GamesPage() {
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [isBrightTheme, setIsBrightTheme] = useState(false);

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

  const games = [
    { id: 'memory', name: 'Memory Match', icon: '🃏', desc: 'Match Kiswahili animal names with their emojis', color: '#8B5CF6', subject: 'Languages', component: <MemoryMatchGame /> },
    { id: 'math-race', name: 'Math Race', icon: '🏃', desc: 'Solve math problems before time runs out!', color: '#EF4444', subject: 'Mathematics', component: <MathRaceGame /> },
    { id: 'scramble', name: 'Word Scramble', icon: '🔤', desc: 'Unscramble Kenyan words and places', color: '#F59E0B', subject: 'English', component: <WordScrambleGame /> },
    { id: 'spelling', name: 'Spelling Bee', icon: '🐝', desc: 'Spell Kiswahili words from their meanings', color: '#EC4899', subject: 'Kiswahili', component: <SpellingBeeGame /> },
    { id: 'sequence', name: 'Number Patterns', icon: '🔢', desc: 'Find the next number in the sequence', color: '#6366F1', subject: 'Mathematics', component: <NumberSequenceGame /> },
    { id: 'animals', name: 'Animal Safari', icon: '🦁', desc: 'Learn Kenyan wildlife names in Kiswahili', color: '#10B981', subject: 'Environment', component: <AnimalQuizGame /> },
    { id: 'food', name: 'Food Groups', icon: '🍽️', desc: 'Sort Kenyan foods into their food groups', color: '#06B6D4', subject: 'Nutrition', component: <FoodGroupGame /> },
    { id: 'colors', name: 'Color Mixer', icon: '🎨', desc: 'Mix colors and learn what they make', color: '#A78BFA', subject: 'Creative', component: <ColorMixerGame /> },
    { id: 'counting', name: 'Count & Learn', icon: '🔢', desc: 'Count objects as fast as you can!', color: '#22D3EE', subject: 'Mathematics', component: <CountingGame /> },
    { id: 'story', name: 'Story Builder', icon: '📖', desc: 'Arrange sentences to build Kenyan stories', color: '#78716C', subject: 'English', component: <StoryBuilderGame /> },
  ];

  const activeGameData = games.find(g => g.id === activeGame);

  return (
    <main style={{ minHeight: '100vh', paddingTop: '80px', position: 'relative', zIndex: 1 }}>
      <nav className="navbar">
        <div className="navbar-inner">
          <a href="/" className="navbar-brand">
            <div className="navbar-brand-icon">🤖</div>
            <span>Robo<span style={{ color: 'var(--color-primary-light)' }}>Kid</span></span>
          </a>
          <ul className="navbar-links">
            <li><a href="/" className="navbar-link">Home</a></li>
            <li><a href="/dashboard" className="navbar-link">Dashboard</a></li>
            <li><a href="/playbook" className="navbar-link">Playbook</a></li>
            <li><span className="badge badge-warning">🎮 Games</span></li>
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
          </ul>
        </div>
      </nav>

      <div className="container" style={{ paddingBottom: '4rem' }}>
        {/* Header with African image */}
        <div style={{ position: 'relative', borderRadius: 'var(--radius-2xl)', overflow: 'hidden', marginBottom: '2rem', height: 200 }}>
          <img src="/african-math.png" alt="African children learning" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(5,8,22,0.9), rgba(5,8,22,0.3))', display: 'flex', alignItems: 'center', padding: '0 2rem' }}>
            <div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: '0.5rem' }}>
                🎮 Games <span className="text-gradient">Hub</span>
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>10 built-in games + 10 free learning resources — learn while you play!</p>
            </div>
          </div>
        </div>

        {!activeGame ? (
          <>
            {/* Built-in Games Grid */}
            <div className="section-header" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem' }}>🕹️ Built-in <span className="text-gradient">Games</span></h2>
              <p style={{ color: 'var(--text-secondary)' }}>Play right here — no downloads needed!</p>
            </div>
            <div className="grid-3 animate-stagger" style={{ marginBottom: '3rem' }}>
              {games.map((game, i) => (
                <button key={game.id} onClick={() => setActiveGame(game.id)} className="glass-card" style={{
                  padding: '1.5rem', cursor: 'pointer', textAlign: 'left', border: `1px solid ${game.color}20`,
                  opacity: 0, animation: `fadeInUp 0.5s ease forwards ${0.05 * (i + 1)}s`,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <div style={{ width: 48, height: 48, borderRadius: 14, background: `${game.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>{game.icon}</div>
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem' }}>{game.name}</h3>
                      <span className="badge" style={{ background: `${game.color}15`, color: game.color, border: `1px solid ${game.color}30`, fontSize: '0.65rem' }}>{game.subject}</span>
                    </div>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.5 }}>{game.desc}</p>
                </button>
              ))}
            </div>

            {/* External Free Resources */}
            <div className="section-header" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem' }}>🌐 Free Learning <span className="text-gradient">Resources</span></h2>
              <p style={{ color: 'var(--text-secondary)' }}>Explore free open-source educational platforms</p>
            </div>
            <div className="grid-3 animate-stagger">
              {externalResources.map((res, i) => (
                <a key={res.name} href={res.url} target="_blank" rel="noopener noreferrer" className="glass-card" style={{
                  padding: '1.25rem', textDecoration: 'none', display: 'block', border: `1px solid ${res.color}15`,
                  opacity: 0, animation: `fadeInUp 0.5s ease forwards ${0.05 * (i + 1)}s`,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '1.75rem' }}>{res.icon}</span>
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', color: 'var(--text-primary)' }}>{res.name}</h3>
                      <span className="badge" style={{ background: `${res.color}15`, color: res.color, border: `1px solid ${res.color}30`, fontSize: '0.6rem' }}>{res.category}</span>
                    </div>
                    <span style={{ marginLeft: 'auto', color: 'var(--text-muted)', fontSize: '0.8rem' }}>↗</span>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{res.desc}</p>
                </a>
              ))}
            </div>
          </>
        ) : (
          <div>
            <button onClick={() => setActiveGame(null)} className="btn btn-secondary btn-sm" style={{ marginBottom: '1.5rem' }}>← Back to Games Hub</button>
            <div className="glass-card" style={{ padding: '2rem', maxWidth: 600, margin: '0 auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: `${activeGameData!.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>{activeGameData!.icon}</div>
                <div>
                  <h2 style={{ fontFamily: 'var(--font-fun)', fontSize: '1.25rem' }}>{activeGameData!.name}</h2>
                  <span className="badge" style={{ background: `${activeGameData!.color}15`, color: activeGameData!.color, border: `1px solid ${activeGameData!.color}30` }}>{activeGameData!.subject}</span>
                </div>
              </div>
              {activeGameData!.component}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
