'use client';

import { useRef, useState, useEffect } from 'react';
import { playClick, playSuccess } from '@/lib/sound-manager';
import type { Language } from '@/types';

interface HandwritingPracticeProps {
  language: Language;
}

const LETTERS_TO_TRACE = ['A', 'B', 'C', 'a', 'e', 'i', 'o', 'u', '1', '2', '3'];

export default function HandwritingPractice({ language }: HandwritingPracticeProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedLetter, setSelectedLetter] = useState('a');
  const [isDrawing, setIsDrawing] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [sparkles, setSparkles] = useState<{ x: number; y: number; color: string; id: number }[]>([]);
  const hueRef = useRef(0);

  const speakComment = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.pitch = 1.35;
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    drawGuide();
  }, [selectedLetter]);

  const drawGuide = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw exercise book lines
    ctx.lineWidth = 1.5;
    
    // Top line (Red)
    ctx.strokeStyle = '#EF4444';
    ctx.beginPath();
    ctx.moveTo(0, 60);
    ctx.lineTo(canvas.width, 60);
    ctx.stroke();

    // Middle line (Blue dashed)
    ctx.strokeStyle = '#3B82F6';
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.moveTo(0, 130);
    ctx.lineTo(canvas.width, 130);
    ctx.stroke();
    ctx.setLineDash([]); // Reset dash

    // Bottom line (Red baseline)
    ctx.strokeStyle = '#EF4444';
    ctx.beginPath();
    ctx.moveTo(0, 200);
    ctx.lineTo(canvas.width, 200);
    ctx.stroke();

    // Draw giant guide letter text in dotted gray font
    ctx.font = 'bold 180px Fredoka, Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.06)';
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.08)';
    ctx.lineWidth = 3;
    ctx.setLineDash([4, 4]);
    ctx.fillText(selectedLetter, canvas.width / 2, 130);
    ctx.strokeText(selectedLetter, canvas.width / 2, 130);
    ctx.setLineDash([]); // Reset dash
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.beginPath(); // Reset drawing path
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Get coordinates
    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // Draw stroke
    ctx.lineWidth = 14;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Rainbow brush
    hueRef.current = (hueRef.current + 4) % 360;
    const color = `hsl(${hueRef.current}, 100%, 55%)`;
    ctx.strokeStyle = color;
    ctx.shadowBlur = 8;
    ctx.shadowColor = color;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);

    // Reset shadow
    ctx.shadowBlur = 0;

    // Add sparkle particles
    const newSparkle = {
      x,
      y,
      color,
      id: Math.random(),
    };
    setSparkles(prev => [...prev, newSparkle].slice(-20));
  };

  const checkTracing = () => {
    playClick();
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check colored pixels
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let drawnPixels = 0;
    for (let i = 0; i < imgData.data.length; i += 4) {
      const a = imgData.data[i + 3];
      const r = imgData.data[i];
      const g = imgData.data[i + 1];
      const b = imgData.data[i + 2];
      
      // Filter out guide lines
      if (a > 50 && !(r === 239 && g === 68 && b === 68) && !(r === 59 && g === 130 && b === 246)) {
        drawnPixels++;
      }
    }

    if (drawnPixels > 1000) {
      playSuccess();
      const count = completedCount + 1;
      setCompletedCount(count);
      
      let comment = `Fabulous handwriting! You traced the letter ${selectedLetter} beautifully!`;
      if (language === 'kiswahili') comment = `Kazi nzuri sana! Umeandika herufi ${selectedLetter} kwa ufasaha!`;
      if (language === 'kikuyu') comment = `Wĩra mwega mũno! Wandĩka herufi ${selectedLetter} wega mũno!`;
      if (language === 'luo') comment = `Ndiko maber! Indiko herufi ${selectedLetter} e yo maler!`;

      setFeedback(`🎉 ${comment}`);
      speakComment(comment);

      // Award toy Maasai Shield when completing 3 tracings
      if (count === 3) {
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('robokid-award-toy', { detail: { toyId: 'toy_shield' } }));
        }
      }
    } else {
      setFeedback('❌ Draw some more lines along the guide to complete the letter!');
      speakComment('Keep drawing along the lines!');
    }
  };

  const clearCanvas = () => {
    playClick();
    drawGuide();
    setFeedback(null);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem', flexWrap: 'wrap' }}>
      
      {/* Selector */}
      <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem', borderRadius: '16px' }}>
        <h4 style={{ fontFamily: 'var(--font-fun)', fontSize: '1rem', margin: 0, color: '#FFF' }}>
          ✍️ Trace a Letter:
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.4rem' }}>
          {LETTERS_TO_TRACE.map(letter => (
            <button
              key={letter}
              onClick={() => { playClick(); setSelectedLetter(letter); setFeedback(null); }}
              style={{
                height: '42px',
                borderRadius: '10px',
                fontSize: '1.2rem',
                fontWeight: 800,
                cursor: 'pointer',
                background: selectedLetter === letter ? 'var(--color-primary)' : 'rgba(255,255,255,0.05)',
                color: '#FFF',
                border: selectedLetter === letter ? 'none' : '1px solid var(--border-subtle)',
                transition: 'all 0.15s'
              }}
            >
              {letter}
            </button>
          ))}
        </div>

        <div style={{ marginTop: 'auto', background: 'rgba(99, 102, 241, 0.05)', padding: '0.75rem', borderRadius: '12px', border: '1px solid rgba(99,102,241,0.2)' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-primary-light)', fontWeight: 800, display: 'block' }}>🏆 Progress Tracker</span>
          <p style={{ fontSize: '0.85rem', color: '#FFF', margin: '0.2rem 0 0 0' }}>
            Letters Traced: <strong>{completedCount}</strong> (Trace 3 to unlock a Maasai Bead Shield!)
          </p>
        </div>
      </div>

      {/* Canvas Paper */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{
          background: '#FFFEE9', // Classic primary school notebook page yellow
          borderRadius: '20px',
          border: '3px solid #E4E2C6',
          boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
          overflow: 'hidden',
          position: 'relative',
          padding: '10px'
        }}>
          {/* Notebook binding margin red line */}
          <div style={{ position: 'absolute', top: 0, left: '40px', width: '2px', height: '100%', background: '#FCA5A5', zIndex: 1 }} />
          
          <canvas
            ref={canvasRef}
            width={400}
            height={260}
            onMouseDown={startDrawing}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onMouseMove={draw}
            onTouchStart={startDrawing}
            onTouchEnd={stopDrawing}
            onTouchMove={draw}
            style={{
              display: 'block',
              width: '100%',
              height: '260px',
              cursor: 'crosshair',
              position: 'relative',
              zIndex: 2,
            }}
          />

          {/* Sparkles visual display */}
          {sparkles.map(sp => (
            <div
              key={sp.id}
              style={{
                position: 'absolute',
                top: sp.y + 4,
                left: sp.x + 4,
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: sp.color,
                pointerEvents: 'none',
                boxShadow: `0 0 8px ${sp.color}`,
                animation: 'fadeFloat 0.8s ease forwards',
                zIndex: 3
              }}
            />
          ))}
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={clearCanvas} className="btn btn-secondary" style={{ flex: 1 }}>🧹 Clear Page</button>
          <button onClick={checkTracing} className="btn btn-primary" style={{ flex: 1, background: '#10B981', borderColor: '#10B981' }}>✨ Check Handwriting</button>
        </div>

        {feedback && (
          <div style={{
            background: 'var(--bg-glass-strong)', 
            border: '1px solid var(--border-subtle)', 
            padding: '0.75rem 1rem', 
            borderRadius: '12px',
            fontSize: '0.9rem',
            textAlign: 'center',
            color: '#FFF',
            fontWeight: 600,
            animation: 'pianoFloat 0.2s ease'
          }}>
            {feedback}
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeFloat {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-30px) scale(0.3); opacity: 0; }
        }
      `}</style>

    </div>
  );
}
