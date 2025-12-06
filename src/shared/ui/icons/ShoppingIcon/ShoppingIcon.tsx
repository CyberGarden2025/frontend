import { type FC } from 'react';

export interface ShoppingIconProps {
    className?: string;
    style?: React.CSSProperties;
}

export const ShoppingIcon: FC<ShoppingIconProps> = ({ className, style }) => {
    return (
        <svg className={className} style={style} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.87329 1.33398L3.45996 3.75398" stroke="#1F1F1F" stroke-width="0.8" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M10.127 1.33398L12.5403 3.75398" stroke="#1F1F1F" stroke-width="0.8" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M1.33301 5.23372C1.33301 4.00039 1.99301 3.90039 2.81301 3.90039H13.1863C14.0063 3.90039 14.6663 4.00039 14.6663 5.23372C14.6663 6.66706 14.0063 6.56706 13.1863 6.56706H2.81301C1.99301 6.56706 1.33301 6.66706 1.33301 5.23372Z" stroke="#1F1F1F" stroke-width="0.8"/>
            <path d="M6.50684 9.33398V11.7007" stroke="#1F1F1F" stroke-width="0.8" stroke-linecap="round"/>
            <path d="M9.57324 9.33398V11.7007" stroke="#1F1F1F" stroke-width="0.8" stroke-linecap="round"/>
            <path d="M2.33301 6.66602L3.27301 12.426C3.48634 13.7193 3.99967 14.666 5.90634 14.666H9.92634C11.9997 14.666 12.3063 13.7593 12.5463 12.506L13.6663 6.66602" stroke="#1F1F1F" stroke-width="0.8" stroke-linecap="round"/>
        </svg>
    );
};

