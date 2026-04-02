export default function TestLoading() {
  return (
    <div className="loading-container">
      <div className="loading-dots">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={`top-${i}`} className="dot" style={{ "--i": i } as React.CSSProperties} />
        ))}
      </div>

      <p className="loading-text">L o a d i n g . . .</p>

      <div className="loading-dots">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={`bot-${i}`} className="dot" style={{ "--i": i } as React.CSSProperties} />
        ))}
      </div>

      <style>{`
        .loading-container {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          background: radial-gradient(ellipse at center, #1a0a2e 0%, #0d0015 60%, #000000 100%);
        }

        .loading-dots {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .dot {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #ff2d95;
          animation: glow-pulse 2s ease-in-out infinite;
          animation-delay: calc(var(--i) * 0.12s);
          box-shadow:
            0 0 6px #ff2d95,
            0 0 15px #ff2d95,
            0 0 30px #ff2d95aa,
            0 0 60px #ff2d9566;
        }

        .loading-text {
          font-size: 1.25rem;
          letter-spacing: 0.35em;
          color: #ff8ecf;
          text-shadow:
            0 0 8px #ff2d95,
            0 0 20px #ff2d95aa,
            0 0 40px #ff2d9555;
          animation: text-flicker 3s ease-in-out infinite;
        }

        @keyframes glow-pulse {
          0%, 100% {
            transform: scale(0.3);
            opacity: 0.25;
            box-shadow:
              0 0 4px #ff2d9544,
              0 0 8px #ff2d9522;
          }
          50% {
            transform: scale(1);
            opacity: 1;
            box-shadow:
              0 0 8px #ff2d95,
              0 0 20px #ff2d95,
              0 0 40px #ff2d95aa,
              0 0 80px #ff2d9566;
          }
        }

        @keyframes text-flicker {
          0%, 100% {
            opacity: 0.7;
            text-shadow:
              0 0 8px #ff2d9566,
              0 0 20px #ff2d9533;
          }
          50% {
            opacity: 1;
            text-shadow:
              0 0 8px #ff2d95,
              0 0 20px #ff2d95aa,
              0 0 40px #ff2d9555;
          }
        }
      `}</style>
    </div>
  );
}
