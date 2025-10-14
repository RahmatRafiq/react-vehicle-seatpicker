import React from "react";
import type { Seat, SeatType, SeatPickerProps } from "../types";
import { SeatButton, BusFrame, SeatLegend } from "./SeatComponents";
import ToggleTabs from "./ToggleTabs";
import styles from "./SeatPicker.module.css";

function generateBusLayout(
  seatCount: number,
  rowConfig: number[] = [4, 4, 4, 4, 4, 4, 4],
  withDriver: boolean = true,
  seatTypes?: Record<string | number, SeatType>,
  defaultSeatType: SeatType = "regular",
  isFirstFloor: boolean = true,
  startingSeatNumber: number = 1
): Array<Array<Seat | null>> {
  let seatNum = startingSeatNumber;
  const layout: Array<Array<Seat | null>> = [];

  if (withDriver) {
    const driverRow: Array<Seat | null> = [null, null, null, null, null, { id: "D", number: "Driver", isReserved: true, isDriver: true, type: "driver" }];
    layout.push(driverRow);
  } else if (!isFirstFloor) {
    const spacingRow: Array<Seat | null> = [null, null, null, null, null, null];
    layout.push(spacingRow);
  }

  rowConfig.forEach((seatsInRow) => {
    const row: Array<Seat | null> = [];

    for (let j = 0; j < seatsInRow; j++) {
      row.push({
        id: seatNum,
        number: String(seatNum),
        isReserved: false,
        type: seatTypes?.[seatNum] || defaultSeatType,
      });
      seatNum++;

      if (j === Math.floor(seatsInRow / 2) - 1 && seatsInRow > 1) {
        row.push(null);
      }
    }

    layout.push(row);
  });

  return layout;
}

function generateMinibusLayout(
  seatCount: number,
  rowConfig: number[] = [2, 2, 2, 2],
  withDriver: boolean = true,
  seatTypes?: Record<string | number, SeatType>,
  defaultSeatType: SeatType = "regular",
  startingSeatNumber: number = 1
): Array<Array<Seat | null>> {
  let seatNum = startingSeatNumber;
  const layout: Array<Array<Seat | null>> = [];

  const createSeat = () => ({
    id: seatNum++,
    number: String(seatNum - 1),
    isReserved: false,
    type: seatTypes?.[seatNum - 1] || defaultSeatType,
  });

  rowConfig.forEach((seatsInRow, i) => {
    const row: Array<Seat | null> = [];

    if (i === 0 && withDriver) {
      row.push(createSeat(), null, { id: "D", number: "Driver", isReserved: true, isDriver: true, type: "driver" });
    } else {
      const left = Math.ceil(seatsInRow / 2);
      const right = seatsInRow - left;

      for (let l = 0; l < left; l++) row.push(createSeat());
      if (seatsInRow > 1) row.push(null);
      for (let r = 0; r < right; r++) row.push(createSeat());
    }

    layout.push(row);
  });

  return layout;
}

const SeatPickerComponent: React.FC<SeatPickerProps> = ({
  layout,
  reservedSeats = [],
  selectedSeats = [],
  onSelect,
  rowConfig,
  seatCount,
  withDriver = true,
  vehicleType,
  seatTypes,
  defaultSeatType = "regular",
  floorsConfig,
  selectedFloor,
  onFloorChange,
  legendConfig = {
    show: true,
    items: ["reserved", "selected", "available", "driver"],
    labels: {
      reserved: "Reserved",
      selected: "Selected",
      available: "Available",
      driver: "Driver",
      sleeper: "Sleeper",
      vip: "VIP",
    },
  },
  seatColors = {
    reserved: "#E0E0E0",
    selected: "#4CAF50",
    available: "#FFFFFF",
    driver: "#2196F3",
    sleeper: "#9C27B0",
    vip: "#FFC107",
  },
}) => {
  const vehicleTypeToRowConfig: Record<string, number[]> = {
    minibus: [2, 2, 2, 2],
    bus: [4, 4, 4, 4, 4, 4, 4],
    elf: [1, 2, 2, 2, 1],
  };

  const finalRowConfig = rowConfig || vehicleTypeToRowConfig[vehicleType || "minibus"] || [2, 2, 2, 2];

  const seatLayout =
    layout ||
    (() => {
      if (floorsConfig && Object.keys(floorsConfig).length > 0) {
        const currentFloor = selectedFloor || "1";
        const floorConfig = floorsConfig[currentFloor];

        if (floorConfig) {
          const floorRowConfig = floorConfig.row_config;
          const floorSeatTypes = floorConfig.seat_types || {};
          const floorDefaultType = floorConfig.default_seat_type || defaultSeatType;
          const floorSeatCount = floorRowConfig.reduce((a: number, b: number) => a + b, 0);
          const isFirstFloor = currentFloor === "1";

          let startingSeatNumber = 1;
          if (!isFirstFloor) {
            const floorNumbers = Object.keys(floorsConfig).map(Number).sort();
            const currentFloorNumber = parseInt(currentFloor);

            for (const floorNum of floorNumbers) {
              if (floorNum < currentFloorNumber) {
                const prevFloorConfig = floorsConfig[floorNum.toString()];
                if (prevFloorConfig) {
                  startingSeatNumber += prevFloorConfig.row_config.reduce((a: number, b: number) => a + b, 0);
                }
              }
            }
          }

          return vehicleType === "bus"
            ? generateBusLayout(floorSeatCount, floorRowConfig, withDriver && isFirstFloor, floorSeatTypes, floorDefaultType, isFirstFloor, startingSeatNumber)
            : generateMinibusLayout(
                floorSeatCount + (withDriver && isFirstFloor ? 1 : 0),
                floorRowConfig,
                withDriver && isFirstFloor,
                floorSeatTypes,
                floorDefaultType,
                startingSeatNumber
              );
        }
      }

      const totalSeat = seatCount ?? finalRowConfig.reduce((a, b) => a + b, 0);
      return vehicleType === "bus"
        ? generateBusLayout(totalSeat, finalRowConfig, withDriver, seatTypes, defaultSeatType, true, 1)
        : generateMinibusLayout(totalSeat + (withDriver ? 1 : 0), finalRowConfig, withDriver, seatTypes, defaultSeatType, 1);
    })();

  const handleSeatClick = (seat: Seat) => {
    if (seat.isReserved || seat.isDriver || !onSelect) return;
    const seatIdStr = String(seat.id);
    const selectedSeatIds = selectedSeats.map(String);
    const newSeats = selectedSeatIds.includes(seatIdStr)
      ? selectedSeats.filter((id) => String(id) !== seatIdStr)
      : [...selectedSeats, seatIdStr];
    onSelect(newSeats);
  };

  return (
    <div className={styles.container}>
      <SeatLegend show={legendConfig.show} items={legendConfig.items} labels={legendConfig.labels} colors={seatColors} />

      {floorsConfig && Object.keys(floorsConfig).length > 0 && (
        <div className={styles.floorSelector}>
          <ToggleTabs
            tabs={Object.keys(floorsConfig).map((floor) => `floor-${floor}`)}
            active={`floor-${selectedFloor || "1"}`}
            onChange={(tab) => {
              const floorNumber = tab.replace("floor-", "");
              onFloorChange?.(floorNumber);
            }}
          />
        </div>
      )}

      <h3 className={styles.title}>Select Seat {floorsConfig ? `(Floor ${selectedFloor || "1"})` : ""}</h3>

      <BusFrame vehicleType={vehicleType}>
        <div className={styles.seatContainer}>
          {seatLayout.map((row, i) => {
            const isSpacingRow = row.every((seat) => seat === null);
            return (
              <div key={i} className={`${styles.seatRow} ${isSpacingRow ? styles.spacingRow : ""}`}>
                {isSpacingRow ? (
                  <div className="w-full h-6"></div>
                ) : (
                  row.map((seat, idx) =>
                    seat ? (
                      <SeatButton
                        key={seat.id}
                        seat={seat}
                        isReserved={reservedSeats.includes(seat.id) || reservedSeats.includes(String(seat.id)) || seat.isReserved}
                        isSelected={selectedSeats.map(String).includes(String(seat.id))}
                        onClick={() => handleSeatClick(seat)}
                        colors={seatColors}
                      />
                    ) : (
                      <div key={`aisle-${i}-${idx}`} className={styles.aisle} />
                    )
                  )
                )}
              </div>
            );
          })}
          {vehicleType === "bus" && <div className="flex items-center justify-center gap-1 mt-4 mb-2 text-xs text-gray-600"></div>}
        </div>
      </BusFrame>

      <div className={styles.selectedSeats}>
        Selected seats: <span className="font-bold">{selectedSeats.join(", ") || "No seat selected"}</span>
      </div>
    </div>
  );
};

export default SeatPickerComponent;
export { generateMinibusLayout, generateBusLayout };
