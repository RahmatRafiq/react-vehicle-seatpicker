import React from "react";
import type { Seat, VehicleType } from "../types";

export const RegularSeatIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{transform: 'rotate(180deg)'}}>
        <rect x="2" y="2" width="12" height="3" rx="1" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <rect x="3" y="5" width="10" height="8" rx="1" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <rect x="1" y="6" width="2" height="5" rx="0.5" fill="none" stroke="currentColor" strokeWidth="1" />
        <rect x="13" y="6" width="2" height="5" rx="0.5" fill="none" stroke="currentColor" strokeWidth="1" />
    </svg>
);

export const SleeperSeatIcon: React.FC<{ size?: number }> = ({ size = 18 }) => (
    <svg width={size} height={size + 2} viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{transform: 'rotate(180deg)'}}>
        <rect x="1" y="3" width="12" height="14" rx="0.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <rect x="3" y="1" width="8" height="4" rx="0.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <path d="M2 5 L8 5 L12 9 L12 15 L6 15 Z" fill="none" stroke="currentColor" strokeWidth="1" />
    </svg>
);

export const SteeringWheelIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" fill="none"/>
        <circle cx="12" cy="12" r="3" fill="currentColor"/>
        <path d="M12 3v6M12 15v6M3 12h6M15 12h6" stroke="currentColor" strokeWidth="2"/>
    </svg>
);

export const DriverSeat: React.FC = () => (
    <div className="w-8 h-8 rounded-lg border border-gray-400 bg-yellow-400 text-white shadow-lg flex items-center justify-center relative">
        <SteeringWheelIcon size={14} />
    </div>
);

export const SeatButton: React.FC<{
    seat: Seat;
    isReserved: boolean;
    isSelected: boolean;
    onClick: () => void;
}> = ({ seat, isReserved, isSelected, onClick }) => {
    if (seat.isDriver) {
        return <DriverSeat />;
    }

    const getSeatColor = () => {
        if (isReserved) return "bg-red-500 text-white";
        if (isSelected) return "bg-green-600 text-white";
        if (seat.type === "sleeper") return "bg-blue-400 text-white";
        if (seat.type === "vip") return "bg-purple-500 text-white";
        return "bg-gray-100 text-gray-700";
    };

    return (
        <div className="relative group">
            <button
                type="button"
                disabled={isReserved || seat.isDriver}
                onClick={onClick}
                className={`w-8 h-8 rounded-lg border flex items-center justify-center text-xs font-bold
                    ${getSeatColor()}
                    border-gray-400 shadow-lg hover:scale-110 transition-all duration-150`}
                title={seat.type === "sleeper" ? "Sleeper" : seat.type === "vip" ? "VIP" : isReserved ? "Sudah dipesan" : "Kursi tersedia"}
                aria-label={seat.type === "sleeper" ? `Sleeper ${seat.number}` : seat.type === "vip" ? `VIP ${seat.number}` : isReserved ? "Sudah dipesan" : `Kursi ${seat.number}`}
            >
                <span style={seat.seatRotation ? { display: 'inline-block', transform: `rotate(${seat.seatRotation}deg)` } : {}}>
                    {seat.type === "sleeper" ? (
                        <SleeperSeatIcon size={16} />
                    ) : (
                        <div className="relative">
                            <RegularSeatIcon size={16} />
                            <span className="absolute inset-0 flex items-center justify-center text-[7px] font-bold" style={{marginTop: '1px'}}>
                                {seat.number}
                            </span>
                        </div>
                    )}
                </span>
            </button>
        </div>
    );
};

export const BusFrame: React.FC<{ children: React.ReactNode; vehicleType?: VehicleType }> = ({ children, vehicleType }) => {
    const getFrameStyle = () => {
        if (vehicleType === "bus") {
            return "bg-gradient-to-b from-gray-100 to-gray-200 border-2 border-gray-500 rounded-2xl shadow-2xl relative overflow-hidden max-w-50 mx-auto";
        }
        return "bg-gray-50 rounded-xl shadow-lg max-w-56 mx-auto";
    };

    const getFrontStyle = () => {
        if (vehicleType === "bus") {
            return (
                <>
                    <div className="absolute top-1 left-1/2 -translate-x-1/2 w-4/5 h-6 bg-gradient-to-b from-sky-200 to-sky-300 border border-sky-400 rounded-t-xl opacity-80 flex items-center justify-center">
                        <span className="text-[8px] font-semibold text-gray-700">Depan Bus</span>
                    </div>
                    <div className="absolute top-1.5 left-3 w-1.5 h-1.5 bg-yellow-300 rounded-full border border-yellow-400"></div>
                    <div className="absolute top-1.5 right-3 w-1.5 h-1.5 bg-yellow-300 rounded-full border border-yellow-400"></div>
                </>
            );
        }
        return null;
    };

    const getBackStyle = () => {
        if (vehicleType === "bus") {
            return (
                <>
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-2/5 h-4 border border-gray-600 rounded bg-gray-300 flex items-center justify-center">
                        <span className="text-[7px] font-semibold text-gray-700">Belakang Bus</span>
                    </div>
                    <div className="absolute bottom-1.5 left-3 w-1.5 h-1.5 bg-red-400 rounded-full border border-red-500"></div>
                    <div className="absolute bottom-1.5 right-3 w-1.5 h-1.5 bg-red-400 rounded-full border border-red-500"></div>
                </>
            );
        }
        return null;
    };

    const getSideDetails = () => {
        if (vehicleType === "bus") {
            return (
                <>
                    <div className="absolute left-0.5 top-6 bottom-6 w-0.5 bg-sky-200 border border-sky-300 opacity-60"></div>
                    <div className="absolute right-0.5 top-6 bottom-6 w-0.5 bg-sky-200 border border-sky-300 opacity-60"></div>
                    <div className="absolute left-1 bottom-4 w-2 h-2 bg-gray-800 rounded-full"></div>
                    <div className="absolute right-1 bottom-4 w-2 h-2 bg-gray-800 rounded-full"></div>
                    <div className="absolute left-12 bottom-4 w-2 h-2 bg-gray-800 rounded-full"></div>
                    <div className="absolute right-12 bottom-4 w-2 h-2 bg-gray-800 rounded-full"></div>
                </>
            );
        }
        return null;
    };

    return (
        <div className={getFrameStyle()}>
            {getFrontStyle()}
            {getSideDetails()}
            <div className="px-2 py-3 relative">
                {children}
            </div>
            {getBackStyle()}
        </div>
    );
};

export const SeatLegend: React.FC = () => (
    <div className="flex gap-3 items-center mb-4 flex-wrap justify-center">
        <div className="flex items-center gap-1">
            <span className="w-6 h-6 rounded bg-red-500 border border-gray-400 flex items-center justify-center">
                <RegularSeatIcon size={14} />
            </span>
            <span className="text-xs text-gray-700">Sudah dipesan</span>
        </div>
        <div className="flex items-center gap-1">
            <span className="w-6 h-6 rounded bg-green-600 border border-gray-400 flex items-center justify-center">
                <RegularSeatIcon size={14} />
            </span>
            <span className="text-xs text-gray-700">Dipilih</span>
        </div>
        <div className="flex items-center gap-1">
            <span className="w-6 h-6 rounded bg-gray-100 border border-gray-400 flex items-center justify-center">
                <RegularSeatIcon size={14} />
            </span>
            <span className="text-xs text-gray-700">Tersedia</span>
        </div>
        <div className="flex items-center gap-1">
            <span className="w-6 h-6 rounded bg-yellow-400 border border-gray-400 flex items-center justify-center">
                <SteeringWheelIcon size={12} />
            </span>
            <span className="text-xs text-gray-700">Sopir</span>
        </div>
        <div className="flex items-center gap-1">
            <span className="w-6 h-6 rounded bg-blue-400 border border-gray-400 flex items-center justify-center">
                <SleeperSeatIcon size={12} />
            </span>
            <span className="text-xs text-gray-700">Sleeper</span>
        </div>
        <div className="flex items-center gap-1">
            <span className="w-6 h-6 rounded bg-purple-500 border border-gray-400 flex items-center justify-center">
                <RegularSeatIcon size={14} />
            </span>
            <span className="text-xs text-gray-700">VIP</span>
        </div>
    </div>
);