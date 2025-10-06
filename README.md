# React Vehicle Seat Picker

Komponen React yang fleksibel untuk pemilihan kursi kendaraan (bus, minibus, elf) dengan dukungan multi-lantai dan berbagai tipe kursi.

[![NPM Version](https://img.shields.io/npm/v/react-vehicle-seatpicker)](https://www.npmjs.com/package/react-vehicle-seatpicker)
[![License](https://img.shields.io/npm/l/react-vehicle-seatpicker)](https://github.com/RahmatRafiq/react-vehicle-seatpicker/blob/main/LICENSE)

## Features

- 🚌 Mendukung berbagai tipe kendaraan (bus, minibus, elf)
- 🎨 Tipe kursi yang dapat disesuaikan (regular, VIP, sleeper, driver)
- 📝 Konfigurasi layout fleksibel
- 🔄 Dukungan multi-lantai
- 💡 TypeScript support
- ⚡ Ringan dan performa tinggi

## Instalasi

```bash
npm install react-vehicle-seatpicker
# atau
yarn add react-vehicle-seatpicker
# atau
pnpm add react-vehicle-seatpicker
```

## Penggunaan Dasar

### 1. Minibus Sederhana

```jsx
import { SeatPicker } from 'react-vehicle-seatpicker';

function MinibusExample() {
  const handleSelect = (selectedSeats) => {
    console.log('Kursi yang dipilih:', selectedSeats);
  };

  return (
    <SeatPicker
      vehicleType="minibus"
      rowConfig={[2, 2, 2, 2]} // 4 baris, masing-masing 2 kursi
      withDriver={true}
      onSelect={handleSelect}
      reservedSeats={['1', '2']} // Kursi yang sudah dipesan
    />
  );
}
```

### 2. Bus dengan Multi-Lantai

```jsx
import { SeatPicker } from 'react-vehicle-seatpicker';

function BusExample() {
  const [selectedFloor, setSelectedFloor] = useState('1');

  const floorsConfig = {
    '1': {
      row_config: [4, 4, 4, 4], // 4 baris di lantai 1
      seat_types: {
        '1': 'vip',
        '2': 'vip',
        '3': 'sleeper'
      },
      default_seat_type: 'regular'
    },
    '2': {
      row_config: [3, 3, 3], // 3 baris di lantai 2
      seat_types: {},
      default_seat_type: 'regular'
    }
  };

  return (
    <SeatPicker
      vehicleType="bus"
      floorsConfig={floorsConfig}
      selectedFloor={selectedFloor}
      onFloorChange={setSelectedFloor}
      onSelect={(seats) => console.log('Kursi terpilih:', seats)}
      reservedSeats={['1', '5']}
    />
  );
}
```

### 3. Konfigurasi Tipe Kursi Custom

```jsx
import { SeatPicker } from 'react-vehicle-seatpicker';

function CustomSeatTypesExample() {
  return (
    <SeatPicker
      vehicleType="elf"
      rowConfig={[1, 2, 2, 2, 1]} // Layout khusus untuk Elf
      seatTypes={{
        '1': 'vip',
        '2': 'sleeper',
        '3': 'regular'
      }}
      defaultSeatType="regular"
      onSelect={(seats) => console.log('Kursi terpilih:', seats)}
    />
  );
}
```

## Props

| Prop | Type | Deskripsi |
|------|------|-----------|
| `vehicleType` | `"minibus" \| "bus" \| "elf"` | Tipe kendaraan yang akan digunakan |
| `rowConfig` | `number[]` | Konfigurasi jumlah kursi per baris |
| `withDriver` | `boolean` | Menampilkan kursi supir (default: `true`) |
| `reservedSeats` | `(string\|number)[]` | Array ID kursi yang sudah dipesan |
| `selectedSeats` | `(string\|number)[]` | Array ID kursi yang sedang dipilih |
| `onSelect` | `(seats: (string\|number)[]) => void` | Callback saat kursi dipilih/dibatalkan |
| `seatTypes` | `Record<string\|number, SeatType>` | Tipe kursi untuk ID tertentu |
| `defaultSeatType` | `"regular" \| "vip" \| "sleeper"` | Tipe default untuk kursi |
| `floorsConfig` | `Record<string, FloorConfig>` | Konfigurasi untuk bus multi-lantai |
| `selectedFloor` | `string` | Lantai yang sedang aktif |
| `onFloorChange` | `(floor: string) => void` | Callback saat lantai diubah |

## Tipe Kursi

Komponen mendukung beberapa tipe kursi:
- `regular` - Kursi standar
- `driver` - Kursi supir (otomatis untuk `withDriver={true}`)
- `sleeper` - Kursi tidur/reclining
- `vip` - Kursi VIP

## Layout Default

### Minibus
```typescript
const defaultMinibusConfig = [2, 2, 2, 2]; // 4 baris, 2 kursi per baris
```

### Bus
```typescript
const defaultBusConfig = [4, 4, 4, 4, 4, 4, 4]; // 7 baris, 4 kursi per baris
```

### Elf
```typescript
const defaultElfConfig = [1, 2, 2, 2, 1]; // Layout khusus untuk Elf
```

## Contoh Layout Custom

### Layout Manual

```jsx
const customLayout = [
  // Baris pertama dengan supir
  [null, null, null, null, null, { id: "D", number: "Sopir", isReserved: true, isDriver: true }],
  // Baris penumpang
  [
    { id: 1, number: "1", isReserved: false }, 
    { id: 2, number: "2", isReserved: false }, 
    null, // gang
    { id: 3, number: "3", isReserved: false }, 
    { id: 4, number: "4", isReserved: false }
  ]
];

<SeatPicker
  layout={customLayout}
  onSelect={(seats) => console.log('Kursi dipilih:', seats)}
/>
```

### Bus Multi-Lantai

```jsx
const busConfig = {
  '1': { // Lantai 1
    row_config: [4, 4, 4], // 3 baris, 4 kursi per baris
    seat_types: {
      '1': 'vip',     // Kursi 1 tipe VIP
      '2': 'sleeper'  // Kursi 2 tipe Sleeper
    },
    default_seat_type: 'regular'
  },
  '2': { // Lantai 2
    row_config: [3, 3, 3], // 3 baris, 3 kursi per baris
    seat_types: {},
    default_seat_type: 'regular'
  }
};

<SeatPicker
  vehicleType="bus"
  floorsConfig={busConfig}
  selectedFloor="1"
  onFloorChange={(floor) => console.log('Pindah ke lantai:', floor)}
  onSelect={(seats) => console.log('Kursi dipilih:', seats)}
/>
```

## Fitur Tambahan

### Legend Kursi
Komponen ini memiliki legend bawaan yang menampilkan:
- Kursi yang sudah dipesan
- Kursi yang sedang dipilih
- Kursi yang tersedia
- Kursi supir
- Kursi sleeper
- Kursi VIP

### Frame Kendaraan
- Bus: Menampilkan frame bus lengkap dengan indikator depan dan belakang
- Minibus/Elf: Menampilkan frame sederhana

### Rotasi Kursi
Anda dapat merotasi kursi dengan menambahkan properti `seatRotation` (dalam derajat):

```jsx
const layout = [
  [
    { 
      id: 1, 
      number: "1", 
      isReserved: false,
      seatRotation: 90 // Kursi dirotasi 90 derajat
    }
  ]
];
```

## Kontribusi

Kontribusi sangat diterima! Silakan buat Pull Request untuk perbaikan atau penambahan fitur.

## Lisensi

Proyek ini dilisensikan di bawah Lisensi MIT - lihat file [LICENSE](LICENSE) untuk detail.

## Author

RahmatRafiq

## Support

Jika Anda memiliki pertanyaan atau butuh bantuan, silakan buat issue di [GitHub repository](https://github.com/RahmatRafiq/react-vehicle-seatpicker/issues).