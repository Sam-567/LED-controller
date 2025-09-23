// Utility class for BLE LED control

const SERVICE_UUID = '0000ffe0-0000-1000-8000-00805f9b34fb'; // Replace with your device's service UUID
const CHARACTERISTIC_UUID = '0000ffe1-0000-1000-8000-00805f9b34fb'; // Replace with your device's characteristic UUID

export default class BleLedController {
  constructor() {
    this.device = null;
    this.server = null;
    this.characteristic = null;
  }

  async connect() {
    this.device = await navigator.bluetooth.requestDevice({
      filters: [{ services: [SERVICE_UUID] }],
      optionalServices: [SERVICE_UUID]
    });
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
    if (!this.characteristic) return;
    // Send as 3 bytes: [r, g, b]
    //await this.characteristic.writeValue(data);
  }
}
