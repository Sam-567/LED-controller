import React, { useState } from 'react';
import './App.css';
import ColorBrightnessSelector from './ColorBrightnessSelector.js';
import ColorPicker from './ColorPicker2.js';
import { SketchPicker } from 'react-color';
import HueSaturationBrightnessPicker from './HueSaturationBrightnessPicker';
import LedGrid from './LedGrid';

// Number of grids to allow
const NUM_GRIDS = 3;
const GRID_ROWS = 20;
const GRID_COLS = 6;
const BLANK_COLOR = { r: 100, g: 0, b: 0 };

function createBlankGrid(rows, cols) {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => BLANK_COLOR)
  );
}

function App() {
  const [color, setColor] = useState({ r: 200, g: 100, b: 100 });

  // Array of grid states
  const [grids, setGrids] = useState(
    Array.from({ length: NUM_GRIDS }, () => createBlankGrid(GRID_ROWS, GRID_COLS))
  );
  // Which grid is selected
  const [selectedGrid, setSelectedGrid] = useState(0);

  // Handler to update a grid's state
  const setGridAtIndex = (idx, newGrid) => {
    setGrids(grids =>
      grids.map((g, i) => (i === idx ? newGrid : g))
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Sam LED Code
        </p>
      </header>
      <HueSaturationBrightnessPicker rgb={color} setRgb={setColor}/>
      <div style={{ marginBottom: 16 }}>
        <span style={{ marginRight: 8 }}>Select Grid:</span>
        {grids.map((_, idx) => (
          <button
            key={idx}
            style={{
              ...styles.ProgramButton,
              background: selectedGrid === idx ? '#1976d2' : '#444',
              marginRight: 4,
            }}
            onClick={() => setSelectedGrid(idx)}
          >
            Grid {idx + 1}
          </button>
        ))}
      </div>
      <div className="color-picker-container">
        <LedGrid
          currentColor={color}
          rows={GRID_ROWS}
          cols={GRID_COLS}
          grid={grids[selectedGrid]}
          setGrid={updater => {
            setGridAtIndex(selectedGrid, typeof updater === 'function'
            ? updater(grids[selectedGrid])
            : updater
            );
          }}
        />
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
