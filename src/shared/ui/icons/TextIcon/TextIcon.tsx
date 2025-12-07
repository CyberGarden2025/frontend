import { type FC } from 'react';

export interface TextIconProps {
    className?: string;
    style?: React.CSSProperties;
}

export const TextIcon: FC<TextIconProps> = ({ className, style }) => {
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
                d="M1.33301 12L2.7219 8.66667M7.99967 12L6.61079 8.66667M2.7219 8.66667L4.66634 4L6.61079 8.66667M2.7219 8.66667H6.61079"
                stroke="black"
                stroke-linecap="round"
            />
            <circle cx="11.9997" cy="9.33268" r="2.66667" stroke="black" stroke-linecap="round" />
            <line x1="14.5" y1="6.5" x2="14.5" y2="12.1667" stroke="black" stroke-linecap="round" />
        </svg>
    );
};
