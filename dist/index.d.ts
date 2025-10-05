import React from 'react';

type SeatType = "regular" | "driver" | "sleeper" | "vip" | string;
type Seat = {
    id: string | number;
    number: string;
    isReserved: boolean;
    isDriver?: boolean;
    type?: SeatType;
    seatRotation?: number;
};
type VehicleType = "minibus" | "bus" | "elf" | string;
type SeatPickerProps = {
    layout?: Array<Array<Seat | null>>;
    reservedSeats?: (string | number)[];
    selectedSeats?: (string | number)[];
    onSelect?: (seats: (string | number)[]) => void;
    rowConfig?: number[];
    seatCount?: number;
    withDriver?: boolean;
    vehicleType?: VehicleType;
    seatTypes?: Record<string | number, SeatType>;
    defaultSeatType?: SeatType;
    floorsConfig?: Record<string, {
        row_config: number[];
        seat_types: Record<string, string>;
        default_seat_type: string;
    }>;
    selectedFloor?: string;
    onFloorChange?: (floor: string) => void;
};

declare const SeatPickerComponent: React.FC<SeatPickerProps>;

declare const RegularSeatIcon: React.FC<{
    size?: number;
}>;
declare const SleeperSeatIcon: React.FC<{
    size?: number;
}>;
declare const SteeringWheelIcon: React.FC<{
    size?: number;
}>;
declare const DriverSeat: React.FC;
declare const SeatButton: React.FC<{
    seat: Seat;
    isReserved: boolean;
    isSelected: boolean;
    onClick: () => void;
}>;
declare const BusFrame: React.FC<{
    children: React.ReactNode;
    vehicleType?: VehicleType;
}>;
declare const SeatLegend: React.FC;

export { BusFrame, DriverSeat, RegularSeatIcon, type Seat, SeatButton, SeatLegend, SeatPickerComponent, type SeatPickerProps, type SeatType, SleeperSeatIcon, SteeringWheelIcon, type VehicleType };
