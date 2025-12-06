import { type FC } from 'react';
import styles from './KanbanIcon.module.scss';

export interface KanbanIconProps {
    className?: string;
    style?: React.CSSProperties;
}

export const KanbanIcon: FC<KanbanIconProps> = ({ className, style }) => {
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
                d="M9.00033 2.73268L9.00033 13.266C9.00033 14.266 9.42699 14.666 10.487 14.666H13.1803C14.2403 14.666 14.667 14.266 14.667 13.266L14.667 2.73268C14.667 1.73268 14.2403 1.33268 13.1803 1.33268H10.487C9.42699 1.33268 9.00033 1.73268 9.00033 2.73268Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M1.33333 7.39935L1.33333 13.266C1.33333 14.266 1.76 14.666 2.82 14.666H5.51333C6.57333 14.666 7 14.266 7 13.266L7 7.39935C7 6.39935 6.57333 5.99935 5.51333 5.99935H2.82C1.76 5.99935 1.33333 6.39935 1.33333 7.39935Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

