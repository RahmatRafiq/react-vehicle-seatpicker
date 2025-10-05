// Main components
export { default as SeatPickerComponent } from './components/SeatPickerComponent';
export { 
  SeatButton, 
  BusFrame, 
  SeatLegend, 
  DriverSeat,
  RegularSeatIcon,
  SleeperSeatIcon,
  SteeringWheelIcon 
} from './components/SeatComponents';
export { default as ToggleTabs } from './components/ToggleTabs';

// Utility functions
export { generateMinibusLayout, generateBusLayout } from './components/SeatPickerComponent';

// Types
export type { 
  Seat, 
  SeatType, 
  VehicleType, 
  SeatPickerProps, 
  FloorConfig 
} from './types';