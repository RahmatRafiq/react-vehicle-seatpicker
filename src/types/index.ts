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
};