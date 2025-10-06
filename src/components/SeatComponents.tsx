import React from "react";
import type { Seat, VehicleType } from "../types";
import styles from './SeatComponents.module.css';

export const RegularSeatIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
    <svg 
        className={styles.icon}
        width={size} 
        height={size} 
        viewBox="0 0 16 16" 
        style={{transform: 'rotate(180deg)'}}
    >
        <rect x="2" y="2" width="12" height="3" rx="1" />
        <rect x="3" y="5" width="10" height="8" rx="1" />
        <rect x="1" y="6" width="2" height="5" rx="0.5" />
        <rect x="13" y="6" width="2" height="5" rx="0.5" />
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
    <div className={styles.driverSeat}>
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

    const getClassName = () => {
        const classes = [styles.seatButton];
        if (isReserved) classes.push(styles.reserved);
        if (isSelected) classes.push(styles.selected);
        if (seat.type === "sleeper") classes.push(styles.sleeperSeat);
        if (seat.type === "vip") classes.push(styles.vipSeat);
        return classes.join(" ");
    };

    return (
        <div className={styles.seatWrapper}>
            <button
                type="button"
                disabled={isReserved || seat.isDriver}
                onClick={onClick}
                className={getClassName()}
                title={seat.type === "sleeper" ? "Sleeper" : seat.type === "vip" ? "VIP" : isReserved ? "Sudah dipesan" : "Kursi tersedia"}
                aria-label={seat.type === "sleeper" ? `Sleeper ${seat.number}` : seat.type === "vip" ? `VIP ${seat.number}` : isReserved ? "Sudah dipesan" : `Kursi ${seat.number}`}
            >
                <span style={seat.seatRotation ? { display: 'inline-block', transform: `rotate(${seat.seatRotation}deg)` } : {}}>
                    {seat.type === "sleeper" ? (
                        <SleeperSeatIcon size={16} />
                    ) : (
                        <div className={styles.seatContent}>
                            <RegularSeatIcon size={16} />
                            <span className={styles.seatNumber}>
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
    return (
        <div className={vehicleType === "bus" ? styles.busFrame : styles.minibusFrame}>
            {vehicleType === "bus" && (
                <>
                    <div className={styles.busFront}>
                        <span className={styles.frontText}>Depan Bus</span>
                    </div>
                    <div className={styles.frontLightLeft} />
                    <div className={styles.frontLightRight} />
                    <div className={styles.content}>
                        {children}
                    </div>
                </>
            )}
            {vehicleType !== "bus" && (
                <div className={styles.content}>
                    {children}
                </div>
            )}
        </div>
    );
};

export const SeatLegend: React.FC = () => (
    <div className={styles.legendContainer}>
        <div className={styles.legendItem}>
            <span className={styles.legendReserved}>
                <RegularSeatIcon size={14} />
            </span>
            <span className={styles.legendText}>Sudah dipesan</span>
        </div>
        <div className={styles.legendItem}>
            <span className={styles.legendSelected}>
                <RegularSeatIcon size={14} />
            </span>
            <span className={styles.legendText}>Dipilih</span>
        </div>
        <div className={styles.legendItem}>
            <span className={styles.legendAvailable}>
                <RegularSeatIcon size={14} />
            </span>
            <span className={styles.legendText}>Tersedia</span>
        </div>
        <div className={styles.legendItem}>
            <span className={styles.legendDriver}>
                <SteeringWheelIcon size={12} />
            </span>
            <span className={styles.legendText}>Sopir</span>
        </div>
        <div className={styles.legendItem}>
            <span className={styles.legendSleeper}>
                <SleeperSeatIcon size={12} />
            </span>
            <span className={styles.legendText}>Sleeper</span>
        </div>
        <div className={styles.legendItem}>
            <span className={styles.legendVip}>
                <RegularSeatIcon size={14} />
            </span>
            <span className={styles.legendText}>VIP</span>
        </div>
    </div>
);