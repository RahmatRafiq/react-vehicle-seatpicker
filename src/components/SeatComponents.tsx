import React from "react";
import type { Seat, VehicleType, SeatLegendProps, DriverSeatProps } from "../types";
import styles from './SeatComponents.module.css';

export const RegularSeatIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
    <svg 
        className={styles.icon}
        width={size} 
        height={size} 
        viewBox="0 0 16 16" 
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{transform: 'rotate(180deg)'}}
    >
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

export const DriverSeat: React.FC<DriverSeatProps> = ({ color }) => (
    <div className={styles.driverSeat} style={color ? { backgroundColor: color } : undefined}>
        <SteeringWheelIcon size={14} />
    </div>
);

export const SeatButton: React.FC<{
    seat: Seat;
    isReserved: boolean;
    isSelected: boolean;
    onClick: () => void;
    colors?: Record<string, string>;
}> = ({ seat, isReserved, isSelected, onClick, colors }) => {
    if (seat.isDriver) {
        return <DriverSeat color={colors?.driver} />;
    }

    const getClassName = () => {
        const classes = [styles.seatButton];
        if (isReserved) classes.push(styles.reserved);
        if (isSelected) classes.push(styles.selected);
        if (seat.type === "sleeper") classes.push(styles.sleeperSeat);
        if (seat.type === "vip") classes.push(styles.vipSeat);
        return classes.join(" ");
    };

    const getStyle = () => {
        const style: React.CSSProperties = {};
        if (colors) {
            if (isReserved && colors.reserved) style.backgroundColor = colors.reserved;
            else if (isSelected && colors.selected) style.backgroundColor = colors.selected;
            else if (seat.type === "sleeper" && colors.sleeper) style.backgroundColor = colors.sleeper;
            else if (seat.type === "vip" && colors.vip) style.backgroundColor = colors.vip;
            else if (colors.available) style.backgroundColor = colors.available;
        }
        return style;
    };

    return (
        <div className={styles.seatWrapper}>
            <button
                type="button"
                disabled={isReserved || seat.isDriver}
                onClick={onClick}
                className={getClassName()}
                style={getStyle()}
                title={seat.number}
                aria-label={`Seat ${seat.number}`}
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
                    <div className={styles.busBack}>
                        <span className={styles.busBackText}>Belakang Bus</span>
                    </div>
                    <div className={styles.busBackLightLeft} />
                    <div className={styles.busBackLightRight} />
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

export const SeatLegend: React.FC<SeatLegendProps> = ({ 
    show = true, 
    items = ["reserved", "selected", "available", "driver", "sleeper", "vip"],
    labels = {
        reserved: "Sudah dipesan",
        selected: "Dipilih",
        available: "Tersedia",
        driver: "Sopir",
        sleeper: "Sleeper",
        vip: "VIP"
    },
    colors
}) => {
    if (!show) return null;

    const legendItems: Record<string, JSX.Element> = {
        reserved: (
            <div className={styles.legendItem}>
                <span className={styles.legendReserved} style={colors?.reserved ? { backgroundColor: colors.reserved } : undefined}>
                    <RegularSeatIcon size={14} />
                </span>
                <span className={styles.legendText}>{labels.reserved}</span>
            </div>
        ),
        selected: (
            <div className={styles.legendItem}>
                <span className={styles.legendSelected} style={colors?.selected ? { backgroundColor: colors.selected } : undefined}>
                    <RegularSeatIcon size={14} />
                </span>
                <span className={styles.legendText}>{labels.selected}</span>
            </div>
        ),
        available: (
            <div className={styles.legendItem}>
                <span className={styles.legendAvailable} style={colors?.available ? { backgroundColor: colors.available } : undefined}>
                    <RegularSeatIcon size={14} />
                </span>
                <span className={styles.legendText}>{labels.available}</span>
            </div>
        ),
        driver: (
            <div className={styles.legendItem}>
                <span className={styles.legendDriver} style={colors?.driver ? { backgroundColor: colors.driver } : undefined}>
                    <SteeringWheelIcon size={12} />
                </span>
                <span className={styles.legendText}>{labels.driver}</span>
            </div>
        ),
        sleeper: (
            <div className={styles.legendItem}>
                <span className={styles.legendSleeper} style={colors?.sleeper ? { backgroundColor: colors.sleeper } : undefined}>
                    <SleeperSeatIcon size={12} />
                </span>
                <span className={styles.legendText}>{labels.sleeper}</span>
            </div>
        ),
        vip: (
            <div className={styles.legendItem}>
                <span className={styles.legendVip} style={colors?.vip ? { backgroundColor: colors.vip } : undefined}>
                    <RegularSeatIcon size={14} />
                </span>
                <span className={styles.legendText}>{labels.vip}</span>
            </div>
        )
    };

    return (
        <div className={styles.legendContainer}>
            {items.map((item, index) => (
                <React.Fragment key={item}>
                    {legendItems[item]}
                </React.Fragment>
            ))}
        </div>
    );
};