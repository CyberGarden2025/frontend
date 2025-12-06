import { type FC } from 'react';

export interface SalaryIconProps {
    className?: string;
    style?: React.CSSProperties;
}

export const SalaryIcon: FC<SalaryIconProps> = ({ className, style }) => {
    return (
        <svg className={className} style={style} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.8">
            <path d="M14.6663 7.99935V11.3327C14.6663 13.3327 13.333 14.666 11.333 14.666H4.66634C2.66634 14.666 1.33301 13.3327 1.33301 11.3327V7.99935C1.33301 6.18602 2.42634 4.91935 4.12634 4.70601C4.29967 4.67935 4.47967 4.66602 4.66634 4.66602H11.333C11.5063 4.66602 11.673 4.67267 11.833 4.69934C13.553 4.89934 14.6663 6.17268 14.6663 7.99935Z" stroke="#1F1F1F" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M11.8346 4.70065C11.6746 4.67398 11.5079 4.66732 11.3346 4.66732H4.66793C4.48126 4.66732 4.30126 4.68066 4.12793 4.70732C4.22126 4.52066 4.3546 4.34732 4.5146 4.18732L6.68126 2.01398C7.5946 1.10732 9.0746 1.10732 9.98793 2.01398L11.1546 3.194C11.5813 3.614 11.8079 4.14732 11.8346 4.70065Z" stroke="#1F1F1F" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M14.6663 8.33398H12.6663C11.933 8.33398 11.333 8.93398 11.333 9.66732C11.333 10.4007 11.933 11.0007 12.6663 11.0007H14.6663" stroke="#1F1F1F" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
        </svg>
    );
};

