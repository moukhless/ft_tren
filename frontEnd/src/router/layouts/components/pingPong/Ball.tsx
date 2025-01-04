interface BallProps {
  position: {
    x: number;
    y: number;
  };
}

const Ball = ({ position }: BallProps) => {
  return (
    <div
      className="ball"
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
      }}
    />
  );
};

export default Ball;