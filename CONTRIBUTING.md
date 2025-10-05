# Contributing to React Vehicle Seat Picker

Terima kasih atas minat Anda untuk berkontribusi pada react-vehicle-seatpicker! 🎉

## 📋 Code of Conduct

Proyek ini mengadopsi kode etik yang ramah dan inklusif. Dengan berpartisipasi, Anda diharapkan untuk menjaga kode etik ini.

## 🚀 Cara Berkontribusi

### 🐛 Melaporkan Bug

Sebelum membuat issue baru:
1. Pastikan bug belum dilaporkan sebelumnya
2. Gunakan template bug report yang tersedia
3. Sertakan informasi berikut:
   - Versi React dan library
   - Browser dan versi
   - Langkah untuk mereproduksi bug
   - Screenshot jika diperlukan

### 💡 Mengusulkan Fitur

1. Buka issue dengan label "feature request"
2. Jelaskan kebutuhan dan use case
3. Berikan contoh implementasi jika memungkinkan
4. Diskusikan dengan maintainer sebelum memulai development

### 🔧 Development Setup

```bash
# Clone repository
git clone https://github.com/RahmatRafiq/react-vehicle-seatpicker.git
cd react-vehicle-seatpicker

# Install dependencies
npm install

# Start development
npm run dev

# Run tests
npm test

# Check linting
npm run lint

# Build library
npm run build
```

### 📝 Pull Request Process

1. **Fork** repository
2. **Create branch** dari main: `git checkout -b feature/amazing-feature`
3. **Make changes** dan pastikan mengikuti coding standards
4. **Test** perubahan Anda
5. **Commit** dengan pesan yang jelas
6. **Push** ke branch: `git push origin feature/amazing-feature`
7. **Open Pull Request**

#### PR Guidelines:
- Tuliskan deskripsi yang jelas tentang perubahan
- Link ke issue yang terkait
- Tambahkan tests untuk fitur baru
- Update dokumentasi jika diperlukan
- Pastikan semua CI checks pass

### 🎨 Coding Standards

#### TypeScript
- Gunakan TypeScript untuk semua kode baru
- Export types yang bisa digunakan oleh consumer
- Hindari `any`, gunakan proper typing

#### React
- Gunakan functional components dengan hooks
- Implement proper prop validation
- Follow React best practices

#### Styling
- Gunakan Tailwind CSS classes
- Hindari inline styles kecuali diperlukan
- Maintain responsive design

#### Naming Conventions
- Components: PascalCase (`SeatButton`)
- Files: PascalCase untuk components (`SeatButton.tsx`)
- Functions: camelCase (`generateLayout`)
- Types: PascalCase (`SeatType`)

### 🧪 Testing

- Tulis unit tests untuk fungsi utility
- Test component behavior dan props
- Pastikan semua tests pass sebelum submit PR

### 📖 Documentation

- Update README.md jika menambah fitur baru
- Tambahkan JSDoc comments untuk functions
- Buat atau update examples jika diperlukan
- Update CHANGELOG.md

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── SeatComponents.tsx
│   ├── SeatPickerComponent.tsx
│   └── ToggleTabs.tsx
├── types/              # TypeScript type definitions
│   └── index.ts
└── index.ts            # Main export file

examples/               # Usage examples
├── BasicMinibusExample.tsx
├── BusWithSeatTypesExample.tsx
└── MultiFloorBusExample.tsx
```

## 🎯 Areas for Contribution

### High Priority
- [ ] Unit tests coverage
- [ ] Performance optimizations
- [ ] Accessibility improvements
- [ ] Mobile touch interactions

### Medium Priority
- [ ] More vehicle types (train, plane)
- [ ] Custom seat shapes
- [ ] Themes support
- [ ] Animation customization

### Low Priority
- [ ] Seat pricing integration
- [ ] Seat categories/sections
- [ ] Custom legend items
- [ ] Export/import layouts

## 📞 Getting Help

- 💬 Diskusi: [GitHub Discussions](https://github.com/RahmatRafiq/react-vehicle-seatpicker/discussions)
- 🐛 Issues: [GitHub Issues](https://github.com/RahmatRafiq/react-vehicle-seatpicker/issues)
- 📧 Email: rahmatrafiq@example.com

## 🙏 Recognition

Semua kontributor akan dicantumkan dalam:
- README.md contributors section
- CHANGELOG.md untuk setiap release
- Package.json contributors field

Terima kasih atas kontribusi Anda! 🚀