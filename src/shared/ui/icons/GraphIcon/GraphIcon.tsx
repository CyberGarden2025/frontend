import { type FC } from 'react';
import styles from './GraphIcon.module.scss';

export interface GraphIconProps {
    className?: string;
    style?: React.CSSProperties;
}

export const GraphIcon: FC<GraphIconProps> = ({ className, style }) => {
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
                d="M2.66667 12.6667H13.3333"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M2.66667 8.66667L6 5.33333L9.33333 8.66667L13.3333 4.66667"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M13.3333 4.66667V2.66667H11.3333"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

