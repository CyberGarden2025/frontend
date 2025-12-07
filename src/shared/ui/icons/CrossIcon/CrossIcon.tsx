import { type FC } from 'react';

export interface CrossIconProps {
    className?: string;
    style?: React.CSSProperties;
}

export const CrossIcon: FC<CrossIconProps> = ({ className, style }) => {
    return (
        <svg
            className={className}
            style={style}
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M10.2995 10.2993L3.69983 3.69959" stroke="#999999" stroke-linecap="round" />
            <path d="M10.3002 3.69959L3.70051 10.2993" stroke="#999999" stroke-linecap="round" />
        </svg>
    );
};
