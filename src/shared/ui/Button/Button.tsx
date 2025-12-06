import clsx from 'clsx';
import { type FC, type ReactNode } from 'react';
import styles from './Button.module.scss';

export type ButtonVariant = 'primary' | 'secondary' | 'variant4' | 'disabled';
export type ButtonState = 'default' | 'active';
export type ButtonSize = 'large' | 'medium';

export interface ButtonProps {
    label: string;
    variant?: ButtonVariant;
    state?: ButtonState;
    size?: ButtonSize;
    icon?: ReactNode;
    showIcon?: boolean;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
    type?: 'button' | 'submit' | 'reset';
}

export const Button: FC<ButtonProps> = ({
    label,
    variant = 'primary',
    state = 'default',
    size = 'large',
    icon,
    showIcon = true,
    onClick,
    disabled,
    className,
    style,
    type = 'button',
}) => {
    const isDisabled = disabled || variant === 'disabled';
    const effectiveVariant = isDisabled ? 'disabled' : variant;
    const effectiveState = isDisabled ? 'default' : state;

    const showIconLeft = showIcon && icon && (
        (size === 'large' && (effectiveState === 'default' || effectiveVariant === 'disabled')) ||
        (size === 'medium' && (effectiveState === 'default' || effectiveVariant === 'disabled'))
    );

    const showIconRight = showIcon && icon && (
        (size === 'large' && effectiveState === 'active' && (effectiveVariant === 'secondary' || effectiveVariant === 'variant4')) ||
        (size === 'medium' && effectiveState === 'active' && (effectiveVariant === 'secondary' || effectiveVariant === 'variant4'))
    );

    return (
        <button
            type={type}
            className={clsx(
                styles.root,
                styles[`root${size.charAt(0).toUpperCase() + size.slice(1)}`],
                styles[`root${effectiveVariant.charAt(0).toUpperCase() + effectiveVariant.slice(1)}`],
                styles[`root${effectiveVariant.charAt(0).toUpperCase() + effectiveVariant.slice(1)}${effectiveState.charAt(0).toUpperCase() + effectiveState.slice(1)}`],
                {
                    [styles.rootDisabled]: isDisabled,
                },
                className
            )}
            onClick={onClick}
            disabled={isDisabled}
            style={style}
        >
            {showIconLeft && (
                <div className={styles.iconContainer}>
                    {icon}
                </div>
            )}
            <div className={styles.labelContainer}>
                <span
                    className={clsx(
                        styles.label,
                        styles[`label${size.charAt(0).toUpperCase() + size.slice(1)}`],
                        styles[`label${effectiveVariant.charAt(0).toUpperCase() + effectiveVariant.slice(1)}`],
                        styles[`label${effectiveVariant.charAt(0).toUpperCase() + effectiveVariant.slice(1)}${effectiveState.charAt(0).toUpperCase() + effectiveState.slice(1)}`]
                    )}
                >
                    {label}
                </span>
            </div>
            {showIconRight && (
                <div className={styles.iconContainer}>
                    {icon}
                </div>
            )}
        </button>
    );
};

