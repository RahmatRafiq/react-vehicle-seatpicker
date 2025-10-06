# React Vehicle Seat Picker

[![npm version](https://badge.fury.io/js/react-vehicle-seatpicker.svg)](https://badge.fury.io/js/react-vehicle-seatpicker)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

*Baca dalam bahasa lain: [English](README.en.md), [Bahasa Indonesia](README.id.md)*

<p align="center">
  <img src="image.png" alt="React Vehicle Seat Picker Screenshot" width="600"/>
</p>

Komponen React yang fleksibel dan dapat disesuaikan untuk pemilihan kursi kendaraan (bus, minibus, elf, dll.)

## Fitur

- UI modern dengan animasi halus
- Mendukung berbagai jenis kendaraan (bus, minibus, elf)
- Mendukung kendaraan bertingkat dengan pemilih lantai
- Beragam tipe kursi (Regular, VIP, Sleeper)
- Layout dan konfigurasi yang fleksibel
- Mendukung aksesibilitas
- Desain responsif
- Dukungan TypeScript lengkap

## Instalasi

```bash
npm install react-vehicle-seatpicker
```

atau

```bash
yarn add react-vehicle-seatpicker
```

## Penggunaan Dasar

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

## Props API

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

## Tipe Kendaraan

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

## Tipe Kursi

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

## Pengembangan

Untuk pengembangan library:

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

## Kontribusi

Kontribusi sangat diterima! Silakan:

1. Fork repository ini
2. Buat branch fitur (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## Lisensi

Didistribusikan di bawah Lisensi MIT. Lihat `LICENSE` untuk informasi lebih lanjut.

## Dukungan

Untuk pertanyaan atau masalah:

- [Laporkan Bug](https://github.com/RahmatRafiq/react-vehicle-seatpicker/issues)
- [Ajukan Fitur](https://github.com/RahmatRafiq/react-vehicle-seatpicker/issues)
- Email: rahmatrafiq@example.com

---

Dibuat oleh [RahmatRafiq](https://github.com/RahmatRafiq)