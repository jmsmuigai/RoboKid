'use client';

import { useRouter } from 'next/navigation';
import { playClick, playSuccess } from '@/lib/sound-manager';

export default function SelectGradePage() {
  const router = useRouter();

  const handleSelect = (stage: string, defaultGrade: number) => {
    playSuccess();
    localStorage.setItem('robokid-stage', stage);
    localStorage.setItem('robokid-selected-grade', String(defaultGrade));
    router.push('/dashboard');
  };

  const stages = [
    {
      key: 'g1-3',
      grade: 1,
      title: 'Grade 1 - 3',
      subtitle: 'Lower Primary (Ages 6-8)',
      emoji: '🌱',
      color: '#22D3EE',
      accentColor: 'rgba(34, 211, 238, 0.15)',
      description: 'Learn counting with mangoes & bananas, hear funny animal jokes, read stories in Kiswahili/Somali/Kikuyu/Luo, and explore nature!',
      bulletPoints: ['🧮 Counting & basic arithmetic', '🗣️ Mother tongue dictionary', '🦁 SAVANNA animal quizzes', '🎨 Drawing & creative arts']
    },
    {
      key: 'g4-6',
      grade: 4,
      title: 'Grade 4 - 6',
      subtitle: 'Upper Primary (Ages 9-11)',
      emoji: '🌿',
      color: '#A78BFA',
      accentColor: 'rgba(167, 139, 250, 0.15)',
      description: 'Build your problem-solving skills! Get introduced to basic logic, simple variables, block programming, and intermediate math/science.',
      bulletPoints: ['💻 Block coding & algorithms', '🌾 Agriculture & conservation', '📐 Geometry & shape calculations', '🧩 Word & logic puzzles']
    },
    {
      key: 'advanced',
      grade: 7,
      title: 'Advanced Level',
      subtitle: 'Junior & Senior School Prep (Ages 12+)',
      emoji: '🚀',
      color: '#FB923C',
      accentColor: 'rgba(251, 146, 60, 0.15)',
      description: 'Learn real Python and Java! Understand how Artificial Intelligence works, build neural network simulations, and explore robotics circuits!',
      bulletPoints: ['🐍 Real Python & Java coding', '🤖 AI & Neural Network basics', '⚙️ Robotics hardware & sensors', '📊 Assessment exams & challenges']
    }
  ];

  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2rem 1.5rem',
      background: 'radial-gradient(circle at center, #0e1230 0%, #050816 100%)',
      color: 'var(--text-primary)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background stars */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.2,
        backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
        backgroundSize: '40px 40px', pointerEvents: 'none'
      }} />

      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '3rem', zIndex: 10 }}>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 800,
          margin: 0,
          lineHeight: 1.2
        }}>
          Choose Your <span className="text-gradient">Adventure!</span>
        </h1>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '1.1rem',
          marginTop: '0.75rem',
          maxWidth: '500px'
        }}>
          Select your grade stage below to launch your personalized AI & Robotics learning experience.
        </p>
      </div>

      {/* Cards container */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        width: '100%',
        maxWidth: '1100px',
        zIndex: 10
      }}>
        {stages.map((stage) => (
          <div
            key={stage.key}
            onClick={() => handleSelect(stage.key, stage.grade)}
            className="glass-card"
            style={{
              padding: '2rem',
              cursor: 'pointer',
              border: `2px solid ${stage.color}30`,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              background: 'rgba(30, 41, 59, 0.4)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              playClick();
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.borderColor = stage.color;
              e.currentTarget.style.boxShadow = `0 15px 30px ${stage.color}15`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = `${stage.color}30`;
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {/* Corner emoji float */}
            <div style={{
              position: 'absolute', top: '-10px', right: '-10px',
              fontSize: '6rem', opacity: 0.08, pointerEvents: 'none'
            }}>{stage.emoji}</div>

            <div>
              {/* Stage icon */}
              <div style={{
                width: '64px', height: '64px', borderRadius: '16px',
                background: stage.accentColor, display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                fontSize: '2.5rem', marginBottom: '1.5rem',
                color: stage.color
              }}>
                {stage.emoji}
              </div>

              {/* Title & Age */}
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.5rem', margin: '0 0 0.25rem 0',
                color: '#fff'
              }}>
                {stage.title}
              </h2>
              <span style={{
                color: stage.color, fontSize: '0.85rem', fontWeight: 600,
                textTransform: 'uppercase', letterSpacing: '0.05rem', display: 'block',
                marginBottom: '1rem'
              }}>
                {stage.subtitle}
              </span>

              {/* Description */}
              <p style={{
                color: 'var(--text-secondary)',
                fontSize: '0.9rem', lineHeight: 1.6,
                marginBottom: '1.5rem'
              }}>
                {stage.description}
              </p>

              {/* Bullet list */}
              <ul style={{
                paddingLeft: '1.25rem', margin: '0 0 2rem 0',
                display: 'flex', flexDirection: 'column', gap: '0.5rem'
              }}>
                {stage.bulletPoints.map((point, idx) => (
                  <li key={idx} style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.85rem'
                  }}>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* Launch button */}
            <button
              style={{
                width: '100%',
                padding: '0.85rem',
                borderRadius: '12px',
                border: 'none',
                background: stage.color,
                color: '#050816',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer',
                transition: 'opacity 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
            >
              Start Adventure 🚀
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
