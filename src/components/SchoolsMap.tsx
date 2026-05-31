'use client';

import { useEffect, useRef, useState } from 'react';
import { playClick, playSuccess } from '@/lib/sound-manager';
import type { Language } from '@/types';

interface School {
  id: string;
  name: string;
  county: string;
  lat: number;
  lng: number;
  type: string;
  desc: string;
  icon: string;
}

const KENYAN_SCHOOLS: School[] = [
  { id: '1', name: 'Alliance High School', county: 'Kiambu', lat: -1.2678, lng: 36.6668, type: 'Public Secondary', desc: 'One of Kenyas oldest and most prestigious national schools, founded in 1926.', icon: '🏫' },
  { id: '2', name: 'The Kenya High School', county: 'Nairobi', lat: -1.2722, lng: 36.7865, type: 'Public Secondary', desc: 'A premier national school for girls located in Kileleshwa, Nairobi.', icon: '📚' },
  { id: '3', name: 'Mang\'u High School', county: 'Kiambu', lat: -1.1242, lng: 37.0094, type: 'Public Secondary', desc: 'Famous national school renowned for aviation training studies.', icon: '✈️' },
  { id: '4', name: 'Starehe Boys\' Centre', county: 'Nairobi', lat: -1.2736, lng: 36.8354, type: 'Charity Public', desc: 'National school providing free quality education to needy boys.', icon: '🏆' },
  { id: '5', name: 'Maseno School', county: 'Kisumu', lat: -0.0078, lng: 34.6041, type: 'Public Secondary', desc: 'Established in 1906 by missionaries, it is Kenyas oldest school.', icon: '🛶' },
  { id: '6', name: 'Kisumu Boys High School', county: 'Kisumu', lat: -0.0989, lng: 34.7611, type: 'Public Secondary', desc: 'Prominent national school located at the heart of Kisumu City.', icon: '🐟' },
  { id: '7', name: 'Loreto High School Limuru', county: 'Kiambu', lat: -1.1345, lng: 36.6341, type: 'Public Secondary', desc: 'A leading national girls boarding school, founded by Loreto Sisters in 1936.', icon: '🌸' },
  { id: '8', name: 'Lenana School', county: 'Nairobi', lat: -1.3056, lng: 36.7264, type: 'Public Secondary', desc: 'Originally known as Duke of York School, located along Ngong Road.', icon: '🦁' },
  { id: '9', name: 'Kagumo High School', county: 'Nyeri', lat: -0.4356, lng: 36.9806, type: 'Public Secondary', desc: 'A national school situated between Kirichu and Kiganjo townships.', icon: '⛰️' },
  { id: '10', name: 'Nyeri Primary School', county: 'Nyeri', lat: -0.4222, lng: 36.9531, type: 'Public Primary', desc: 'A famous primary school in Central Kenya known for outstanding performance.', icon: '🎒' },
  { id: '11', name: 'Mama Ngina Girls High School', county: 'Mombasa', lat: -4.0673, lng: 39.6732, type: 'Public Secondary', desc: 'National boarding school for girls located in Mombasa Island.', icon: '🌴' },
  { id: '12', name: 'Shimo la Tewa School', county: 'Mombasa', lat: -3.9678, lng: 39.7345, type: 'Public Secondary', desc: 'A leading national boys school located in Shanzu near the beach.', icon: '🌊' },
  { id: '13', name: 'Nakuru High School', county: 'Nakuru', lat: -0.2812, lng: 36.0823, type: 'Public Secondary', desc: 'National school in Rift Valley established in colonial times.', icon: '🦓' },
  { id: '14', name: 'Kabarak High School', county: 'Nakuru', lat: -0.1706, lng: 35.9621, type: 'Private Secondary', desc: 'Renowned co-educational private school situated at Kabarak University.', icon: '⛪' },
  { id: '15', name: 'Eldoret Primary School', county: 'Uasin Gishu', lat: 0.5142, lng: 35.2697, type: 'Public Primary', desc: 'Large public primary school in the home of running champions.', icon: '🏃' },
  { id: '16', name: 'Garissa Primary School', county: 'Garissa', lat: -0.4568, lng: 39.6412, type: 'Public Primary', desc: 'Key primary school in the North Eastern region serving many students.', icon: '🐪' },
  { id: '17', name: 'Kakamega School', county: 'Kakamega', lat: 0.2827, lng: 34.7519, type: 'Public Secondary', desc: 'Famous for green lawns and excellent achievements in music and drama.', icon: '🌳' },
  { id: '18', name: 'Kisii School', county: 'Kisii', lat: -0.6817, lng: 34.7816, type: 'Public Secondary', desc: 'A national boys school established in Nyanza south region in 1934.', icon: '🍌' },
  { id: '19', name: 'Wajir High School', county: 'Wajir', lat: 1.7483, lng: 40.0612, type: 'Public Secondary', desc: 'Pioneer secondary school in Wajir County, promoting dryland education.', icon: '🕌' },
  { id: '20', name: 'Lodwar High School', county: 'Turkana', lat: 3.1192, lng: 35.5975, type: 'Public Secondary', desc: 'Located in Turkana County, the oldest secondary school in the county.', icon: '🌵' },
  { id: '21', name: 'Kajiado Primary School', county: 'Kajiado', lat: -1.8506, lng: 36.7811, type: 'Public Primary', desc: 'Historic school educating many pastoralist children in Kajiado.', icon: '🛡️' }
];

interface SchoolsMapProps {
  language: Language;
}

export default function SchoolsMap({ language }: SchoolsMapProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [selectedCounty, setSelectedCounty] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeSchool, setActiveSchool] = useState<School | null>(null);
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);

  // List of counties present in data
  const counties = ['All', ...Array.from(new Set(KENYAN_SCHOOLS.map(s => s.county)))];

  // Filter schools based on selections
  const filteredSchools = KENYAN_SCHOOLS.filter(school => {
    const matchCounty = selectedCounty === 'All' || school.county === selectedCounty;
    const matchSearch = school.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        school.county.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCounty && matchSearch;
  });

  // Load Leaflet resources dynamically on client
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Load styles
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    link.setAttribute('crossorigin', '');
    document.head.appendChild(link);

    // Load script
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.setAttribute('crossorigin', '');
    script.async = true;
    script.onload = () => {
      setMapLoaded(true);
    };
    document.head.appendChild(script);

    return () => {
      if (link.parentNode) link.parentNode.removeChild(link);
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);

  // Initialize Map
  useEffect(() => {
    if (!mapLoaded || !mapContainerRef.current) return;

    const L = (window as any).L;
    if (!L) return;

    // Center on Kenya: -0.0236, 37.9062
    const map = L.map(mapContainerRef.current, {
      center: [-0.0236, 37.9062],
      zoom: 6,
      zoomControl: true
    });

    // Friendly colored kids-themed OSM tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 18,
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [mapLoaded]);

  // Update Markers based on filters
  useEffect(() => {
    if (!mapLoaded || !mapInstanceRef.current) return;
    const L = (window as any).L;
    if (!L) return;

    // Clear existing markers
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    // Plot filtered markers
    filteredSchools.forEach(school => {
      const marker = L.marker([school.lat, school.lng]).addTo(mapInstanceRef.current);
      
      // Bind descriptive popup
      marker.bindPopup(`
        <div style="font-family: Fredoka, sans-serif; color: #1E293B; min-width: 160px; line-height: 1.4;">
          <h4 style="margin: 0 0 4px; font-size: 1rem; color: #6366F1; display: flex; gap: 4px;">
            <span>${school.icon}</span> ${school.name}
          </h4>
          <span style="font-size: 0.75rem; color: #64748B; font-weight: 700; text-transform: uppercase;">
            ${school.county} County
          </span>
          <p style="margin: 6px 0 0; font-size: 0.8rem; color: #475569;">
            ${school.desc}
          </p>
          <div style="margin-top: 6px; font-size: 0.7rem; color: #8B5CF6; font-weight: 600;">
            ${school.type}
          </div>
        </div>
      `);

      marker.on('click', () => {
        playClick();
        setActiveSchool(school);
      });

      markersRef.current.push(marker);
    });

    // Auto-bounds fit if filtered has elements
    if (filteredSchools.length > 0 && mapInstanceRef.current) {
      const coords = filteredSchools.map(s => [s.lat, s.lng] as [number, number]);
      try {
        const bounds = L.latLngBounds(coords);
        mapInstanceRef.current.fitBounds(bounds, { padding: [40, 40] });
      } catch (e) {
        // ignore bounds errors
      }
    }
  }, [mapLoaded, selectedCounty, searchQuery]);

  const handleSchoolCardClick = (school: School) => {
    playSuccess();
    setActiveSchool(school);
    if (mapInstanceRef.current) {
      const L = (window as any).L;
      mapInstanceRef.current.setView([school.lat, school.lng], 13);
      
      // Find matching marker and open popup
      const idx = filteredSchools.findIndex(s => s.id === school.id);
      if (idx !== -1 && markersRef.current[idx]) {
        markersRef.current[idx].openPopup();
      }
    }
  };

  const mapLabels = {
    title: { english: '🏫 Kenyan Schools Map Navigator', kiswahili: '🏫 Kiongozi cha Ramani ya Shule za Kenya', kikuyu: '🏫 Ramani ya Thukuru cia Kenya', luo: '🏫 Ramani mar Skul piny Kenya', somali: '🏫 Hagaha Khariiradda Dugsiyada Kenya' },
    subtitle: { english: 'Explore and click actual primary and secondary schools across Kenya!', kiswahili: 'Chunguza na ubonyeze shule halisi za msingi na upili kote Kenya!', kikuyu: 'Thuthuria na ũhũre thukuru cia msingi na cia sekondarĩ gũkũ Kenya!', luo: 'Yier kendo ifiny moro amora mar skul mag primary kod secondary e Kenya!', somali: 'Baar oo guji dugsiyada dhabta ah ee hoose/dhexe iyo sare ee Kenya!' },
    searchPlace: { english: 'Search schools by name or county...', kiswahili: 'Tafuta shule kwa jina au kaunti...', kikuyu: 'Carĩa thukuru na rĩĩtwa kana kaunti...', luo: 'Many skul gi nyinge kata county...', somali: 'Ku raadi dugsiyada magac ama gobol...' },
    filterCounty: { english: 'Select County:', kiswahili: 'Chagua Kaunti:', kikuyu: 'Thuura Kaunti:', luo: 'Yier County:', somali: 'Dooro Gobolka:' },
    details: { english: 'School Details', kiswahili: 'Maelezo ya Shule', kikuyu: 'Maelezo ma Thukuru', luo: 'Lera mar Skul', somali: 'Faahfaahinta Dugsiga' },
    selectPrompt: { english: 'Click a pin on the map or a school on the list to learn more details!', kiswahili: 'Bonyeza pini kwenye ramani au shule kwenye orodha ili kupata maelezo!', kikuyu: 'Hũra pĩnĩ ramani-inĩ kana thukuru nĩguo ũthome maelezo!', luo: 'Finy pini e map kata nying skul e list mondo ipuonjri maber!', somali: 'Guji calaamadda khariiradda ama dugsi ku jira liiska si aad u ogaato faahfaahin dheeraad ah!' }
  };

  return (
    <div className="glass-card" style={{ padding: '2rem', borderRadius: '24px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h2 style={{ fontFamily: 'var(--font-fun)', fontSize: '1.6rem', color: '#FFF', margin: 0 }}>
          {mapLabels.title[language]}
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: '0.25rem 0 0 0' }}>
          {mapLabels.subtitle[language]}
        </p>
      </div>

      {/* Filters bar */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder={mapLabels.searchPlace[language]}
          style={{
            flex: 1,
            minWidth: '220px',
            padding: '0.7rem 1rem',
            borderRadius: '12px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid var(--border-subtle)',
            color: '#FFF',
            fontFamily: 'var(--font-fun)',
            fontSize: '0.95rem',
            outline: 'none'
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 700 }}>
            {mapLabels.filterCounty[language]}
          </span>
          <select
            value={selectedCounty}
            onChange={e => { playClick(); setSelectedCounty(e.target.value); }}
            style={{
              padding: '0.7rem 1rem',
              borderRadius: '12px',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)',
              color: '#FFF',
              fontFamily: 'var(--font-fun)',
              fontSize: '0.95rem',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            {counties.map(c => (
              <option key={c} value={c} style={{ background: '#0F172A' }}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Content Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '1.5rem', minHeight: '400px', flexWrap: 'wrap' }}>
        {/* Map Column */}
        <div style={{ position: 'relative', borderRadius: '16px', border: '3px solid #1E293B', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.3)', background: '#E5E7EB' }}>
          {!mapLoaded && (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1E293B', color: '#FFF', fontFamily: 'var(--font-fun)', gap: '0.5rem' }}>
              <span>🌍</span> Loading Interactive Map Assets...
            </div>
          )}
          <div ref={mapContainerRef} style={{ width: '100%', height: '400px' }} />
        </div>

        {/* Sidebar School Details and List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '400px', overflowY: 'auto', paddingRight: '0.25rem' }}>
          {/* Active Detail Panel */}
          {activeSchool ? (
            <div className="glass-card animate-bounce-subtle" style={{ padding: '1.25rem', border: '2px solid #8B5CF6', background: 'rgba(139, 92, 246, 0.05)', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '2.5rem' }}>{activeSchool.icon}</span>
                <span style={{ background: '#8B5CF6', color: '#FFF', padding: '2px 8px', borderRadius: '10px', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase' }}>
                  {activeSchool.county}
                </span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-fun)', fontSize: '1.2rem', color: '#FFF', margin: 0 }}>
                {activeSchool.name}
              </h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-primary-light)', fontWeight: 700 }}>
                {activeSchool.type}
              </span>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>
                {activeSchool.desc}
              </p>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <span>📍 Lat: {activeSchool.lat}</span>
                <span>📍 Lng: {activeSchool.lng}</span>
              </div>
            </div>
          ) : (
            <div style={{ padding: '1.5rem', textAlign: 'center', background: 'var(--bg-glass)', borderRadius: '16px', border: '1px dashed var(--border-subtle)', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}>📍</span>
              {mapLabels.selectPrompt[language]}
            </div>
          )}

          {/* School list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <h4 style={{ fontFamily: 'var(--font-display)', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', margin: '0.5rem 0 0 0' }}>
              Schools Found ({filteredSchools.length})
            </h4>
            {filteredSchools.map(school => (
              <button
                key={school.id}
                onClick={() => handleSchoolCardClick(school)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  borderRadius: '12px',
                  border: activeSchool?.id === school.id ? '2px solid var(--color-primary)' : '1px solid var(--border-subtle)',
                  background: activeSchool?.id === school.id ? 'rgba(99,102,241,0.1)' : 'var(--bg-glass)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s',
                  width: '100%'
                }}
              >
                <span style={{ fontSize: '1.5rem' }}>{school.icon}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4 style={{ color: '#FFF', fontSize: '0.85rem', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {school.name}
                  </h4>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    {school.county} county · {school.type}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
