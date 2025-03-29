import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [quote, setQuote] = useState('');
  const [userInput, setUserInput] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [isGameActive, setIsGameActive] = useState(false);
  const [accuracy, setAccuracy] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const inputRef = useRef(null);

  const quotes = [
    "The quick brown fox jumps over the lazy dog.",
    "Programming is not about what you know, it's about what you can figure out.",
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "Be the change you wish to see in the world.",
    "Innovation distinguishes between a leader and a follower.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "First, solve the problem. Then, write the code.",
    "Simplicity is the soul of efficiency.",
    "Make it work, make it right, make it fast.",
    "The best error message is the one that never shows up.",
    "The future belongs to those who believe in the beauty of their dreams.",
    "Life is what happens when you're busy making other plans.",
    "It always seems impossible until it's done.",
    "The only way to do great work is to love what you do.",
    "Twenty years from now you will be more disappointed by the things you didn't do than by the ones you did.",
    "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
    "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
    "Happiness can be found, even in the darkest of times, if one only remembers to turn on the light.",
    "All that we see or seem is but a dream within a dream.",
    "Not all those who wander are lost.",
    "Yesterday's home runs don't win today's games.",
    "Never interrupt your enemy when he is making a mistake.",
    "Genius is one percent inspiration and ninety-nine percent perspiration.",
    "Quality is not an act, it is a habit.",
    "A journey of a thousand miles begins with a single step.",
    "Your time is limited, don't waste it living someone else's life.",
    "The only limit to our realization of tomorrow will be our doubts of today.",
    "Do what you can, with what you have, where you are.",
    "Believe you can and you're halfway there.",
    "It does not matter how slowly you go as long as you do not stop."
  ];

  const startGame = () => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    setUserInput('');
    setTimeRemaining(60);
    setWordCount(0);
    setAccuracy(0);
    setIsGameActive(true);
    inputRef.current.focus();
  };

  const handleInputChange = (e) => {
    const currentInput = e.target.value;
    setUserInput(currentInput);

    const correctChars = currentInput.split('').filter((char, index) => char === quote[index]).length;
    const accuracyPercentage = Math.round((correctChars / currentInput.length) * 100) || 0;
    setAccuracy(accuracyPercentage);

    if (currentInput === quote) {
      const words = currentInput.trim().split(/\s+/).length;
      setWordCount(words);
      setIsGameActive(false);
    }
  };

  useEffect(() => {
    let timerId;
    if (isGameActive && timeRemaining > 0) {
      timerId = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      setIsGameActive(false);
    }

    return () => clearInterval(timerId);
  }, [isGameActive, timeRemaining]);

  return (
    <div className="app">
      <h1>Typing Speed Racer</h1>
      
      <div className="stats">
        <div>Time: {timeRemaining}s</div>
        <div>Accuracy: {accuracy}%</div>
        <div>Words: {wordCount}</div>
      </div>

      <div className="quote-display">
        {quote || 'Click Start to begin the typing challenge!'}
      </div>

      <input
        ref={inputRef}
        type="text"
        value={userInput}
        onChange={handleInputChange}
        disabled={!isGameActive}
        placeholder={isGameActive ? "Start typing..." : "Press Start to play"}
      />

      <button onClick={startGame} disabled={isGameActive}>
        {isGameActive ? 'Game in Progress' : 'Start Game'}
      </button>
    </div>
  );
}

export default App;
