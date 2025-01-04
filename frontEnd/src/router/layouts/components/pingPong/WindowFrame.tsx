interface WindowFrameProps{
  children: React.ReactNode;
}

const WindowFrame = ({ children } : WindowFrameProps) => {
  return (
    <div className="window-frame">
      <div className="window-controls">
      </div>
      {children}
    </div>
  );
};

export default WindowFrame;