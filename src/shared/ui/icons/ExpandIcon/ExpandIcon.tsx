import { type FC } from 'react';
import styles from './ExpandIcon.module.scss';

export interface ExpandIconProps {
    className?: string;
    style?: React.CSSProperties;
}

export const ExpandIcon: FC<ExpandIconProps> = ({ className, style }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className={className}
            style={style}
        >
            <path
                d="M12.6663 8.66602V3.33268H7.33301"
                stroke="currentColor"
                strokeLinecap="round"
            />
            <path
                d="M12.6663 3.33398L3.33301 12.6673"
                stroke="currentColor"
                strokeLinecap="round"
            />
        </svg>
    );
};

