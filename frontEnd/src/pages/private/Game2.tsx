import React, { useRef, useEffect, useState } from "react";

const Game: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameId = useRef<number>();
  const keysRef = useRef<Record<string, boolean>>({});
  const [keys, setKeys] = useState<Record<string, boolean>>({});

  const canvasWidth = 800;
  const canvasHeight = 500;
  const playerWidth = 40;
  const playerHeight = 40;
  const rotationSpeed = 3; // degrees per frame
  const moveSpeed = 5;

  // Ball properties
  const ball = useRef({
    x: canvasWidth / 2,
    y: canvasHeight / 2,
    radius: 10,
    speedX: 0,
    speedY: 0,
    attachedTo: null as "player1" | "player2" | null,
  });

  const player1 = useRef({
    x: 50,
    y: canvasHeight / 2 - playerHeight / 2,
    angle: 0,
    speed: moveSpeed
  });

  const player2 = useRef({
    x: canvasWidth - 70,
    y: canvasHeight / 2 - playerHeight / 2,
    angle: 180,
    speed: moveSpeed
  });

  const handleKeyDown = (e: KeyboardEvent) => {
    keysRef.current = { ...keysRef.current, [e.key]: true };
    setKeys(keysRef.current);
    e.preventDefault();
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    keysRef.current = { ...keysRef.current, [e.key]: false };
    setKeys(keysRef.current);
    e.preventDefault();
  };

  const movePlayer = (
    player: { x: number; y: number; angle: number; speed: number },
    forward: boolean,
    rotate: number,
    bounds: { minX: number; maxX: number; minY: number; maxY: number }
  ) => {
    // Update angle
    const newAngle = (player.angle + rotate + 360) % 360;

    // Calculate movement based on angle if moving forward
    let dx = 0;
    let dy = 0;
    if (forward) {
      const radians = (newAngle * Math.PI) / 180;
      dx = Math.cos(radians) * player.speed;
      dy = Math.sin(radians) * player.speed;
    }

    // Apply movement within bounds
    const newX = Math.max(bounds.minX, Math.min(bounds.maxX, player.x + dx));
    const newY = Math.max(bounds.minY, Math.min(bounds.maxY, player.y + dy));

    return { x: newX, y: newY, angle: newAngle };
  };

  const drawPlayer = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    angle: number,
    color: string
  ) => {
    ctx.save();
    ctx.translate(x + playerWidth / 2, y + playerHeight / 2);
    ctx.rotate((angle * Math.PI) / 180);

    // Draw the main body
    ctx.fillStyle = color;
    ctx.fillRect(
      -playerWidth / 2,
      -playerHeight / 2,
      playerWidth,
      playerHeight
    );

    // Draw a triangle to indicate direction
    ctx.beginPath();
    ctx.moveTo(playerWidth / 2, 0);
    ctx.lineTo(playerWidth / 2 + 10, -10);
    ctx.lineTo(playerWidth / 2 + 10, 10);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  };

  const drawBall = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number,
    color: string
  ) => {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
  };

  const checkCollision = (
    ball: { x: number; y: number; radius: number },
    player: { x: number; y: number }
  ) => {
    const playerCenterX = player.x + playerWidth / 2;
    const playerCenterY = player.y + playerHeight / 2;

    const distance = Math.sqrt(
      Math.pow(ball.x - playerCenterX, 2) + Math.pow(ball.y - playerCenterY, 2)
    );

    return distance < ball.radius + Math.min(playerWidth, playerHeight) / 2;
  };

  const shootBall = (player: { angle: number }) => {
    const shootSpeed = 12;
    const radians = (player.angle * Math.PI) / 180;
    ball.current.speedX = Math.cos(radians) * shootSpeed;
    ball.current.speedY = Math.sin(radians) * shootSpeed;
    ball.current.attachedTo = null;
  };

  const betweenPlayers = (
    player1: { angle: number },
    player2: { angle: number }
  ) => {
    const shootSpeed = 20;
    const radians = (((player1.angle + player2.angle) / 2) * Math.PI) / 180;
    ball.current.speedX = Math.cos(radians) * shootSpeed;
    ball.current.speedY = Math.sin(radians) * shootSpeed;
    ball.current.attachedTo = null;
  };

  const getBallPositionForPlayer = (
    player: { x: number; y: number; angle: number },
    offsetDistance: number
  ) => {
    const radians = (player.angle * Math.PI) / 180;
    const ballX = player.x + playerWidth / 2 + Math.cos(radians) * offsetDistance;
    const ballY = player.y + playerHeight / 2 + Math.sin(radians) * offsetDistance;
    return { x: ballX, y: ballY };
  };

  const updateBall = () => {
    const ballData = ball.current;

    // Handle ball shooting
    if (ballData.attachedTo === "player1" && keysRef.current[" "]) {
        shootBall(player1.current);
        player1.current.speed = 5;
    } else if (ballData.attachedTo === "player2" && keysRef.current["Enter"]) {
        shootBall(player2.current);
        player2.current.speed = 5;
    }

    // Check if ball reaches the goal area
    const goalHeightStart = canvasHeight / 2 - 50;
    const goalHeightEnd = canvasHeight / 2 + 50;

    if (
      ballData.x - ballData.radius <= 0 &&
      ballData.y >= goalHeightStart &&
      ballData.y <= goalHeightEnd
    ) {
      // Player 2 scores
      resetGame();
      return;
    } else if (
      ballData.x + ballData.radius >= canvasWidth &&
      ballData.y >= goalHeightStart &&
      ballData.y <= goalHeightEnd
    ) {
      // Player 1 scores
      resetGame();
      return;
    }

    // If the ball is attached to a player, follow the player
    if (ballData.attachedTo === "player1") {
      if (checkCollision(ballData, player2.current)) {
        betweenPlayers(player1.current, player2.current);
        player1.current.speed = 5;
        player2.current.speed = 5;
      } else {
        player1.current.speed = 3;
        const ballPosition = getBallPositionForPlayer(player1.current, 30);
        ballData.x = ballPosition.x;
        ballData.y = ballPosition.y;
      }
    } else if (ballData.attachedTo === "player2") {
      if (checkCollision(ballData, player1.current)) {
        betweenPlayers(player1.current, player2.current);
        player1.current.speed = 5;
        player2.current.speed = 5;
    } else {
        player2.current.speed = 3;
        const ballPosition = getBallPositionForPlayer(player2.current, 30);
        ballData.x = ballPosition.x;
        ballData.y = ballPosition.y;
      }
    } else {
      // Update ball position independently
      ballData.x += ballData.speedX;
      ballData.y += ballData.speedY;

      // Add slight deceleration
      ballData.speedX *= 0.995;
      ballData.speedY *= 0.995;

      // Check for collision with canvas boundaries
      if (
        ballData.x - ballData.radius <= 0 ||
        ballData.x + ballData.radius >= canvasWidth
      ) {
        ballData.speedX *= -0.8;
        ballData.x = Math.max(
          ballData.radius,
          Math.min(canvasWidth - ballData.radius, ballData.x)
        );
      }
      if (
        ballData.y - ballData.radius <= 0 ||
        ballData.y + ballData.radius >= canvasHeight
      ) {
        ballData.speedY *= -0.8;
        ballData.y = Math.max(
          ballData.radius,
          Math.min(canvasHeight - ballData.radius, ballData.y)
        );
      }

      // Check for collision with players
      if (checkCollision(ballData, player1.current)) {
        ballData.attachedTo = "player1";
      } else if (checkCollision(ballData, player2.current)) {
        ballData.attachedTo = "player2";
      }
    }
  };

  // Reset game state
  const resetGame = () => {
    ball.current = {
      x: canvasWidth / 2,
      y: canvasHeight / 2,
      radius: 10,
      speedX: 0,
      speedY: 0,
      attachedTo: null,
    };

    player1.current = {
      x: 50,
      y: canvasHeight / 2 - playerHeight / 2,
      angle: 0,
      speed: moveSpeed,
    };

    player2.current = {
      x: canvasWidth - 70,
      y: canvasHeight / 2 - playerHeight / 2,
      angle: 180,
      speed: moveSpeed,
    };
  };

  const updateGame = () => {
    // Player 1 controls (W moves forward, A/D rotate)
    const p1Forward = keysRef.current["w"];
    let p1Rotate = 0;
    if (keysRef.current["a"]) p1Rotate -= rotationSpeed;
    if (keysRef.current["d"]) p1Rotate += rotationSpeed;

    // Player 2 controls (Up Arrow moves forward, Left/Right Arrows rotate)
    const p2Forward = keysRef.current["ArrowUp"];
    let p2Rotate = 0;
    if (keysRef.current["ArrowLeft"]) p2Rotate -= rotationSpeed;
    if (keysRef.current["ArrowRight"]) p2Rotate += rotationSpeed;

    const bounds = {
      minX: 0,
      maxX: canvasWidth - playerWidth,
      minY: 0,
      maxY: canvasHeight - playerHeight,
    };

    // Update player positions and angles
    const newPos1 = movePlayer(player1.current, p1Forward, p1Rotate, bounds);
    const newPos2 = movePlayer(player2.current, p2Forward, p2Rotate, bounds);

    player1.current = { ...player1.current, ...newPos1 };
    player2.current = { ...player2.current, ...newPos2 };

    // Update ball position
    updateBall();
  };

  const renderGame = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Draw goals
    const goalHeightStart = canvasHeight / 2 - 50;
    const goalHeightEnd = canvasHeight / 2 + 50;
    const goalWidth = 10;

    // Left goal
    ctx.fillStyle = "yellow";
    ctx.fillRect(
      0,
      goalHeightStart,
      goalWidth,
      goalHeightEnd - goalHeightStart
    );

    // Right goal
    ctx.fillRect(
      canvasWidth - goalWidth,
      goalHeightStart,
      goalWidth,
      goalHeightEnd - goalHeightStart
    );

    // Draw players
    drawPlayer(
      ctx,
      player1.current.x,
      player1.current.y,
      player1.current.angle,
      "#f00"
    );
    drawPlayer(
      ctx,
      player2.current.x,
      player2.current.y,
      player2.current.angle,
      "#00f"
    );

    // Draw the ball
    drawBall(ctx, ball.current.x, ball.current.y, ball.current.radius, "#fff");
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const gameLoop = () => {
      updateGame();
      renderGame(ctx);
      animationFrameId.current = requestAnimationFrame(gameLoop);
    };

    animationFrameId.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={canvasWidth}
      height={canvasHeight}
      style={{ border: "1px solid #fff" }}
    />
  );
};

export default Game;
