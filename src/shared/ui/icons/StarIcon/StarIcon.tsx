import { type FC } from 'react';

export interface StarIconProps {
    className?: string;
    style?: React.CSSProperties;
}

export const StarIcon: FC<StarIconProps> = ({ className, style }) => {
    return (
        <svg
            className={className}
            style={style}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M7.99998 1.33333L9.75998 5.72666L14.6666 6.45333L11.3333 9.57333L12.2133 14.6667L7.99998 12.1733L3.78665 14.6667L4.66665 9.57333L1.33331 6.45333L6.23998 5.72666L7.99998 1.33333Z"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

