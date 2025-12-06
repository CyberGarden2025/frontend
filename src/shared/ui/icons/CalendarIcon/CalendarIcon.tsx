import { type FC } from 'react';
import clsx from 'clsx';
import styles from './CalendarIcon.module.scss';

export interface CalendarIconProps {
    className?: string;
    style?: React.CSSProperties;
}

export const CalendarIcon: FC<CalendarIconProps> = ({ className, style }) => {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={clsx(styles.root, className)}
            style={style}
        >
            <path
                d="M6.6665 1.66602V4.16602"
                stroke="currentColor"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M13.3335 1.66602V4.16602"
                stroke="currentColor"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M2.9165 7.57422H17.0832"
                stroke="currentColor"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M17.5 7.08268V14.166C17.5 16.666 16.25 18.3327 13.3333 18.3327H6.66667C3.75 18.3327 2.5 16.666 2.5 14.166V7.08268C2.5 4.58268 3.75 2.91602 6.66667 2.91602H13.3333C16.25 2.91602 17.5 4.58268 17.5 7.08268Z"
                stroke="currentColor"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M9.99607 11.4167H10.0036"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M6.91209 11.4167H6.91957"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M6.91209 13.9167H6.91957"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

