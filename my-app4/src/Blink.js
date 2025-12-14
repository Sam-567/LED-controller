import React, { useState } from 'react';
import HueSaturationBrightnessPicker from './HueSaturationBrightnessPicker';
import SwatchManager from './swatch.js';


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


}