'use client';

import React, { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import { CinematicFooter } from '@/components/ui/motion-footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import ShaderRipple from '@/components/ui/ShaderRipple';
import styles from './GamesPage.module.css';
import { Gamepad2, Play, RotateCcw, Trophy, ArrowRight, Keyboard, Code, Copy, Check } from 'lucide-react';

const GAME_CODES = {
  snake: `// ==========================================
// GAME LOOP: NEON SNAKE
// ==========================================
const grid = 20;
let snake = {
  x: 160, y: 160,
  dx: grid, dy: 0,
  cells: [{x: 160, y: 160}],
  maxCells: 3
};
let food = { x: 320, y: 160 };

function moveSnake() {
  snake.x += snake.dx;
  snake.y += snake.dy;

  // Wrap snake coordinates on boundary collision
  if (snake.x < 0) snake.x = canvas.width - grid;
  else if (snake.x >= canvas.width) snake.x = 0;
  if (snake.y < 0) snake.y = canvas.height - grid;
  else if (snake.y >= canvas.height) snake.y = 0;

  // Insert new head cell
  snake.cells.unshift({x: snake.x, y: snake.y});
  if (snake.cells.length > snake.maxCells) {
    snake.cells.pop();
  }
}

function checkCollision() {
  // Self collision check
  snake.cells.forEach((cell, index) => {
    if (index > 0 && cell.x === snake.x && cell.y === snake.y) {
      triggerGameOver();
    }
  });

  // Food eating check
  if (snake.x === food.x && snake.y === food.y) {
    snake.maxCells++;
    score += 10;
    respawnFood();
  }
}`,
  shooter: `// ==========================================
// GAME LOOP: SPACE DEFENDER
// ==========================================
let ship = { x: canvas.width / 2, y: canvas.height - 40, w: 32, h: 32 };
let lasers = [], asteroids = [];

function drawShip() {
  ctx.fillStyle = '#0D6EFD';
  ctx.beginPath();
  ctx.moveTo(ship.x, ship.y - ship.h / 2);
  ctx.lineTo(ship.x - ship.w / 2, ship.y + ship.h / 2);
  ctx.lineTo(ship.x + ship.w / 2, ship.y + ship.h / 2);
  ctx.fill();
}

function fireLaser() {
  lasers.push({ x: ship.x, y: ship.y - 10, w: 3, h: 15, speed: 8 });
}

function updateAsteroids() {
  asteroids.forEach((ast, index) => {
    ast.y += ast.speed;
    
    // Collision checking
    let dist = Math.hypot(ast.x - ship.x, ast.y - ship.y);
    if (dist < ast.radius + ship.w / 2) {
      asteroids.splice(index, 1);
      lives--;
    }
    
    // Laser collisions
    lasers.forEach((laser, lIndex) => {
      let hit = Math.hypot(ast.x - laser.x, ast.y - laser.y);
      if (hit < ast.radius) {
        asteroids.splice(index, 1);
        lasers.splice(lIndex, 1);
        score += 20;
      }
    });
  });
}`,
  memory: `// ==========================================
// GAME LOOP: MEMORY MATRIX
// ==========================================
let sequence = [];
let playerSequence = [];
let pads = [
  { id: 0, x: 100, y: 50, w: 180, h: 130, color: 'blue' },
  { id: 1, x: 320, y: 50, w: 180, h: 130, color: 'cyan' },
  { id: 2, x: 100, y: 220, w: 180, h: 130, color: 'purple' },
  { id: 3, x: 320, y: 220, w: 180, h: 130, color: 'green' }
];

function playSequence() {
  let idx = 0;
  let timer = setInterval(() => {
    flashPad(sequence[idx]);
    playSynthNote(sequence[idx]);
    idx++;
    if (idx >= sequence.length) clearInterval(timer);
  }, 700);
}

function handlePadClick(clickedId) {
  playSynthNote(clickedId);
  playerSequence.push(clickedId);
  
  // Verify inputs
  let step = playerSequence.length - 1;
  if (playerSequence[step] !== sequence[step]) {
    triggerGameOver();
    return;
  }
  
  if (playerSequence.length === sequence.length) {
    score += level * 10;
    setTimeout(startNextLevel, 1000);
  }
}`,
  pong: `// ==========================================
// GAME LOOP: NEON PONG
// ==========================================
let player = { x: 30, y: 160, w: 10, h: 80 };
let computer = { x: 560, y: 160, w: 10, h: 80 };
let ball = { x: 300, y: 200, radius: 7, dx: 5, dy: 2 };

function updateBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Boundary wall bounces
  if (ball.y < 10 || ball.y > canvas.height - 10) ball.dy *= -1;

  // Player paddle bounce
  if (ball.x - ball.radius < player.x + player.w) {
    if (ball.y > player.y && ball.y < player.y + player.h) {
      ball.dx *= -1.1; // Speed multiplier
      score += 10;
    }
  }

  // Computer AI follow tracking
  computer.y += (ball.y - (computer.y + computer.h/2)) * 0.12;

  // Score missing checks
  if (ball.x < 0) {
    lives--;
    resetBall();
  }
}`,
  stack: `// ==========================================
// GAME LOOP: NOVA STACK
// ==========================================
let stack = [{ x: 150, y: 350, w: 300 }];
let currentBlock = { x: 0, y: 325, w: 300, dx: 5 };

function handleDrop() {
  let parent = stack[stack.length - 1];
  
  // Calculate horizontal overlap
  let left = Math.max(currentBlock.x, parent.x);
  let right = Math.min(currentBlock.x + currentBlock.w, parent.x + parent.w);
  let overlap = right - left;
  
  if (overlap <= 0) {
    triggerGameOver();
    return;
  }
  
  // Trim block to match overlap width
  let snap = Math.abs(currentBlock.x - parent.x) < 4;
  let finalX = snap ? parent.x : left;
  let finalW = snap ? parent.w : overlap;
  
  stack.push({ x: finalX, y: currentBlock.y, w: finalW });
  score += snap ? 25 : 10;
  
  // Setup next block layer
  currentBlock = {
    x: Math.random() * (canvas.width - finalW),
    y: currentBlock.y - 25,
    w: finalW,
    dx: 5 + stack.length * 0.25
  };
}`,
  flap: `// ==========================================
// GAME LOOP: NOVA FLAP
// ==========================================
let bird = { x: 50, y: 150, radius: 12, velocity: 0, gravity: 0.4, jump: -6.5 };
let pipes = [];

function jump() {
  bird.velocity = bird.jump;
}

function updatePhysics() {
  bird.velocity += bird.gravity;
  bird.y += bird.velocity;
  
  // Ceiling or floor crash
  if (bird.y - bird.radius < 0 || bird.y + bird.radius > canvas.height) {
    triggerGameOver();
  }
}

function updatePipes() {
  pipes.forEach((pipe, index) => {
    pipe.x -= 3; // Scroll speed
    
    // Check collision
    if (bird.x + bird.radius > pipe.x && bird.x - bird.radius < pipe.x + pipe.w) {
      if (bird.y - bird.radius < pipe.topHeight || bird.y + bird.radius > canvas.height - pipe.bottomHeight) {
        triggerGameOver();
      }
    }
    
    // Score increase when passing pipes
    if (!pipe.passed && pipe.x + pipe.w < bird.x) {
      pipe.passed = true;
      score += 10;
    }
  });
}`,
  breakout: `// ==========================================
// GAME LOOP: NOVA BREAKOUT
// ==========================================
let paddle = { x: 250, y: 370, w: 90, h: 10, speed: 7 };
let ball = { x: 300, y: 300, radius: 6, dx: 4, dy: -4 };
let bricks = []; // 4 rows x 8 columns

function updateBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;
  
  // Wall bounces
  if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) ball.dx *= -1;
  if (ball.y - ball.radius < 0) ball.dy *= -1;
  
  // Paddle bounce
  if (ball.y + ball.radius > paddle.y && ball.x > paddle.x && ball.x < paddle.x + paddle.w) {
    ball.dy = -Math.abs(ball.dy);
  }
  
  // Brick collisions
  bricks.forEach((brick, index) => {
    if (!brick.broken) {
      if (ball.x > brick.x && ball.x < brick.x + brick.w) {
        if (ball.y > brick.y && ball.y < brick.y + brick.h) {
          brick.broken = true;
          ball.dy *= -1;
          score += 10;
        }
      }
    }
  });
}`
};

export default function GamesPage() {
  const [activeGame, setActiveGame] = useState('snake'); // 'snake' | 'shooter' | 'memory' | 'pong' | 'stack' | 'flap' | 'breakout'
  const [gameState, setGameState] = useState('idle'); // 'idle' | 'playing' | 'gameover'
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState({ snake: 0, shooter: 0, memory: 0, pong: 0, stack: 0, flap: 0, breakout: 0 });
  const [viewMode, setViewMode] = useState('play'); // 'play' | 'code'
  const [copied, setCopied] = useState(false);
  const [isMobileConsoleOpen, setIsMobileConsoleOpen] = useState(false);

  const canvasRef = useRef(null);
  const requestRef = useRef(null);
  const inputBridgeRef = useRef({
    move: null,
    steerStart: null,
    steerStop: null,
    fire: null,
    action: null
  });

  // Load High Scores from localStorage
  useEffect(() => {
    const savedScores = localStorage.getItem('cns_arcade_high_scores');
    if (savedScores) {
      try {
        setHighScore(JSON.parse(savedScores));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Update High Scores in localStorage
  const updateHighScore = (game, newScore) => {
    setHighScore((prev) => {
      if (newScore > prev[game]) {
        const updated = { ...prev, [game]: newScore };
        localStorage.setItem('cns_arcade_high_scores', JSON.stringify(updated));
        return updated;
      }
      return prev;
    });
  };

  // Keyboard controls listener (prevents default scrolling and handles spacebar restart)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // 1. Prevent default scrolling for game keys on the games page in all states
      if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'KeyW', 'KeyS', 'KeyA', 'KeyD'].includes(e.code)) {
        e.preventDefault();
      }

      // 2. Spacebar starts or restarts the game when in idle or gameover state
      if (e.code === 'Space') {
        if (gameState === 'idle' || gameState === 'gameover') {
          startGame();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState]);

  // ----------------------------------------------------
  // GAME 1: NEON SNAKE
  // ----------------------------------------------------
  const runSnakeGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const grid = 20;
    let count = 0;
    let speed = 9; // Frames per game tick (lower = faster)
    let localScore = 0;

    let snake = {
      x: 160,
      y: 160,
      dx: grid,
      dy: 0,
      cells: [
        { x: 160, y: 160 },
        { x: 140, y: 160 },
        { x: 120, y: 160 }
      ],
      maxCells: 3
    };

    let food = {
      x: 320,
      y: 160
    };

    // Food eating particles
    let particles = [];
    const createExplosion = (x, y) => {
      for (let i = 0; i < 15; i++) {
        particles.push({
          x: x + grid / 2,
          y: y + grid / 2,
          dx: (Math.random() - 0.5) * 6,
          dy: (Math.random() - 0.5) * 6,
          radius: Math.random() * 3 + 1,
          color: '#0dcaf0',
          alpha: 1,
          decay: Math.random() * 0.05 + 0.02
        });
      }
    };

    const getRandomInt = (min, max) => {
      return Math.floor(Math.random() * (max - min)) + min;
    };

    const respawnFood = () => {
      food.x = getRandomInt(0, canvas.width / grid) * grid;
      food.y = getRandomInt(0, canvas.height / grid) * grid;
      // Make sure food doesn't spawn on snake
      for (let i = 0; i < snake.cells.length; i++) {
        if (food.x === snake.cells[i].x && food.y === snake.cells[i].y) {
          respawnFood();
          break;
        }
      }
    };

    // Control directions queue to prevent double-press bug
    let nextDirection = { dx: grid, dy: 0 };

    const handleKeyDown = (e) => {
      if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
        if (snake.dx === 0) {
          nextDirection = { dx: -grid, dy: 0 };
        }
      } else if (e.code === 'ArrowUp' || e.code === 'KeyW') {
        if (snake.dy === 0) {
          nextDirection = { dx: 0, dy: -grid };
        }
      } else if (e.code === 'ArrowRight' || e.code === 'KeyD') {
        if (snake.dx === 0) {
          nextDirection = { dx: grid, dy: 0 };
        }
      } else if (e.code === 'ArrowDown' || e.code === 'KeyS') {
        if (snake.dy === 0) {
          nextDirection = { dx: 0, dy: grid };
        }
      }
    };

    // Mobile inputs bridge
    inputBridgeRef.current.move = (dir) => {
      if (dir === 'left') {
        if (snake.dx === 0) nextDirection = { dx: -grid, dy: 0 };
      } else if (dir === 'up') {
        if (snake.dy === 0) nextDirection = { dx: 0, dy: -grid };
      } else if (dir === 'right') {
        if (snake.dx === 0) nextDirection = { dx: grid, dy: 0 };
      } else if (dir === 'down') {
        if (snake.dy === 0) nextDirection = { dx: 0, dy: grid };
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    const update = () => {
      requestRef.current = requestAnimationFrame(update);

      // Speed control
      if (++count < speed) {
        // Just draw the board and particles on skip-frames for smooth particle animations
        ctx.fillStyle = '#050505';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw grid lines
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)';
        ctx.lineWidth = 1;
        for (let i = 0; i < canvas.width; i += grid) {
          ctx.beginPath();
          ctx.moveTo(i, 0);
          ctx.lineTo(i, canvas.height);
          ctx.stroke();
        }
        for (let j = 0; j < canvas.height; j += grid) {
          ctx.beginPath();
          ctx.moveTo(0, j);
          ctx.lineTo(canvas.width, j);
          ctx.stroke();
        }

        // Draw Food
        ctx.shadowColor = '#0dcaf0';
        ctx.shadowBlur = 12;
        ctx.fillStyle = '#0dcaf0';
        ctx.beginPath();
        ctx.arc(food.x + grid / 2, food.y + grid / 2, grid / 2 - 2, 0, Math.PI * 2);
        ctx.fill();

        // Draw Snake
        ctx.shadowColor = '#0D6EFD';
        ctx.shadowBlur = 15;
        snake.cells.forEach((cell, index) => {
          if (index === 0) {
            ctx.fillStyle = '#0D6EFD'; // Head is bright blue
          } else {
            // Body parts fade color slightly
            ctx.fillStyle = `rgba(13, 110, 253, ${1 - index / snake.cells.length * 0.5})`;
          }
          ctx.fillRect(cell.x + 1, cell.y + 1, grid - 2, grid - 2);
        });

        // Update & Draw Particles
        ctx.shadowBlur = 5;
        particles.forEach((p, idx) => {
          p.x += p.dx;
          p.y += p.dy;
          p.alpha -= p.decay;
          if (p.alpha <= 0) {
            particles.splice(idx, 1);
          } else {
            ctx.shadowColor = p.color;
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.alpha;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();
          }
        });
        ctx.globalAlpha = 1.0;
        ctx.shadowBlur = 0;
        return;
      }

      count = 0;

      // Apply next direction
      snake.dx = nextDirection.dx;
      snake.dy = nextDirection.dy;

      // Move snake head
      snake.x += snake.dx;
      snake.y += snake.dy;

      // Wrap snake position on edge collision
      if (snake.x < 0) snake.x = canvas.width - grid;
      else if (snake.x >= canvas.width) snake.x = 0;

      if (snake.y < 0) snake.y = canvas.height - grid;
      else if (snake.y >= canvas.height) snake.y = 0;

      // Keep track of cells
      snake.cells.unshift({ x: snake.x, y: snake.y });

      // Remove cells as we move
      if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
      }

      // Check collision with self
      snake.cells.forEach((cell, index) => {
        if (index > 0 && cell.x === snake.x && cell.y === snake.y) {
          // Game Over
          setGameState('gameover');
          cancelAnimationFrame(requestRef.current);
          updateHighScore('snake', localScore);
        }
      });

      // Eat food check
      if (snake.x === food.x && snake.y === food.y) {
        snake.maxCells++;
        localScore += 10;
        setScore(localScore);
        createExplosion(food.x, food.y);
        respawnFood();

        // Speed scaling
        if (localScore % 100 === 0 && speed > 4) {
          speed--;
        }
      }
    };

    requestRef.current = requestAnimationFrame(update);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      cancelAnimationFrame(requestRef.current);
      inputBridgeRef.current.move = null;
    };
  };

  // ----------------------------------------------------
  // GAME 2: SPACE DEFENDER
  // ----------------------------------------------------
  const runSpaceGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let localScore = 0;
    let lives = 5;
    setScore(0);

    let ship = {
      x: canvas.width / 2,
      y: canvas.height - 40,
      width: 28,
      height: 28,
      speed: 8,
      dx: 0
    };

    let lasers = [];
    let asteroids = [];
    let particles = [];

    // Keys state
    let keys = {
      ArrowLeft: false,
      ArrowRight: false,
      KeyA: false,
      KeyD: false,
      Space: false
    };

    const handleKeyDown = (e) => {
      if (e.code in keys) {
        keys[e.code] = true;
        if (e.code === 'Space') {
          // Fire single laser
          fireLaser();
        }
      }
    };

    const handleKeyUp = (e) => {
      if (e.code in keys) {
        keys[e.code] = false;
      }
    };

    // Mobile inputs bridge
    inputBridgeRef.current.steerStart = (dir) => {
      if (dir === 'left') keys.ArrowLeft = true;
      if (dir === 'right') keys.ArrowRight = true;
    };
    inputBridgeRef.current.steerStop = (dir) => {
      if (dir === 'left') keys.ArrowLeft = false;
      if (dir === 'right') keys.ArrowRight = false;
    };
    inputBridgeRef.current.fire = () => {
      fireLaser();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    const fireLaser = () => {
      lasers.push({
        x: ship.x,
        y: ship.y - 10,
        width: 3,
        height: 15,
        speed: 8
      });
    };

    const spawnAsteroid = () => {
      const size = Math.random() * 20 + 15;
      asteroids.push({
        x: Math.random() * (canvas.width - size * 2) + size,
        y: -size,
        radius: size,
        speed: Math.random() * 1.0 + 0.8,
        color: '#ff3b30' // Red neon asteroids
      });
    };

    const createExplosion = (x, y, color) => {
      for (let i = 0; i < 10; i++) {
        particles.push({
          x,
          y,
          dx: (Math.random() - 0.5) * 5,
          dy: (Math.random() - 0.5) * 5,
          radius: Math.random() * 3 + 1,
          color,
          alpha: 1,
          decay: Math.random() * 0.04 + 0.02
        });
      }
    };

    let spawnTimer = 0;

    const update = () => {
      requestRef.current = requestAnimationFrame(update);

      // Clear Canvas
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Ship controls
      if (keys.ArrowLeft || keys.KeyA) {
        ship.x -= ship.speed;
      }
      if (keys.ArrowRight || keys.KeyD) {
        ship.x += ship.speed;
      }

      // Constrain Ship bounds
      if (ship.x < ship.width) ship.x = ship.width;
      if (ship.x > canvas.width - ship.width) ship.x = canvas.width - ship.width;

      // Spawn Asteroids
      if (++spawnTimer > 90) {
        spawnAsteroid();
        spawnTimer = 0;
      }

      // Draw Ship
      ctx.shadowColor = '#0D6EFD';
      ctx.shadowBlur = 15;
      ctx.fillStyle = '#0D6EFD';
      ctx.beginPath();
      ctx.moveTo(ship.x, ship.y - ship.height / 2);
      ctx.lineTo(ship.x - ship.width / 2, ship.y + ship.height / 2);
      ctx.lineTo(ship.x + ship.width / 2, ship.y + ship.height / 2);
      ctx.closePath();
      ctx.fill();

      // Update & Draw Lasers
      ctx.shadowColor = '#0dcaf0';
      ctx.shadowBlur = 10;
      ctx.fillStyle = '#0dcaf0';
      lasers.forEach((laser, idx) => {
        laser.y -= laser.speed;
        if (laser.y < 0) {
          lasers.splice(idx, 1);
        } else {
          ctx.fillRect(laser.x - laser.width / 2, laser.y, laser.width, laser.height);
        }
      });

      // Update & Draw Asteroids
      asteroids.forEach((ast, astIdx) => {
        ast.y += ast.speed;

        // Border collision (slip past)
        if (ast.y > canvas.height + ast.radius) {
          asteroids.splice(astIdx, 1);
          lives--;
          createExplosion(ast.x, canvas.height - 10, '#ff3b30');
          if (lives <= 0) {
            setGameState('gameover');
            cancelAnimationFrame(requestRef.current);
            updateHighScore('shooter', localScore);
          }
        } else {
          // Check collision with ship
          const dist = Math.hypot(ast.x - ship.x, ast.y - ship.y);
          if (dist < ast.radius + ship.width / 2) {
            asteroids.splice(astIdx, 1);
            createExplosion(ast.x, ast.y, '#ff3b30');
            createExplosion(ship.x, ship.y, '#0D6EFD');
            lives--;
            if (lives <= 0) {
              setGameState('gameover');
              cancelAnimationFrame(requestRef.current);
              updateHighScore('shooter', localScore);
            }
          }

          // Check collision with lasers
          lasers.forEach((laser, lasIdx) => {
            const hit = Math.hypot(ast.x - laser.x, ast.y - laser.y);
            if (hit < ast.radius) {
              // Destroy!
              createExplosion(ast.x, ast.y, '#0dcaf0');
              asteroids.splice(astIdx, 1);
              lasers.splice(lasIdx, 1);
              localScore += 20;
              setScore(localScore);
            }
          });

          // Draw Asteroid
          ctx.shadowColor = ast.color;
          ctx.shadowBlur = 12;
          ctx.strokeStyle = ast.color;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(ast.x, ast.y, ast.radius, 0, Math.PI * 2);
          ctx.stroke();
          ctx.fillStyle = 'rgba(255, 59, 48, 0.05)';
          ctx.fill();
        }
      });

      // Draw Particles
      ctx.shadowBlur = 5;
      particles.forEach((p, idx) => {
        p.x += p.dx;
        p.y += p.dy;
        p.alpha -= p.decay;
        if (p.alpha <= 0) {
          particles.splice(idx, 1);
        } else {
          ctx.shadowColor = p.color;
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      ctx.globalAlpha = 1.0;
      ctx.shadowBlur = 0;

      // Draw lives indicator
      ctx.fillStyle = '#fff';
      ctx.font = '14px sans-serif';
      ctx.fillText(`LIVES: ${'❤️ '.repeat(Math.max(0, lives))}`, 20, 30);
    };

    requestRef.current = requestAnimationFrame(update);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(requestRef.current);
      inputBridgeRef.current.steerStart = null;
      inputBridgeRef.current.steerStop = null;
      inputBridgeRef.current.fire = null;
    };
  };

  // ----------------------------------------------------
  // GAME 3: MEMORY MATRIX (SIMON SAYS)
  // ----------------------------------------------------
  const runMemoryGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let sequence = [];
    let playerSequence = [];
    let level = 1;
    let localScore = 0;

    let pads = [
      { id: 0, x: 100, y: 50, w: 180, h: 130, color: 'rgba(13, 110, 253, 0.25)', activeColor: 'rgba(13, 110, 253, 0.95)', glowColor: '#0D6EFD', label: 'BLUE' },
      { id: 1, x: 320, y: 50, w: 180, h: 130, color: 'rgba(13, 202, 240, 0.25)', activeColor: 'rgba(13, 202, 240, 0.95)', glowColor: '#0dcaf0', label: 'CYAN' },
      { id: 2, x: 100, y: 220, w: 180, h: 130, color: 'rgba(168, 85, 247, 0.25)', activeColor: 'rgba(168, 85, 247, 0.95)', glowColor: '#a855f7', label: 'PURPLE' },
      { id: 3, x: 320, y: 220, w: 180, h: 130, color: 'rgba(34, 197, 94, 0.25)', activeColor: 'rgba(34, 197, 94, 0.95)', glowColor: '#22c55e', label: 'GREEN' }
    ];

    let activePad = null;
    let computerTurn = true;
    let isWaitingForInput = false;

    // Draw grid board
    const drawPads = () => {
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      pads.forEach((pad) => {
        const isActive = activePad === pad.id;
        ctx.shadowColor = isActive ? pad.glowColor : 'rgba(0, 0, 0, 0)';
        ctx.shadowBlur = isActive ? 20 : 0;
        ctx.fillStyle = isActive ? pad.activeColor : pad.color;
        ctx.strokeStyle = isActive ? pad.glowColor : 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = 2;

        // Rounded rect
        ctx.beginPath();
        ctx.roundRect(pad.x, pad.y, pad.w, pad.h, 16);
        ctx.fill();
        ctx.stroke();

        // Label
        ctx.shadowBlur = 0;
        ctx.fillStyle = isActive ? '#fff' : 'rgba(255,255,255,0.3)';
        ctx.font = 'bold 16px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(pad.label, pad.x + pad.w / 2, pad.y + pad.h / 2 + 6);
      });

      // Status text
      ctx.fillStyle = '#fff';
      ctx.font = '14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(
        computerTurn ? 'WATCH SEQUENCE...' : 'YOUR TURN - MATCH PATTERN!',
        canvas.width / 2,
        28
      );
    };

    // Play visual note
    const playNote = (padId, duration = 450) => {
      activePad = padId;
      drawPads();

      // Web Audio Synth for retro sound effect
      if (typeof window !== 'undefined') {
        try {
          const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();

          const freqs = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
          osc.frequency.setValueAtTime(freqs[padId], audioCtx.currentTime);
          osc.type = 'sine';

          gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration / 1000);

          osc.connect(gain);
          gain.connect(audioCtx.destination);

          osc.start();
          osc.stop(audioCtx.currentTime + duration / 1000);
        } catch (err) {
          // Fail silently if audio blocked
        }
      }

      setTimeout(() => {
        activePad = null;
        drawPads();
      }, duration);
    };

    const nextLevel = () => {
      computerTurn = true;
      isWaitingForInput = false;
      playerSequence = [];
      level = sequence.length + 1;

      // Add random pad to sequence
      sequence.push(Math.floor(Math.random() * 4));

      // Play computer sequence
      let idx = 0;
      const playInterval = setInterval(() => {
        playNote(sequence[idx]);
        idx++;
        if (idx >= sequence.length) {
          clearInterval(playInterval);
          setTimeout(() => {
            computerTurn = false;
            isWaitingForInput = true;
            drawPads();
          }, 600);
        }
      }, 900);
    };

    // Mouse and Touch click coordinates detection
    const handleInput = (clientX, clientY) => {
      if (computerTurn || !isWaitingForInput) return;

      const rect = canvas.getBoundingClientRect();
      const mouseX = ((clientX - rect.left) / rect.width) * canvas.width;
      const mouseY = ((clientY - rect.top) / rect.height) * canvas.height;

      // Check which pad was clicked
      pads.forEach((pad) => {
        if (
          mouseX >= pad.x &&
          mouseX <= pad.x + pad.w &&
          mouseY >= pad.y &&
          mouseY <= pad.y + pad.h
        ) {
          // Play click note
          playNote(pad.id, 200);
          playerSequence.push(pad.id);

          // Verify sequence
          const currentStep = playerSequence.length - 1;
          if (playerSequence[currentStep] !== sequence[currentStep]) {
            // Game Over
            setGameState('gameover');
            updateHighScore('memory', localScore);
            return;
          }

          // Check if sequence is complete
          if (playerSequence.length === sequence.length) {
            localScore += level * 10;
            setScore(localScore);
            isWaitingForInput = false;
            setTimeout(nextLevel, 1000);
          }
        }
      });
    };

    const handleCanvasPointer = (e) => {
      e.preventDefault();
      handleInput(e.clientX, e.clientY);
    };

    canvas.addEventListener('pointerdown', handleCanvasPointer);
    drawPads();

    // Start game
    setTimeout(nextLevel, 500);

    return () => {
      canvas.removeEventListener('pointerdown', handleCanvasPointer);
    };
  };

  // ----------------------------------------------------
  // GAME 4: NEON PONG
  // ----------------------------------------------------
  const runPongGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let localScore = 0;
    let lives = 5;
    setScore(0);

    const paddleWidth = 10;
    const paddleHeight = 80;

    let player = {
      x: 30,
      y: canvas.height / 2 - paddleHeight / 2,
      w: paddleWidth,
      h: paddleHeight,
      score: 0,
      dy: 0,
      speed: 8
    };

    let computer = {
      x: canvas.width - 30 - paddleWidth,
      y: canvas.height / 2 - paddleHeight / 2,
      w: paddleWidth,
      h: paddleHeight,
      score: 0,
      speed: 3.2
    };

    let ball = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      radius: 7,
      speed: 3.5,
      dx: 3.5,
      dy: 1.5
    };

    let particles = [];
    const createExplosion = (x, y, color) => {
      for (let i = 0; i < 12; i++) {
        particles.push({
          x,
          y,
          dx: (Math.random() - 0.5) * 6,
          dy: (Math.random() - 0.5) * 6,
          radius: Math.random() * 3 + 1,
          color,
          alpha: 1,
          decay: Math.random() * 0.04 + 0.02
        });
      }
    };

    // Keyboard handlers
    let keys = { ArrowUp: false, ArrowDown: false, KeyW: false, KeyS: false };
    const handleKeyDown = (e) => {
      if (e.code in keys) keys[e.code] = true;
    };
    const handleKeyUp = (e) => {
      if (e.code in keys) keys[e.code] = false;
    };

    // Pointer control inside canvas bounds
    const handlePointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const touchY = ((e.clientY - rect.top) / rect.height) * canvas.height;
      player.y = touchY - player.h / 2;
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    canvas.addEventListener('pointermove', handlePointerMove);

    const update = () => {
      requestRef.current = requestAnimationFrame(update);

      // Clear
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw center line
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 4;
      ctx.setLineDash([15, 15]);
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, 0);
      ctx.lineTo(canvas.width / 2, canvas.height);
      ctx.stroke();
      ctx.setLineDash([]);

      // Move player paddle (key backup to mouse)
      if (keys.ArrowUp || keys.KeyW) player.y -= player.speed;
      if (keys.ArrowDown || keys.KeyS) player.y += player.speed;

      // Restrain paddles
      if (player.y < 10) player.y = 10;
      if (player.y > canvas.height - player.h - 10) player.y = canvas.height - player.h - 10;

      // Simple AI follow ball
      const aiTarget = ball.y - computer.h / 2;
      computer.y += (aiTarget - computer.y) * 0.12;
      if (computer.y < 10) computer.y = 10;
      if (computer.y > canvas.height - computer.h - 10) computer.y = canvas.height - computer.h - 10;

      // Move ball
      ball.x += ball.dx;
      ball.y += ball.dy;

      // Wall bounce
      if (ball.y - ball.radius < 10) {
        ball.y = 10 + ball.radius;
        ball.dy *= -1;
      }
      if (ball.y + ball.radius > canvas.height - 10) {
        ball.y = canvas.height - 10 - ball.radius;
        ball.dy *= -1;
      }

      // Check paddle collisions
      // Player
      if (ball.x - ball.radius < player.x + player.w && ball.x + ball.radius > player.x) {
        if (ball.y > player.y && ball.y < player.y + player.h) {
          ball.x = player.x + player.w + ball.radius;
          ball.dx *= -1.04; // Speed increases with each bounce!
          const relativeY = (ball.y - (player.y + player.h / 2)) / (player.h / 2);
          ball.dy = relativeY * 5;
          createExplosion(ball.x, ball.y, '#0D6EFD');
          localScore += 10;
          setScore(localScore);
        }
      }

      // Computer
      if (ball.x + ball.radius > computer.x && ball.x - ball.radius < computer.x + computer.w) {
        if (ball.y > computer.y && ball.y < computer.y + computer.h) {
          ball.x = computer.x - ball.radius;
          ball.dx *= -1.03;
          const relativeY = (ball.y - (computer.y + computer.h / 2)) / (computer.h / 2);
          ball.dy = relativeY * 5;
          createExplosion(ball.x, ball.y, '#ff5555');
        }
      }

      // Missing ball check
      if (ball.x < 0) {
        // Player missed!
        lives--;
        createExplosion(ball.x + 30, ball.y, '#ff3b30');
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.dx = 3.5;
        ball.dy = (Math.random() - 0.5) * 3;
        if (lives <= 0) {
          setGameState('gameover');
          cancelAnimationFrame(requestRef.current);
          updateHighScore('pong', localScore);
          return;
        }
      } else if (ball.x > canvas.width) {
        // Computer missed!
        createExplosion(ball.x - 30, ball.y, '#22c55e');
        localScore += 25; // Bonus score for passing AI
        setScore(localScore);
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.dx = -3.5;
        ball.dy = (Math.random() - 0.5) * 3;
      }

      // Draw Paddles
      ctx.shadowBlur = 10;
      // Player
      ctx.shadowColor = '#0D6EFD';
      ctx.fillStyle = '#0D6EFD';
      ctx.beginPath();
      ctx.roundRect(player.x, player.y, player.w, player.h, 4);
      ctx.fill();

      // Computer
      ctx.shadowColor = '#ff5555';
      ctx.fillStyle = '#ff5555';
      ctx.beginPath();
      ctx.roundRect(computer.x, computer.y, computer.w, computer.h, 4);
      ctx.fill();

      // Draw Ball
      ctx.shadowColor = '#0dcaf0';
      ctx.fillStyle = '#0dcaf0';
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fill();

      // Debris particles
      ctx.shadowBlur = 5;
      particles.forEach((p, idx) => {
        p.x += p.dx;
        p.y += p.dy;
        p.alpha -= p.decay;
        if (p.alpha <= 0) {
          particles.splice(idx, 1);
        } else {
          ctx.shadowColor = p.color;
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      ctx.globalAlpha = 1.0;
      ctx.shadowBlur = 0;

      // HUD
      ctx.fillStyle = '#fff';
      ctx.font = '14px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(`LIVES: ${'❤️ '.repeat(Math.max(0, lives))}`, 20, 30);

      // Playboard border
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 2;
      ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
    };

    requestRef.current = requestAnimationFrame(update);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
      canvas.removeEventListener('pointermove', handlePointerMove);
      cancelAnimationFrame(requestRef.current);
    };
  };

  // ----------------------------------------------------
  // GAME 5: NOVA STACK (TOWER STACKER)
  // ----------------------------------------------------
  const runStackGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let localScore = 0;
    setScore(0);

    const blockHeight = 25;
    const speedMultiplier = 0.15;

    let stack = [
      { x: 150, y: canvas.height - 50, w: 300, color: '#0D6EFD' } // Base block
    ];

    let currentBlock = {
      x: 0,
      y: canvas.height - 50 - blockHeight,
      w: 300,
      dx: 5,
      color: '#0dcaf0'
    };

    let particles = [];
    const createExplosion = (x, y, w, color) => {
      for (let i = 0; i < 15; i++) {
        particles.push({
          x: x + Math.random() * w,
          y,
          dx: (Math.random() - 0.5) * 5,
          dy: (Math.random() - 0.5) * 5 - 2, // Burst upwards
          radius: Math.random() * 2 + 1,
          color,
          alpha: 1,
          decay: Math.random() * 0.05 + 0.02
        });
      }
    };

    const handleAction = () => {
      const parentBlock = stack[stack.length - 1];

      // Calculate overlap bounds
      const left = Math.max(currentBlock.x, parentBlock.x);
      const right = Math.min(currentBlock.x + currentBlock.w, parentBlock.x + parentBlock.w);
      const overlap = right - left;

      if (overlap <= 0) {
        // Missed completely!
        setGameState('gameover');
        cancelAnimationFrame(requestRef.current);
        updateHighScore('stack', localScore);
        return;
      }

      // Slicing snapping thresholds
      const isPerfect = Math.abs(currentBlock.x - parentBlock.x) < 8;
      let finalX = left;
      let finalW = overlap;

      if (isPerfect) {
        finalX = parentBlock.x;
        finalW = parentBlock.w;
        localScore += 25; // Perfect landing bonus
        createExplosion(finalX, currentBlock.y, finalW, '#22c55e');
      } else {
        localScore += 10;
        // Particle explosion at the sliced side
        createExplosion(currentBlock.x > parentBlock.x ? right : left, currentBlock.y, 8, '#ff3b30');
      }

      // Add to stack list
      stack.push({
        x: finalX,
        y: currentBlock.y,
        w: finalW,
        color: isPerfect ? '#22c55e' : `hsl(${(stack.length * 18) % 360}, 90%, 55%)`
      });

      setScore(localScore);

      // Camera shift down when close to the top
      let cameraOffset = 0;
      if (stack.length > 8) {
        cameraOffset = blockHeight;
        stack.forEach((b) => {
          b.y += blockHeight;
        });
      }

      // Prepare next sliding block
      currentBlock = {
        x: Math.random() * (canvas.width - finalW),
        y: currentBlock.y - blockHeight + cameraOffset,
        w: finalW,
        dx: (Math.random() > 0.5 ? 1 : -1) * (5 + stack.length * speedMultiplier),
        color: `hsl(${((stack.length + 1) * 18) % 360}, 90%, 55%)`
      };
    };

    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        handleAction();
      }
    };

    const handleCanvasPointer = (e) => {
      e.preventDefault();
      handleAction();
    };

    // Mobile inputs bridge
    inputBridgeRef.current.action = () => {
      handleAction();
    };

    document.addEventListener('keydown', handleKeyDown);
    canvas.addEventListener('pointerdown', handleCanvasPointer);

    const update = () => {
      requestRef.current = requestAnimationFrame(update);

      // Clear
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw background design grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)';
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.width; i += 30) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }

      // Move sliding block
      currentBlock.x += currentBlock.dx;
      if (currentBlock.x < 0) {
        currentBlock.x = 0;
        currentBlock.dx *= -1;
      }
      if (currentBlock.x + currentBlock.w > canvas.width) {
        currentBlock.x = canvas.width - currentBlock.w;
        currentBlock.dx *= -1;
      }

      // Cleanup stack elements that scrolled out of view below screen
      if (stack[0].y > canvas.height + 100) {
        stack.shift();
      }

      // Draw Stack
      stack.forEach((block) => {
        ctx.shadowColor = block.color;
        ctx.shadowBlur = 10;
        ctx.fillStyle = block.color;
        ctx.beginPath();
        ctx.roundRect(block.x, block.y, block.w, blockHeight - 2, 4);
        ctx.fill();
      });

      // Draw active sliding block
      ctx.shadowColor = currentBlock.color;
      ctx.shadowBlur = 15;
      ctx.fillStyle = currentBlock.color;
      ctx.beginPath();
      ctx.roundRect(currentBlock.x, currentBlock.y, currentBlock.w, blockHeight - 2, 4);
      ctx.fill();

      // Debris particles
      ctx.shadowBlur = 5;
      particles.forEach((p, idx) => {
        p.x += p.dx;
        p.y += p.dy;
        p.alpha -= p.decay;
        if (p.alpha <= 0) {
          particles.splice(idx, 1);
        } else {
          ctx.shadowColor = p.color;
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      ctx.globalAlpha = 1.0;
      ctx.shadowBlur = 0;
    };

    requestRef.current = requestAnimationFrame(update);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      canvas.removeEventListener('pointerdown', handleCanvasPointer);
      cancelAnimationFrame(requestRef.current);
      inputBridgeRef.current.action = null;
    };
  };

  // ----------------------------------------------------
  // GAME 6: NOVA FLAP (FLAPPY BIRD CLONE)
  // ----------------------------------------------------
  const runFlapGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let localScore = 0;
    setScore(0);

    let bird = {
      x: 80,
      y: 150,
      radius: 12,
      velocity: 0,
      gravity: 0.38,
      jump: -5.8
    };

    let pipes = [];
    const pipeWidth = 50;
    const pipeGap = 150;
    let spawnTimer = 0;

    let particles = [];
    const createExplosion = (x, y, color) => {
      for (let i = 0; i < 15; i++) {
        particles.push({
          x,
          y,
          dx: (Math.random() - 0.5) * 6,
          dy: (Math.random() - 0.5) * 6,
          radius: Math.random() * 3 + 1,
          color,
          alpha: 1,
          decay: Math.random() * 0.05 + 0.02
        });
      }
    };

    const handleAction = () => {
      bird.velocity = bird.jump;
      // Spawn small jump particles
      for (let i = 0; i < 3; i++) {
        particles.push({
          x: bird.x - 8,
          y: bird.y + 6,
          dx: -Math.random() * 3 - 1,
          dy: (Math.random() - 0.5) * 2,
          radius: Math.random() * 2 + 1,
          color: '#0dcaf0',
          alpha: 0.8,
          decay: 0.04
        });
      }
    };

    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        handleAction();
      }
    };

    const handleCanvasPointer = (e) => {
      e.preventDefault();
      handleAction();
    };

    // Mobile inputs bridge
    inputBridgeRef.current.action = () => {
      handleAction();
    };

    document.addEventListener('keydown', handleKeyDown);
    canvas.addEventListener('pointerdown', handleCanvasPointer);

    const spawnPipe = () => {
      const minHeight = 40;
      const maxHeight = canvas.height - pipeGap - minHeight;
      const topHeight = Math.random() * (maxHeight - minHeight) + minHeight;
      const bottomHeight = canvas.height - pipeGap - topHeight;

      pipes.push({
        x: canvas.width,
        topHeight,
        bottomHeight,
        w: pipeWidth,
        passed: false
      });
    };

    const update = () => {
      requestRef.current = requestAnimationFrame(update);

      // Clear
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw background vertical lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.01)';
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.width; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }

      // Physics
      bird.velocity += bird.gravity;
      bird.y += bird.velocity;

      // Bounds check
      if (bird.y - bird.radius < 0 || bird.y + bird.radius > canvas.height) {
        createExplosion(bird.x, bird.y, '#0dcaf0');
        setGameState('gameover');
        cancelAnimationFrame(requestRef.current);
        updateHighScore('flap', localScore);
        return;
      }

      // Spawn pipes
      if (++spawnTimer > 130) {
        spawnPipe();
        spawnTimer = 0;
      }

      // Update and draw pipes
      pipes.forEach((pipe, index) => {
        pipe.x -= 1.8; // Scroll speed

        // Check collision
        if (bird.x + bird.radius > pipe.x && bird.x - bird.radius < pipe.x + pipe.w) {
          if (
            bird.y - bird.radius < pipe.topHeight ||
            bird.y + bird.radius > canvas.height - pipe.bottomHeight
          ) {
            createExplosion(bird.x, bird.y, '#ff3b30');
            setGameState('gameover');
            cancelAnimationFrame(requestRef.current);
            updateHighScore('flap', localScore);
            return;
          }
        }

        // Score increase
        if (!pipe.passed && pipe.x + pipe.w < bird.x) {
          pipe.passed = true;
          localScore += 10;
          setScore(localScore);
        }

        // Draw neon pipes
        ctx.shadowBlur = 10;
        ctx.strokeStyle = '#ff3b30'; // Red neon pipes
        ctx.lineWidth = 2.5;

        // Top Pipe
        ctx.shadowColor = '#ff3b30';
        ctx.fillStyle = 'rgba(255, 59, 48, 0.03)';
        ctx.beginPath();
        ctx.roundRect(pipe.x, -5, pipe.w, pipe.topHeight + 5, [0, 0, 8, 8]);
        ctx.fill();
        ctx.stroke();

        // Bottom Pipe
        ctx.beginPath();
        ctx.roundRect(
          pipe.x,
          canvas.height - pipe.bottomHeight,
          pipe.w,
          pipe.bottomHeight + 5,
          [8, 8, 0, 0]
        );
        ctx.fill();
        ctx.stroke();
      });

      // Remove offscreen pipes
      if (pipes.length > 0 && pipes[0].x < -pipeWidth) {
        pipes.shift();
      }

      // Draw Bird
      ctx.shadowColor = '#0dcaf0';
      ctx.shadowBlur = 15;
      ctx.fillStyle = '#0dcaf0';
      ctx.beginPath();
      ctx.arc(bird.x, bird.y, bird.radius, 0, Math.PI * 2);
      ctx.fill();

      // Debris particles
      ctx.shadowBlur = 5;
      particles.forEach((p, idx) => {
        p.x += p.dx;
        p.y += p.dy;
        p.alpha -= p.decay;
        if (p.alpha <= 0) {
          particles.splice(idx, 1);
        } else {
          ctx.shadowColor = p.color;
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      ctx.globalAlpha = 1.0;
      ctx.shadowBlur = 0;
    };

    requestRef.current = requestAnimationFrame(update);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      canvas.removeEventListener('pointerdown', handleCanvasPointer);
      cancelAnimationFrame(requestRef.current);
      inputBridgeRef.current.action = null;
    };
  };

  // ----------------------------------------------------
  // GAME 7: NOVA BREAKOUT (BRICK BREAKER)
  // ----------------------------------------------------
  const runBreakoutGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let localScore = 0;
    let lives = 5;
    setScore(0);

    const paddleWidth = 110;
    const paddleHeight = 12;

    let paddle = {
      x: canvas.width / 2 - paddleWidth / 2,
      y: canvas.height - 40,
      w: paddleWidth,
      h: paddleHeight,
      speed: 7
    };

    let ball = {
      x: canvas.width / 2,
      y: canvas.height - 70,
      radius: 6,
      dx: 3,
      dy: -3,
      speed: 4.2
    };

    const brickRows = 4;
    const brickCols = 8;
    const brickWidth = 60;
    const brickHeight = 18;
    const brickPadding = 10;
    const brickOffsetTop = 50;
    const brickOffsetLeft = 30;

    let bricks = [];
    const colors = ['#ff3b30', '#a855f7', '#0D6EFD', '#22c55e'];

    for (let c = 0; c < brickCols; c++) {
      bricks[c] = [];
      for (let r = 0; r < brickRows; r++) {
        bricks[c][r] = {
          x: c * (brickWidth + brickPadding) + brickOffsetLeft,
          y: r * (brickHeight + brickPadding) + brickOffsetTop,
          broken: false,
          color: colors[r % colors.length]
        };
      }
    }

    let particles = [];
    const createExplosion = (x, y, color) => {
      for (let i = 0; i < 10; i++) {
        particles.push({
          x,
          y,
          dx: (Math.random() - 0.5) * 6,
          dy: (Math.random() - 0.5) * 6,
          radius: Math.random() * 2.5 + 1,
          color,
          alpha: 1,
          decay: Math.random() * 0.04 + 0.02
        });
      }
    };

    let keys = { ArrowLeft: false, ArrowRight: false, KeyA: false, KeyD: false };
    const handleKeyDown = (e) => {
      if (e.code in keys) keys[e.code] = true;
    };
    const handleKeyUp = (e) => {
      if (e.code in keys) keys[e.code] = false;
    };

    // Pointer control inside canvas bounds
    const handlePointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const touchX = ((e.clientX - rect.left) / rect.width) * canvas.width;
      paddle.x = touchX - paddle.w / 2;
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    canvas.addEventListener('pointermove', handlePointerMove);

    const update = () => {
      requestRef.current = requestAnimationFrame(update);

      // Clear
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (keys.ArrowLeft || keys.KeyA) paddle.x -= paddle.speed;
      if (keys.ArrowRight || keys.KeyD) paddle.x += paddle.speed;

      // Restrain paddle
      if (paddle.x < 15) paddle.x = 15;
      if (paddle.x > canvas.width - paddle.w - 15) paddle.x = canvas.width - paddle.w - 15;

      // Ball Physics
      ball.x += ball.dx;
      ball.y += ball.dy;

      // Wall bounce
      if (ball.x - ball.radius < 15) {
        ball.x = 15 + ball.radius;
        ball.dx *= -1;
      }
      if (ball.x + ball.radius > canvas.width - 15) {
        ball.x = canvas.width - 15 - ball.radius;
        ball.dx *= -1;
      }
      if (ball.y - ball.radius < 15) {
        ball.y = 15 + ball.radius;
        ball.dy *= -1;
      }

      // Bottom wall miss
      if (ball.y > canvas.height) {
        lives--;
        createExplosion(ball.x, canvas.height - 15, '#ff3b30');
        ball.x = canvas.width / 2;
        ball.y = canvas.height - 70;
        ball.dx = 3 * (Math.random() > 0.5 ? 1 : -1);
        ball.dy = -3;

        if (lives <= 0) {
          setGameState('gameover');
          cancelAnimationFrame(requestRef.current);
          updateHighScore('breakout', localScore);
          return;
        }
      }

      // Paddle bounce
      if (
        ball.y + ball.radius >= paddle.y &&
        ball.y - ball.radius <= paddle.y + paddle.h
      ) {
        if (ball.x >= paddle.x && ball.x <= paddle.x + paddle.w) {
          ball.y = paddle.y - ball.radius;
          ball.dy = -Math.abs(ball.dy);
          const hitPos = (ball.x - (paddle.x + paddle.w / 2)) / (paddle.w / 2);
          ball.dx = hitPos * 4.2;
          createExplosion(ball.x, ball.y, '#0D6EFD');
        }
      }

      // Bricks collisions check & drawing
      let remainingBricks = 0;
      for (let c = 0; c < brickCols; c++) {
        for (let r = 0; r < brickRows; r++) {
          const b = bricks[c][r];
          if (!b.broken) {
            remainingBricks++;

            // Draw brick
            ctx.shadowColor = b.color;
            ctx.shadowBlur = 8;
            ctx.fillStyle = b.color;
            ctx.beginPath();
            ctx.roundRect(b.x, b.y, brickWidth, brickHeight, 4);
            ctx.fill();

            // Collision check
            if (
              ball.x + ball.radius >= b.x &&
              ball.x - ball.radius <= b.x + brickWidth &&
              ball.y + ball.radius >= b.y &&
              ball.y - ball.radius <= b.y + brickHeight
            ) {
              b.broken = true;
              ball.dy *= -1;
              localScore += 10;
              setScore(localScore);
              createExplosion(b.x + brickWidth / 2, b.y + brickHeight / 2, b.color);
            }
          }
        }
      }

      if (remainingBricks === 0) {
        for (let c = 0; c < brickCols; c++) {
          for (let r = 0; r < brickRows; r++) {
            bricks[c][r].broken = false;
          }
        }
        ball.dx *= 1.1;
        ball.dy = -Math.abs(ball.dy) * 1.1;
      }

      // Draw Paddle
      ctx.shadowColor = '#0D6EFD';
      ctx.shadowBlur = 12;
      ctx.fillStyle = '#0D6EFD';
      ctx.beginPath();
      ctx.roundRect(paddle.x, paddle.y, paddle.w, paddle.h, 6);
      ctx.fill();

      // Draw Ball
      ctx.shadowColor = '#0dcaf0';
      ctx.shadowBlur = 12;
      ctx.fillStyle = '#0dcaf0';
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fill();

      // Debris particles
      ctx.shadowBlur = 5;
      particles.forEach((p, idx) => {
        p.x += p.dx;
        p.y += p.dy;
        p.alpha -= p.decay;
        if (p.alpha <= 0) {
          particles.splice(idx, 1);
        } else {
          ctx.shadowColor = p.color;
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      ctx.globalAlpha = 1.0;
      ctx.shadowBlur = 0;

      // HUD
      ctx.fillStyle = '#fff';
      ctx.font = '14px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(`LIVES: ${'❤️ '.repeat(Math.max(0, lives))}`, 20, 30);

      // Playboard border
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 2;
      ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
    };

    requestRef.current = requestAnimationFrame(update);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
      canvas.removeEventListener('pointermove', handlePointerMove);
      cancelAnimationFrame(requestRef.current);
    };
  };

  // Launch Active Game Renderer Loop
  useEffect(() => {
    if (gameState === 'playing') {
      if (activeGame === 'snake') {
        return runSnakeGame();
      } else if (activeGame === 'shooter') {
        return runSpaceGame();
      } else if (activeGame === 'memory') {
        return runMemoryGame();
      } else if (activeGame === 'pong') {
        return runPongGame();
      } else if (activeGame === 'stack') {
        return runStackGame();
      } else if (activeGame === 'flap') {
        return runFlapGame();
      } else if (activeGame === 'breakout') {
        return runBreakoutGame();
      }
    }
  }, [gameState, activeGame]);

  const startGame = () => {
    setScore(0);
    setGameState('playing');
  };

  return (
    <div className="relative w-full overflow-x-hidden bg-black">
      <main className="relative z-10 w-full bg-black flex flex-col rounded-b-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-b border-[rgba(255,255,255,0.1)]">
        <Header />
        
        <section className={styles.gamesPage}>
          {/* Background Watermark Logo with Ripple */}
          <div className={styles.logoBackground}>
            <ShaderRipple />
            <img src="/cns-logo.png" alt="Cloud Nova Watermark" className={styles.floatingSpinningLogo} />
          </div>

          <div className={styles.container}>
            {/* Title / Description */}
            <div className={styles.header}>
              <h1 className={styles.title}>Arcade Playground</h1>
              <p className={styles.subtitle}>
                Take a micro-break and challenge your reflexes with our custom-engineered neon browser games. Built completely from scratch using HTML5 Canvas.
              </p>
            </div>

            {/* Dashboard Selector */}
            <div className={styles.gameSelector}>
              <div 
                className={`${styles.selectorCard} ${activeGame === 'snake' ? styles.activeCard : ''}`}
                onClick={() => {
                  setActiveGame('snake');
                  setGameState('idle');
                  setScore(0);
                  setViewMode('play');
                }}
              >
                <div className={styles.cardIcon}>🐍</div>
                <h3 className={styles.cardTitle}>Neon Snake</h3>
                <p className={styles.cardDescription}>
                  Navigate your glowing path, collect data points, and grow larger. Standard speed progression grid snake.
                </p>
              </div>

              <div 
                className={`${styles.selectorCard} ${activeGame === 'shooter' ? styles.activeCard : ''}`}
                onClick={() => {
                  setActiveGame('shooter');
                  setGameState('idle');
                  setScore(0);
                  setViewMode('play');
                }}
              >
                <div className={styles.cardIcon}>🚀</div>
                <h3 className={styles.cardTitle}>Space Defender</h3>
                <p className={styles.cardDescription}>
                  Control your interceptor and blast down falling neon asteroids before they breach the grid perimeter.
                </p>
              </div>

              <div 
                className={`${styles.selectorCard} ${activeGame === 'memory' ? styles.activeCard : ''}`}
                onClick={() => {
                  setActiveGame('memory');
                  setGameState('idle');
                  setScore(0);
                  setViewMode('play');
                }}
              >
                <div className={styles.cardIcon}>🔮</div>
                <h3 className={styles.cardTitle}>Memory Matrix</h3>
                <p className={styles.cardDescription}>
                  Listen to the synth notes, watch the glowing pad sequence, and replicate it step-by-step.
                </p>
              </div>

              <div 
                className={`${styles.selectorCard} ${activeGame === 'pong' ? styles.activeCard : ''}`}
                onClick={() => {
                  setActiveGame('pong');
                  setGameState('idle');
                  setScore(0);
                  setViewMode('play');
                }}
              >
                <div className={styles.cardIcon}>🏓</div>
                <h3 className={styles.cardTitle}>Neon Pong</h3>
                <p className={styles.cardDescription}>
                  Deflect the speeding neon light ball past the AI opponent. Use mouse coordinate tracking.
                </p>
              </div>

              <div 
                className={`${styles.selectorCard} ${activeGame === 'stack' ? styles.activeCard : ''}`}
                onClick={() => {
                  setActiveGame('stack');
                  setGameState('idle');
                  setScore(0);
                  setViewMode('play');
                }}
              >
                <div className={styles.cardIcon}>🧱</div>
                <h3 className={styles.cardTitle}>Nova Stack</h3>
                <p className={styles.cardDescription}>
                  Drop the sliding block directly on top of the pile. Block margins cut off on off-centered drops.
                </p>
              </div>

              <div 
                className={`${styles.selectorCard} ${activeGame === 'flap' ? styles.activeCard : ''}`}
                onClick={() => {
                  setActiveGame('flap');
                  setGameState('idle');
                  setScore(0);
                  setViewMode('play');
                }}
              >
                <div className={styles.cardIcon}>🐦</div>
                <h3 className={styles.cardTitle}>Nova Flap</h3>
                <p className={styles.cardDescription}>
                  Tap space or click to flap upwards. Steer through vertical glowing neon obstacles safely.
                </p>
              </div>

              <div 
                className={`${styles.selectorCard} ${activeGame === 'breakout' ? styles.activeCard : ''}`}
                onClick={() => {
                  setActiveGame('breakout');
                  setGameState('idle');
                  setScore(0);
                  setViewMode('play');
                }}
              >
                <div className={styles.cardIcon}>🧱</div>
                <h3 className={styles.cardTitle}>Nova Breakout</h3>
                <p className={styles.cardDescription}>
                  Use your paddle to bounce the neon ball and smash rows of colorful glowing grid bricks.
                </p>
              </div>
            </div>

            {/* Mobile console mode trigger */}
            <div className={styles.mobileTriggerWrapper}>
              <button 
                className={styles.mobileConsoleTrigger}
                onClick={() => {
                  setViewMode('play');
                  setIsMobileConsoleOpen(true);
                }}
              >
                🎮 Open Mobile Console
              </button>
            </div>

            {/* Game Play Viewport */}
            <div className={`${styles.gameViewport} ${isMobileConsoleOpen ? styles.consoleActive : ''}`}>
              {isMobileConsoleOpen && (
                <div className={styles.consoleHeader}>
                  <span className={styles.consoleTitle}>CNS Arcade Handheld</span>
                  <button className={styles.exitConsoleBtn} onClick={() => setIsMobileConsoleOpen(false)}>
                    ✕ Close Console
                  </button>
                </div>
              )}
              <div className={styles.gameHeader}>
                <h2 className={styles.gameName}>
                  {activeGame === 'snake' && 'Neon Snake'}
                  {activeGame === 'shooter' && 'Space Defender'}
                  {activeGame === 'memory' && 'Memory Matrix'}
                  {activeGame === 'pong' && 'Neon Pong'}
                  {activeGame === 'stack' && 'Nova Stack'}
                  {activeGame === 'flap' && 'Nova Flap'}
                  {activeGame === 'breakout' && 'Nova Breakout'}
                </h2>

                {/* Tab selector for Play / View Source Code */}
                <div className={styles.tabContainer}>
                  <button 
                    className={`${styles.tabButton} ${viewMode === 'play' ? styles.activeTab : ''}`}
                    onClick={() => setViewMode('play')}
                  >
                    Play Game
                  </button>
                  <button 
                    className={`${styles.tabButton} ${viewMode === 'code' ? styles.activeTab : ''}`}
                    onClick={() => setViewMode('code')}
                  >
                    View Code
                  </button>
                </div>
                
                <div className={styles.scoreBoard}>
                  <div className={styles.scoreItem}>
                    <span className={styles.scoreLabel}>Score</span>
                    <span className={styles.scoreValue}>{score}</span>
                  </div>
                  <div className={styles.scoreItem}>
                    <span className={styles.scoreLabel}>High Score</span>
                    <span className={styles.highScoreValue}>{highScore[activeGame] || 0}</span>
                  </div>
                </div>
              </div>

              {/* Core Viewport Content (Canvas or Code Block) */}
              {viewMode === 'play' ? (
                <div className={styles.canvasContainer}>
                  {gameState === 'idle' && (
                    <div className={styles.screenOverlay}>
                      <Gamepad2 className="w-16 h-16 text-[#0dcaf0] animate-pulse" />
                      <h3 className={styles.startTitle}>Ready to Play?</h3>
                      <p className={styles.overlayText}>
                        {activeGame === 'snake' && 'Use Arrow Keys or WASD to navigate. Don\'t hit your own tail or cross yourself!'}
                        {activeGame === 'shooter' && 'Use Left/Right arrows (or A/D) to steer your ship. Press Space to fire lasers!'}
                        {activeGame === 'memory' && 'Watch the glowing patterns and listen to the synth notes, then click the correct sequence of pads.'}
                        {activeGame === 'pong' && 'Move your mouse inside the game canvas to steer your paddle up and down. Deflect the ball!'}
                        {activeGame === 'stack' && 'Press Spacebar or click the canvas to drop the sliding block. Align it perfectly!'}
                        {activeGame === 'flap' && 'Press Spacebar or click your mouse to flap upwards. Don\'t crash into columns or bounds!'}
                        {activeGame === 'breakout' && 'Move your mouse cursor inside the canvas bounds to steer the paddle. Bounce the ball and smash bricks!'}
                      </p>
                      <button className={styles.btnPrimary} onClick={startGame}>
                        <Play className="w-4 h-4 inline mr-2" /> Start Game
                      </button>
                    </div>
                  )}

                  {gameState === 'gameover' && (
                    <div className={styles.screenOverlay}>
                      <h3 className={styles.overlayTitle}>Game Over</h3>
                      <p className={styles.overlayText}>
                        Your final score: <strong className="text-[#0dcaf0]">{score}</strong>. 
                        {score >= (highScore[activeGame] || 0) && score > 0 ? " 🎉 New High Score!" : ""}
                      </p>
                      <button className={styles.btnPrimary} onClick={startGame}>
                        <RotateCcw className="w-4 h-4 inline mr-2" /> Try Again
                      </button>
                    </div>
                  )}

                  <canvas 
                    ref={canvasRef}
                    width={600}
                    height={400}
                    className={styles.gameCanvas}
                  />
                </div>
              ) : (
                <div className={styles.codeContainer}>
                  <div className={styles.codeHeader}>
                    <span className={styles.codeLang}>JavaScript (Canvas loop)</span>
                    <button 
                      className={styles.copyButton}
                      onClick={() => {
                        navigator.clipboard.writeText(GAME_CODES[activeGame]);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }}
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-green-500" /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" /> Copy Code
                        </>
                      )}
                    </button>
                  </div>
                  <pre className={styles.codeBlock}>
                    <code>{GAME_CODES[activeGame]}</code>
                  </pre>
                </div>
              )}

              {/* On-screen virtual controller for mobile viewports */}
              {viewMode === 'play' && gameState === 'playing' && (
                <div className={styles.mobileController}>
                  {activeGame === 'snake' && (
                    <div className={styles.dpadContainer}>
                      <button 
                        className={styles.ctrlBtn}
                        onClick={() => inputBridgeRef.current.move?.('up')}
                        onTouchStart={(e) => { e.preventDefault(); inputBridgeRef.current.move?.('up'); }}
                      >
                        ↑
                      </button>
                      <div className="flex gap-4 my-1">
                        <button 
                          className={styles.ctrlBtn}
                          onClick={() => inputBridgeRef.current.move?.('left')}
                          onTouchStart={(e) => { e.preventDefault(); inputBridgeRef.current.move?.('left'); }}
                        >
                          ←
                        </button>
                        <button 
                          className={styles.ctrlBtn}
                          onClick={() => inputBridgeRef.current.move?.('right')}
                          onTouchStart={(e) => { e.preventDefault(); inputBridgeRef.current.move?.('right'); }}
                        >
                          →
                        </button>
                      </div>
                      <button 
                        className={styles.ctrlBtn}
                        onClick={() => inputBridgeRef.current.move?.('down')}
                        onTouchStart={(e) => { e.preventDefault(); inputBridgeRef.current.move?.('down'); }}
                      >
                        ↓
                      </button>
                    </div>
                  )}

                  {activeGame === 'shooter' && (
                    <div className={styles.shooterControls}>
                      <div className="flex gap-4">
                        <button 
                          className={styles.ctrlBtn}
                          onMouseDown={() => inputBridgeRef.current.steerStart?.('left')}
                          onMouseUp={() => inputBridgeRef.current.steerStop?.('left')}
                          onTouchStart={(e) => { e.preventDefault(); inputBridgeRef.current.steerStart?.('left'); }}
                          onTouchEnd={(e) => { e.preventDefault(); inputBridgeRef.current.steerStop?.('left'); }}
                        >
                          ←
                        </button>
                        <button 
                          className={styles.ctrlBtn}
                          onMouseDown={() => inputBridgeRef.current.steerStart?.('right')}
                          onMouseUp={() => inputBridgeRef.current.steerStop?.('right')}
                          onTouchStart={(e) => { e.preventDefault(); inputBridgeRef.current.steerStart?.('right'); }}
                          onTouchEnd={(e) => { e.preventDefault(); inputBridgeRef.current.steerStop?.('right'); }}
                        >
                          →
                        </button>
                      </div>
                      <button 
                        className={styles.actionBtn}
                        onClick={() => inputBridgeRef.current.fire?.()}
                        onTouchStart={(e) => { e.preventDefault(); inputBridgeRef.current.fire?.(); }}
                      >
                        FIRE
                      </button>
                    </div>
                  )}

                  {(activeGame === 'stack' || activeGame === 'flap') && (
                    <button 
                      className={styles.largeActionBtn}
                      onClick={() => inputBridgeRef.current.action?.()}
                      onTouchStart={(e) => { e.preventDefault(); inputBridgeRef.current.action?.(); }}
                    >
                      {activeGame === 'stack' ? 'DROP BLOCK' : 'FLAP / JUMP'}
                    </button>
                  )}
                </div>
              )}

              {/* User Instructions Info Panel */}
              <div className={styles.controlsInfo}>
                <Keyboard className="w-4 h-4 text-zinc-500" />
                {activeGame === 'snake' && (
                  <span>Controls: <span className={styles.keyCap}>↑</span> <span className={styles.keyCap}>↓</span> <span className={styles.keyCap}>←</span> <span className={styles.keyCap}>→</span> or <span className={styles.keyCap}>WASD</span></span>
                )}
                {activeGame === 'shooter' && (
                  <span>Controls: <span className={styles.keyCap}>←</span> <span className={styles.keyCap}>→</span> or <span className={styles.keyCap}>A / D</span> to steer, <span className={styles.keyCap}>Space</span> to fire lasers</span>
                )}
                {activeGame === 'memory' && (
                  <span>Controls: Use your <span className={styles.keyCap}>Mouse Click</span> to tap the glowing pads in order</span>
                )}
                {activeGame === 'pong' && (
                  <span>Controls: Move your <span className={styles.keyCap}>Mouse cursor</span> vertically inside the canvas to steer paddle</span>
                )}
                {activeGame === 'stack' && (
                  <span>Controls: Press <span className={styles.keyCap}>Spacebar</span> or click <span className={styles.keyCap}>Mouse Left Click</span> to align and stack blocks</span>
                )}
                {activeGame === 'flap' && (
                  <span>Controls: Press <span className={styles.keyCap}>Spacebar</span> or click <span className={styles.keyCap}>Mouse Left Click</span> to flap upwards</span>
                )}
                {activeGame === 'breakout' && (
                  <span>Controls: Move your <span className={styles.keyCap}>Mouse cursor</span> horizontally inside the canvas to steer paddle</span>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <CinematicFooter />
      <FloatingWhatsApp />
    </div>
  );
}
