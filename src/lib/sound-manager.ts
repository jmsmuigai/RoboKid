// ============================================================
// RoboKid Audio Synthesizer Engine (Web Audio API)
// 100% offline, zero dependencies, child-friendly sounds & beats
// ============================================================

let audioCtx: AudioContext | null = null;
let backingBeatInterval: any = null;
let isBeatRunning = false;
let tempoBpm = 110;

/** Initialize the AudioContext on first interaction */
function getAudioContext(): AudioContext {
  if (typeof window === 'undefined') throw new Error('AudioContext only available in browser');
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/** Play a quick, satisfying click sound */
export function playClick() {
  try {
    const ctx = getAudioContext();
    const time = ctx.currentTime;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, time);
    osc.frequency.exponentialRampToValueAtTime(1200, time + 0.08);
    
    gain.gain.setValueAtTime(0.15, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.08);
    
    osc.start(time);
    osc.stop(time + 0.08);
  } catch (e) {
    console.warn('Audio click play failed:', e);
  }
}

/** Play a success chime (Major chord progression) */
export function playCorrect() {
  try {
    const ctx = getAudioContext();
    const time = ctx.currentTime;
    
    // Notes of C major chord: C5, E5, G5, C6
    const notes = [523.25, 659.25, 783.99, 1046.50];
    
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, time + idx * 0.06);
      
      gain.gain.setValueAtTime(0.1, time + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.01, time + idx * 0.06 + 0.4);
      
      osc.start(time + idx * 0.06);
      osc.stop(time + idx * 0.06 + 0.4);
    });
  } catch (e) {
    console.warn('Audio correct play failed:', e);
  }
}

/** Play an incorrect buzz sound */
export function playIncorrect() {
  try {
    const ctx = getAudioContext();
    const time = ctx.currentTime;
    
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);
    
    osc1.type = 'sawtooth';
    osc2.type = 'square';
    
    osc1.frequency.setValueAtTime(130, time);
    osc2.frequency.setValueAtTime(132, time); // detuned
    
    gain.gain.setValueAtTime(0.15, time);
    gain.gain.linearRampToValueAtTime(0.01, time + 0.35);
    
    osc1.start(time);
    osc2.start(time);
    
    osc1.stop(time + 0.35);
    osc2.stop(time + 0.35);
  } catch (e) {
    console.warn('Audio incorrect play failed:', e);
  }
}

/** Play a success victory fanfare */
export function playSuccess() {
  try {
    const ctx = getAudioContext();
    const time = ctx.currentTime;
    
    // Ascending melody
    const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50];
    
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = idx === notes.length - 1 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, time + idx * 0.1);
      
      gain.gain.setValueAtTime(0.08, time + idx * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.01, time + idx * 0.1 + 0.5);
      
      osc.start(time + idx * 0.1);
      osc.stop(time + idx * 0.1 + 0.5);
    });
  } catch (e) {
    console.warn('Audio success play failed:', e);
  }
}

/** Synthesize a Conga Drum hit */
function playConga(ctx: AudioContext, frequency: number, time: number, gainLevel = 0.3) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  
  osc.type = 'sine';
  osc.frequency.setValueAtTime(frequency, time);
  osc.frequency.exponentialRampToValueAtTime(frequency * 0.6, time + 0.12);
  
  gain.gain.setValueAtTime(gainLevel, time);
  gain.gain.exponentialRampToValueAtTime(0.01, time + 0.15);
  
  osc.start(time);
  osc.stop(time + 0.16);
}

/** Synthesize a Shaker hit using filtered White Noise */
function playShaker(ctx: AudioContext, time: number) {
  const bufferSize = ctx.sampleRate * 0.05; // 50ms buffer
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  
  // Fill buffer with white noise
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  
  // High-pass filter to sound like a shaker
  const filter = ctx.createBiquadFilter();
  filter.type = 'highpass';
  filter.frequency.setValueAtTime(3000, time);
  
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.05, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);
  
  source.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  
  source.start(time);
  source.stop(time + 0.06);
}

/** Start synthesizing a happy, friendly African Conga/Shaker rhythmic beat */
export function startBackingBeat() {
  if (isBeatRunning) return;
  try {
    const ctx = getAudioContext();
    isBeatRunning = true;
    
    let step = 0;
    const stepDuration = 60 / tempoBpm / 2; // 8th notes
    
    const scheduler = () => {
      if (!isBeatRunning) return;
      const nextStepTime = ctx.currentTime + 0.05;
      
      // Step sequencer patterns (16-step loop)
      // Conga pattern (1 = high, 2 = mid, 3 = low, 0 = off)
      const congaPattern = [2, 0, 1, 0, 3, 2, 1, 0, 2, 0, 1, 3, 0, 2, 1, 0];
      const shakerPattern = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
      
      const cStepVal = congaPattern[step % 16];
      if (cStepVal === 1) {
        playConga(ctx, 330, nextStepTime, 0.15); // High conga
      } else if (cStepVal === 2) {
        playConga(ctx, 220, nextStepTime, 0.2);  // Mid conga
      } else if (cStepVal === 3) {
        playConga(ctx, 150, nextStepTime, 0.25); // Low conga
      }
      
      if (shakerPattern[step % 16] === 1 && step % 2 === 0) {
        playShaker(ctx, nextStepTime); // Shaker on beats
      }
      
      step++;
    };
    
    // Run tick every 8th note duration
    backingBeatInterval = setInterval(scheduler, stepDuration * 1000);
  } catch (e) {
    console.warn('Could not start sound beat synthesizer:', e);
  }
}

/** Stop the synthesized beat */
export function stopBackingBeat() {
  isBeatRunning = false;
  if (backingBeatInterval) {
    clearInterval(backingBeatInterval);
    backingBeatInterval = null;
  }
}

/** Check if beat is playing */
export function isBeatPlaying(): boolean {
  return isBeatRunning;
}
