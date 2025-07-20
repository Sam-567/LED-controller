// HueSaturationBrightnessPicker.js
import React, { useState } from 'react';
import { RgbColorPicker } from 'react-colorful';
import chroma from 'chroma-js';
import './HueSaturationBrightnessPicker.css';
import SwatchManager from './swatch.js';
import LedGrid from './LedGrid';

const HueSaturationBrightnessPicker = ({rgb, setRgb}) => {

  const finalColor = chroma.rgb(rgb.r, rgb.g ,rgb.b).hex();

  return (
    
    <div className="color-picker-container" style={styles.controls}>
     <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
        <SwatchManager
        currentColor={rgb}
        onSelect={(color) => {
            setRgb(color);
        }}
        />
    <div>
    <h2>🎨 Color Picker</h2>

    <div className="picker-layout"
        style={{justifyContent: 'center',}}>
        <RgbColorPicker color={rgb} onChange={setRgb} className="wheel" />
    </div>
    </div>
        </div>
      {/*<div
        className="preview"
        style={{ backgroundColor: finalColor }}
      >
        <p>Selected Color: <code>{finalColor}</code></p>
      </div>*/}
    </div>
  );
};

export default HueSaturationBrightnessPicker;

const styles = {
      controls: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    marginTop: '12px',
  }
}