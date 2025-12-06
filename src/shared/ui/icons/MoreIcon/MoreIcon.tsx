import { type FC } from 'react';
import clsx from 'clsx';
import styles from './MoreIcon.module.scss';

export interface MoreIconProps {
    className?: string;
    style?: React.CSSProperties;
}

export const MoreIcon: FC<MoreIconProps> = ({ className, style }) => {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={clsx(styles.root, className)}
            style={style}
        >
            <path
                d="M14.6169 6.92422C15.7491 6.92422 16.6669 6.0064 16.6669 4.87422C16.6669 3.74203 15.7491 2.82422 14.6169 2.82422C13.4847 2.82422 12.5669 3.74203 12.5669 4.87422C12.5669 6.0064 13.4847 6.92422 14.6169 6.92422Z"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M5.3835 6.92422C6.51569 6.92422 7.43349 6.0064 7.43349 4.87422C7.43349 3.74203 6.51569 2.82422 5.3835 2.82422C4.25132 2.82422 3.3335 3.74203 3.3335 4.87422C3.3335 6.0064 4.25132 6.92422 5.3835 6.92422Z"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M14.6169 17.1742C15.7491 17.1742 16.6669 16.2564 16.6669 15.1242C16.6669 13.992 15.7491 13.0742 14.6169 13.0742C13.4847 13.0742 12.5669 13.992 12.5669 15.1242C12.5669 16.2564 13.4847 17.1742 14.6169 17.1742Z"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M5.3835 17.1742C6.51569 17.1742 7.43349 16.2564 7.43349 15.1242C7.43349 13.992 6.51569 13.0742 5.3835 13.0742C4.25132 13.0742 3.3335 13.992 3.3335 15.1242C3.3335 16.2564 4.25132 17.1742 5.3835 17.1742Z"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

