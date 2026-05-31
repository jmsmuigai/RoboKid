'use client';

import { useState } from 'react';
import { playClick, playSuccess } from '@/lib/sound-manager';

interface Video {
  id: string; // YouTube ID or similar
  title: string;
  creator: string;
  duration: string;
  category: 'coding' | 'science' | 'math' | 'folktales' | 'music';
  description: string;
  thumbnail: string;
}

export default function VideosPage() {
  const [selectedVideo, setSelectedVideo] = useState<string>('n_J7wTfBvN0'); // Default Akili and Me / Ubongo
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { key: 'all', label: '🌍 All Videos' },
    { key: 'coding', label: '💻 Coding & AI' },
    { key: 'science', label: '🔬 Space & Science' },
    { key: 'math', label: '🧮 Fun Math' },
    { key: 'folktales', label: '🦁 African Tales' },
    { key: 'music', label: '🥁 Beats & Songs' },
  ];

  const videos: Video[] = [
    {
      id: 'n_J7wTfBvN0',
      title: 'Ubongo Kids — Learning Math and Coding Concepts!',
      creator: 'Ubongo Kids English',
      duration: '12:45',
      category: 'coding',
      description: 'Join the Ubongo Kids crew as they discover how commands, logic, and repeating loops help us build smart machines!',
      thumbnail: '🦁'
    },
    {
      id: 'OqK5l4S0Wk8',
      title: 'Akili and Me — Counting Numbers & Fruit Matching!',
      creator: 'Akili and Me Swahili',
      duration: '8:30',
      category: 'math',
      description: 'Learn to count and match sweet tropical fruits like mangoes and bananas with Akili and her talking animal friends under the baobab tree!',
      thumbnail: '🍌'
    },
    {
      id: 'h4cQpP3YmZc',
      title: 'How do Robots Work? Simple Robotics Guide for Kids',
      creator: 'RoboKid Academy',
      duration: '10:15',
      category: 'coding',
      description: 'Discover the three main parts of every robot: Sensors (eyes), Brain (microcontroller), and Actuators (motors/legs)!',
      thumbnail: '🤖'
    },
    {
      id: 'E7B15-xR_d8',
      title: 'The Hare and the Tortoise (Kenyan Savanna Edition)',
      creator: 'African Folk Tales',
      duration: '14:20',
      category: 'folktales',
      description: 'Listen to the classic story of Sungura the clever hare and the slow tortoise racing across the Tsavo plains. Learn why slow and steady wins the race!',
      thumbnail: '🐢'
    },
    {
      id: 'e6z-v1x9b8',
      title: 'Fun Science Experiments at Starehe Primary School',
      creator: 'Science Kenya',
      duration: '6:50',
      category: 'science',
      description: 'Watch students from Starehe Primary perform fun science experiments with water, soil, and plants to learn about environmental cycles!',
      thumbnail: '🔬'
    },
    {
      id: 'y7u8i9o0p1',
      title: 'Sing Along: The Days of the Week in Kiswahili & Kikuyu',
      creator: 'Lugha Yetu Beats',
      duration: '5:10',
      category: 'music',
      description: 'Sing and dance to kid-friendly African rhythms while learning the days of the week in English, Kiswahili, and mother tongue!',
      thumbnail: '🥁'
    },
    {
      id: 'g3h4j5k6l7',
      title: 'Introduction to Neural Networks (Explained with Fruits!)',
      creator: 'RoboKid Advanced',
      duration: '11:40',
      category: 'coding',
      description: 'How does a computer know the difference between a banana and a mango? Learn how artificial neural networks learn from shapes and colors!',
      thumbnail: '🧠'
    },
    {
      id: 'x8c9v0b1n2',
      title: 'Wildlife Safari: Protecting Animals of Amboseli',
      creator: 'Kenya National Parks',
      duration: '9:15',
      category: 'science',
      description: 'Take a virtual tour of Amboseli National Park to see elephants, giraffes, and lions, and learn how we can protect their environment!',
      thumbnail: '🐘'
    }
  ];

  const currentVid = videos.find(v => v.id === selectedVideo) || videos[0];

  const filteredVideos = activeCategory === 'all'
    ? videos
    : videos.filter(v => v.category === activeCategory);

  const handleVideoSelect = (id: string) => {
    playClick();
    setSelectedVideo(id);
  };

  return (
    <main style={{
      minHeight: '100vh',
      paddingTop: '80px',
      background: 'radial-gradient(circle at center, #0f172a 0%, #050816 100%)',
      color: 'var(--text-primary)',
      fontFamily: 'var(--font-body)'
    }}>
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
            <li><span className="badge badge-warning">📺 Videos</span></li>
          </ul>
        </div>
      </nav>

      <div className="container" style={{ display: 'flex', gap: '2rem', paddingBottom: '4rem', flexWrap: 'wrap' }}>
        
        {/* Sidebar Categories (Savanna Theme styled) */}
        <aside style={{
          width: '240px',
          flexShrink: 0,
          background: 'rgba(251, 146, 60, 0.03)',
          borderRight: '1px solid rgba(251, 146, 60, 0.1)',
          paddingRight: '1rem'
        }}>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.2rem',
            color: '#FB923C',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span>📺</span> RoboKid TV
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {categories.map(cat => (
              <button
                key={cat.key}
                onClick={() => { playClick(); setActiveCategory(cat.key); }}
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '12px',
                  border: 'none',
                  background: activeCategory === cat.key ? '#FB923C' : 'transparent',
                  color: activeCategory === cat.key ? '#050816' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  fontFamily: 'var(--font-display)',
                  transition: 'all 0.2s'
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Quick joke box inside sidebar */}
          <div className="glass-card" style={{
            marginTop: '2rem',
            padding: '1rem',
            borderColor: 'rgba(251, 146, 60, 0.2)',
            background: 'rgba(251, 146, 60, 0.05)'
          }}>
            <p style={{ margin: 0, fontSize: '0.75rem', color: '#FB923C', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.25rem' }}>🤖 Video Joke!</p>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
              Why did the robot go to the Maasai Mara? To take a byte out of nature! 🦁
            </p>
          </div>
        </aside>

        {/* Main Video Area */}
        <div style={{ flex: 1, minWidth: '320px' }}>
          
          {/* Main Video Player */}
          <div className="glass-card" style={{
            padding: 0,
            overflow: 'hidden',
            border: '2px solid rgba(251, 146, 60, 0.15)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            marginBottom: '2rem'
          }}>
            {/* Embed Video Iframe */}
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
              <iframe
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                src={`https://www.youtube-nocookie.com/embed/${selectedVideo}?autoplay=0&rel=0&showinfo=0`}
                title="RoboKid Safe Video Player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                sandbox="allow-scripts allow-same-origin allow-presentation"
                allowFullScreen
              />
            </div>

            {/* Video metadata */}
            <div style={{ padding: '1.5rem' }}>
              <span className="badge badge-warning" style={{ textTransform: 'uppercase', fontSize: '0.7rem' }}>
                {currentVid.category}
              </span>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.4rem',
                margin: '0.5rem 0',
                color: '#fff'
              }}>
                {currentVid.title}
              </h2>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>by {currentVid.creator}</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>⏱️ {currentVid.duration}</span>
              </div>
              <p style={{
                color: 'var(--text-secondary)',
                fontSize: '0.9rem',
                lineHeight: 1.6,
                margin: 0
              }}>
                {currentVid.description}
              </p>
            </div>
          </div>

          {/* Recommended Videos List */}
          <div>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.2rem',
              marginBottom: '1rem',
              color: '#fff'
            }}>
              Recommended for You 📺
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: '1rem'
            }}>
              {filteredVideos.map(vid => (
                <div
                  key={vid.id}
                  onClick={() => handleVideoSelect(vid.id)}
                  className="glass-card"
                  style={{
                    padding: 0,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: selectedVideo === vid.id ? '2px solid #FB923C' : '1px solid var(--border-subtle)',
                    background: selectedVideo === vid.id ? 'rgba(251, 146, 60, 0.08)' : 'rgba(30, 41, 59, 0.3)',
                    transition: 'transform 0.2s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                  {/* Fake/Illustrative thumbnail using Emojis & styled background */}
                  <div style={{
                    height: '120px',
                    background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '3.5rem',
                    position: 'relative'
                  }}>
                    {vid.thumbnail}
                    
                    {/* Duration badge */}
                    <span style={{
                      position: 'absolute', bottom: '6px', right: '6px',
                      background: 'rgba(0,0,0,0.8)', padding: '2px 6px',
                      borderRadius: '4px', fontSize: '0.7rem', color: '#fff'
                    }}>{vid.duration}</span>
                  </div>

                  <div style={{ padding: '0.75rem' }}>
                    <h4 style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.85rem',
                      margin: '0 0 0.25rem 0',
                      lineHeight: 1.4,
                      color: '#fff',
                      height: '2.8em',
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical'
                    }}>
                      {vid.title}
                    </h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{vid.creator}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}
