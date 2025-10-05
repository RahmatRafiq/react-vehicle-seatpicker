# React Vehicle Seat Picker

🚌 Komponen React yang fleksibel dan dapat disesuaikan untuk pemilihan kursi kendaraan (bus, minibus, elf, dll.)

[![npm version](https://badge.fury.io/js/react-vehicle-seatpicker.svg)](https://badge.fury.io/js/react-vehicle-seatpicker)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Fitur

- 🎨 **UI yang Menarik**: Desain modern dengan animasi smooth
- 🚌 **Multi Kendaraan**: Mendukung bus, minibus, elf, dan kendaraan custom
- 🏢 **Multi Lantai**: Support untuk bus tingkat dengan floor selector
- 🎯 **Tipe Kursi**: Regular, VIP, Sleeper, dan custom seat types
- 🔧 **Kustomisasi**: Layout, warna, dan konfigurasi yang fleksibel
- ♿ **Accessibility**: Support untuk screen readers dan keyboard navigation
- 📱 **Responsive**: Tampil baik di desktop maupun mobile
- 🎭 **TypeScript**: Full TypeScript support dengan type definitions

## 📦 Instalasi

```bash
npm install react-vehicle-seatpicker
```

atau

```bash
yarn add react-vehicle-seatpicker
```

## 🚀 Penggunaan Dasar

```tsx
import React, { useState } from 'react';
import { SeatPickerComponent } from 'react-vehicle-seatpicker';

function App() {
  const [selectedSeats, setSelectedSeats] = useState<(string|number)[]>([]);
  const reservedSeats = ['1', '3', '7']; // Kursi yang sudah dipesan

  return (
    <div>
      <SeatPickerComponent
        vehicleType="minibus"
        selectedSeats={selectedSeats}
        reservedSeats={reservedSeats}
        onSelect={setSelectedSeats}
        withDriver={true}
      />
    </div>
  );
}
```

## 🔧 Props API

| Prop | Type | Default | Deskripsi |
|------|------|---------|-----------|
| `layout` | `Array<Array<Seat \| null>>` | `undefined` | Layout kursi custom (opsional) |
| `reservedSeats` | `(string\|number)[]` | `[]` | Array ID kursi yang sudah dipesan |
| `selectedSeats` | `(string\|number)[]` | `[]` | Array ID kursi yang dipilih |
| `onSelect` | `(seats: (string\|number)[]) => void` | `undefined` | Callback saat kursi dipilih |
| `rowConfig` | `number[]` | auto | Konfigurasi jumlah kursi per baris |
| `seatCount` | `number` | auto | Total jumlah kursi |
| `withDriver` | `boolean` | `true` | Tampilkan kursi sopir |
| `vehicleType` | `VehicleType` | `"minibus"` | Tipe kendaraan |
| `seatTypes` | `Record<string\|number, SeatType>` | `{}` | Mapping tipe kursi per ID |
| `defaultSeatType` | `SeatType` | `"regular"` | Tipe kursi default |
| `floorsConfig` | `Record<string, FloorConfig>` | `undefined` | Konfigurasi multi-lantai |
| `selectedFloor` | `string` | `"1"` | Lantai yang dipilih |
| `onFloorChange` | `(floor: string) => void` | `undefined` | Callback perubahan lantai |

## 🚌 Tipe Kendaraan

### Minibus (Default)
```tsx
<SeatPickerComponent
  vehicleType="minibus"
  rowConfig={[2, 2, 2, 2]} // 2 kursi per baris
/>
```

### Bus
```tsx
<SeatPickerComponent
  vehicleType="bus"
  rowConfig={[4, 4, 4, 4, 4, 4, 4]} // 4 kursi per baris
/>
```

### Elf
```tsx
<SeatPickerComponent
  vehicleType="elf"
  rowConfig={[1, 2, 2, 2, 1]} // Layout elf
/>
```

## 🎨 Tipe Kursi

- **regular**: Kursi biasa (abu-abu)
- **vip**: Kursi VIP (ungu)
- **sleeper**: Kursi tidur (biru)
- **driver**: Kursi sopir (kuning dengan ikon setir)

```tsx
const seatTypes = {
  '1': 'vip',
  '2': 'vip', 
  '15': 'sleeper',
  '16': 'sleeper'
};

<SeatPickerComponent
  seatTypes={seatTypes}
  defaultSeatType="regular"
/>
```

## 🏢 Bus Multi-Lantai

```tsx
const floorsConfig = {
  '1': {
    row_config: [4, 4, 4, 4],
    seat_types: { '1': 'vip', '2': 'vip' },
    default_seat_type: 'regular'
  },
  '2': {
    row_config: [4, 4, 4],
    seat_types: { '17': 'sleeper', '18': 'sleeper' },
    default_seat_type: 'regular'
  }
};

function MultiplFloorBus() {
  const [selectedFloor, setSelectedFloor] = useState('1');
  
  return (
    <SeatPickerComponent
      vehicleType="bus"
      floorsConfig={floorsConfig}
      selectedFloor={selectedFloor}
      onFloorChange={setSelectedFloor}
    />
  );
}
```

## 🎛️ Layout Custom

```tsx
// Membuat layout manual
const customLayout = [
  [null, null, { id: 'D', number: 'Sopir', isReserved: true, isDriver: true }],
  [{ id: 1, number: '1', isReserved: false }, null, { id: 2, number: '2', isReserved: false }],
  [{ id: 3, number: '3', isReserved: false }, null, { id: 4, number: '4', isReserved: false }]
];

<SeatPickerComponent layout={customLayout} />
```

## 🧩 Komponen Terpisah

Library juga menyediakan komponen-komponen terpisah:

```tsx
import { 
  SeatButton, 
  BusFrame, 
  SeatLegend,
  ToggleTabs 
} from 'react-vehicle-seatpicker';

// Gunakan komponen secara terpisah
<SeatLegend />
<BusFrame vehicleType="bus">
  {/* konten */}
</BusFrame>
```

## 🛠️ Utility Functions

```tsx
import { generateBusLayout, generateMinibusLayout } from 'react-vehicle-seatpicker';

// Generate layout otomatis
const busLayout = generateBusLayout(28, [4,4,4,4,4,4,4], true);
const minibusLayout = generateMinibusLayout(12, [2,2,2,2], true);
```

## 🎨 Styling

Library menggunakan Tailwind CSS classes. Pastikan Tailwind CSS sudah terinstall di project Anda:

```bash
npm install tailwindcss
```

Atau gunakan CDN:
```html
<link href="https://cdn.tailwindcss.com" rel="stylesheet">
```

## 📱 Contoh Lengkap

```tsx
import React, { useState } from 'react';
import { SeatPickerComponent } from 'react-vehicle-seatpicker';

function BookingApp() {
  const [selectedSeats, setSelectedSeats] = useState<(string|number)[]>([]);
  const [selectedFloor, setSelectedFloor] = useState('1');
  
  const reservedSeats = ['3', '7', '12', '18'];
  
  const floorsConfig = {
    '1': {
      row_config: [4, 4, 4, 4],
      seat_types: { '1': 'vip', '2': 'vip', '3': 'vip', '4': 'vip' },
      default_seat_type: 'regular'
    },
    '2': {
      row_config: [4, 4, 4],
      seat_types: { '17': 'sleeper', '18': 'sleeper', '19': 'sleeper', '20': 'sleeper' },
      default_seat_type: 'regular'
    }
  };

  const handleSeatSelect = (seats: (string|number)[]) => {
    setSelectedSeats(seats);
    console.log('Kursi dipilih:', seats);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Pilih Kursi Bus</h1>
      
      <SeatPickerComponent
        vehicleType="bus"
        selectedSeats={selectedSeats}
        reservedSeats={reservedSeats}
        onSelect={handleSeatSelect}
        floorsConfig={floorsConfig}
        selectedFloor={selectedFloor}
        onFloorChange={setSelectedFloor}
        withDriver={true}
      />
      
      <div className="mt-4 p-3 bg-gray-50 rounded">
        <h3 className="font-semibold">Ringkasan:</h3>
        <p>Kursi dipilih: {selectedSeats.join(', ') || 'Belum ada'}</p>
        <p>Jumlah kursi: {selectedSeats.length}</p>
        <p>Lantai: {selectedFloor}</p>
      </div>
    </div>
  );
}

export default BookingApp;
```

## 🔧 Development

Untuk development library:

```bash
# Install dependencies
npm install

# Build library
npm run build

# Watch mode untuk development
npm run dev

# Type checking
npm run type-check

# Linting
npm run lint
```

## 🤝 Kontribusi

Kontribusi sangat diterima! Silakan:

1. Fork repository ini
2. Buat branch fitur (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 🙏 Acknowledgments

- Tailwind CSS untuk styling
- React untuk component framework
- TypeScript untuk type safety

## 📞 Support

Jika ada pertanyaan atau issue:

- 🐛 [Report Bug](https://github.com/RahmatRafiq/react-vehicle-seatpicker/issues)
- 💡 [Request Feature](https://github.com/RahmatRafiq/react-vehicle-seatpicker/issues)
- 📧 Email: rahmatrafiq@example.com

---

Made with ❤️ by [RahmatRafiq](https://github.com/RahmatRafiq)