import React, { useState, useRef } from 'react';
import './App.css';
import {GridPainter} from './GridPainter.js'
import BleLedController from './BluetoothController.js';
import BlinkUI from './Blink.js';
import LedGrid from './LedGrid';

// Number of grids to allow
const NUM_GRIDS = 3;
const GRID_ROWS = 26;
const GRID_COLS = 14;
const BLANK_COLOR = { r: 100, g: 0, b: 0 }; 

function App() {
  const bleControllerRef = useRef(null);
  const gridPainterRef = useRef(null);

  const [UIs, newUIs] = useState([]);

  const handleConnectBluetooth = async () => {
    console.log("X")
    if (!bleControllerRef.current) {
      bleControllerRef.current = new BleLedController();
    }
    await bleControllerRef.current.connect();
    // Optionally send current color after connecting
    console.log("X")
    //bleControllerRef.current.sendColor(grids[selectedGrid]);
  };

  function handleProgramBluetooth() {
    const encodedGrid = gridPainterRef.current?.getEncodedGrid();
    bleControllerRef.current.sendData(encodedGrid);
  }
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

    const [grids, setGrids] = useState(
        Array.from({ length: NUM_GRIDS }, () => LoadGrid(GRID_ROWS, GRID_COLS))
    );
        // Handler to update a grid's state
    const setGridAtIndex = (idx, newGrid) => {
        setGrids(grids =>
        grids.map((g, i) => (i === idx ? newGrid : g))
        );

        localStorage.setItem("grid", JSON.stringify(newGrid))
    };

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Samtastic tails
        </p>
      </header>

      <h1>Tail 1</h1>

      <div style={{ maxWidth: '800px', margin: 'auto' }}>
        {true && <BlinkUI />}
        {false && <GridPainter ref={gridPainterRef} NUM_GRIDS={NUM_GRIDS} GRID_ROWS={GRID_ROWS} GRID_COLS={GRID_COLS}/>}
      </div>

        <div className="color-picker-container">
            <LedGrid
            currentColor={'red'}
            rows={GRID_ROWS}
            cols={GRID_COLS}
            grid={grids[0]}
            setGrid={updater => {
                setGridAtIndex(0, typeof updater === 'function'
                ? updater(grids[0])
                : updater
                );
            }}
            editeable={false}
            orientation={'landscape'}
            />
        </div>

      <div style={{ marginBottom: 16 }}>
        <button style={styles.button} onClick={handleConnectBluetooth}> Connect </button>
        <button style={styles.button} onClick={handleProgramBluetooth}> Update </button>
      </div>
    </div>
  );
}

const styles = { 
    button: {
    padding: '8px 16px',
    borderRadius: '4px',
    background: '#444',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    margin: '4px 4px',
  },
}

export default App;
