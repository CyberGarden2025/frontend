import { type FC } from 'react';
import styles from './WalletIcon.module.scss';

export interface WalletIconProps {
    className?: string;
    style?: React.CSSProperties;
}

export const WalletIcon: FC<WalletIconProps> = ({ className, style }) => {
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
                d="M14.6668 7.99935V11.3327C14.6668 13.3327 13.3335 14.666 11.3335 14.666H4.66683C2.66683 14.666 1.3335 13.3327 1.3335 11.3327V7.99935C1.3335 6.18602 2.42683 4.91935 4.12683 4.70601C4.30016 4.67935 4.48016 4.66602 4.66683 4.66602H11.3335C11.5068 4.66602 11.6735 4.67267 11.8335 4.69934C13.5535 4.89934 14.6668 6.17268 14.6668 7.99935Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M11.8341 4.70065C11.6741 4.67398 11.5074 4.66732 11.3341 4.66732H4.66744C4.48077 4.66732 4.30077 4.68066 4.12744 4.70732C4.22077 4.52066 4.35411 4.34732 4.51411 4.18732L6.68078 2.01398C7.59411 1.10732 9.07411 1.10732 9.98744 2.01398L11.1541 3.194C11.5808 3.614 11.8074 4.14732 11.8341 4.70065Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M14.6668 8.33398H12.6668C11.9335 8.33398 11.3335 8.93398 11.3335 9.66732C11.3335 10.4007 11.9335 11.0007 12.6668 11.0007H14.6668"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};


