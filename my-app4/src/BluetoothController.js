// Utility class for BLE LED control

const SERVICE_UUID = '0000ffe0-0000-1000-8000-00805f9b34fb'; // Replace with your device's service UUID
const CHARACTERISTIC_UUID = '0000ffe1-0000-1000-8000-00805f9b34fb'; // Replace with your device's characteristic UUID

const LEDS_TO_SEND = 150
export default class BleLedController {
  constructor() {
    this.device = null;
    this.server = null;
    this.characteristic = null;
  }

  async connect() {
    /*this.device = await navigator.bluetooth.requestDevice({
      filters: [{ services: [SERVICE_UUID] }],
      optionalServices: [SERVICE_UUID]
    });*/
    this.device = await navigator.bluetooth.requestDevice({acceptAllDevices: true, optionalServices: [SERVICE_UUID]})
    console.log(this.device)
    this.server = await this.device.gatt.connect();
    const service = await this.server.getPrimaryService(SERVICE_UUID);
    this.characteristic = await service.getCharacteristic(CHARACTERISTIC_UUID);
  }

  isConnected() {
    return this.device && this.device.gatt.connected;
  }

 
  async sendColor(grid) {
    console.log("send color data a")
    console.log(grid)
    //const flat = grid.flat().map(pixel => [pixel.g, pixel.r, pixel.b]).flat();
    const flat = (() => {
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
    })();
    console.log("flat")
    console.log(flat)
    const data = new Uint8Array(flat);
    console.log("data")
    console.log(data)
    if (!this.characteristic) return;
    console.log("characteristic")
    console.log(this.characteristic)
    // Send as 3 bytes: [r, g, b]
    //await this.characteristic.writeValue(data);

    //Data must be fragmented
    console.log(data.length)
    for (let startLed = 0; startLed < data.length / 3; startLed += LEDS_TO_SEND) {
        let ledsInMessage = Math.min(LEDS_TO_SEND, (data.length / 3) - startLed)
        const header = new Uint8Array([0, startLed & 0xFF, (startLed >> 8) & 0xFF]);
        const payload = data.slice(startLed*3, (startLed + ledsInMessage)*3)

        const sendBuf = new Uint8Array(header.length + payload.length);
        sendBuf.set(header, 0);
        sendBuf.set(payload, header.length);

        console.log("writing")
        console.log(sendBuf)
        await this.characteristic.writeValue(sendBuf);
    }
    console.log("Donew riting, program")
    await this.characteristic.writeValue(new Uint8Array([1]));
  }
}
