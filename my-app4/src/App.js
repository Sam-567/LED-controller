import React, { useState } from 'react';
import './App.css';
import ColorBrightnessSelector from './ColorBrightnessSelector.js';
import ColorPicker from './ColorPicker2.js';
import { SketchPicker } from 'react-color';
import HueSaturationBrightnessPicker from './HueSaturationBrightnessPicker';
import LedGrid from './LedGrid';

function App() {
  const [color, setColor] = useState({ r: 200, g: 100, b: 100});
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Sam LED Code
        </p>
      </header>
      <HueSaturationBrightnessPicker rgb={color} setRgb={setColor}/>
      <div className="color-picker-container">
        <LedGrid currentColor={color} />
      </div>
    </div>
  );
}

const styles = { 
    ProgramButton: {
    padding: '8px 16px',
    borderRadius: '4px',
    background: '#444',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
  },
}

export default App;
