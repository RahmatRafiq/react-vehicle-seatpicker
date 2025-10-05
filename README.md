# Seat Picker Library

Komponen React untuk memilih kursi bus/minibus/elf dengan visualisasi interaktif.

## Instalasi
```bash
npm install seat-picker
```

## Penggunaan
```tsx
import { SeatPickerComponent } from 'seat-picker';

<SeatPickerComponent
  vehicleType="bus"
  reservedSeats={[1,2,3]}
  selectedSeats={selected}
  onSelect={setSelected}
/>
```

## Fitur
- Pilih kursi, multi-floor, tipe kursi (VIP, sleeper, driver)
- Custom layout dan konfigurasi

## Dokumentasi Props
Lihat file `SeatPickerComponent.tsx` dan `SeatPickerTypes.ts` untuk detail props dan tipe data.
# seat-picker
# seat-picker
