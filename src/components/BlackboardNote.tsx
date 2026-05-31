'use client';

import { useState, useEffect } from 'react';

interface BlackboardNoteProps {
  title: string;
  notes: string[];
  formula?: string;
  delayMs?: number;
}

export default function BlackboardNote({ title, notes, formula, delayMs = 800 }: BlackboardNoteProps) {
  const [visibleLines, setVisibleLines] = useState<number>(0);

  useEffect(() => {
    setVisibleLines(0);
    const interval = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev < notes.length + (formula ? 2 : 1)) {
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, delayMs);

    return () => clearInterval(interval);
  }, [notes, formula, delayMs]);

  return (
    <div style={{
      background: '#0e2315',
      backgroundImage: 'radial-gradient(#153620 15%, transparent 16%), radial-gradient(#173b22 15%, transparent 16%)',
      backgroundSize: '30px 30px',
      backgroundPosition: '0 0, 15px 15px',
      border: '12px solid #5a3e2b',
      borderRadius: '8px',
      boxShadow: 'inset 0 0 40px rgba(0,0,0,0.8), 0 10px 25px rgba(0,0,0,0.5)',
      padding: '2rem',
      position: 'relative',
      fontFamily: '"Comic Sans MS", "Chalkboard SE", "Caveat", cursive',
      color: '#e8f7ee',
      minHeight: '280px',
      overflow: 'hidden'
    }}>
      {/* Chalkboard Dust Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.12,
        backgroundImage: 'radial-gradient(circle, #fff 10%, transparent 80%)',
        backgroundSize: '150px 150px',
        pointerEvents: 'none'
      }} />

      {/* Eraser and Chalk Trays */}
      <div style={{
        position: 'absolute',
        bottom: '2px',
        right: '20px',
        width: '60px',
        height: '8px',
        background: '#e0cda9',
        borderRadius: '2px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.4)',
        opacity: 0.8
      }} />
      
      <div style={{
        position: 'absolute',
        bottom: '2px',
        left: '20px',
        width: '40px',
        height: '10px',
        background: '#e6e6e6',
        borderRadius: '1px',
        boxShadow: '0 1px 2px rgba(0,0,0,0.4)',
        opacity: 0.8
      }} />

      {/* Header */}
      <h3 style={{
        fontSize: '1.4rem',
        borderBottom: '2px dashed rgba(255,255,255,0.2)',
        paddingBottom: '0.5rem',
        marginBottom: '1rem',
        color: '#fffae6',
        textShadow: '0 0 3px rgba(255,250,230,0.4)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <span>📝</span> {title}
      </h3>

      {/* Chalk writing lines */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '1.05rem', lineHeight: 1.6 }}>
        {notes.map((line, i) => {
          const isVisible = visibleLines > i;
          return (
            <p key={i} style={{
              margin: 0,
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
              transition: 'all 0.5s ease',
              color: i % 2 === 0 ? '#e8f7ee' : '#d2f1dd',
              paddingLeft: '1rem',
              position: 'relative'
            }}>
              {isVisible && (
                <span style={{
                  position: 'absolute',
                  left: 0,
                  color: '#ffd166'
                }}>➔</span>
              )}
              {line}
            </p>
          );
        })}

        {formula && (
          <div style={{
            marginTop: '1rem',
            padding: '1rem',
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '4px',
            border: '1px dashed rgba(255,255,255,0.1)',
            textAlign: 'center',
            fontSize: '1.25rem',
            fontFamily: 'monospace',
            color: '#ffd166',
            opacity: visibleLines > notes.length ? 1 : 0,
            transform: visibleLines > notes.length ? 'scale(1)' : 'scale(0.95)',
            transition: 'all 0.5s ease'
          }}>
            {formula}
          </div>
        )}
      </div>
    </div>
  );
}
