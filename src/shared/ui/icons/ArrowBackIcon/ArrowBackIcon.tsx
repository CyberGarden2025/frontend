import { type FC } from 'react';
import clsx from 'clsx';
import styles from './ArrowBackIcon.module.scss';

export interface ArrowBackIconProps {
    className?: string;
    style?: React.CSSProperties;
}

export const ArrowBackIcon: FC<ArrowBackIconProps> = ({ className, style }) => {
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
                d="M17.5 9.99935L2.5 9.99935"
                stroke="currentColor"
                strokeLinecap="round"
            />
            <path
                d="M7.5 5L2.5 10L7.5 15"
                stroke="currentColor"
                strokeLinecap="round"
            />
        </svg>
    );
};

