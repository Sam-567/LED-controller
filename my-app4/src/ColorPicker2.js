// ColorBrightnessPicker.js
import React, { useState } from 'react';
import { SketchPicker, BlockPicker, HuePicker, CirclePicker , SliderPicker, SwatchesPicker } from 'react-color';
import chroma from 'chroma-js';

const ColorBrightnessPicker = () => {
  const [baseColor, setBaseColor] = useState('#3498db'); // initial color
  const [brightness, setBrightness] = useState(0); // -100 to +100 scale

  const getAdjustedColor = () => {
    try {
      return chroma(baseColor).brighten(brightness / 50).hex(); // brighten(1) ~= +50%
    } catch {
      return baseColor;
    }
  };

  const handleColorChange = (color) => {
    setBaseColor(color.hex);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🎨 React Color & Brightness Picker</h2>

      <div style={styles.pickerWrapper}>
        <SketchPicker
          color={baseColor}
          onChangeComplete={handleColorChange}
          disableAlpha={true}
        />
      </div>

      <div style={styles.pickerWrapper}>
        <SliderPicker
          color={baseColor}
          onChangeComplete={handleColorChange}
          disableAlpha
        />
      </div>
      <div style={styles.pickerWrapper}>
        <SwatchesPicker
          color={baseColor}
          onChangeComplete={handleColorChange}
          disableAlpha
        />
      </div>
        <CirclePicker
          color={baseColor}
          onChangeComplete={handleColorChange}
          disableAlpha
        />

      <div style={styles.sliderWrapper}>
        <label style={styles.label}>Brightness: {brightness}%</label>
        <input
          type="range"
          min={-100}
          max={100}
          step={1}
          value={brightness}
          onChange={(e) => setBrightness(Number(e.target.value))}
          style={styles.slider}
        />
      </div>

      <div style={{ ...styles.preview, backgroundColor: getAdjustedColor() }}>
        <p style={styles.previewText}>
          Adjusted Color: <code>{getAdjustedColor()}</code>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'sans-serif',
    maxWidth: 400,
    margin: '0 auto',
    padding: 20,
    textAlign: 'center',
  },
  heading: {
    marginBottom: 20,
  },
  pickerWrapper: {
    marginBottom: 20,
  },
  sliderWrapper: {
    marginBottom: 20,
  },
  label: {
    display: 'block',
    marginBottom: 8,
  },
  slider: {
    width: '100%',
  },
  preview: {
    height: 100,
    borderRadius: 8,
    border: '1px solid #ccc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewText: {
    color: '#333',
  },
};

export default ColorBrightnessPicker;
