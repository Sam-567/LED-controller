import React, { useRef, useEffect } from 'react';

const LedGrid = ({
  rows = 20,
  cols = 6,
  currentColor,
  grid,
  setGrid,
  program,
}) => {
  const blankColor = { r: 0, g: 0, b: 0 };

  const isPainting = useRef(false);

  const toCssRgb = ({ r, g, b }) => `rgb(${r}, ${g}, ${b})`;

  const paintCell = (row, col, color = currentColor) => {
    setGrid(prev =>
      prev.map((r, rIdx) =>
        r.map((cell, cIdx) =>
          rIdx === row && cIdx === col ? color : cell
        )
      )
    );
  };

  const handleMouseDown = (row, col) => {
    isPainting.current = true;
    paintCell(row, col);
  };

  const handleMouseEnter = (row, col) => {
    if (isPainting.current) {
      paintCell(row, col);
    }
  };

  const handleMouseUp = () => {
    isPainting.current = false;
  };

  const gridRef = useRef(null);
  const currentColorRef = useRef(currentColor);

  useEffect(() => {
    currentColorRef.current = currentColor;
  }, [currentColor]);

  useEffect(() => {
    const handleTouchMove = (e) => {
      if (!isPainting.current) return;

      const touch = e.touches[0];
      const target = document.elementFromPoint(touch.clientX, touch.clientY);
      if (gridRef.current?.contains(target)) {
        const row = target?.dataset?.row;
        const col = target?.dataset?.col;
        if (row && col) {
          paintCell(parseInt(row), parseInt(col), currentColorRef.current);
        }
      }
    };

    const handleTouchEnd = () => {
      isPainting.current = false;
    };

    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [grid, currentColor, paintCell]);

  const handleTouchStart = (row, col) => {
    isPainting.current = true;
    paintCell(row, col);
  };

  const handleReset = () => {
    setGrid(Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => blankColor)
    ));
  };

  const handleFill = () => {
    setGrid(Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => currentColor)
    ));
  };

  return (
    <div
      style={{ textAlign: 'center', marginTop: '2px' }}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div ref={gridRef} style={styles.grid}>
        {grid.map((row, rowIndex) =>
          row.map((led, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              data-row={rowIndex}
              data-col={colIndex}
              style={{
                ...styles.led,
                backgroundColor: toCssRgb(led),
              }}
              onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
              onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
              onTouchStart={() => handleTouchStart(rowIndex, colIndex)}
            />
          ))
        )}
      </div>

      <div style={styles.controls}>
        <button onClick={handleReset} style={styles.button}>🔄 Reset</button>
        <button onClick={handleFill} style={styles.button}>🎨 Fill All</button>
        <button onClick={program} style={styles.button}> Program </button>
      </div>
    </div>
  );
};

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: `repeat(6, 30px)`,
    gap: '6px',
    justifyContent: 'center',
    marginBottom: '16px',
    userSelect: 'none',
  },
  led: {
    width: 30,
    height: 30,
    borderRadius: 4,
    border: '1px solid #aaa',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    touchAction: 'none',
  },
  controls: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    marginTop: '12px',
  },
  button: {
    padding: '8px 16px',
    borderRadius: '4px',
    background: '#444',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
  },
};

export default LedGrid;

