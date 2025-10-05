# Quick Start Guide

## 🚀 Langkah-langkah Setup Library

### 1. Install Dependencies
```bash
npm install
```

### 2. Build Library
```bash
npm run build
```

### 3. Test Locally
```bash
# Link library untuk testing lokal
npm link

# Di project lain
npm link react-vehicle-seatpicker
```

### 4. Publish ke NPM
```bash
# Login ke npm (sekali saja)
npm login

# Publish
npm publish
```

### 5. Gunakan di Project Lain
```bash
npm install react-vehicle-seatpicker
```

## 📁 Struktur File Library

```
/home/rahmat/js-project/seat-picker/
├── src/                     # Source code
│   ├── components/          # React components
│   ├── types/              # TypeScript types
│   └── index.ts            # Main export
├── examples/               # Contoh penggunaan
├── dist/                   # Build output (auto-generated)
├── package.json            # NPM configuration
├── tsconfig.json           # TypeScript config
├── vite.config.ts          # Build configuration
├── README.md               # Dokumentasi utama
├── CHANGELOG.md            # Release notes
├── CONTRIBUTING.md         # Panduan kontribusi
├── LICENSE                 # MIT License
└── scripts/                # Build scripts
```

## ⚡ Quick Test

Buat file test sederhana:

```tsx
import React, { useState } from 'react';
import { SeatPickerComponent } from 'react-vehicle-seatpicker';

function TestApp() {
  const [selected, setSelected] = useState([]);
  
  return (
    <SeatPickerComponent
      vehicleType="minibus"
      selectedSeats={selected}
      onSelect={setSelected}
      reservedSeats={['2', '5']}
    />
  );
}
```

## 🔧 Development Commands

- `npm run build` - Build library
- `npm run dev` - Watch mode untuk development
- `npm run lint` - Check code quality
- `npm run type-check` - TypeScript validation

## 📚 Next Steps

1. Test library di project lain
2. Publish ke npm registry
3. Update dokumentasi jika perlu
4. Tambah fitur baru berdasarkan feedback