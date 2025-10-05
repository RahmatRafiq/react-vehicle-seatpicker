import React from "react";
import { 
  SeatButton, 
  BusFrame, 
  SeatLegend
} from "./SeatComponents";
import ToggleTabs from './toggle-tabs';
import { Seat, SeatPickerProps, SeatType } from "./types/SeatPickerTypes";

function generateBusLayout(
  seatCount: number, 
  rowConfig: number[] = [4,4,4,4,4,4,4], 
  withDriver: boolean = true, 
  seatTypes?: Record<string|number, SeatType>, 
  defaultSeatType: SeatType = "regular",
  isFirstFloor: boolean = true,
  startingSeatNumber: number = 1
): Array<Array<Seat|null>> {
  let seatNum = startingSeatNumber;
  const layout: Array<Array<Seat|null>> = [];
  
  if (withDriver) {
    const driverRow: Array<Seat|null> = [null, null, null, null, null, { id: "D", number: "Sopir", isReserved: true, isDriver: true, type: "driver" }];
    layout.push(driverRow);
  } else if (!isFirstFloor) {
    const spacingRow: Array<Seat|null> = [null, null, null, null, null, null];
    layout.push(spacingRow);
  }
  
  rowConfig.forEach(seatsInRow => {
    const row: Array<Seat|null> = [];
    
    for (let j = 0; j < seatsInRow; j++) {
      row.push({ 
        id: seatNum, 
        number: String(seatNum), 
        isReserved: false, 
        type: seatTypes?.[seatNum] || defaultSeatType 
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
  rowConfig: number[] = [2,2,2,2], 
  withDriver: boolean = true, 
  seatTypes?: Record<string|number, SeatType>, 
  defaultSeatType: SeatType = "regular",
  startingSeatNumber: number = 1
): Array<Array<Seat|null>> {
  let seatNum = startingSeatNumber;
  const layout: Array<Array<Seat|null>> = [];
  
  const createSeat = () => ({ 
    id: seatNum++, 
    number: String(seatNum - 1), 
    isReserved: false, 
    type: seatTypes?.[seatNum - 1] || defaultSeatType 
  });

  rowConfig.forEach((seatsInRow, i) => {
    const row: Array<Seat|null> = [];
    
    if (i === 0 && withDriver) {
      row.push(createSeat(), null, { id: "D", number: "Sopir", isReserved: true, isDriver: true, type: "driver" });
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
}) => {
  const vehicleTypeToRowConfig: Record<string, number[]> = {
    minibus: [2,2,2,2],
    bus: [4,4,4,4,4,4,4],
    elf: [1,2,2,2,1],
  };
  
  const finalRowConfig = rowConfig || vehicleTypeToRowConfig[vehicleType || 'minibus'] || [2,2,2,2];
  
  // Generate layout based on floors_config or regular config
  const seatLayout = layout || (() => {
    // Check if we have floors_config for multi-floor bus
    if (floorsConfig && Object.keys(floorsConfig).length > 0) {
      // For multi-floor, we'll show floor 1 by default, or use selectedFloor prop
      const currentFloor = selectedFloor || '1';
      const floorConfig = floorsConfig[currentFloor];
      
      if (floorConfig) {
        const floorRowConfig = floorConfig.row_config;
        const floorSeatTypes = floorConfig.seat_types || {};
        const floorDefaultType = floorConfig.default_seat_type || defaultSeatType;
        const floorSeatCount = floorRowConfig.reduce((a: number, b: number) => a + b, 0);
        const isFirstFloor = currentFloor === '1';
        
        // Calculate starting seat number for this floor
        let startingSeatNumber = 1;
        if (!isFirstFloor) {
          // Calculate total seats from all previous floors
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
          : generateMinibusLayout(floorSeatCount + (withDriver && isFirstFloor ? 1 : 0), floorRowConfig, withDriver && isFirstFloor, floorSeatTypes, floorDefaultType, startingSeatNumber);
      }
    }
    
    // Regular single floor layout
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
    <div>
      <SeatLegend />
      
      {/* Floor Selector for Multi-Floor */}
      {floorsConfig && Object.keys(floorsConfig).length > 0 && (
        <div className="flex justify-center mb-4">
          <ToggleTabs
            tabs={Object.keys(floorsConfig).map(floor => `floor-${floor}`)}
            active={`floor-${selectedFloor || '1'}`}
            onChange={(tab) => {
              const floorNumber = tab.replace('floor-', '');
              onFloorChange?.(floorNumber);
            }}
          />
        </div>
      )}
      
      <h3 className="mb-4 font-bold text-center text-blue-700 text-lg">
        Pilih Kursi {floorsConfig ? `(Lantai ${selectedFloor || '1'})` : ''}
      </h3>
      
      <BusFrame vehicleType={vehicleType}>
        <div className="flex flex-col gap-2 items-center">
          {seatLayout.map((row, i) => {
            // Check if this is a spacing row (all null seats for upper floor alignment)
            const isSpacingRow = row.every(seat => seat === null);
            
            return (
              <div 
                key={i} 
                className={`flex justify-center items-center w-full gap-1 ${isSpacingRow ? 'h-6' : ''}`}
              >
                {isSpacingRow ? (
                  // Render invisible spacing for upper floors
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
                      />
                    ) : (
                      <div 
                        key={`aisle-${i}-${idx}`} 
                        className="w-4 h-9"
                      />
                    )
                  )
                )}
              </div>
            );
          })}
          {vehicleType === "bus" && (
            <div className="flex items-center justify-center gap-1 mt-4 mb-2 text-xs text-gray-600">
            </div>
          )}
        </div>
      </BusFrame>
      
      <div className="mt-4 text-sm text-center">
        Kursi dipilih: <span className="font-bold">{selectedSeats.join(", ") || "Belum ada kursi dipilih"}</span>
      </div>
    </div>
  );
};

export default SeatPickerComponent;
export { generateMinibusLayout, generateBusLayout };
