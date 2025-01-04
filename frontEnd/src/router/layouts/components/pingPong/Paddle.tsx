interface PaddleProps {
  position: number;
  side: string;
}

const Paddle = ({ position, side }: PaddleProps) => {
  return (
    <div
      className="paddle"
      style={{
        top: `${position}px`,
        left: side === 'left' ? '20px' : 'calc(100% - 30px)',
      }}
    />
  );
};

export default Paddle;