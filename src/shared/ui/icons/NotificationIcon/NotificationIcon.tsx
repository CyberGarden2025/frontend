import { type FC } from 'react';

export interface NotificationIconProps {
    className?: string;
    style?: React.CSSProperties;
}

export const NotificationIcon: FC<NotificationIconProps> = ({ className, style }) => {
    return (
        <svg
            className={className}
            style={style}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M7.57496 17.5C8.11662 18.2083 8.99162 18.75 9.99996 18.75C11.0083 18.75 11.8833 18.2083 12.425 17.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M15.8333 7.5C15.8333 5.625 14.1666 4.16667 12.0833 4.16667C12.0833 3.33333 11.4166 2.66667 10.5833 2.66667H9.41663C8.58329 2.66667 7.91663 3.33333 7.91663 4.16667C5.83329 4.16667 4.16663 5.625 4.16663 7.5C4.16663 11.25 2.49996 12.5 2.49996 12.5H17.5C17.5 12.5 15.8333 11.25 15.8333 7.5Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

