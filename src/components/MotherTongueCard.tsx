'use client';

import { useState } from 'react';
import { playClick, playSuccess } from '@/lib/sound-manager';

interface TranslationInfo {
  word: string;
  kiswahili: string;
  kikuyu: string;
  luo: string;
  somali: string;
  emoji: string;
  svgColor: string;
}

export default function MotherTongueCard() {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  const items: TranslationInfo[] = [
    { word: 'Water', kiswahili: 'Maji', kikuyu: 'Maaĩ', luo: 'Pi', somali: 'Biyo', emoji: '💧', svgColor: '#38bdf8' },
    { word: 'Mango', kiswahili: 'Embe', kikuyu: 'Iembe', luo: 'Manga', somali: 'Cambe', emoji: '🥭', svgColor: '#f59e0b' },
    { word: 'Cow', kiswahili: 'Ng\'ombe', kikuyu: 'Ng\'ombe', luo: 'Dhiang\'', somali: 'Sac', emoji: '🐄', svgColor: '#94a3b8' },
    { word: 'Banana', kiswahili: 'Ndizi', kikuyu: 'Marigu', luo: 'Rabolo', somali: 'Muus', emoji: '🍌', svgColor: '#facc15' },
    { word: 'School', kiswahili: 'Shule', kikuyu: 'Thukuru', luo: 'Skul', somali: 'Dugsi', emoji: '🏫', svgColor: '#f87171' },
    { word: 'Lion', kiswahili: 'Simba', kikuyu: 'Mũrũũthi', luo: 'Sibuor', somali: 'Libaax', emoji: '🦁', svgColor: '#fb923c' }
  ];

  const handleCardClick = (idx: number) => {
    if (flippedIndex === idx) {
      playClick();
      setFlippedIndex(null);
    } else {
      playSuccess();
      setFlippedIndex(idx);
    }
  };

  const renderCardVisual = (emoji: string, color: string) => {
    switch (emoji) {
      case '💧':
        return (
          <svg width="40" height="40" viewBox="0 0 24 24" fill={color} style={{ margin: '0.5rem auto' }}>
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
          </svg>
        );
      case '🥭':
        return (
          <svg width="40" height="40" viewBox="0 0 100 100" style={{ margin: '0.5rem auto', animation: 'robotFloat 2s ease-in-out infinite' }}>
            <path d="M50,15 Q85,25 80,60 Q70,90 40,85 Q20,80 25,45 Q30,10 50,15 Z" fill={color} />
          </svg>
        );
      case '🦁':
        return (
          <svg width="40" height="40" viewBox="0 0 24 24" fill={color} style={{ margin: '0.5rem auto' }}>
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6a3 3 0 0 0-3 3h6a3 3 0 0 0-3-3z" fill="#000" />
          </svg>
        );
      default:
        return <div style={{ fontSize: '2.5rem', margin: '0.5rem 0' }}>{emoji}</div>;
    }
  };

  return (
    <div style={{ padding: '1rem 0' }}>
      <div style={{
        textAlign: 'center',
        marginBottom: '2rem'
      }}>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.5rem',
          color: '#fff',
          margin: 0
        }}>
          👅 Mother Tongue <span className="text-gradient">Word Flashcards</span>
        </h2>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '0.9rem',
          marginTop: '0.25rem'
        }}>
          Click any word card below to flip it and reveal the Kiswahili, Kikuyu, Luo, and Somali translations!
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '1.25rem'
      }}>
        {items.map((item, idx) => {
          const isFlipped = flippedIndex === idx;

          return (
            <div
              key={idx}
              onClick={() => handleCardClick(idx)}
              style={{
                perspective: '1000px',
                height: '240px',
                cursor: 'pointer'
              }}
            >
              {/* Card Inner with 3D Flip */}
              <div style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                transformStyle: 'preserve-3d',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0)',
                transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
              }}>
                
                {/* Front Side */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backfaceVisibility: 'hidden',
                  background: 'linear-gradient(135deg, rgba(30,41,59,0.5) 0%, rgba(15,23,42,0.6) 100%)',
                  border: '2px solid rgba(255,255,255,0.06)',
                  borderRadius: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '1.5rem',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.3)'
                }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{item.emoji}</div>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.25rem',
                    color: '#fff',
                    margin: 0
                  }}>{item.word}</h3>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.5rem', textTransform: 'uppercase' }}>Click to Flip</span>
                </div>

                {/* Back Side */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                  border: `2px solid ${item.svgColor}60`,
                  borderRadius: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '1.25rem',
                  boxShadow: `0 8px 20px ${item.svgColor}15`
                }}>
                  <div>
                    <h4 style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1rem',
                      color: item.svgColor,
                      margin: '0 0 0.5rem 0',
                      textAlign: 'center'
                    }}>
                      Translations
                    </h4>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Kiswahili:</span>
                        <strong style={{ color: '#fff' }}>{item.kiswahili}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Gĩkũyũ:</span>
                        <strong style={{ color: '#fff' }}>{item.kikuyu}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Dholuo:</span>
                        <strong style={{ color: '#fff' }}>{item.luo}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Somali:</span>
                        <strong style={{ color: '#fff' }}>{item.somali}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Animated Mini Shape */}
                  <div style={{ textAlign: 'center' }}>
                    {renderCardVisual(item.emoji, item.svgColor)}
                  </div>

                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
