import React, { useState, useEffect, useRef } from 'react';

const Game = () => {
    const canvasRef = useRef(null);
    const [position, setPosition] = useState({ x: 50, y: 50 });
    const [speed, setSpeed] = useState(0);
    const [angle, setAngle] = useState(0);
  
    useEffect(() => {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
  
      const drawBuggy = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
  
        // Draw the buggy
        context.save();
        context.translate(position.x, position.y);
        context.rotate(angle * Math.PI / 180);
        context.fillStyle = 'blue';
        context.fillRect(-15, -10, 30, 20);
        context.restore();
      };
  
      const moveBuggy = () => {
        setPosition(prevPosition => ({
          x: prevPosition.x + speed * Math.cos(angle * Math.PI / 180),
          y: prevPosition.y + speed * Math.sin(angle * Math.PI / 180)
        }));
      };
  
      const gameLoop = () => {
        moveBuggy();
        drawBuggy();
        requestAnimationFrame(gameLoop);
      };
  
      gameLoop();
  
      // Cleanup function
      return () => cancelAnimationFrame(gameLoop);
    }, [position, speed, angle]);
  
    const handleAcceleration = () => {
      if (speed < 5) {
        setSpeed(speed + 0.02);
      }
    };
  
    const handleBrake = () => {
      if (speed > -5) {
        setSpeed(speed - 1);
      }
    };
  
    const handleLeftSteer = () => {
      if (angle > -45) {
        setAngle(angle - 5);
      }
    };
  
    const handleRightSteer = () => {
      if (angle < 45) {
        setAngle(angle + 5);
      }
    };
  
    return (
      <div>
        <h1>Buggy Game</h1>
        <canvas ref={canvasRef} width={800} height={600} style={{ border: '1px solid black' }} />
        <div style={{ marginTop: '20px' }}>
          <p>Speed: {speed}</p>
          <p>Steering Angle: {angle}</p>
          <button onClick={handleAcceleration}>Accelerate</button>
          <button onClick={handleBrake}>Brake</button>
          <button onClick={handleLeftSteer}>Steer Left</button>
          <button onClick={handleRightSteer}>Steer Right</button>
        </div>
      </div>
    );
};

export default Game;
