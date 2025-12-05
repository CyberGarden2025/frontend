import { type FC } from 'react';
import styles from './ChatIcon.module.scss';

export interface ChatIconProps {
    className?: string;
    style?: React.CSSProperties;
}

export const ChatIcon: FC<ChatIconProps> = ({ className, style }) => {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            style={style}
        >
            <path
                d="M12.3136 11.2207L12.5736 13.3273C12.6402 13.8806 12.0469 14.2673 11.5736 13.9806L8.78022 12.3206C8.47356 12.3206 8.17356 12.3007 7.88023 12.2607C8.37356 11.6807 8.66689 10.9473 8.66689 10.154C8.66689 8.26064 7.02689 6.72734 5.00022 6.72734C4.22689 6.72734 3.51356 6.94732 2.92023 7.33398C2.90023 7.16732 2.89355 7.00064 2.89355 6.82731C2.89355 3.79398 5.52689 1.33398 8.78022 1.33398C12.0336 1.33398 14.6669 3.79398 14.6669 6.82731C14.6669 8.62731 13.7402 10.2207 12.3136 11.2207Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M8.66634 10.1532C8.66634 10.9465 8.37301 11.6799 7.87968 12.2599C7.21968 13.0599 6.17301 13.5732 4.99967 13.5732L3.25967 14.6065C2.96634 14.7865 2.59301 14.5399 2.63301 14.1999L2.79967 12.8866C1.90634 12.2666 1.33301 11.2732 1.33301 10.1532C1.33301 8.97986 1.95968 7.94654 2.91968 7.33321C3.51301 6.94654 4.22634 6.72656 4.99967 6.72656C7.02634 6.72656 8.66634 8.25987 8.66634 10.1532Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

