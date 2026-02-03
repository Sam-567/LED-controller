import React, { useState } from 'react';

const SwatchManager = ({ currentColor, onSelect, swatches, addSwatch }) => {

  const toCssRgb = ({ r, g, b }) => `rgb(${r}, ${g}, ${b})`;

  return (
    <div styles={{marginTop: '20px'}}>
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
    width: 230,
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
