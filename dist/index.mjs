// src/SeatComponents.tsx
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
var RegularSeatIcon = ({ size = 16 }) => /* @__PURE__ */ jsxs("svg", { width: size, height: size, viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", style: { transform: "rotate(180deg)" }, children: [
  /* @__PURE__ */ jsx("rect", { x: "2", y: "2", width: "12", height: "3", rx: "1", fill: "none", stroke: "currentColor", strokeWidth: "1.2" }),
  /* @__PURE__ */ jsx("rect", { x: "3", y: "5", width: "10", height: "8", rx: "1", fill: "none", stroke: "currentColor", strokeWidth: "1.2" }),
  /* @__PURE__ */ jsx("rect", { x: "1", y: "6", width: "2", height: "5", rx: "0.5", fill: "none", stroke: "currentColor", strokeWidth: "1" }),
  /* @__PURE__ */ jsx("rect", { x: "13", y: "6", width: "2", height: "5", rx: "0.5", fill: "none", stroke: "currentColor", strokeWidth: "1" })
] });
var SleeperSeatIcon = ({ size = 18 }) => /* @__PURE__ */ jsxs("svg", { width: size, height: size + 2, viewBox: "0 0 14 18", fill: "none", xmlns: "http://www.w3.org/2000/svg", style: { transform: "rotate(180deg)" }, children: [
  /* @__PURE__ */ jsx("rect", { x: "1", y: "3", width: "12", height: "14", rx: "0.5", fill: "none", stroke: "currentColor", strokeWidth: "1.2" }),
  /* @__PURE__ */ jsx("rect", { x: "3", y: "1", width: "8", height: "4", rx: "0.5", fill: "none", stroke: "currentColor", strokeWidth: "1.2" }),
  /* @__PURE__ */ jsx("path", { d: "M2 5 L8 5 L12 9 L12 15 L6 15 Z", fill: "none", stroke: "currentColor", strokeWidth: "1" })
] });
var SteeringWheelIcon = ({ size = 16 }) => /* @__PURE__ */ jsxs("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
  /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "9", stroke: "currentColor", strokeWidth: "2", fill: "none" }),
  /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "3", fill: "currentColor" }),
  /* @__PURE__ */ jsx("path", { d: "M12 3v6M12 15v6M3 12h6M15 12h6", stroke: "currentColor", strokeWidth: "2" })
] });
var DriverSeat = () => /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-lg border border-gray-400 bg-yellow-400 text-white shadow-lg flex items-center justify-center relative", children: /* @__PURE__ */ jsx(SteeringWheelIcon, { size: 14 }) });
var SeatButton = ({ seat, isReserved, isSelected, onClick }) => {
  if (seat.isDriver) {
    return /* @__PURE__ */ jsx(DriverSeat, {});
  }
  const getSeatColor = () => {
    if (isReserved) return "bg-red-500 text-white";
    if (isSelected) return "bg-green-600 text-white";
    if (seat.type === "sleeper") return "bg-blue-400 text-white";
    if (seat.type === "vip") return "bg-purple-500 text-white";
    return "bg-gray-100 text-gray-700";
  };
  return /* @__PURE__ */ jsx("div", { className: "relative group", children: /* @__PURE__ */ jsx(
    "button",
    {
      type: "button",
      disabled: isReserved || seat.isDriver,
      onClick,
      className: `w-8 h-8 rounded-lg border flex items-center justify-center text-xs font-bold
                    ${getSeatColor()}
                    border-gray-400 shadow-lg hover:scale-110 transition-all duration-150`,
      title: seat.type === "sleeper" ? "Sleeper" : seat.type === "vip" ? "VIP" : isReserved ? "Sudah dipesan" : "Kursi tersedia",
      "aria-label": seat.type === "sleeper" ? `Sleeper ${seat.number}` : seat.type === "vip" ? `VIP ${seat.number}` : isReserved ? "Sudah dipesan" : `Kursi ${seat.number}`,
      children: /* @__PURE__ */ jsx("span", { style: seat.seatRotation ? { display: "inline-block", transform: `rotate(${seat.seatRotation}deg)` } : {}, children: seat.type === "sleeper" ? /* @__PURE__ */ jsx(SleeperSeatIcon, { size: 16 }) : /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx(RegularSeatIcon, { size: 16 }),
        /* @__PURE__ */ jsx("span", { className: "absolute inset-0 flex items-center justify-center text-[7px] font-bold", style: { marginTop: "1px" }, children: seat.number })
      ] }) })
    }
  ) });
};
var BusFrame = ({ children, vehicleType }) => {
  const getFrameStyle = () => {
    if (vehicleType === "bus") {
      return "bg-gradient-to-b from-gray-100 to-gray-200 border-2 border-gray-500 rounded-2xl shadow-2xl relative overflow-hidden max-w-50 mx-auto";
    }
    return "bg-gray-50 rounded-xl shadow-lg max-w-56 mx-auto";
  };
  const getFrontStyle = () => {
    if (vehicleType === "bus") {
      return /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-1 left-1/2 -translate-x-1/2 w-4/5 h-6 bg-gradient-to-b from-sky-200 to-sky-300 border border-sky-400 rounded-t-xl opacity-80 flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "text-[8px] font-semibold text-gray-700", children: "Depan Bus" }) }),
        /* @__PURE__ */ jsx("div", { className: "absolute top-1.5 left-3 w-1.5 h-1.5 bg-yellow-300 rounded-full border border-yellow-400" }),
        /* @__PURE__ */ jsx("div", { className: "absolute top-1.5 right-3 w-1.5 h-1.5 bg-yellow-300 rounded-full border border-yellow-400" })
      ] });
    }
    return null;
  };
  const getBackStyle = () => {
    if (vehicleType === "bus") {
      return /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("div", { className: "absolute bottom-1 left-1/2 -translate-x-1/2 w-2/5 h-4 border border-gray-600 rounded bg-gray-300 flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "text-[7px] font-semibold text-gray-700", children: "Belakang Bus" }) }),
        /* @__PURE__ */ jsx("div", { className: "absolute bottom-1.5 left-3 w-1.5 h-1.5 bg-red-400 rounded-full border border-red-500" }),
        /* @__PURE__ */ jsx("div", { className: "absolute bottom-1.5 right-3 w-1.5 h-1.5 bg-red-400 rounded-full border border-red-500" })
      ] });
    }
    return null;
  };
  const getSideDetails = () => {
    if (vehicleType === "bus") {
      return /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("div", { className: "absolute left-0.5 top-6 bottom-6 w-0.5 bg-sky-200 border border-sky-300 opacity-60" }),
        /* @__PURE__ */ jsx("div", { className: "absolute right-0.5 top-6 bottom-6 w-0.5 bg-sky-200 border border-sky-300 opacity-60" }),
        /* @__PURE__ */ jsx("div", { className: "absolute left-1 bottom-4 w-2 h-2 bg-gray-800 rounded-full" }),
        /* @__PURE__ */ jsx("div", { className: "absolute right-1 bottom-4 w-2 h-2 bg-gray-800 rounded-full" }),
        /* @__PURE__ */ jsx("div", { className: "absolute left-12 bottom-4 w-2 h-2 bg-gray-800 rounded-full" }),
        /* @__PURE__ */ jsx("div", { className: "absolute right-12 bottom-4 w-2 h-2 bg-gray-800 rounded-full" })
      ] });
    }
    return null;
  };
  return /* @__PURE__ */ jsxs("div", { className: getFrameStyle(), children: [
    getFrontStyle(),
    getSideDetails(),
    /* @__PURE__ */ jsx("div", { className: "px-2 py-3 relative", children }),
    getBackStyle()
  ] });
};
var SeatLegend = () => /* @__PURE__ */ jsxs("div", { className: "flex gap-3 items-center mb-4 flex-wrap justify-center", children: [
  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
    /* @__PURE__ */ jsx("span", { className: "w-6 h-6 rounded bg-red-500 border border-gray-400 flex items-center justify-center", children: /* @__PURE__ */ jsx(RegularSeatIcon, { size: 14 }) }),
    /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-700", children: "Sudah dipesan" })
  ] }),
  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
    /* @__PURE__ */ jsx("span", { className: "w-6 h-6 rounded bg-green-600 border border-gray-400 flex items-center justify-center", children: /* @__PURE__ */ jsx(RegularSeatIcon, { size: 14 }) }),
    /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-700", children: "Dipilih" })
  ] }),
  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
    /* @__PURE__ */ jsx("span", { className: "w-6 h-6 rounded bg-gray-100 border border-gray-400 flex items-center justify-center", children: /* @__PURE__ */ jsx(RegularSeatIcon, { size: 14 }) }),
    /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-700", children: "Tersedia" })
  ] }),
  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
    /* @__PURE__ */ jsx("span", { className: "w-6 h-6 rounded bg-yellow-400 border border-gray-400 flex items-center justify-center", children: /* @__PURE__ */ jsx(SteeringWheelIcon, { size: 12 }) }),
    /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-700", children: "Sopir" })
  ] }),
  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
    /* @__PURE__ */ jsx("span", { className: "w-6 h-6 rounded bg-blue-400 border border-gray-400 flex items-center justify-center", children: /* @__PURE__ */ jsx(SleeperSeatIcon, { size: 12 }) }),
    /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-700", children: "Sleeper" })
  ] }),
  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
    /* @__PURE__ */ jsx("span", { className: "w-6 h-6 rounded bg-purple-500 border border-gray-400 flex items-center justify-center", children: /* @__PURE__ */ jsx(RegularSeatIcon, { size: 14 }) }),
    /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-700", children: "VIP" })
  ] })
] });

// src/toggle-tabs.tsx
import clsx from "clsx";
import { jsx as jsx2 } from "react/jsx-runtime";
function ToggleTabs({ tabs, active, onChange }) {
  return /* @__PURE__ */ jsx2("div", { className: "inline-flex gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800", children: tabs.map((tab) => /* @__PURE__ */ jsx2(
    "button",
    {
      onClick: () => onChange(tab),
      className: clsx(
        "flex items-center rounded-md px-3.5 py-1.5 transition-colors",
        active === tab ? "bg-white shadow-xs dark:bg-neutral-700 dark:text-neutral-100" : "text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60"
      ),
      children: tab.charAt(0).toUpperCase() + tab.slice(1)
    },
    tab
  )) });
}

// src/SeatPickerComponent.tsx
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
function generateBusLayout(seatCount, rowConfig = [4, 4, 4, 4, 4, 4, 4], withDriver = true, seatTypes, defaultSeatType = "regular", isFirstFloor = true, startingSeatNumber = 1) {
  let seatNum = startingSeatNumber;
  const layout = [];
  if (withDriver) {
    const driverRow = [null, null, null, null, null, { id: "D", number: "Sopir", isReserved: true, isDriver: true, type: "driver" }];
    layout.push(driverRow);
  } else if (!isFirstFloor) {
    const spacingRow = [null, null, null, null, null, null];
    layout.push(spacingRow);
  }
  rowConfig.forEach((seatsInRow) => {
    const row = [];
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
function generateMinibusLayout(seatCount, rowConfig = [2, 2, 2, 2], withDriver = true, seatTypes, defaultSeatType = "regular", startingSeatNumber = 1) {
  let seatNum = startingSeatNumber;
  const layout = [];
  const createSeat = () => ({
    id: seatNum++,
    number: String(seatNum - 1),
    isReserved: false,
    type: seatTypes?.[seatNum - 1] || defaultSeatType
  });
  rowConfig.forEach((seatsInRow, i) => {
    const row = [];
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
var SeatPickerComponent = ({
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
  onFloorChange
}) => {
  const vehicleTypeToRowConfig = {
    minibus: [2, 2, 2, 2],
    bus: [4, 4, 4, 4, 4, 4, 4],
    elf: [1, 2, 2, 2, 1]
  };
  const finalRowConfig = rowConfig || vehicleTypeToRowConfig[vehicleType || "minibus"] || [2, 2, 2, 2];
  const seatLayout = layout || (() => {
    if (floorsConfig && Object.keys(floorsConfig).length > 0) {
      const currentFloor = selectedFloor || "1";
      const floorConfig = floorsConfig[currentFloor];
      if (floorConfig) {
        const floorRowConfig = floorConfig.row_config;
        const floorSeatTypes = floorConfig.seat_types || {};
        const floorDefaultType = floorConfig.default_seat_type || defaultSeatType;
        const floorSeatCount = floorRowConfig.reduce((a, b) => a + b, 0);
        const isFirstFloor = currentFloor === "1";
        let startingSeatNumber = 1;
        if (!isFirstFloor) {
          const floorNumbers = Object.keys(floorsConfig).map(Number).sort();
          const currentFloorNumber = parseInt(currentFloor);
          for (const floorNum of floorNumbers) {
            if (floorNum < currentFloorNumber) {
              const prevFloorConfig = floorsConfig[floorNum.toString()];
              if (prevFloorConfig) {
                startingSeatNumber += prevFloorConfig.row_config.reduce((a, b) => a + b, 0);
              }
            }
          }
        }
        return vehicleType === "bus" ? generateBusLayout(floorSeatCount, floorRowConfig, withDriver && isFirstFloor, floorSeatTypes, floorDefaultType, isFirstFloor, startingSeatNumber) : generateMinibusLayout(floorSeatCount + (withDriver && isFirstFloor ? 1 : 0), floorRowConfig, withDriver && isFirstFloor, floorSeatTypes, floorDefaultType, startingSeatNumber);
      }
    }
    const totalSeat = seatCount ?? finalRowConfig.reduce((a, b) => a + b, 0);
    return vehicleType === "bus" ? generateBusLayout(totalSeat, finalRowConfig, withDriver, seatTypes, defaultSeatType, true, 1) : generateMinibusLayout(totalSeat + (withDriver ? 1 : 0), finalRowConfig, withDriver, seatTypes, defaultSeatType, 1);
  })();
  const handleSeatClick = (seat) => {
    if (seat.isReserved || seat.isDriver || !onSelect) return;
    const seatIdStr = String(seat.id);
    const selectedSeatIds = selectedSeats.map(String);
    const newSeats = selectedSeatIds.includes(seatIdStr) ? selectedSeats.filter((id) => String(id) !== seatIdStr) : [...selectedSeats, seatIdStr];
    onSelect(newSeats);
  };
  return /* @__PURE__ */ jsxs2("div", { children: [
    /* @__PURE__ */ jsx3(SeatLegend, {}),
    floorsConfig && Object.keys(floorsConfig).length > 0 && /* @__PURE__ */ jsx3("div", { className: "flex justify-center mb-4", children: /* @__PURE__ */ jsx3(
      ToggleTabs,
      {
        tabs: Object.keys(floorsConfig).map((floor) => `floor-${floor}`),
        active: `floor-${selectedFloor || "1"}`,
        onChange: (tab) => {
          const floorNumber = tab.replace("floor-", "");
          onFloorChange?.(floorNumber);
        }
      }
    ) }),
    /* @__PURE__ */ jsxs2("h3", { className: "mb-4 font-bold text-center text-blue-700 text-lg", children: [
      "Pilih Kursi ",
      floorsConfig ? `(Lantai ${selectedFloor || "1"})` : ""
    ] }),
    /* @__PURE__ */ jsx3(BusFrame, { vehicleType, children: /* @__PURE__ */ jsxs2("div", { className: "flex flex-col gap-2 items-center", children: [
      seatLayout.map((row, i) => {
        const isSpacingRow = row.every((seat) => seat === null);
        return /* @__PURE__ */ jsx3(
          "div",
          {
            className: `flex justify-center items-center w-full gap-1 ${isSpacingRow ? "h-6" : ""}`,
            children: isSpacingRow ? (
              // Render invisible spacing for upper floors
              /* @__PURE__ */ jsx3("div", { className: "w-full h-6" })
            ) : row.map(
              (seat, idx) => seat ? /* @__PURE__ */ jsx3(
                SeatButton,
                {
                  seat,
                  isReserved: reservedSeats.includes(seat.id) || reservedSeats.includes(String(seat.id)) || seat.isReserved,
                  isSelected: selectedSeats.map(String).includes(String(seat.id)),
                  onClick: () => handleSeatClick(seat)
                },
                seat.id
              ) : /* @__PURE__ */ jsx3(
                "div",
                {
                  className: "w-4 h-9"
                },
                `aisle-${i}-${idx}`
              )
            )
          },
          i
        );
      }),
      vehicleType === "bus" && /* @__PURE__ */ jsx3("div", { className: "flex items-center justify-center gap-1 mt-4 mb-2 text-xs text-gray-600" })
    ] }) }),
    /* @__PURE__ */ jsxs2("div", { className: "mt-4 text-sm text-center", children: [
      "Kursi dipilih: ",
      /* @__PURE__ */ jsx3("span", { className: "font-bold", children: selectedSeats.join(", ") || "Belum ada kursi dipilih" })
    ] })
  ] });
};
var SeatPickerComponent_default = SeatPickerComponent;
export {
  BusFrame,
  DriverSeat,
  RegularSeatIcon,
  SeatButton,
  SeatLegend,
  SeatPickerComponent_default as SeatPickerComponent,
  SleeperSeatIcon,
  SteeringWheelIcon
};
