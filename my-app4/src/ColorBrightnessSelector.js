import React, { useState } from 'react';

function ColorBrightnessSelector() {
  const [baseColor, setBaseColor] = useState('#3498db'); // initial blue
  const [brightness, setBrightness] = useState(100); // percentage (100 = normal)

  // Converts a hex color to HSL
  const hexToHsl = (H) => {
    let r = 0, g = 0, b = 0;
    if (H.length === 4) {
      r = '0x' + H[1] + H[1];
      g = '0x' + H[2] + H[2];
      b = '0x' + H[3] + H[3];
    } else if (H.length === 7) {
      r = '0x' + H[1] + H[2];
      g = '0x' + H[3] + H[4];
      b = '0x' + H[5] + H[6];
    }

    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r, g, b),
      cmax = Math.max(r, g, b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;

    if (delta === 0)
      h = 0;
    else if (cmax === r)
      h = ((g - b) / delta) % 6;
    else if (cmax === g)
      h = (b - r) / delta + 2;
    else
      h = (r - g) / delta + 4;

    h = Math.round(h * 60);
    if (h < 0) h += 360;

    l = (cmax + cmin) / 2;
    s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return { h, s, l };
  };

  // Convert HSL back to CSS string
  const getAdjustedColor = () => {
    const { h, s, l } = hexToHsl(baseColor);
    const adjustedL = Math.min(200, Math.max(0, (l * brightness) / 100));
    return `hsl(${h}, ${s}%, ${adjustedL}%)`;
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: 20 }}>
      <h2>🎨 Color & Brightness Selector</h2>

      <div style={{ marginBottom: 10 }}>
        <label>
          Select Color:{" "}
          <input
            type="color"
            value={baseColor}
            onChange={(e) => setBaseColor(e.target.value)}
          />
        </label>
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>
          Brightness: {brightness}%
          <input
            type="range"
            min="0"
            max="200"
            value={brightness}
            onChange={(e) => setBrightness(Number(e.target.value))}
            style={{ width: '100%' }}
          />
        </label>
      </div>

      <div
        style={{
          marginTop: 20,
          width: '100%',
          height: 100,
          backgroundColor: getAdjustedColor(),
          border: '1px solid #ccc',
          borderRadius: 8,
        }}
      >
        <p style={{ textAlign: 'center', paddingTop: 35, color: '#333' }}>
          Preview: {getAdjustedColor()}
        </p>
      </div>
    </div>
  );
}

export default ColorBrightnessSelector;