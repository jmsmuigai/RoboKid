'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  MATH_STRANDS, ENV_STRANDS, LANGUAGE_STRANDS,
  getSubStrandsForGrade, getEncyclopediaStats, searchEncyclopedia,
  type CBCStrand, type CBCSubStrand,
} from '@/lib/cbc-encyclopedia';
import { getDictionaryCategories, getDictionaryEntries } from '@/lib/translation-service';

/* ============================================================
   RoboKid CBC Encyclopedia Explorer
   Complete KICD Curriculum Browser + Translation Tool
   ============================================================ */

// ---------- Mini Robot ----------
function MiniRobot({ mood = 'happy', size = 48 }: { mood?: string; size?: number }) {
  const mouthPath = mood === 'happy' ? 'M12 22 Q18 28 24 22' : 'M12 24 L24 24';
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <rect x="6" y="8" width="24" height="20" rx="6" fill="url(#mrb2)" stroke="#6366F1" strokeWidth="1" />
      <circle cx="6" cy="4" r="3" fill="#EC4899"><animate attributeName="r" values="3;4;3" dur="2s" repeatCount="indefinite" /></circle>
      <rect x="16" y="2" width="2" height="8" rx="1" fill="#6366F1" />
      <circle cx="13" cy="17" r="3" fill="#22D3EE"><animate attributeName="r" values="3;2;3" dur="3s" repeatCount="indefinite" /></circle>
      <circle cx="23" cy="17" r="3" fill="#22D3EE"><animate attributeName="r" values="3;2;3" dur="3s" repeatCount="indefinite" begin="0.5s" /></circle>
      <path d={mouthPath} stroke="#EC4899" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <defs><linearGradient id="mrb2" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#1E293B" /><stop offset="100%" stopColor="#0F172A" /></linearGradient></defs>
    </svg>
  );
}

// ---------- Dictionary Panel ----------
function DictionaryPanel() {
  const categories = getDictionaryCategories();
  const entries = getDictionaryEntries();
  const [activeCategory, setActiveCategory] = useState('Numbers');
  const [translateText, setTranslateText] = useState('');
  const [translateResult, setTranslateResult] = useState<any>(null);
  const [targetLang, setTargetLang] = useState('kiswahili');
  const [isTranslating, setIsTranslating] = useState(false);

  const handleTranslate = useCallback(async () => {
    if (!translateText.trim()) return;
    setIsTranslating(true);
    try {
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: translateText, sourceLang: 'english', targetLang }),
      });
      const data = await res.json();
      setTranslateResult(data);
    } catch { setTranslateResult({ error: 'Translation failed' }); }
    finally { setIsTranslating(false); }
  }, [translateText, targetLang]);

  const wordsInCategory = categories[activeCategory] || [];

  return (
    <div>
      {/* Translate Tool */}
      <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid rgba(99,102,241,0.2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <MiniRobot mood="happy" size={40} />
          <div>
            <h3 style={{ fontFamily: 'var(--font-fun)', fontSize: '1.1rem' }}>🌐 AI Translator</h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Dictionary + MyMemory + Gemini</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
          {[
            { code: 'kiswahili', label: '🇰🇪 Kiswahili' },
            { code: 'kikuyu', label: '🏔️ Gĩkũyũ' },
            { code: 'luo', label: '🐟 Dholuo' },
            { code: 'somali', label: '🌊 Somali' },
          ].map(lang => (
            <button key={lang.code} onClick={() => setTargetLang(lang.code)} style={{
              padding: '0.35rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.8rem',
              background: targetLang === lang.code ? 'var(--color-primary)' : 'var(--bg-glass)',
              color: targetLang === lang.code ? 'white' : 'var(--text-secondary)',
              border: 'none', cursor: 'pointer',
            }}>{lang.label}</button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input type="text" value={translateText} onChange={e => setTranslateText(e.target.value)}
            placeholder="Type a word or sentence in English..."
            onKeyDown={e => e.key === 'Enter' && handleTranslate()}
            style={{
              flex: 1, padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-glass)',
              border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', fontSize: '0.95rem',
              fontFamily: 'var(--font-body)', outline: 'none',
            }} />
          <button onClick={handleTranslate} className="btn btn-primary" disabled={isTranslating}>
            {isTranslating ? '...' : '🔄'}
          </button>
        </div>
        {translateResult && !translateResult.error && (
          <div style={{ marginTop: '0.75rem', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}>
            <p style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--color-environment-light)' }}>{translateResult.translated}</p>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              via {translateResult.method} · {translateResult.confidence} confidence
            </p>
          </div>
        )}
      </div>

      {/* Dictionary Browser */}
      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', marginBottom: '1rem' }}>📖 Visual Dictionary — {entries.length} Words</h3>
        <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          {Object.keys(categories).map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{
              padding: '0.3rem 0.7rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem',
              background: activeCategory === cat ? 'var(--color-primary)' : 'var(--bg-glass)',
              color: activeCategory === cat ? 'white' : 'var(--text-secondary)',
              border: 'none', cursor: 'pointer',
            }}>{cat}</button>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '0.5rem' }}>
          {wordsInCategory.map(word => {
            const entry = entries.find(e => e.word === word);
            if (!entry) return null;
            return (
              <div key={word} style={{
                padding: '0.6rem', borderRadius: 'var(--radius-md)', background: 'rgba(99,102,241,0.06)',
                border: '1px solid rgba(99,102,241,0.1)', fontSize: '0.75rem',
              }}>
                <div style={{ fontWeight: 700, color: 'var(--color-primary-light)', marginBottom: '0.3rem', textTransform: 'capitalize' }}>
                  🇬🇧 {word}
                </div>
                <div style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  <div>🇰🇪 {entry.translations.kiswahili}</div>
                  <div>🏔️ {entry.translations.kikuyu}</div>
                  <div>🐟 {entry.translations.luo}</div>
                  <div>🌊 {entry.translations.somali}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ---------- Sub-Strand Detail Card ----------
function SubStrandCard({ ss, color }: { ss: CBCSubStrand; color: string }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="glass-card" style={{ padding: '1.25rem', border: `1px solid ${color}15`, cursor: 'pointer' }} onClick={() => setExpanded(!expanded)}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: expanded ? '1rem' : 0 }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: `${color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color, fontSize: '0.8rem', flexShrink: 0 }}>
          G{ss.grade}
        </div>
        <div style={{ flex: 1 }}>
          <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', marginBottom: '0.15rem' }}>{ss.title}</h4>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Term {ss.term} · {ss.learningOutcomes.length} outcomes · {ss.suggestedActivities.length} activities</span>
        </div>
        <span style={{ fontSize: '1rem', transition: 'transform 0.2s', transform: expanded ? 'rotate(180deg)' : 'rotate(0)' }}>▼</span>
      </div>

      {expanded && (
        <div style={{ fontSize: '0.85rem' }}>
          {/* Kenyan Context */}
          <div style={{ background: `${color}08`, borderRadius: 'var(--radius-md)', padding: '0.75rem', marginBottom: '0.75rem', borderLeft: `3px solid ${color}` }}>
            <span style={{ fontWeight: 600, color }}>🇰🇪 Kenyan Context:</span>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem', lineHeight: 1.6 }}>{ss.kenyanContext}</p>
          </div>

          {/* Learning Outcomes */}
          <div style={{ marginBottom: '0.75rem' }}>
            <span style={{ fontWeight: 700, color: 'var(--text-muted)', fontSize: '0.7rem', textTransform: 'uppercase' }}>🎯 Learning Outcomes</span>
            <ul style={{ margin: '0.25rem 0 0 1.25rem', listStyle: 'disc' }}>
              {ss.learningOutcomes.map((lo, i) => <li key={i} style={{ color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '0.15rem' }}>{lo}</li>)}
            </ul>
          </div>

          {/* Key Inquiry Questions */}
          <div style={{ marginBottom: '0.75rem' }}>
            <span style={{ fontWeight: 700, color: 'var(--text-muted)', fontSize: '0.7rem', textTransform: 'uppercase' }}>❓ Key Inquiry Questions</span>
            <ul style={{ margin: '0.25rem 0 0 1.25rem', listStyle: 'none' }}>
              {ss.keyInquiryQuestions.map((q, i) => <li key={i} style={{ color: 'var(--color-primary-light)', lineHeight: 1.5, marginBottom: '0.15rem' }}>💬 {q}</li>)}
            </ul>
          </div>

          {/* Activities */}
          <div style={{ marginBottom: '0.75rem' }}>
            <span style={{ fontWeight: 700, color: 'var(--text-muted)', fontSize: '0.7rem', textTransform: 'uppercase' }}>🎮 Activities</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginTop: '0.25rem' }}>
              {ss.suggestedActivities.map((a, i) => (
                <span key={i} style={{ fontSize: '0.7rem', padding: '3px 8px', borderRadius: 20, background: `${color}10`, color, border: `1px solid ${color}20` }}>{a}</span>
              ))}
            </div>
          </div>

          {/* Values & Competencies */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ flex: 1 }}>
              <span style={{ fontWeight: 700, color: 'var(--text-muted)', fontSize: '0.7rem', textTransform: 'uppercase' }}>💎 Values</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', marginTop: '0.25rem' }}>
                {ss.values.map((v, i) => <span key={i} style={{ fontSize: '0.65rem', padding: '2px 6px', borderRadius: 10, background: 'rgba(236,72,153,0.1)', color: '#EC4899' }}>{v}</span>)}
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <span style={{ fontWeight: 700, color: 'var(--text-muted)', fontSize: '0.7rem', textTransform: 'uppercase' }}>🧠 Competencies</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', marginTop: '0.25rem' }}>
                {ss.coreCompetencies.map((c, i) => <span key={i} style={{ fontSize: '0.65rem', padding: '2px 6px', borderRadius: 10, background: 'rgba(6,182,212,0.1)', color: '#06B6D4' }}>{c}</span>)}
              </div>
            </div>
          </div>

          {/* Resources */}
          <div style={{ marginTop: '0.75rem' }}>
            <span style={{ fontWeight: 700, color: 'var(--text-muted)', fontSize: '0.7rem', textTransform: 'uppercase' }}>📦 Resources</span>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '0.15rem' }}>{ss.resources.join(' · ')}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------- Main Encyclopedia Page ----------
export default function EncyclopediaPage() {
  const [activeTab, setActiveTab] = useState<'browse' | 'dictionary' | 'search'>('browse');
  const [selectedGrade, setSelectedGrade] = useState<1 | 2 | 3>(1);
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<CBCSubStrand[]>([]);

  const stats = getEncyclopediaStats();

  const subjects = [
    { key: 'all', label: '📚 All Subjects', color: '#6366F1' },
    { key: 'mathematics', label: '🧮 Mathematics', color: '#8B5CF6' },
    { key: 'environmental', label: '🌍 Environment', color: '#10B981' },
    { key: 'english', label: '📖 English', color: '#F59E0B' },
    { key: 'kiswahili', label: '🗣️ Kiswahili', color: '#EF4444' },
  ];

  const handleSearch = useCallback(() => {
    if (!searchQuery.trim()) { setSearchResults([]); return; }
    setSearchResults(searchEncyclopedia(searchQuery));
  }, [searchQuery]);

  useEffect(() => {
    if (activeTab === 'search' && searchQuery) handleSearch();
  }, [activeTab, searchQuery, handleSearch]);

  // Get sub-strands based on filters
  const filteredSubStrands = getSubStrandsForGrade(selectedGrade, selectedSubject === 'all' ? undefined : selectedSubject);

  // Get color for current subject
  const activeColor = subjects.find(s => s.key === selectedSubject)?.color || '#6366F1';

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
            <li><a href="/dashboard" className="navbar-link">Dashboard</a></li>
            <li><a href="/games" className="navbar-link">🎮 Games</a></li>
            <li><a href="/playbook" className="navbar-link">Playbook</a></li>
            <li><span className="badge badge-primary">📖 Encyclopedia</span></li>
          </ul>
        </div>
      </nav>

      <div className="container" style={{ paddingBottom: '4rem' }}>
        {/* Hero Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <MiniRobot mood="happy" size={56} />
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 800 }}>
              CBC <span className="text-gradient">Encyclopedia</span>
            </h1>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '600px', margin: '0 auto 1.5rem' }}>
            Complete KICD Competency-Based Curriculum — every strand, sub-strand, learning outcome, and activity for Grade 1–3
          </p>

          {/* Stats Bar */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            {[
              { label: 'Sub-Strands', value: stats.totalSubStrands, color: '#6366F1' },
              { label: 'Learning Outcomes', value: stats.totalLearningOutcomes, color: '#10B981' },
              { label: 'Activities', value: stats.totalActivities, color: '#F59E0B' },
              { label: 'Inquiry Questions', value: stats.totalInquiryQuestions, color: '#EC4899' },
            ].map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontFamily: 'var(--font-display)', fontWeight: 800, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: '0.25rem', padding: '4px', background: 'var(--bg-glass)', borderRadius: 'var(--radius-full)', marginBottom: '2rem', border: '1px solid var(--border-subtle)', width: 'fit-content', margin: '0 auto 2rem' }}>
          {[
            { key: 'browse' as const, label: '📚 Browse Curriculum' },
            { key: 'dictionary' as const, label: '🌐 Dictionary & Translate' },
            { key: 'search' as const, label: '🔍 Search' },
          ].map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{
              padding: '0.5rem 1.25rem', borderRadius: 'var(--radius-full)', fontSize: '0.85rem', fontWeight: 500,
              background: activeTab === tab.key ? 'var(--color-primary)' : 'transparent',
              color: activeTab === tab.key ? 'white' : 'var(--text-secondary)',
              border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)',
            }}>{tab.label}</button>
          ))}
        </div>

        {/* BROWSE TAB */}
        {activeTab === 'browse' && (
          <div>
            {/* Grade Selector */}
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              {([1, 2, 3] as const).map(g => (
                <button key={g} onClick={() => setSelectedGrade(g)} style={{
                  padding: '0.6rem 1.75rem', borderRadius: 'var(--radius-full)', fontFamily: 'var(--font-display)', fontWeight: 600,
                  fontSize: '0.9rem',
                  background: selectedGrade === g ? ['#8B5CF6', '#10B981', '#F59E0B'][g - 1] : 'var(--bg-glass)',
                  color: selectedGrade === g ? '#050816' : 'var(--text-secondary)',
                  border: selectedGrade === g ? 'none' : '1px solid var(--border-subtle)', cursor: 'pointer',
                }}>
                  {['🌱', '🌿', '🌳'][g - 1]} Grade {g} ({stats.byGrade[`grade${g}` as keyof typeof stats.byGrade]} topics)
                </button>
              ))}
            </div>

            {/* Subject Filter */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              {subjects.map(sub => (
                <button key={sub.key} onClick={() => setSelectedSubject(sub.key)} style={{
                  padding: '0.4rem 1rem', borderRadius: 'var(--radius-full)', fontSize: '0.8rem',
                  background: selectedSubject === sub.key ? sub.color : 'var(--bg-glass)',
                  color: selectedSubject === sub.key ? 'white' : 'var(--text-secondary)',
                  border: 'none', cursor: 'pointer',
                }}>{sub.label}</button>
              ))}
            </div>

            {/* Results count */}
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>
              Showing {filteredSubStrands.length} topics for Grade {selectedGrade}
              {selectedSubject !== 'all' && ` · ${subjects.find(s => s.key === selectedSubject)?.label}`}
            </p>

            {/* Sub-Strand Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {filteredSubStrands.map(ss => (
                <SubStrandCard key={ss.id} ss={ss} color={activeColor} />
              ))}
            </div>

            {filteredSubStrands.length === 0 && (
              <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
                <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📚</p>
                <p style={{ color: 'var(--text-secondary)' }}>No topics found for this combination. Try another grade or subject.</p>
              </div>
            )}
          </div>
        )}

        {/* DICTIONARY TAB */}
        {activeTab === 'dictionary' && <DictionaryPanel />}

        {/* SEARCH TAB */}
        {activeTab === 'search' && (
          <div>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search curriculum... (e.g., 'water', 'addition', 'animals', 'hygiene')"
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
                style={{
                  flex: 1, padding: '0.85rem 1.25rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-glass)',
                  border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', fontSize: '1rem',
                  fontFamily: 'var(--font-body)', outline: 'none',
                }} />
              <button onClick={handleSearch} className="btn btn-primary">🔍 Search</button>
            </div>

            {searchResults.length > 0 && (
              <div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                  Found {searchResults.length} results for &quot;{searchQuery}&quot;
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {searchResults.map(ss => <SubStrandCard key={ss.id} ss={ss} color="#6366F1" />)}
                </div>
              </div>
            )}

            {searchQuery && searchResults.length === 0 && (
              <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
                <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔍</p>
                <p style={{ color: 'var(--text-secondary)' }}>No results found. Try different keywords.</p>
              </div>
            )}

            {!searchQuery && (
              <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
                <MiniRobot mood="happy" size={64} />
                <p style={{ color: 'var(--text-secondary)', marginTop: '1rem', fontSize: '0.95rem' }}>
                  Search across all {stats.totalSubStrands} curriculum topics. Try keywords like &quot;water&quot;, &quot;shapes&quot;, &quot;food groups&quot;, or &quot;Kiswahili&quot;.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
