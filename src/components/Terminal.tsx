'use client';

import { useState, useRef, useEffect } from 'react';
import { playClick, playCorrect, playIncorrect } from '@/lib/sound-manager';

interface TerminalProps {
  initialCode?: string;
  onCodeRun?: (output: string) => void;
}

export default function Terminal({ initialCode = '', onCodeRun }: TerminalProps) {
  const [history, setHistory] = useState<string[]>([
    '🤖 RoboKid Command Prompt [Version 1.0.0]',
    '(c) 2026 RoboKid Labs. All rights reserved.',
    '',
    'Type "help" to see available robot commands!',
    ''
  ]);
  const [inputVal, setInputVal] = useState<string>('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const trimmed = inputVal.trim();
      if (!trimmed) return;

      playClick();
      const nextHistory = [...history, `robokid@terminal:~$ ${inputVal}`];
      const nextCmdHistory = [inputVal, ...cmdHistory];
      
      setCmdHistory(nextCmdHistory);
      setHistoryIdx(-1);
      setInputVal('');

      // Command processor
      const parts = trimmed.split(' ');
      const cmd = parts[0].toLowerCase();
      const arg = parts.slice(1).join(' ');

      let response: string[] = [];

      switch (cmd) {
        case 'help':
          response = [
            'Available Commands:',
            '  help        - Show this menu',
            '  clear       - Clear the screen',
            '  print("x")  - Print text to screen (e.g. print("Habari!"))',
            '  robot       - Draw an ASCII robot friend',
            '  joke        - Tell a funny AI or Robotics joke',
            '  learn       - Start a step-by-step coding lesson',
            '  run         - Execute the active editor code lesson',
            '  clear       - Clear command prompt history'
          ];
          break;

        case 'clear':
          setHistory([]);
          return;

        case 'robot':
          playCorrect();
          response = [
            '      [🤖]',
            '     / | \\',
            '    *  |  *',
            '      / \\',
            '     o   o',
            'RoboKid mascot says HELLO! 🌐'
          ];
          break;

        case 'joke':
          playCorrect();
          const jokes = [
            'Why did the robot go to Alliance High School? To get smarter micro-chips! 🏫',
            'What is a robot\'s favorite Kenyan dish? Micro-chips and Ugali! 🫓',
            'How does a robot greet a friend? With a high-five megabyte! 🖐️',
            'Why did the computer crash in Nakuru? It got bitten by a digital mosquito! 🦟',
            'Why was the robot sad? Because its creator kept pressing its buttons! 🕹️'
          ];
          response = [jokes[Math.floor(Math.random() * jokes.length)]];
          break;

        case 'learn':
          response = [
            '✏️ Coding Lesson 1: Variables',
            'In programming, a VARIABLE is like a storage box! We put values inside them.',
            'Example Python code:',
            '  mangoes = 3',
            '  bananas = 2',
            '  total = mangoes + bananas',
            '  print(total)',
            'This tells the computer to store 3 and 2, add them, and print "5"!'
          ];
          break;

        case 'run':
          playCorrect();
          response = [
            '⚡ Compiling script...',
            '🚀 Running Python process...',
            '-----------------------------',
            initialCode ? `Running active script:\n${initialCode}` : 'Habari RoboKid! I am learning to code! (Standard Lesson 1 output)',
            '-----------------------------',
            '✅ Process finished successfully!'
          ];
          if (onCodeRun) {
            onCodeRun(initialCode || 'Habari RoboKid!\nI am learning to code!');
          }
          break;

        default:
          // Check for print("something")
          const printMatch = inputVal.match(/^print\s*\(\s*["'](.*)["']\s*\)$/i);
          if (printMatch) {
            response = [printMatch[1]];
          } else {
            playIncorrect();
            response = [`Command not found: "${cmd}". Type "help" for a list of commands.`];
          }
      }

      setHistory([...nextHistory, ...response, '']);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0 && historyIdx < cmdHistory.length - 1) {
        const nextIdx = historyIdx + 1;
        setHistoryIdx(nextIdx);
        setInputVal(cmdHistory[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx > 0) {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInputVal(cmdHistory[nextIdx]);
      } else if (historyIdx === 0) {
        setHistoryIdx(-1);
        setInputVal('');
      }
    }
  };

  return (
    <div 
      onClick={focusInput}
      style={{
        background: '#0a0d14',
        border: '3px solid #1e293b',
        borderRadius: '12px',
        padding: '1.25rem',
        boxShadow: '0 8px 30px rgba(0,0,0,0.6)',
        color: '#38bdf8',
        fontFamily: '"Courier New", Courier, monospace',
        fontSize: '0.85rem',
        lineHeight: 1.6,
        height: '350px',
        overflowY: 'auto',
        position: 'relative',
        cursor: 'text'
      }}
    >
      {/* Gloss Scanline CRT effect overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
        backgroundSize: '100% 4px, 3px 100%',
        pointerEvents: 'none',
        opacity: 0.4
      }} />

      {/* Output history */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {history.map((line, idx) => (
          <div key={idx} style={{ whiteSpace: 'pre-wrap', color: line.startsWith('robokid@terminal') ? '#10b981' : '#38bdf8' }}>
            {line}
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      {/* Active input prompt */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ color: '#10b981', marginRight: '0.5rem', fontWeight: 'bold' }}>
          robokid@terminal:~$
        </span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#38bdf8',
            fontFamily: 'inherit',
            fontSize: 'inherit',
            caretColor: '#38bdf8'
          }}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
      </div>
    </div>
  );
}
