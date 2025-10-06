export type SeatType = "regular" | "driver" | "sleeper" | "vip" | string;

export type Seat = {
    id: string | number;
    number: string;
    isReserved: boolean;
    isDriver?: boolean;
    type?: SeatType;
    seatRotation?: number;
};

export type VehicleType = "minibus" | "bus" | "elf" | string;

export type FloorConfig = {
    row_config: number[];
    seat_types: Record<string, string>;
    default_seat_type: string;
};

export type LegendLabels = {
  reserved?: string;
  selected?: string;
  available?: string;
  driver?: string;
  sleeper?: string;
  vip?: string;
};

export type SeatColors = {
  reserved?: string;
  selected?: string;
  available?: string;
  driver?: string;
  sleeper?: string;
  vip?: string;
};

export type LegendConfig = {
  show?: boolean;
  items?: ("reserved" | "selected" | "available" | "driver" | "sleeper" | "vip")[];
  labels?: LegendLabels;
  colors?: SeatColors;
};

export interface DriverSeatProps {
    color?: string;
}

export type LegendItem = "reserved" | "selected" | "available" | "driver" | "sleeper" | "vip";

export interface SeatLegendProps {
    show?: boolean;
    items?: LegendItem[];
    labels?: LegendLabels;
    colors?: SeatColors;
}

export type SeatPickerProps = {
  layout?: Array<Array<Seat | null>>;
  reservedSeats?: (string|number)[];
  selectedSeats?: (string|number)[];
  onSelect?: (seats: (string|number)[]) => void;
  rowConfig?: number[];
  seatCount?: number;
  withDriver?: boolean;
  vehicleType?: VehicleType;
  seatTypes?: Record<string|number, SeatType>;
  defaultSeatType?: SeatType;
  floorsConfig?: Record<string, FloorConfig>;
  selectedFloor?: string;
  onFloorChange?: (floor: string) => void;
  legendConfig?: LegendConfig;
  seatColors?: SeatColors;
};