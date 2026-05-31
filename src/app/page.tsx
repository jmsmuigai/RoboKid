'use client';

import { useState, useEffect } from 'react';

/* ============================================================
   RoboKid — Landing Page
   AI-Powered CBC Learning Platform for Kenyan Children
   ============================================================ */

// ---------- SVG Robot Mascot Component ----------
function RobotMascot({ size = 280 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 300 350" fill="none" xmlns="http://www.w3.org/2000/svg" className="robot-svg">
      {/* Antenna */}
      <circle cx="150" cy="18" r="10" fill="url(#antennaGrad)" className="antenna-tip">
        <animate attributeName="r" values="10;13;10" dur="2s" repeatCount="indefinite" />
      </circle>
      <rect x="147" y="25" width="6" height="30" rx="3" fill="url(#bodyGrad)" />
      
      {/* Signal waves from antenna */}
      <circle cx="150" cy="18" r="18" fill="none" stroke="#818CF8" strokeWidth="1" opacity="0.4">
        <animate attributeName="r" values="18;35;18" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.4;0;0.4" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="150" cy="18" r="25" fill="none" stroke="#A78BFA" strokeWidth="1" opacity="0.2">
        <animate attributeName="r" values="25;45;25" dur="3s" repeatCount="indefinite" begin="0.5s" />
        <animate attributeName="opacity" values="0.2;0;0.2" dur="3s" repeatCount="indefinite" begin="0.5s" />
      </circle>
      
      {/* Head */}
      <rect x="75" y="55" width="150" height="120" rx="24" fill="url(#headGrad)" stroke="url(#headStroke)" strokeWidth="2" />
      
      {/* Head inner glow */}
      <rect x="85" y="65" width="130" height="100" rx="18" fill="url(#headInnerGrad)" opacity="0.5" />
      
      {/* Eyes */}
      <g className="robot-eyes">
        {/* Left eye socket */}
        <ellipse cx="115" cy="110" rx="22" ry="22" fill="#0A0F2C" />
        <ellipse cx="115" cy="110" rx="18" ry="18" fill="url(#eyeGrad)">
          <animate attributeName="ry" values="18;2;18" dur="4s" repeatCount="indefinite" begin="2s" />
        </ellipse>
        {/* Left eye pupil */}
        <circle cx="118" cy="108" r="7" fill="#050816" />
        <circle cx="120" cy="106" r="3" fill="white" opacity="0.8" />
        
        {/* Right eye socket */}
        <ellipse cx="185" cy="110" rx="22" ry="22" fill="#0A0F2C" />
        <ellipse cx="185" cy="110" rx="18" ry="18" fill="url(#eyeGrad)">
          <animate attributeName="ry" values="18;2;18" dur="4s" repeatCount="indefinite" begin="2s" />
        </ellipse>
        {/* Right eye pupil */}
        <circle cx="188" cy="108" r="7" fill="#050816" />
        <circle cx="190" cy="106" r="3" fill="white" opacity="0.8" />
      </g>
      
      {/* Mouth - LED smile */}
      <path d="M120 140 Q150 160 180 140" stroke="url(#mouthGrad)" strokeWidth="4" fill="none" strokeLinecap="round">
        <animate attributeName="d" values="M120 140 Q150 160 180 140;M120 145 Q150 155 180 145;M120 140 Q150 160 180 140" dur="3s" repeatCount="indefinite" />
      </path>
      
      {/* Cheek LEDs */}
      <circle cx="85" cy="130" r="6" fill="#EC4899" opacity="0.4">
        <animate attributeName="opacity" values="0.4;0.7;0.4" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="215" cy="130" r="6" fill="#EC4899" opacity="0.4">
        <animate attributeName="opacity" values="0.4;0.7;0.4" dur="2s" repeatCount="indefinite" begin="0.3s" />
      </circle>
      
      {/* Neck */}
      <rect x="130" y="175" width="40" height="15" rx="4" fill="url(#neckGrad)" />
      
      {/* Body */}
      <rect x="65" y="190" width="170" height="100" rx="20" fill="url(#bodyMainGrad)" stroke="url(#bodyStroke)" strokeWidth="2" />
      
      {/* Chest screen/panel */}
      <rect x="100" y="210" width="100" height="55" rx="12" fill="#0A0F2C" stroke="#6366F1" strokeWidth="1" opacity="0.8" />
      
      {/* Kenya flag on chest */}
      <rect x="115" y="222" width="70" height="8" rx="2" fill="#000000" />
      <rect x="115" y="230" width="70" height="3" rx="1" fill="#FFFFFF" />
      <rect x="115" y="233" width="70" height="8" rx="2" fill="#BB0000" />
      <rect x="115" y="241" width="70" height="3" rx="1" fill="#FFFFFF" />
      <rect x="115" y="244" width="70" height="8" rx="2" fill="#006600" />
      
      {/* Heart LED on chest */}
      <circle cx="150" cy="237" r="10" fill="url(#heartGrad)" opacity="0.8">
        <animate attributeName="r" values="10;12;10" dur="1.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.8;1;0.8" dur="1.5s" repeatCount="indefinite" />
      </circle>
      <text x="150" y="241" textAnchor="middle" fontSize="12" fill="white" fontFamily="var(--font-fun)">♥</text>
      
      {/* Arms */}
      {/* Left arm */}
      <rect x="25" y="200" width="35" height="70" rx="14" fill="url(#armGrad)" stroke="url(#armStroke)" strokeWidth="1.5">
        <animateTransform attributeName="transform" type="rotate" values="-5,42,235;5,42,235;-5,42,235" dur="3s" repeatCount="indefinite" />
      </rect>
      <circle cx="42" cy="275" r="14" fill="url(#handGrad)">
        <animateTransform attributeName="transform" type="rotate" values="-5,42,235;5,42,235;-5,42,235" dur="3s" repeatCount="indefinite" />
      </circle>
      
      {/* Right arm */}
      <rect x="240" y="200" width="35" height="70" rx="14" fill="url(#armGrad)" stroke="url(#armStroke)" strokeWidth="1.5">
        <animateTransform attributeName="transform" type="rotate" values="5,258,235;-5,258,235;5,258,235" dur="3s" repeatCount="indefinite" begin="0.5s" />
      </rect>
      <circle cx="258" cy="275" r="14" fill="url(#handGrad)">
        <animateTransform attributeName="transform" type="rotate" values="5,258,235;-5,258,235;5,258,235" dur="3s" repeatCount="indefinite" begin="0.5s" />
      </circle>
      
      {/* Legs */}
      <rect x="95" y="290" width="30" height="40" rx="10" fill="url(#legGrad)" />
      <rect x="175" y="290" width="30" height="40" rx="10" fill="url(#legGrad)" />
      
      {/* Feet */}
      <ellipse cx="110" cy="335" rx="22" ry="10" fill="url(#footGrad)" />
      <ellipse cx="190" cy="335" rx="22" ry="10" fill="url(#footGrad)" />
      
      {/* Gradient Definitions */}
      <defs>
        <linearGradient id="antennaGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#818CF8" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
        <linearGradient id="headGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1E293B" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
        <linearGradient id="headStroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6366F1" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="headInnerGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6366F1" stopOpacity="0.1" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
        <radialGradient id="eyeGrad" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#22D3EE" />
          <stop offset="70%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#4F46E5" />
        </radialGradient>
        <linearGradient id="mouthGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#6366F1" />
          <stop offset="50%" stopColor="#EC4899" />
          <stop offset="100%" stopColor="#6366F1" />
        </linearGradient>
        <linearGradient id="neckGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#334155" />
          <stop offset="100%" stopColor="#1E293B" />
        </linearGradient>
        <linearGradient id="bodyMainGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1E293B" />
          <stop offset="50%" stopColor="#162040" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
        <linearGradient id="bodyStroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6366F1" stopOpacity="0.4" />
          <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#EC4899" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#334155" />
          <stop offset="100%" stopColor="#1E293B" />
        </linearGradient>
        <linearGradient id="armGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1E293B" />
          <stop offset="100%" stopColor="#162040" />
        </linearGradient>
        <linearGradient id="armStroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6366F1" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.2" />
        </linearGradient>
        <radialGradient id="handGrad" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#334155" />
          <stop offset="100%" stopColor="#1E293B" />
        </radialGradient>
        <linearGradient id="legGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1E293B" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
        <radialGradient id="footGrad" cx="0.5" cy="0.3" r="0.7">
          <stop offset="0%" stopColor="#334155" />
          <stop offset="100%" stopColor="#1E293B" />
        </radialGradient>
        <radialGradient id="heartGrad" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#EC4899" />
          <stop offset="100%" stopColor="#6366F1" />
        </radialGradient>
      </defs>
    </svg>
  );
}

// ---------- Animated Counter Component ----------
function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [target]);
  
  return <>{count}{suffix}</>;
}

// ---------- Language Demo Component ----------
function LanguageDemo() {
  const [activeLang, setActiveLang] = useState<string>('english');
  
  const translations: Record<string, { greeting: string; puzzle: string; answer: string }> = {
    english: {
      greeting: '👋 Hello, young learner!',
      puzzle: 'Wanjiku has 3 mangoes. Her mother gives her 2 more. How many mangoes does Wanjiku have now?',
      answer: '🎉 5 mangoes! Great job!',
    },
    kiswahili: {
      greeting: '👋 Habari, mwanafunzi mdogo!',
      puzzle: 'Wanjiku ana maembe 3. Mama yake anampa mengine 2. Wanjiku ana maembe mangapi sasa?',
      answer: '🎉 Maembe 5! Hongera sana!',
    },
    kikuyu: {
      greeting: '👋 Wĩ mwega, mũrutwo mũnini!',
      puzzle: 'Wanjiku arĩ na maembe 3. Nyina akĩmũhe mangĩ 2. Wanjiku arĩ na maembe mangapi rĩu?',
      answer: '🎉 Maembe 5! Wĩkĩte wega!',
    },
    luo: {
      greeting: '👋 Ber, janyuol matin!',
      puzzle: 'Wanjiku nigi manga 3. Min-gi omiye 2 moko. Wanjiku nigi manga adi sani?',
      answer: '🎉 Manga 5! Itimo maber!',
    },
    somali: {
      greeting: '👋 Salaan, ardayga yar!',
      puzzle: 'Wanjiku waxay leedahay 3 cambe. Hooyadeed ayaa siisay 2 kale. Wanjiku imisa cambe ayay hadda leedahay?',
      answer: '🎉 5 cambe! Aad baad u fiicantahay!',
    },
  };

  const languages = [
    { code: 'english', label: 'EN', full: 'English' },
    { code: 'kiswahili', label: 'SW', full: 'Kiswahili' },
    { code: 'kikuyu', label: 'KI', full: 'Kikuyu' },
    { code: 'luo', label: 'LU', full: 'Luo' },
    { code: 'somali', label: 'SO', full: 'Somali' },
  ];

  return (
    <div style={{ width: '100%' }}>
      <div className="language-toggle" style={{ marginBottom: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        {languages.map((lang) => (
          <button
            key={lang.code}
            className={`language-btn ${activeLang === lang.code ? 'active' : ''}`}
            onClick={() => setActiveLang(lang.code)}
            aria-label={`Switch to ${lang.full}`}
            id={`lang-btn-${lang.code}`}
          >
            {lang.label}
          </button>
        ))}
      </div>
      <div className="glass-card" style={{ padding: '2rem', textAlign: 'left' }}>
        <p style={{ color: 'var(--color-primary-light)', fontFamily: 'var(--font-fun)', fontSize: '1.1rem', marginBottom: '1rem' }}>
          {translations[activeLang].greeting}
        </p>
        <p style={{ fontSize: '1rem', lineHeight: '1.7', marginBottom: '1rem' }}>
          {translations[activeLang].puzzle}
        </p>
        <div style={{ 
          background: 'rgba(16, 185, 129, 0.1)', 
          border: '1px solid rgba(16, 185, 129, 0.2)',
          borderRadius: 'var(--radius-md)',
          padding: '0.75rem 1rem',
          fontFamily: 'var(--font-fun)',
          color: 'var(--color-environment-light)',
        }}>
          {translations[activeLang].answer}
        </div>
      </div>
    </div>
  );
}

// ---------- Subject Card Component ----------
function SubjectCard({ icon, name, color, description, topics, delay }: {
  icon: string; name: string; color: string; description: string; topics: string[]; delay: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
      className="subject-card"
      style={{ 
        '--card-accent': color,
        animationDelay: `${delay}s`,
        opacity: 0,
        animation: `fadeInUp 0.6s ease forwards ${delay}s`,
      } as React.CSSProperties}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="subject-card-icon" style={{ background: `${color}20` }}>
        <span style={{ fontSize: '2rem' }}>{icon}</span>
      </div>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', marginBottom: '0.5rem' }}>{name}</h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1rem' }}>{description}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {topics.slice(0, isHovered ? topics.length : 3).map((topic, i) => (
          <span key={i} className="badge badge-primary" style={{ 
            background: `${color}15`,
            color: color,
            border: `1px solid ${color}30`,
            fontSize: '0.7rem',
          }}>
            {topic}
          </span>
        ))}
      </div>
    </div>
  );
}


// ---------- Main Landing Page ----------
export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  const subjects = [
    {
      icon: '🧮', name: 'Mathematics Activities', color: '#8B5CF6',
      description: 'Numbers, counting, shapes, and problem-solving in everyday Kenyan life',
      topics: ['Counting', 'Addition', 'Subtraction', 'Shapes', 'Measurement', 'Patterns'],
    },
    {
      icon: '🌍', name: 'Environmental Activities', color: '#10B981',
      description: 'Exploring nature, hygiene, nutrition, and our beautiful Kenyan environment',
      topics: ['Hygiene', 'Nutrition', 'Animals', 'Plants', 'Weather', 'Conservation'],
    },
    {
      icon: '📖', name: 'English Language', color: '#F59E0B',
      description: 'Reading, writing, and speaking English with confidence and joy',
      topics: ['Phonics', 'Reading', 'Writing', 'Comprehension', 'Grammar', 'Vocabulary'],
    },
    {
      icon: '🗣️', name: 'Kiswahili Language', color: '#EF4444',
      description: 'Kusoma, kuandika, na kuzungumza Kiswahili kwa ufasaha',
      topics: ['Herufi', 'Kusoma', 'Kuandika', 'Ufahamu', 'Sarufi', 'Msamiati'],
    },
    {
      icon: '🏡', name: 'Indigenous Languages', color: '#EC4899',
      description: 'Learn and celebrate your mother tongue — Kikuyu, Luo, Somali & more',
      topics: ['Kikuyu', 'Luo', 'Somali', 'Greetings', 'Counting', 'Stories'],
    },
    {
      icon: '🎨', name: 'Creative Activities', color: '#06B6D4',
      description: 'Art, music, movement, and creative expression for vibrant young minds',
      topics: ['Drawing', 'Music', 'Dance', 'Crafts', 'Storytelling', 'Drama'],
    },
  ];

  return (
    <main style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.5s ease' }}>
      {/* ===== NAVBAR ===== */}
      <nav className="navbar" id="navbar">
        <div className="navbar-inner">
          <a href="/" className="navbar-brand" id="navbar-brand">
            <div className="navbar-brand-icon">🤖</div>
            <span>Robo<span style={{ color: 'var(--color-primary-light)' }}>Kid</span></span>
          </a>
          <ul className="navbar-links">
            <li><a href="#subjects" className="navbar-link">Subjects</a></li>
            <li><a href="#features" className="navbar-link">Features</a></li>
            <li><a href="/games" className="navbar-link">🎮 Games</a></li>
            <li><a href="/encyclopedia" className="navbar-link">📖 Encyclopedia</a></li>
            <li><a href="/playbook" className="navbar-link">Playbook</a></li>
            <li><a href="/dashboard" className="btn btn-primary btn-sm" id="cta-navbar">Start Learning</a></li>
          </ul>
        </div>
      </nav>

      {/* ===== HERO SECTION ===== */}
      <section className="hero" id="hero">
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge">
              <span style={{ fontSize: '0.75rem' }}>🇰🇪</span>
              <span>Aligned with Kenya CBC Curriculum 2025</span>
            </div>
            <h1>
              Learn <span className="text-gradient">AI</span>, Play Smart,{' '}
              <br />
              Speak Your{' '}
              <span className="text-gradient">Language</span>
            </h1>
            <p className="hero-subtitle">
              RoboKid is an AI-powered learning companion for Kenyan children in Grade 1-3. 
              Interactive puzzles, games, and lessons in English, Kiswahili, Kikuyu, Luo, and Somali — 
              all aligned with the KICD Competency-Based Curriculum.
            </p>
            <div className="hero-actions">
              <a href="/dashboard" className="btn btn-primary btn-lg" id="cta-hero-start">
                🚀 Start Learning Free
              </a>
              <a href="/playbook" className="btn btn-secondary btn-lg" id="cta-hero-playbook">
                📕 View Playbook
              </a>
            </div>
            <div className="hero-stats">
              <div className="hero-stat">
                <div className="hero-stat-number"><AnimatedCounter target={10} /></div>
                <div className="hero-stat-label">Built-in Games</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-number"><AnimatedCounter target={150} suffix="+" /></div>
                <div className="hero-stat-label">Practice Questions</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-number"><AnimatedCounter target={5} /></div>
                <div className="hero-stat-label">Languages</div>
              </div>
            </div>
          </div>
          
          <div className="hero-visual">
            {/* Orbit Rings */}
            <div className="orbit-ring" style={{ width: '350px', height: '350px', top: '50%', left: '50%' }} />
            <div className="orbit-ring" style={{ width: '450px', height: '450px', top: '50%', left: '50%' }} />
            <div className="orbit-ring" style={{ width: '550px', height: '550px', top: '50%', left: '50%' }} />
            
            {/* Floating subject icons on orbit */}
            <div className="orbit-dot" style={{ top: '10%', left: '60%', background: '#8B5CF6', fontSize: '1.5rem', width: 'auto', height: 'auto', padding: '8px', borderRadius: '12px', animation: 'robotFloat 5s ease-in-out infinite' }}>🧮</div>
            <div className="orbit-dot" style={{ top: '30%', right: '5%', background: '#10B981', fontSize: '1.5rem', width: 'auto', height: 'auto', padding: '8px', borderRadius: '12px', animation: 'robotFloat 4s ease-in-out infinite 0.5s' }}>🌍</div>
            <div className="orbit-dot" style={{ bottom: '25%', right: '10%', background: '#F59E0B', fontSize: '1.5rem', width: 'auto', height: 'auto', padding: '8px', borderRadius: '12px', animation: 'robotFloat 6s ease-in-out infinite 1s' }}>📖</div>
            <div className="orbit-dot" style={{ bottom: '15%', left: '15%', background: '#EF4444', fontSize: '1.5rem', width: 'auto', height: 'auto', padding: '8px', borderRadius: '12px', animation: 'robotFloat 4.5s ease-in-out infinite 1.5s' }}>🗣️</div>
            <div className="orbit-dot" style={{ top: '20%', left: '10%', background: '#EC4899', fontSize: '1.5rem', width: 'auto', height: 'auto', padding: '8px', borderRadius: '12px', animation: 'robotFloat 5.5s ease-in-out infinite 0.8s' }}>🎨</div>
            
            {/* Robot Glow */}
            <div className="robot-glow" />
            
            {/* Robot */}
            <div className="robot-body" style={{ width: '280px', height: '350px' }}>
              <RobotMascot size={280} />
            </div>
          </div>
        </div>
      </section>

      {/* ===== SUBJECTS SECTION ===== */}
      <section className="section" id="subjects">
        <div className="container">
          <div className="section-header">
            <span className="badge badge-primary" style={{ marginBottom: '1rem' }}>📚 CBC Learning Areas</span>
            <h2>Master the <span className="text-gradient">CBC Curriculum</span></h2>
            <p>All 7 rationalized learning areas from the KICD 2025 framework, brought to life with AI-powered interactive lessons and Kenyan context</p>
          </div>
          <div className="grid-3 animate-stagger">
            {subjects.map((subject, i) => (
              <SubjectCard key={subject.name} {...subject} delay={0.1 * (i + 1)} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section className="section" id="features" style={{ background: 'linear-gradient(180deg, transparent, rgba(99, 102, 241, 0.03), transparent)' }}>
        <div className="container">
          <div className="section-header">
            <span className="badge badge-success" style={{ marginBottom: '1rem' }}>✨ Powered by AI</span>
            <h2>Why <span className="text-gradient">RoboKid</span>?</h2>
            <p>Built specifically for Kenyan children, powered by Google Gemini AI</p>
          </div>
          <div className="features-grid animate-stagger">
            {[
              {
                icon: '🤖',
                title: 'AI-Powered Learning',
                desc: 'Google Gemini generates unlimited age-appropriate puzzles, stories, and quizzes — fresh content every time',
                color: '#6366F1',
              },
              {
                icon: '🌐',
                title: '5 Languages',
                desc: 'Learn in English, Kiswahili, Kikuyu, Luo, or Somali — real-time AI translation preserving cultural context',
                color: '#EC4899',
              },
              {
                icon: '🇰🇪',
                title: '100% Kenyan Context',
                desc: 'Every puzzle features matatus, shambas, ugali, Maasai Mara, and familiar names like Ochieng and Wanjiku',
                color: '#10B981',
              },
              {
                icon: '📝',
                title: 'KNEC-Aligned Exams',
                desc: '150+ practice questions aligned with KEYA assessments, with instant grading and detailed explanations',
                color: '#F59E0B',
              },
              {
                icon: '🎮',
                title: 'Interactive Games',
                desc: 'Memory match, word search, math race, and picture quizzes — learning disguised as play',
                color: '#8B5CF6',
              },
              {
                icon: '📊',
                title: 'Progress Tracking',
                desc: 'Parents and teachers can monitor learning milestones, strengths, and areas for improvement',
                color: '#06B6D4',
              },
            ].map((feature, i) => (
              <div key={feature.title} className="glass-card feature-card" style={{ animationDelay: `${0.1 * (i + 1)}s`, opacity: 0, animation: `fadeInUp 0.5s ease forwards ${0.1 * (i + 1)}s` }}>
                <div className="feature-card-icon" style={{ background: `${feature.color}15` }}>
                  <span>{feature.icon}</span>
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LANGUAGE DEMO SECTION ===== */}
      <section className="section" id="languages">
        <div className="container">
          <div className="section-header">
            <span className="badge badge-warning" style={{ marginBottom: '1rem' }}>🗣️ Mother Tongue</span>
            <h2>Learn in <span className="text-gradient">Your Language</span></h2>
            <p>Toggle between 5 Kenyan languages instantly — see the same CBC puzzle transformed in real-time</p>
          </div>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <LanguageDemo />
          </div>
        </div>
      </section>

      {/* ===== AFRICAN GALLERY SECTION ===== */}
      <section className="section" id="gallery" style={{ background: 'linear-gradient(180deg, transparent, rgba(236, 72, 153, 0.03), transparent)' }}>
        <div className="container">
          <div className="section-header">
            <span className="badge badge-warning" style={{ marginBottom: '1rem' }}>🌍 Made in Africa</span>
            <h2>Learning Rooted in <span className="text-gradient">African Culture</span></h2>
            <p>Every lesson, story, and activity celebrates the beauty and diversity of our continent</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
            {[
              { src: '/african-math.png', label: '🧮 Market Mathematics', desc: 'Learn counting with mangoes and bananas at the local market' },
              { src: '/african-nature.png', label: '🦁 Wildlife Safari', desc: 'Discover amazing animals across the Kenyan savanna' },
              { src: '/african-language.png', label: '📖 Storytelling Circle', desc: 'Share stories under the baobab tree in your mother tongue' },
              { src: '/african-coding.png', label: '💻 Future Innovators', desc: 'Learn coding in a futuristic African classroom' },
              { src: '/african-arts.png', label: '🎨 Creative Expression', desc: 'Painting, drumming, and dancing with joy' },
              { src: '/african-health.png', label: '🏥 Health & Hygiene', desc: 'Clean hands, balanced meals, healthy bodies' },
            ].map((img, i) => (
              <div key={i} className="glass-card" style={{ padding: 0, overflow: 'hidden', opacity: 0, animation: `fadeInUp 0.5s ease forwards ${0.1 * (i + 1)}s` }}>
                <img src={img.src} alt={img.label} style={{ width: '100%', height: 180, objectFit: 'cover' }} />
                <div style={{ padding: '1rem' }}>
                  <h4 style={{ fontFamily: 'var(--font-fun)', fontSize: '0.95rem', marginBottom: '0.25rem' }}>{img.label}</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: 1.5 }}>{img.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTENT LIBRARY SECTION ===== */}
      <section className="section" id="content">
        <div className="container">
          <div className="section-header">
            <span className="badge badge-primary" style={{ marginBottom: '1rem' }}>📚 Content Agent</span>
            <h2>AI-Generated <span className="text-gradient">Content Library</span></h2>
            <p>Stories, riddles, poems, facts, and vocabulary — always growing, always fresh</p>
          </div>
          <div className="grid-3 animate-stagger">
            {[
              { type: '📖 Stories', count: '4+', desc: 'Kenyan folktales and moral stories set in familiar places — Maasai Mara, Lake Victoria, Mount Kenya', color: '#8B5CF6' },
              { type: '🤔 Riddles', count: '3+', desc: 'Kitendawili in English and Kiswahili — guess animals, objects, and places from clever clues', color: '#F59E0B' },
              { type: '📝 Poems', count: '2+', desc: 'Patriotic poems about Kenya in both English and Kiswahili — perfect for recitation', color: '#EC4899' },
              { type: '🧠 Fun Facts', count: '6+', desc: 'Did you know? Amazing facts about elephants, giraffes, flamingos, Mount Kenya, and marathons', color: '#10B981' },
              { type: '🔤 Vocabulary', count: '4+', desc: 'Days of the week, colors, animals, and numbers in English, Kiswahili, and Gĩkũyũ', color: '#06B6D4' },
              { type: '👅 Tongue Twisters', count: '2+', desc: 'Try saying them fast 3 times! Fun pronunciation practice in multiple languages', color: '#EF4444' },
            ].map((item, i) => (
              <div key={i} className="glass-card" style={{ padding: '1.5rem', border: `1px solid ${item.color}15`, opacity: 0, animation: `fadeInUp 0.5s ease forwards ${0.08 * (i + 1)}s` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '1.25rem' }}>{item.type.split(' ')[0]}</span>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem' }}>{item.type.split(' ').slice(1).join(' ')}</h3>
                  <span className="badge" style={{ marginLeft: 'auto', background: `${item.color}15`, color: item.color, border: `1px solid ${item.color}30` }}>{item.count}</span>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <a href="/games" className="btn btn-primary btn-lg">🎮 Play Games & Explore Content</a>
          </div>
        </div>
      </section>

      {/* ===== PRICING SECTION ===== */}
      <section className="section" id="pricing" style={{ background: 'linear-gradient(180deg, transparent, rgba(139, 92, 246, 0.03), transparent)' }}>
        <div className="container">
          <div className="section-header">
            <span className="badge badge-primary" style={{ marginBottom: '1rem' }}>💎 Plans</span>
            <h2>Choose Your <span className="text-gradient">Plan</span></h2>
            <p>Start free, upgrade when you&apos;re ready. Affordable education for every Kenyan child.</p>
          </div>
          <div className="pricing-grid">
            {/* Free Plan */}
            <div className="glass-card pricing-card">
              <span className="badge badge-success" style={{ marginBottom: '1rem' }}>🆓 Free</span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', marginBottom: '0.5rem' }}>RoboKid Free</h3>
              <div className="pricing-price">KES 0<span className="pricing-period">/month</span></div>
              <ul className="pricing-features">
                <li>3 AI puzzles per day</li>
                <li>English & Kiswahili</li>
                <li>5 exam questions per session</li>
                <li>Basic games access</li>
                <li>Math & Environment subjects</li>
              </ul>
              <a href="/dashboard" className="btn btn-secondary" style={{ width: '100%' }} id="cta-free">Get Started Free</a>
            </div>
            {/* Premium Plan */}
            <div className="glass-card pricing-card featured">
              <span className="badge badge-warning" style={{ marginBottom: '1rem' }}>⭐ Premium</span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', marginBottom: '0.5rem' }}>RoboKid Premium</h3>
              <div className="pricing-price">KES 399<span className="pricing-period">/month</span></div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>~$2.99 USD</p>
              <ul className="pricing-features">
                <li>Unlimited AI puzzles & content</li>
                <li>All 5 languages + indigenous</li>
                <li>Full KNEC exam bank</li>
                <li>Ad-free experience</li>
                <li>All 7 CBC learning areas</li>
                <li>Downloadable worksheets</li>
                <li>Parent progress dashboard</li>
                <li>Priority AI responses</li>
              </ul>
              <a href="/dashboard" className="btn btn-primary" style={{ width: '100%' }} id="cta-premium">Start Premium Trial</a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="section" style={{ textAlign: 'center' }}>
        <div className="container">
          <div style={{ 
            background: 'var(--gradient-card-math)',
            border: '1px solid var(--border-glow)',
            borderRadius: 'var(--radius-2xl)',
            padding: 'var(--space-4xl) var(--space-2xl)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{ 
              position: 'absolute', 
              top: '-50%', 
              left: '-50%', 
              width: '200%', 
              height: '200%', 
              background: 'radial-gradient(circle at center, rgba(99,102,241,0.08) 0%, transparent 50%)',
              pointerEvents: 'none',
            }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: 'var(--space-md)', fontFamily: 'var(--font-display)' }}>
                Ready to Start Your <span className="text-gradient">Learning Adventure</span>?
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto var(--space-2xl)' }}>
                Join thousands of Kenyan children learning with RoboKid. It&apos;s free to start!
              </p>
              <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href="/dashboard" className="btn btn-primary btn-lg" id="cta-bottom-start">🚀 Start Learning Now</a>
                <a href="/playbook" className="btn btn-secondary btn-lg" id="cta-bottom-playbook">📕 Read the Playbook</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer" id="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <a href="/" className="navbar-brand" style={{ marginBottom: 'var(--space-sm)' }}>
              <div className="navbar-brand-icon">🤖</div>
              <span>Robo<span style={{ color: 'var(--color-primary-light)' }}>Kid</span></span>
            </a>
            <p>AI-powered learning for Kenyan children. Aligned with the KICD Competency-Based Curriculum. Learn in your mother tongue.</p>
          </div>
          <div>
            <h4>Learning</h4>
            <ul className="footer-links">
              <li><a href="/dashboard">Dashboard</a></li>
              <li><a href="/math">Mathematics</a></li>
              <li><a href="/environment">Environment</a></li>
              <li><a href="/language">Languages</a></li>
              <li><a href="/games">Games</a></li>
              <li><a href="/exams">Exams</a></li>
            </ul>
          </div>
          <div>
            <h4>Resources</h4>
            <ul className="footer-links">
              <li><a href="/playbook">RoboKid Playbook</a></li>
              <li><a href="#">CBC Curriculum Guide</a></li>
              <li><a href="#">For Parents</a></li>
              <li><a href="#">For Teachers</a></li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul className="footer-links">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 RoboKid. Made with ❤️ in Kenya 
            <span className="kenya-flag">
              <span style={{ background: '#000' }} />
              <span style={{ background: '#FFF' }} />
              <span style={{ background: '#BB0000' }} />
              <span style={{ background: '#FFF' }} />
              <span style={{ background: '#006600' }} />
            </span>
          </p>
          <p>Aligned with KICD &amp; KNEC Standards</p>
        </div>
      </footer>
    </main>
  );
}
