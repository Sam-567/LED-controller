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
  const [showPicker, setShowPicker] = useState(false);
  

  return (
    <div>
        {showPicker &&
        // Modal
        <div style={sty.overlay} onClick={() => setShowPicker(false)}>
        <div style={{ margin: 'auto', padding: 20, background: 'white', borderRadius: 8 }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justify_content: 'center' , alignItems: 'flex-start', gap: 10 }}>
            <SwatchManager
            currentColor={color}
            onSelect={setColor}
            swatches={swatches}
            addSwatch={addSwatch}
            />
            <HueSaturationBrightnessPicker rgb={color} setRgb={setColor}/>
        </div>
            <button style={styles.button} onClick={() => setShowPicker(false)}>
                Select color
            </button>
        </div>
        </div>}
        
        <div style={{ display: 'flex', justify_content: 'center' , alignItems: 'flex-start', gap: 10 }}>
            <div
              style={{
              width: 80,
              height: 80,
              borderRadius: 8,
              border: '1px solid #ccc',
              background: 'rgba(255, 136, 0, 1)'
              }}
              onClick ={() => setShowPicker(true)}
            >
                Primary Color 
            </div>
            <div
              style={{
              width: 80,
              height: 80,
              borderRadius: 8,
              border: '1px solid #ccc',
              background: 'rgba(43, 255, 0, 1)',
              }}
              onClick ={() => setShowPicker(true)}
            >
                Secondary Color 
            </div>
        </div>

        <div>
            <h1 style={{ marginTop: 20 }}> Effects </h1>
            {/* Blink, twinkle, stripe, solid, rainbow */}
            <button style={styles.button}> Blink </button>
            <button style={styles.button}> Twinkle </button>
            <button style={styles.button}> Solid </button>
            <button style={styles.button}> Rainbow </button>
            <button style={styles.button}> Sound reactive </button>
        </div>

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
  overlay: {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(6, 3, 3, 0.5)',
  display: 'flex',
  align_items: 'flex_end',
  z_index: 1000,
  animation: 'slideUp 0.3s ease',
}
};

export default BlinkUI;