import { type FC } from 'react';
import clsx from 'clsx';
import styles from './SearchIcon.module.scss';

export interface SearchIconProps {
    className?: string;
    style?: React.CSSProperties;
}

export const SearchIcon: FC<SearchIconProps> = ({ className, style }) => {
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
                d="M9.58317 18.1243C4.87484 18.1243 1.0415 14.291 1.0415 9.58268C1.0415 4.87435 4.87484 1.04102 9.58317 1.04102C14.2915 1.04102 18.1248 4.87435 18.1248 9.58268C18.1248 14.291 14.2915 18.1243 9.58317 18.1243ZM9.58317 2.29102C5.55817 2.29102 2.2915 5.56602 2.2915 9.58268C2.2915 13.5993 5.55817 16.8743 9.58317 16.8743C13.6082 16.8743 16.8748 13.5993 16.8748 9.58268C16.8748 5.56602 13.6082 2.29102 9.58317 2.29102Z"
                fill="currentColor"
            />
            <path
                d="M18.3335 18.9576C18.1752 18.9576 18.0169 18.8992 17.8919 18.7742L16.2252 17.1076C15.9835 16.8659 15.9835 16.4659 16.2252 16.2242C16.4669 15.9826 16.8669 15.9826 17.1085 16.2242L18.7752 17.8909C19.0169 18.1326 19.0169 18.5326 18.7752 18.7742C18.6502 18.8992 18.4919 18.9576 18.3335 18.9576Z"
                fill="currentColor"
            />
        </svg>
    );
};

