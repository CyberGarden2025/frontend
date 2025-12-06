import { type FC } from 'react';
import clsx from 'clsx';
import styles from './ExpandIcon.module.scss';

export interface ExpandIconProps {
    className?: string;
    style?: React.CSSProperties;
}

export const ExpandIcon: FC<ExpandIconProps> = ({ className, style }) => {
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
                d="M16.6668 9.99935H3.3335"
                stroke="currentColor"
                strokeLinecap="round"
            />
            <path
                d="M9.99984 3.33398V16.6673"
                stroke="currentColor"
                strokeLinecap="round"
            />
        </svg>
    );
};

