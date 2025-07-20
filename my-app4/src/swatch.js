import React, { useState } from 'react';

const SwatchManager = ({ currentColor, onSelect }) => {
  const [swatches, setSwatches] = useState([
    { r: 255, g: 0, b: 0 }, { r: 255, g: 255, b: 0 },
    { r: 0, g: 255, b: 0 }, { r: 0, g: 255, b: 255 },
    { r: 0, g: 0, b: 255 }, { r: 255, g: 0, b: 255 },]);

  // Check if swatch (as RGB object) is already in the list
  const isDuplicate = (color) =>
    swatches.some(
      (c) => c.r === color.r && c.g === color.g && c.b === color.b
    );

  const addSwatch = () => {
    if (!isDuplicate(currentColor)) {
      setSwatches([...swatches, currentColor]);
    }
  };

  const toCssRgb = ({ r, g, b }) => `rgb(${r}, ${g}, ${b})`;

  return (
    <div>
      <h2>
      <button onClick={addSwatch} style={styles.button}>
        ➕ Add to Favorites
      </button>
      </h2>

      {swatches.length > 0 && (
        <div style={styles.swatchList}>
          {swatches.map((color, idx) => (
            <div
              key={idx}
              title={toCssRgb(color)}
              style={{ ...styles.swatch, backgroundColor: toCssRgb(color) }}
              onClick={() => {
                onSelect?.(color);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  button: {
    padding: '6px 12px',
    borderRadius: '4px',
    background: '#444',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    marginBottom: 12,
  },
  swatchList: {
    display: 'flex',
    gap: 10,
    flexWrap: 'wrap',
  },
  swatch: {
    width: 32,
    height: 32,
    borderRadius: 4,
    border: '1px solid #ccc',
    cursor: 'pointer',
  },
};

export default SwatchManager;
