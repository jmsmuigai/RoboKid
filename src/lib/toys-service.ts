import { playSuccess } from './sound-manager';

export interface Toy {
  id: string;
  name: string;
  emoji: string;
  color: string;
  description: string;
  funFact: string;
  howToUnlock: string;
  audioText: string;
}

export const TOYS_LIST: Toy[] = [
  {
    id: 'toy_puppy',
    name: 'Robo-Puppy 🐶',
    emoji: '🐶',
    color: '#FF6B6B',
    description: 'A cute robotic dog with big glowing eyes and a wagging mechanical tail!',
    funFact: 'Robo-Puppies use sensors called infrared eyes to detect when you are nearby!',
    howToUnlock: 'Finish any practice exam with a score of 70% or more!',
    audioText: 'Woof woof! I am Robo Puppy! Thank you for unlocking me!',
  },
  {
    id: 'toy_rocket',
    name: 'Spacerocket 🚀',
    emoji: '🚀',
    color: '#4D96FF',
    description: 'A brick-built Lego spaceship ready to launch into orbit!',
    funFact: 'Rockets need a lot of fuel to escape Earth\'s gravity, traveling at 28,000 kilometers per hour!',
    howToUnlock: 'Complete the Jambo Bwana piano lesson in the Music Lab!',
    audioText: 'T-minus 3, 2, 1... Blast off! We are heading to the stars!',
  },
  {
    id: 'toy_shield',
    name: 'Kenyan Shield 🛡️',
    emoji: '🛡️',
    color: '#FFD93D',
    description: 'A traditional Maasai beaded shield in bright red, white, and black colors.',
    funFact: 'Maasai shields are traditionally made from buffalo hide and painted with natural colors!',
    howToUnlock: 'Learn days of the week or vocabulary in the Lugha Yetu section!',
    audioText: 'Habari! This shield represents bravery and cultural heritage.',
  },
  {
    id: 'toy_android',
    name: 'Dancing Android 🤖',
    emoji: '🤖',
    color: '#6BCB77',
    description: 'A mini green robot that loves to dance to electronic beats!',
    funFact: 'Real robots use motors called actuators to move their arms and legs in rhythm!',
    howToUnlock: 'Complete any coding exercise in the Code Lab!',
    audioText: 'Beep boop! Let\'s dance! Move your gears to the rhythm!',
  },
  {
    id: 'toy_jeep',
    name: 'Safari Cruiser 🚜',
    emoji: '🚜',
    color: '#FF9F43',
    description: 'A rugged off-road green safari vehicle for touring national parks.',
    funFact: 'Safari cruisers have high suspension to drive over rocky roads and muddy shambas!',
    howToUnlock: 'Find three correct animal translations in Lugha Yetu!',
    audioText: 'Vroom vroom! Let\'s go on a wildlife safari in the Serengeti!',
  },
  {
    id: 'toy_kalimba',
    name: 'Wooden Kalimba 🎵',
    emoji: '🎵',
    color: '#9B5DE5',
    description: 'A beautiful wooden thumb piano that plays sweet musical chimes.',
    funFact: 'The Kalimba originated in Africa thousands of years ago and is also called a mbira!',
    howToUnlock: 'Complete the Twinkle Twinkle lesson in the Music Lab!',
    audioText: 'Ding dong! Listen to the sweet traditional melodies of Africa.',
  },
  {
    id: 'toy_lion',
    name: 'Simba Plushie 🦁',
    emoji: '🦁',
    color: '#F15BB5',
    description: 'A soft, fluffy lion cub with a friendly smile and a mini crown.',
    funFact: 'A group of lions is called a pride, and they can roar so loud it can be heard 8 kilometers away!',
    howToUnlock: 'Complete the Spelling Bee game with a perfect score!',
    audioText: 'Roar! I am the king of the savannah, but I love soft hugs!',
  },
  {
    id: 'toy_digger',
    name: 'Excavator 🏗️',
    emoji: '🏗️',
    color: '#00F5D4',
    description: 'A bright yellow construction digger with a fully movable bucket arm.',
    funFact: 'Excavators use strong fluid pressure, called hydraulics, to lift heavy boulders!',
    howToUnlock: 'Score 100% on any practice exam in the Exams tab!',
    audioText: 'Clank clank! Time to dig deep and build a smarter city!',
  }
];

// Helper to get earned toy IDs
export function getEarnedToys(): string[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('robokid_earned_toys');
  return stored ? JSON.parse(stored) : [];
}

// Helper to check if a toy is earned
export function isToyEarned(toyId: string): boolean {
  return getEarnedToys().includes(toyId);
}

// Award a specific toy
export function awardToy(toyId: string): { success: boolean; toy?: Toy } {
  if (typeof window === 'undefined') return { success: false };
  const earned = getEarnedToys();
  if (earned.includes(toyId)) {
    return { success: false }; // already earned
  }
  
  const toy = TOYS_LIST.find(t => t.id === toyId);
  if (!toy) return { success: false };
  
  earned.push(toyId);
  localStorage.setItem('robokid_earned_toys', JSON.stringify(earned));
  
  try {
    playSuccess();
  } catch (e) {}

  return { success: true, toy };
}

// Award a random locked toy
export function awardRandomLockedToy(): { success: boolean; toy?: Toy } {
  if (typeof window === 'undefined') return { success: false };
  const earned = getEarnedToys();
  const locked = TOYS_LIST.filter(t => !earned.includes(t.id));
  
  if (locked.length === 0) {
    return { success: false }; // all toys already earned!
  }
  
  const randomToy = locked[Math.floor(Math.random() * locked.length)];
  return awardToy(randomToy.id);
}

// Reset all toys
export function resetToys(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('robokid_earned_toys');
}
