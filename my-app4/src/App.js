import React, { useState, useRef } from 'react';
import './App.css';
import {GridPainter} from './GridPainter.js'
import BleLedController from './BluetoothController.js';

// Number of grids to allow
const NUM_GRIDS = 3;
const GRID_ROWS = 26;
const GRID_COLS = 14;
const BLANK_COLOR = { r: 100, g: 0, b: 0 }; 

function App() {
  const bleControllerRef = useRef(null);
  const gridPainterRef = useRef(null);

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
    const encodedGrid = gridPainterRef.current.getEncodedGrid();
    bleControllerRef.current.sendData(encodedGrid);
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Samtastic tails
        </p>
      </header>

      <div style={{ maxWidth: '800px', margin: 'auto' }}>
        <GridPainter
          NUM_GRIDS = {NUM_GRIDS}
          GRID_ROWS = {GRID_ROWS}
          GRID_COLS = {GRID_COLS}  
        />
      </div>

      <div style={{ marginBottom: 16 }}>
        <button style={styles.button} onClick={handleConnectBluetooth}> Connect </button>
        <button style={styles.button} onClick={handleProgramBluetooth}> Update </button>
      </div>

      <div>
        <button style={styles.button}> Rainbow Mode </button>
        <button style={styles.button}> Twinkle Mode </button>
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

export default App;
