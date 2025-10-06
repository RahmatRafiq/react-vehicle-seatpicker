# Changelog

## [2.0.2] - 2025-10-06

### Fixed
- Version update to resolve npm publishing conflict

## [2.0.1] - 2025-10-06

### Added
- Kustomisasi warna untuk setiap tipe kursi melalui prop `seatColors`
- Konfigurasi legend yang dapat disesuaikan melalui prop `legendConfig`
- Type definitions yang lebih baik untuk konfigurasi legend dan warna
- Dukungan untuk mengatur item legend yang ditampilkan

### Fixed
- Perbaikan type checking untuk konfigurasi legend
- Perbaikan tampilan warna kursi yang lebih konsisten

### Changed
- Peningkatan type safety dengan definisi tipe yang lebih spesifik
- Dokumentasi yang lebih lengkap dengan contoh kustomisasi warna dan legend

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-10-05

### Added
- Initial release of react-vehicle-seatpicker library
- SeatPickerComponent for vehicle seat selection
- Support for multiple vehicle types (minibus, bus, elf)
- Multi-floor bus support with floor selector
- Different seat types (regular, VIP, sleeper, driver)
- Customizable seat layouts and row configurations
- TypeScript support with full type definitions
- Responsive design with Tailwind CSS
- Accessibility features (ARIA labels, keyboard navigation)
- Component library with individual exportable components:
  - SeatButton
  - BusFrame  
  - SeatLegend
  - ToggleTabs
- Utility functions for layout generation
- Comprehensive documentation and examples
- MIT License

### Features
- 🎨 Modern UI with smooth animations
- 🚌 Multiple vehicle type support
- 🏢 Multi-floor bus functionality
- 🎯 Multiple seat types (Regular, VIP, Sleeper)
- 🔧 Highly customizable layouts
- ♿ Accessibility support
- 📱 Mobile responsive design
- 🎭 Full TypeScript support

### Examples
- Basic minibus seat picker
- Bus with different seat types
- Multi-floor bus with floor selector