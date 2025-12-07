import { type FC } from 'react';

export interface AddIconProps {
    className?: string;
    style?: React.CSSProperties;
}

export const AddIcon: FC<AddIconProps> = ({ className, style }) => {
    return (
        <svg style={style} className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.16699 10H15.8337" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M10 15.8327V4.16602" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    );
};

