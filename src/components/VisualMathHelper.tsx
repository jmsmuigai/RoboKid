'use client';

interface VisualMathHelperProps {
  question: string;
}

export default function VisualMathHelper({ question }: VisualMathHelperProps) {
  const lower = question.toLowerCase();

  // Helper to parse count of items (like "3 bananas" -> 3)
  const getCount = (itemName: string): number => {
    // Regex to match a number before the item name (allowing some optional words in between)
    const regex = new RegExp(`(\\d+)\\s+(?:sweet\\s+|juicy\\s+|ripe\\s+)?${itemName}`, 'i');
    const match = lower.match(regex);
    if (match) return Math.min(parseInt(match[1]), 12); // cap at 12 for layout sanity
    return 0;
  };

  // Check counts for items
  const bananaCount = getCount('banana');
  const mangoCount = getCount('mango');
  const appleCount = getCount('apple');
  const orangeCount = getCount('orange');
  const starCount = getCount('star');

  // Check for shapes
  const hasSquare = lower.includes('square') || lower.includes('mraba');
  const hasCircle = lower.includes('circle') || lower.includes('duara');
  const hasTriangle = lower.includes('triangle') || lower.includes('pembe tatu');

  // If no visual triggers, return null
  const hasVisuals = bananaCount > 0 || mangoCount > 0 || appleCount > 0 || orangeCount > 0 || starCount > 0 || hasSquare || hasCircle || hasTriangle;
  if (!hasVisuals) return null;

  // Render SVG Bananas
  const renderBananas = () => {
    return Array.from({ length: bananaCount }).map((_, idx) => (
      <svg key={`banana-${idx}`} width="50" height="50" viewBox="0 0 100 100" style={{ animation: `robotFloat 3s ease-in-out infinite ${idx * 0.2}s` }}>
        {/* Banana shape */}
        <path d="M20,20 Q60,30 80,70 Q50,85 15,35 Z" fill="#FBBF24" stroke="#D97706" strokeWidth="2" />
        <path d="M20,20 Q45,35 75,72" fill="none" stroke="#D97706" strokeWidth="1" strokeDasharray="2,2" />
        {/* stem */}
        <path d="M15,35 Q10,38 8,32 Q13,24 20,20" fill="#78350F" />
        {/* tip */}
        <path d="M80,70 Q83,72 85,76 Q81,80 77,75" fill="#451A03" />
      </svg>
    ));
  };

  // Render SVG Mangoes
  const renderMangoes = () => {
    return Array.from({ length: mangoCount }).map((_, idx) => (
      <svg key={`mango-${idx}`} width="50" height="50" viewBox="0 0 100 100" style={{ animation: `robotFloat 3.5s ease-in-out infinite ${idx * 0.3}s` }}>
        <defs>
          <radialGradient id={`mangoGrad-${idx}`} cx="40%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#F87171" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#10B981" />
          </radialGradient>
        </defs>
        {/* Mango shape */}
        <path d="M50,15 Q85,25 80,60 Q70,90 40,85 Q20,80 25,45 Q30,10 50,15 Z" fill={`url(#mangoGrad-${idx})`} stroke="#B45309" strokeWidth="2" />
        {/* stem and leaf */}
        <path d="M50,15 Q52,5 48,2" fill="none" stroke="#451A03" strokeWidth="3" />
        <path d="M50,8 Q70,5 65,15 Z" fill="#047857" />
      </svg>
    ));
  };

  // Render SVG Apples
  const renderApples = () => {
    return Array.from({ length: appleCount }).map((_, idx) => (
      <svg key={`apple-${idx}`} width="50" height="50" viewBox="0 0 100 100" style={{ animation: `robotFloat 2.8s ease-in-out infinite ${idx * 0.15}s` }}>
        {/* Apple body */}
        <path d="M50,25 C35,20 15,30 15,55 C15,80 40,90 50,82 C60,90 85,80 85,55 C85,30 65,20 50,25 Z" fill="#EF4444" stroke="#B91C1C" strokeWidth="2" />
        {/* stem */}
        <path d="M50,25 Q52,12 58,10" fill="none" stroke="#78350F" strokeWidth="3" />
        {/* leaf */}
        <path d="M52,18 Q40,12 45,6 Z" fill="#10B981" />
      </svg>
    ));
  };

  // Render SVG Oranges
  const renderOranges = () => {
    return Array.from({ length: orangeCount }).map((_, idx) => (
      <svg key={`orange-${idx}`} width="50" height="50" viewBox="0 0 100 100" style={{ animation: `robotFloat 3.2s ease-in-out infinite ${idx * 0.25}s` }}>
        <circle cx="50" cy="50" r="35" fill="#F97316" stroke="#C2410C" strokeWidth="2" />
        <circle cx="50" cy="50" r="1" fill="#C2410C" />
        {/* leaves */}
        <path d="M50,15 Q55,5 62,8 Z" fill="#15803D" />
      </svg>
    ));
  };

  // Render SVG Stars
  const renderStars = () => {
    return Array.from({ length: starCount }).map((_, idx) => (
      <svg key={`star-${idx}`} width="45" height="45" viewBox="0 0 24 24" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" style={{ animation: `robotFloat 2.5s ease-in-out infinite ${idx * 0.1}s` }}>
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
    ));
  };

  return (
    <div className="glass-card" style={{
      padding: '1.25rem',
      margin: '1.25rem 0',
      background: 'rgba(255, 255, 255, 0.02)',
      border: '1px dashed var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1rem',
      animation: 'fadeInUp 0.6s ease'
    }}>
      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>🤖 RoboKid Visual Assistant</span>
      
      {/* Container for Fruits / Items */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
        {bananaCount > 0 && renderBananas()}
        {mangoCount > 0 && renderMangoes()}
        {appleCount > 0 && renderApples()}
        {orangeCount > 0 && renderOranges()}
        {starCount > 0 && renderStars()}
      </div>

      {/* Container for Shapes */}
      {(hasSquare || hasCircle || hasTriangle) && (
        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', margin: '1rem 0' }}>
          {hasSquare && (
            <div style={{ textAlign: 'center' }}>
              <svg width="100" height="100" viewBox="0 0 100 100" style={{ filter: 'drop-shadow(0 0 8px rgba(99, 102, 241, 0.5))' }}>
                <rect x="15" y="15" width="70" height="70" rx="8" fill="none" stroke="#6366F1" strokeWidth="5">
                  <animate attributeName="stroke" values="#6366F1;#EC4899;#10B981;#6366F1" dur="4s" repeatCount="indefinite" />
                  <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="10s" repeatCount="indefinite" />
                </rect>
              </svg>
              <div style={{ fontSize: '0.8rem', color: '#6366F1', marginTop: '0.5rem', fontFamily: 'var(--font-display)' }}>Mraba (Square)</div>
            </div>
          )}

          {hasCircle && (
            <div style={{ textAlign: 'center' }}>
              <svg width="100" height="100" viewBox="0 0 100 100" style={{ filter: 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.5))' }}>
                <circle cx="50" cy="50" r="35" fill="none" stroke="#10B981" strokeWidth="5">
                  <animate attributeName="stroke" values="#10B981;#F59E0B;#EC4899;#10B981" dur="4s" repeatCount="indefinite" />
                  <animate attributeName="r" values="35;38;35" dur="2s" repeatCount="indefinite" />
                </circle>
              </svg>
              <div style={{ fontSize: '0.8rem', color: '#10B981', marginTop: '0.5rem', fontFamily: 'var(--font-display)' }}>Duara (Circle)</div>
            </div>
          )}

          {hasTriangle && (
            <div style={{ textAlign: 'center' }}>
              <svg width="100" height="100" viewBox="0 0 100 100" style={{ filter: 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.5))' }}>
                <polygon points="50,15 85,80 15,80" fill="none" stroke="#F59E0B" strokeWidth="5">
                  <animate attributeName="stroke" values="#F59E0B;#6366F1;#EF4444;#F59E0B" dur="4s" repeatCount="indefinite" />
                  <animateTransform attributeName="transform" type="rotate" from="0 50 55" to="-360 50 55" dur="12s" repeatCount="indefinite" />
                </polygon>
              </svg>
              <div style={{ fontSize: '0.8rem', color: '#F59E0B', marginTop: '0.5rem', fontFamily: 'var(--font-display)' }}>Pembe Tatu (Triangle)</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
