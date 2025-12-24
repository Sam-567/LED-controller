import React, { useState } from 'react';
import HueSaturationBrightnessPicker from './HueSaturationBrightnessPicker';
import SwatchManager from './swatch.js';
import styles from './styles.js';


const BlinkUI = () => {
  const [swatches, setSwatches] = useState([
    { r: 255, g: 0, b: 0 }, { r: 255, g: 255, b: 0 },
    { r: 0, g: 255, b: 0 }, { r: 0, g: 255, b: 255 },
    { r: 0, g: 0, b: 255 }, { r: 255, g: 0, b: 255 },]);

  const isDuplicate = (color) =>
    swatches.some(
    (c) => c.r === color.r && c.g === color.g && c.b === color.b
    );

  const addSwatch = () => {
    if (!isDuplicate(color)) {
    setSwatches([...swatches, color]);
    }
  };

  const [color, setColor] = useState({ r: 200, g: 100, b: 100 });

  return (
    <div>
        <div style={{ display: 'flex', justify_content: 'center' , alignItems: 'flex-start', gap: 10 }}>
            <SwatchManager
            currentColor={color}
            onSelect={setColor}
            swatches={swatches}
            addSwatch={addSwatch}
            />
            <div style={{ width: 200 }} />
            <HueSaturationBrightnessPicker rgb={color} setRgb={setColor}/>
            <div
              key={0}
              title={`rgb(255,255,0)`}
              style={{ ...sty.swatchNoClick, backgroundColor: `rgb(255,255,0)` }}
            />
            <div>
                <h2> Selected colours </h2>
            </div>
        </div>
        <h1 style={{ marginTop: 20 }}> Effects </h1>
        {/* Blink, twinkle, stripe, solid, rainbow */}
        <button style={styles.button}> Blink </button>
        <button style={styles.button}> Twinkle </button>
        <button style={styles.button}> Solid </button>
        <button style={styles.button}> Rainbow </button>
        <button style={styles.button}> Sound reactive </button>

        <h1 style={{ marginTop: 20 }}> Patterns </h1>
        <button style={styles.button}> Striped </button>
        <button style={styles.button}> Spots </button>
        <br/>
    </div>

      
  )
}

const sty = {
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
  swatchNoClick: {
    width: 32,
    height: 32,
    borderRadius: 4,
    border: '1px solid #ccc',
    //cursor: 'pointer',
  },
};

export default BlinkUI;