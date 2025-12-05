import clsx from 'clsx';
import { type FC, type ReactNode } from 'react';
import styles from './IconButton.module.scss';

export type IconButtonVariant = 'primary' | 'secondary' | 'disabled';
export type IconButtonState = 'default' | 'active';
export type IconButtonSize = 'large' | 'medium';

export interface IconButtonProps {
    icon?: ReactNode;
    variant?: IconButtonVariant;
    state?: IconButtonState;
    size?: IconButtonSize;
    badge?: boolean;
    badgeValue?: string;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
    type?: 'button' | 'submit' | 'reset';
}

export const IconButton: FC<IconButtonProps> = ({
    icon,
    variant = 'primary',
    state = 'default',
    size = 'large',
    badge = false,
    badgeValue = '9',
    onClick,
    disabled,
    className,
    style,
    type = 'button',
}) => {
    const isDisabled = disabled || variant === 'disabled';
    const effectiveVariant = isDisabled ? 'disabled' : variant;
    const effectiveState = isDisabled ? 'default' : state;

    return (
        <div className={clsx(styles.wrapper, className)} style={style}>
            <button
                type={type}
                className={clsx(
                    styles.root,
                    styles[`root${size.charAt(0).toUpperCase() + size.slice(1)}`],
                    styles[`root${effectiveVariant.charAt(0).toUpperCase() + effectiveVariant.slice(1)}`],
                    styles[`root${effectiveVariant.charAt(0).toUpperCase() + effectiveVariant.slice(1)}${effectiveState.charAt(0).toUpperCase() + effectiveState.slice(1)}`],
                    {
                        [styles.rootDisabled]: isDisabled,
                    }
                )}
                onClick={onClick}
                disabled={isDisabled}
            >
                <div className={styles.iconContainer}>
                    {icon}
                </div>
            </button>
            {badge && (
                <div className={styles.badge}>
                    <span className={styles.badgeValue}>{badgeValue}</span>
                </div>
            )}
        </div>
    );
};

