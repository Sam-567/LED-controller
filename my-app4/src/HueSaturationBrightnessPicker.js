// HueSaturationBrightnessPicker.js
import React, { useState } from 'react';
import { RgbColorPicker } from 'react-colorful';
import chroma from 'chroma-js';
import './HueSaturationBrightnessPicker.css';
import LedGrid from './LedGrid';

const HueSaturationBrightnessPicker = ({rgb, setRgb}) => {

  const finalColor = chroma.rgb(rgb.r, rgb.g ,rgb.b).hex();

  return (
    <div>
      <h2>🎨 Color Picker</h2>
      <RgbColorPicker color={rgb} onChange={setRgb} className="wheel" />
    </div>
  );
};

export default HueSaturationBrightnessPicker;