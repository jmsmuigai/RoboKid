'use client';

import { useState } from 'react';

/* ============================================================
   RoboKid Playbook — Comprehensive Interactive Documentation
   Complete guide to the platform: features, curriculum, pricing
   ============================================================ */

const sections = [
  {
    id: 'welcome',
    title: 'Welcome to RoboKid',
    icon: '🤖',
    color: '#6366F1',
    gradient: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
    content: {
      heading: 'Welcome to RoboKid',
      subheading: 'AI-Powered Learning for Every Kenyan Child',
      body: `RoboKid is a revolutionary educational platform designed specifically for Kenyan children in Grade 1 to Grade 3. Built on the foundation of the Kenya Institute of Curriculum Development (KICD) Competency-Based Curriculum (CBC), RoboKid brings learning to life through artificial intelligence, interactive games, and mother tongue support.

Our mission is simple: Every child deserves to learn in a language they understand, with content that reflects their world — from the bustling streets of Nairobi to the serene shores of Lake Victoria.

RoboKid combines hands-on digital literacy with culturally relevant, multilingual education — ensuring every Kenyan child, from Garissa to Kisumu, has access to world-class learning in their mother tongue.`,
      highlights: [
        { icon: '🎯', text: '7 CBC Learning Areas' },
        { icon: '🌐', text: '5 Languages' },
        { icon: '🤖', text: 'Google Gemini AI' },
        { icon: '📝', text: '150+ Exam Questions' },
        { icon: '🎮', text: '10 Built-in Games' },
        { icon: '📚', text: '25+ Stories & Poems' },
      ],
    },
  },
  {
    id: 'how-it-works',
    title: 'How It Works',
    icon: '⚡',
    color: '#F59E0B',
    gradient: 'linear-gradient(135deg, #F59E0B, #D97706)',
    content: {
      heading: 'How RoboKid Works',
      subheading: 'Learning Made Fun, Simple, and Smart',
      body: `RoboKid follows a simple 4-step learning loop that keeps children engaged:`,
      steps: [
        { num: '01', title: 'Choose Your Grade', desc: 'Select Grade 1, 2, or 3. Content automatically adjusts to the appropriate CBC level, vocabulary complexity, and age-appropriate activities.', icon: '🎓' },
        { num: '02', title: 'Pick Your Subject', desc: 'Browse all 7 rationalized CBC learning areas: Mathematics, Environmental Activities, English, Kiswahili, Indigenous Languages, Creative Activities, and Religious Education.', icon: '📚' },
        { num: '03', title: 'Learn in Your Language', desc: 'Toggle between English, Kiswahili, Kikuyu, Luo, or Somali. Our AI translates content in real-time while preserving Kenyan cultural context.', icon: '🗣️' },
        { num: '04', title: 'Play, Practice, Excel', desc: 'Solve AI-generated puzzles, play interactive games, take KNEC-aligned practice exams, and track your progress with detailed analytics.', icon: '🏆' },
      ],
    },
  },
  {
    id: 'curriculum',
    title: 'CBC Curriculum Map',
    icon: '📋',
    color: '#10B981',
    gradient: 'linear-gradient(135deg, #10B981, #059669)',
    content: {
      heading: 'CBC Curriculum Coverage',
      subheading: 'All 7 Rationalized Learning Areas (KICD 2025)',
      body: `Following the 2025 rationalization by KICD, the Lower Primary curriculum was streamlined from 8 to 7 learning areas. RoboKid covers all of them with deep, structured content:`,
      curriculum: [
        { subject: 'Mathematics Activities', icon: '🧮', grades: 'G1: Counting 1-50, Shapes, Patterns\nG2: Place Value, Multiplication, Money (KES)\nG3: 3-digit numbers, Fractions, Division', topics: 18 },
        { subject: 'Environmental Activities', icon: '🌍', grades: 'G1: Body Parts, Hygiene, Plants, Weather\nG2: Water, Food Groups, Habitats, Soil\nG3: Water Cycle, Conservation, Diseases', topics: 15 },
        { subject: 'English Language', icon: '📖', grades: 'G1: Phonics, CVC Words, Greetings\nG2: Sentences, Comprehension\nG3: Parts of Speech, Creative Writing', topics: 10 },
        { subject: 'Kiswahili Language', icon: '🗣️', grades: 'G1: Herufi, Maneno Rahisi, Salamu\nG2: Kusoma Sentensi, Kuandika\nG3: Ufahamu, Insha, Sarufi', topics: 8 },
        { subject: 'Indigenous Languages', icon: '🏡', grades: 'Kikuyu, Luo, Somali\nGreetings, Counting, Family, Stories', topics: 5 },
        { subject: 'Creative Activities', icon: '🎨', grades: 'Drawing, Music, Dance\nCrafts, Movement Games', topics: 4 },
        { subject: 'Religious Education', icon: '🕊️', grades: 'Values, Morals\nSpiritual Growth', topics: 2 },
      ],
    },
  },
  {
    id: 'languages',
    title: 'Language Support',
    icon: '🌐',
    color: '#EC4899',
    gradient: 'linear-gradient(135deg, #EC4899, #DB2777)',
    content: {
      heading: 'Mother Tongue Learning',
      subheading: 'Learn in the Language You Think In',
      body: `Research consistently shows that children learn best in their mother tongue. RoboKid is built on this principle — delivering AI-powered real-time translation across 5 Kenyan languages.

We don't just translate words — we translate meaning. When a math problem mentions "ugali" in English, the Kikuyu version uses "mũgĩma," and the Luo version uses "kuon." Because context is everything in education.`,
      languages: [
        { name: 'English', native: 'English', flag: '🇬🇧', speakers: '~5M primary students', desc: 'Official language of instruction' },
        { name: 'Kiswahili', native: 'Kiswahili', flag: '🇰🇪', speakers: '~50M speakers', desc: 'National language, taught from Grade 1' },
        { name: 'Kikuyu', native: 'Gĩkũyũ', flag: '🏔️', speakers: '~8M speakers', desc: 'Largest ethnic group in Kenya, Central region' },
        { name: 'Luo', native: 'Dholuo', flag: '🐟', speakers: '~5M speakers', desc: 'Western Kenya, around Lake Victoria' },
        { name: 'Somali', native: 'Af-Soomaali', flag: '🌟', speakers: '~2.8M in Kenya', desc: 'North Eastern Kenya, Garissa, Wajir, Mandera' },
      ],
    },
  },
  {
    id: 'coding',
    title: 'Coding & Robotics',
    icon: '💻',
    color: '#06B6D4',
    gradient: 'linear-gradient(135deg, #06B6D4, #0891B2)',
    content: {
      heading: 'Creative Coding & Robotics',
      subheading: 'Building Africa\'s Next Generation of Innovators',
      body: `RoboKid brings hands-on, creative coding directly to Kenyan classrooms. Children learn computational thinking through age-appropriate Python lessons set in familiar Kenyan contexts — counting matatu passengers, drawing the Kenyan flag, and building math games.

The Kenya Ministry of Education has mandated the integration of coding and robotics into the primary and junior secondary curricula. RoboKid is ready — with a Code Lab featuring interactive lessons that make programming as natural as counting mangoes at the market.`,
      features: [
        { title: 'Python Basics', desc: 'Print statements, variables, and simple math — all with Kenyan examples', icon: '🐍' },
        { title: 'Counting Loops', desc: 'Learn to loop like counting passengers on a matatu', icon: '🔄' },
        { title: 'Turtle Graphics', desc: 'Draw shapes and patterns inspired by Kenyan art and flags', icon: '🎨' },
        { title: 'AI Concepts', desc: 'Understand how AI works through simple, fun demonstrations', icon: '🤖' },
      ],
    },
  },
  {
    id: 'exams',
    title: 'Practice Exams',
    icon: '📝',
    color: '#8B5CF6',
    gradient: 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
    content: {
      heading: 'KNEC-Aligned Assessments',
      subheading: 'Kenya Early Years Assessment (KEYA) Practice',
      body: `RoboKid includes 150+ practice questions aligned with the Kenya National Examinations Council (KNEC) standards. Our questions follow the Competency-Based Assessment (CBA) framework used in the Kenya Early Years Assessment (KEYA) administered at the end of Grade 3.

Every question is set in a Kenyan context — matatus, markets, shambas, and familiar names like Ochieng, Wanjiku, Kamau, and Amina.`,
      examTypes: [
        { type: 'Multiple Choice', count: 80, desc: '4 options with detailed explanations' },
        { type: 'Fill in the Blank', count: 30, desc: 'Complete equations and sentences' },
        { type: 'True or False', count: 25, desc: 'Quick knowledge checks' },
        { type: 'Short Answer', count: 15, desc: 'Open-ended comprehension' },
      ],
    },
  },
  {
    id: 'games',
    title: 'Games Gallery',
    icon: '🎮',
    color: '#EF4444',
    gradient: 'linear-gradient(135deg, #EF4444, #DC2626)',
    content: {
      heading: 'Interactive Learning Games',
      subheading: 'Learning Disguised as Play',
      body: `Children learn best when they don't realize they're learning. RoboKid's games are designed to reinforce CBC concepts while keeping children engaged for hours.`,
      games: [
        { name: 'Memory Match', desc: 'Match Kiswahili words with English translations or pictures with vocabulary', icon: '🃏', subject: 'Languages' },
        { name: 'Math Race', desc: 'Solve arithmetic problems before time runs out — compete with your own best score', icon: '🏃', subject: 'Mathematics' },
        { name: 'Word Search', desc: 'Find CBC vocabulary words hidden in a grid of letters', icon: '🔍', subject: 'English' },
        { name: 'Picture Quiz', desc: 'Identify Kenyan animals, plants, and landmarks from images', icon: '📸', subject: 'Environmental' },
        { name: 'Drag & Drop', desc: 'Sort food groups, classify animals, match shapes', icon: '🖐️', subject: 'Cross-subject' },
        { name: 'Story Builder', desc: 'Arrange sentences to create a story — in any language', icon: '📖', subject: 'Creative' },
      ],
    },
  },
  {
    id: 'parents',
    title: 'For Parents & Teachers',
    icon: '👨‍👩‍👧‍👦',
    color: '#78716C',
    gradient: 'linear-gradient(135deg, #78716C, #57534E)',
    content: {
      heading: 'For Parents & Teachers',
      subheading: 'Monitor, Support, and Celebrate Progress',
      body: `RoboKid is built for collaboration between children, parents, and teachers. Our real-time dashboard provides full visibility into each child's learning journey — topics completed, quiz scores, and language progress.

Whether at home in Nairobi or a rural school in Garissa, RoboKid helps ensure no child is left behind.`,
      features: [
        { title: 'Progress Dashboard', desc: 'See topics completed, quiz scores, and time spent per subject', icon: '📊' },
        { title: 'Curriculum Alignment', desc: 'Every activity maps directly to KICD strands and sub-strands', icon: '✅' },
        { title: 'Language Reports', desc: 'Track which languages your child uses and their reading progress', icon: '📈' },
        { title: 'Offline Support', desc: 'Core content works offline — designed for areas with limited internet connectivity', icon: '📱' },
      ],
    },
  },
  {
    id: 'pricing',
    title: 'Pricing & Plans',
    icon: '💎',
    color: '#A78BFA',
    gradient: 'linear-gradient(135deg, #A78BFA, #8B5CF6)',
    content: {
      heading: 'Affordable Education for All',
      subheading: 'Start Free, Grow with Premium',
      body: `Education should be accessible. That's why RoboKid offers a generous free tier — because Fatuma from Wajir deserves the same opportunities as children in Nairobi.`,
      plans: [
        { name: 'Free', price: 'KES 0', features: ['3 AI puzzles/day', 'English + Kiswahili', '5 quiz questions/session', 'Basic games', 'Math & Environment'] },
        { name: 'Premium', price: 'KES 399/mo', features: ['Unlimited AI content', 'All 5 languages', 'Full exam bank', 'Ad-free', 'All 7 subjects', 'PDF worksheets', 'Parent dashboard', 'Priority AI'] },
      ],
    },
  },
  {
    id: 'tech',
    title: 'Technology',
    icon: '⚙️',
    color: '#22D3EE',
    gradient: 'linear-gradient(135deg, #22D3EE, #06B6D4)',
    content: {
      heading: 'Technical Architecture',
      subheading: 'For Partners, Investors, and Developers',
      body: `RoboKid is built with modern, scalable technology designed for the African market:`,
      stack: [
        { name: 'Next.js 15', desc: 'React framework with App Router for fast, SEO-optimized pages' },
        { name: 'Google Gemini AI', desc: 'Real-time content generation and translation via Gemini 2.0 Flash' },
        { name: 'TypeScript', desc: 'Type-safe codebase ensuring reliability and maintainability' },
        { name: 'Tailwind CSS', desc: 'Utility-first CSS framework for responsive, beautiful design' },
        { name: 'Google Cloud Run', desc: 'Serverless deployment for automatic scaling and cost efficiency' },
        { name: 'CBC Data Layer', desc: '40+ curriculum topics and 150+ exam questions mapped to KICD strands' },
      ],
    },
  },
];

export default function PlaybookPage() {
  const [activeSection, setActiveSection] = useState(0);
  const s = sections[activeSection];

  return (
    <main style={{ minHeight: '100vh', position: 'relative', zIndex: 1 }}>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-inner">
          <a href="/" className="navbar-brand">
            <div className="navbar-brand-icon">🤖</div>
            <span>Robo<span style={{ color: 'var(--color-primary-light)' }}>Kid</span></span>
          </a>
          <ul className="navbar-links">
            <li><a href="/" className="navbar-link">Home</a></li>
            <li><a href="/dashboard" className="navbar-link">Dashboard</a></li>
            <li><a href="/games" className="navbar-link">🎮 Games</a></li>
            <li><a href="/encyclopedia" className="navbar-link">📖 Encyclopedia</a></li>
            <li><span className="badge badge-warning">📕 Playbook</span></li>
          </ul>
        </div>
      </nav>

      <div style={{ display: 'flex', paddingTop: '70px', minHeight: '100vh' }}>
        {/* Sidebar Navigation */}
        <aside style={{
          width: '280px', flexShrink: 0, padding: '1.5rem 1rem', borderRight: '1px solid var(--border-subtle)',
          background: 'rgba(5,8,22,0.5)', backdropFilter: 'blur(10px)', position: 'sticky', top: '70px',
          height: 'calc(100vh - 70px)', overflowY: 'auto',
        }}>
          <h3 style={{ fontFamily: 'var(--font-fun)', fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '1rem', padding: '0 0.5rem' }}>
            📕 RoboKid Playbook
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {sections.map((sec, i) => (
              <button key={sec.id} onClick={() => setActiveSection(i)} style={{
                padding: '0.6rem 0.75rem', borderRadius: 'var(--radius-md)', textAlign: 'left',
                background: i === activeSection ? `${sec.color}15` : 'transparent',
                border: i === activeSection ? `1px solid ${sec.color}30` : '1px solid transparent',
                color: i === activeSection ? sec.color : 'var(--text-secondary)',
                cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: i === activeSection ? 600 : 400,
                transition: 'all var(--transition-fast)', display: 'flex', alignItems: 'center', gap: '0.5rem',
              }}>
                <span>{sec.icon}</span> {sec.title}
              </button>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <div style={{ flex: 1, padding: '2rem 3rem', maxWidth: '900px' }}>
          {/* Section Header */}
          <div style={{ marginBottom: '2.5rem' }}>
            <div style={{ display: 'inline-block', padding: '0.5rem 1.5rem', borderRadius: 'var(--radius-full)', background: s.gradient, marginBottom: '1rem', fontSize: '1.5rem' }}>
              {s.content.heading.includes('Welcome') ? '🤖' : s.icon}
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: '0.5rem' }}>
              {s.content.heading}
            </h1>
            <p style={{ color: s.color, fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 500 }}>
              {s.content.subheading}
            </p>
          </div>

          {/* Body Text */}
          <div style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.8, marginBottom: '2rem', whiteSpace: 'pre-line' }}>
            {s.content.body}
          </div>

          {/* Dynamic Content based on section type */}
          {'highlights' in s.content && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              {(s.content as typeof sections[0]['content'] & { highlights: { icon: string; text: string }[] }).highlights.map((h, i) => (
                <div key={i} className="glass-card" style={{ padding: '1.25rem', textAlign: 'center' }}>
                  <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}>{h.icon}</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.95rem' }}>{h.text}</span>
                </div>
              ))}
            </div>
          )}

          {'steps' in s.content && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {(s.content as typeof sections[1]['content'] & { steps: { num: string; title: string; desc: string; icon: string }[] }).steps.map((step) => (
                <div key={step.num} className="glass-card" style={{ padding: '1.5rem', display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                  <div style={{ width: 56, height: 56, borderRadius: 16, background: `${s.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>{step.icon}</div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.75rem', color: s.color, fontWeight: 700, marginBottom: '0.2rem' }}>STEP {step.num}</div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', marginBottom: '0.25rem' }}>{step.title}</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {'curriculum' in s.content && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {(s.content as typeof sections[2]['content'] & { curriculum: { subject: string; icon: string; grades: string; topics: number }[] }).curriculum.map((c) => (
                <div key={c.subject} className="glass-card" style={{ padding: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>{c.icon}</span>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem' }}>{c.subject}</h3>
                    <span className="badge badge-primary" style={{ marginLeft: 'auto' }}>{c.topics} topics</span>
                  </div>
                  <pre style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: 1.6, fontFamily: 'var(--font-body)', whiteSpace: 'pre-wrap' }}>{c.grades}</pre>
                </div>
              ))}
            </div>
          )}

          {'languages' in s.content && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {(s.content as typeof sections[3]['content'] & { languages: { name: string; native: string; flag: string; speakers: string; desc: string }[] }).languages.map((lang) => (
                <div key={lang.name} className="glass-card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontSize: '2rem' }}>{lang.flag}</span>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem' }}>{lang.name} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>({lang.native})</span></h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{lang.desc}</p>
                  </div>
                  <span className="badge badge-success">{lang.speakers}</span>
                </div>
              ))}
            </div>
          )}

          {'features' in s.content && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
              {(s.content.features as { title: string; desc: string; icon: string }[]).map((f) => (
                <div key={f.title} className="glass-card" style={{ padding: '1.25rem' }}>
                  <span style={{ fontSize: '1.75rem', display: 'block', marginBottom: '0.5rem' }}>{f.icon}</span>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', marginBottom: '0.25rem' }}>{f.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.5 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          )}

          {'examTypes' in s.content && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              {(s.content as typeof sections[5]['content'] & { examTypes: { type: string; count: number; desc: string }[] }).examTypes.map((e) => (
                <div key={e.type} className="glass-card" style={{ padding: '1.25rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', fontFamily: 'var(--font-display)', fontWeight: 800, color: s.color }}>{e.count}</div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', margin: '0.25rem 0' }}>{e.type}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{e.desc}</p>
                </div>
              ))}
            </div>
          )}

          {'games' in s.content && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
              {(s.content as typeof sections[6]['content'] & { games: { name: string; desc: string; icon: string; subject: string }[] }).games.map((g) => (
                <div key={g.name} className="glass-card" style={{ padding: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>{g.icon}</span>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem' }}>{g.name}</h3>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '0.5rem' }}>{g.desc}</p>
                  <span className="badge badge-primary">{g.subject}</span>
                </div>
              ))}
            </div>
          )}

          {'plans' in s.content && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
              {(s.content as typeof sections[8]['content'] & { plans: { name: string; price: string; features: string[] }[] }).plans.map((plan) => (
                <div key={plan.name} className="glass-card" style={{ padding: '2rem', border: plan.name === 'Premium' ? '1px solid var(--color-primary)' : undefined, boxShadow: plan.name === 'Premium' ? 'var(--shadow-glow)' : undefined }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', marginBottom: '0.5rem' }}>{plan.name}</h3>
                  <div style={{ fontSize: '2rem', fontFamily: 'var(--font-display)', fontWeight: 800, marginBottom: '1rem' }}>{plan.price}</div>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {plan.features.map((f, i) => (
                      <li key={i} style={{ padding: '0.4rem 0', color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ color: 'var(--color-environment)' }}>✓</span> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {'stack' in s.content && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {(s.content as typeof sections[9]['content'] & { stack: { name: string; desc: string }[] }).stack.map((tech) => (
                <div key={tech.name} className="glass-card" style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: s.color, flexShrink: 0 }} />
                  <div>
                    <strong style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem' }}>{tech.name}</strong>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginLeft: '0.5rem' }}>— {tech.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Print/Export CTA */}
          <div style={{ marginTop: '3rem', padding: '2rem', borderRadius: 'var(--radius-xl)', background: `${s.color}08`, border: `1px solid ${s.color}20`, textAlign: 'center' }}>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              💡 This playbook can be printed or exported as PDF using your browser&apos;s Print function (Ctrl+P / ⌘P)
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <a href="/dashboard" className="btn btn-primary">🚀 Start Learning</a>
              <a href="/" className="btn btn-secondary">← Back to Home</a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
