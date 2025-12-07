import { type FC } from 'react';

export interface ScanIconProps {
    className?: string;
    style?: React.CSSProperties;
}

export const ScanIcon: FC<ScanIconProps> = ({ className, style }) => {
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
<path d="M1.33301 6.00065V4.33398C1.33301 2.67398 2.67301 1.33398 4.33301 1.33398H5.99967" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10 1.33398H11.6667C13.3267 1.33398 14.6667 2.67398 14.6667 4.33398V6.00065" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.667 10.666V11.666C14.667 13.326 13.327 14.666 11.667 14.666H10.667" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5.99967 14.6667H4.33301C2.67301 14.6667 1.33301 13.3267 1.33301 11.6667V10" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.3337 6.33398V9.66732C11.3337 11.0007 10.667 11.6673 9.33366 11.6673H6.66699C5.33366 11.6673 4.66699 11.0007 4.66699 9.66732V6.33398C4.66699 5.00065 5.33366 4.33398 6.66699 4.33398H9.33366C10.667 4.33398 11.3337 5.00065 11.3337 6.33398Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.6663 8H3.33301" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    );
};

