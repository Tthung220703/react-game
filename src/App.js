import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [points, setPoints] = useState(0);
  const [numbers, setNumbers] = useState([]);
  const [currentNumber, setCurrentNumber] = useState(1);
  const [positions, setPositions] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [time, setTime] = useState(0);
  const [timerId, setTimerId] = useState(null);
  const [completed, setCompleted] = useState(false); 

  const generateNumbers = (pointCount) => {
    const nums = Array.from({ length: pointCount }, (_, i) => i + 1);
    setNumbers(shuffle(nums));
    setPositions(generateRandomPositions(pointCount));
  };

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const generateRandomPositions = (count) => {
    const pos = [];
    for (let i = 0; i < count; i++) {
      pos.push({
        top: `${Math.random() * (400 - 50)}px`,
        left: `${Math.random() * (400 - 50)}px`,
      });
    }
    return pos;
  };

  const handleClick = (num) => {
    if (num === currentNumber) {
      setNumbers(numbers.filter(n => n !== num));
      setCurrentNumber(currentNumber + 1);
      if (currentNumber === points) {
        clearInterval(timerId);
        setCompleted(true); 
        alert(`Bạn đã hoàn thành! Thời gian: ${time} giây.`);
      }
    } else {
      clearInterval(timerId);
      setGameOver(true);
      alert('Game Over! Bạn nhấn sai số.');
    }
  };

  const resetGame = () => {
    setPoints(0);
    setNumbers([]);
    setPositions([]);
    setCurrentNumber(1);
    setGameOver(false);
    setTime(0);
    setCompleted(false); 
    clearInterval(timerId);
  };

  const startGame = () => {
    if (points > 0) {
      generateNumbers(points);
      setCurrentNumber(1);
      setGameOver(false);
      setTime(0);
      setCompleted(false);
      
      const id = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
      setTimerId(id);
    }
  };

  return (
    <div className="app">
      <h1>Let's Play</h1>
      <div>
        <label>
          Points: 
          <input 
            type="number" 
            value={points} 
            onChange={(e) => setPoints(Number(e.target.value))} 
            min="1" 
          />
        </label>
        <button onClick={startGame}>Start Game</button>
        <button onClick={resetGame}>Restart</button>
      </div>
      <div className="container">
        {numbers.map((num, index) => (
          <div 
            key={num} 
            className="number" 
            style={{
              top: positions[index]?.top,
              left: positions[index]?.left,
            }} 
            onClick={() => handleClick(num)}
          >
            {num}
          </div>
        ))}
      </div>
      <div className="timer">Thời gian: {time} giây</div>
      {gameOver && <div className="game-over">Game Over!</div>}
      {completed && <div className="completed-message">ALL CLEARED!</div>} {}
    </div>
  );
};

export default App;