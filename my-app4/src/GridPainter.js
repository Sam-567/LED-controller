import React, { useState, useRef, useImperativeHandle, forwardRef } from 'react';
import ColorBrightnessSelector from './ColorBrightnessSelector.js';
import ColorPicker from './ColorPicker2.js';
import { SketchPicker } from 'react-color';
import HueSaturationBrightnessPicker from './HueSaturationBrightnessPicker';
import LedGrid from './LedGrid';
import SwatchManager from './swatch.js';

const BLANK_COLOR = { r: 100, g: 0, b: 0 }; 

const GridPainter = forwardRef(({
  NUM_GRIDS,
  GRID_ROWS,
  GRID_COLS,
}, ref) => 
  {
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
    // Array of grid states
    const [grids, setGrids] = useState(
        Array.from({ length: NUM_GRIDS }, () => LoadGrid(GRID_ROWS, GRID_COLS))
    );
    // Which grid is selected
    const [selectedGrid, setSelectedGrid] = useState(0);

    useImperativeHandle(ref, () => ({
      getEncodedGrid: () => {
        const grid = grids[selectedGrid];
        return encodeGrid(grid); // or your encode function
      },
      getGrid: () => grids[selectedGrid],
      getGridAtIndex: (idx) => grids[idx],
    }));

    // Handler to update a grid's state
    const setGridAtIndex = (idx, newGrid) => {
        addSwatch();
        setGrids(grids =>
        grids.map((g, i) => (i === idx ? newGrid : g))
        );

        localStorage.setItem("grid", JSON.stringify(newGrid))
    };

    return (
      <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
        <SwatchManager
          currentColor={color}
          onSelect={setColor}
          swatches={swatches}
          addSwatch={addSwatch}
        />
        <div>
          <HueSaturationBrightnessPicker rgb={color} setRgb={setColor}/>
        </div>
      </div>

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
          //program={() => {bleControllerRef.current && bleControllerRef.current.sendColor(grids[selectedGrid])}}
        />
      </div>
      </div>
    );
});

function LoadGrid(rows, cols) {
    let grid = JSON.parse(localStorage.getItem("grid"))
    if(grid) {
        console.log("existing gfrid found")
    }
    if(!grid) {
        console.log("No existing grid found\n");
        grid = Array.from({ length: rows }, () =>
             Array.from({ length: cols }, () => BLANK_COLOR) );
    }
  return grid
}

function encodeGrid(grid) {
    let direction = 0;
  const rows = grid.length;
  const cols = (rows && grid[0].length) || 0;
  const out = [];
  for (let c = cols-1; c >= 0; c--) {
    for (let r = 0; r < rows; r++) {
        if (direction) {
            const p = (grid[rows-1-r] && grid[rows-1-r][c]) || { r: 0, g: 0, b: 0 };
            out.push(p.g, p.r, p.b);
        } else {
            const p = (grid[r] && grid[r][c]) || { r: 0, g: 0, b: 0 };
            out.push(p.g, p.r, p.b);
        }
    }
    direction = !direction;
  }
  return out;
};

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
    button: {
    padding: '8px 16px',
    borderRadius: '4px',
    background: '#444',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
  },
}

export {
  GridPainter
}