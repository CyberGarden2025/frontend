import clsx from 'clsx';
import { type FC } from 'react';
import styles from './ChartColumnValueBadge.module.scss';

export type ChartColumnValueBadgeType = 'default' | 'predict';
export type ChartColumnValueBadgeSide = 'center' | 'left' | 'right';

export interface ChartColumnValueBadgeProps {
    value?: number;
    expand?: boolean;
    type?: ChartColumnValueBadgeType;
    side?: ChartColumnValueBadgeSide;
    className?: string;
    style?: React.CSSProperties;
}

const formatValue = (value: number): { thousands: string; hundreds: string } => {
    const valueStr = value.toString();
    if (valueStr.length <= 3) {
        return {
            thousands: valueStr,
            hundreds: '',
        };
    }
    const thousands = valueStr.slice(0, -3);
    const hundreds = valueStr.slice(-3);
    return { thousands, hundreds };
};

export const ChartColumnValueBadge: FC<ChartColumnValueBadgeProps> = ({
    value = 45382,
    expand = false,
    type = 'default',
    side = 'center',
    className,
    style,
}) => {
    const isExpanded = expand;
    const isDefault = type === 'default';
    const isPredict = type === 'predict';
    const { thousands, hundreds } = formatValue(value);

    return (
        <div
            className={clsx(styles.root, className, {
                [styles.rootExpanded]: isExpanded,
                [styles.rootCollapsed]: !isExpanded,
                [styles.rootCenter]: side === 'center',
                [styles.rootLeft]: side === 'left',
                [styles.rootRight]: side === 'right',
            })}
            style={style}
        >
            <div
                className={clsx(styles.container, {
                    [styles.containerExpanded]: isExpanded,
                    [styles.containerCollapsed]: !isExpanded,
                    [styles.containerDefault]: isDefault,
                    [styles.containerPredict]: isPredict,
                    [styles.containerCenter]: side === 'center' && isExpanded,
                    [styles.containerLeft]: side === 'left' && isExpanded,
                    [styles.containerRight]: side === 'right' && isExpanded,
                })}
            >
                {isExpanded ? (
                    <div
                        className={clsx(styles.content, {
                            [styles.contentDefault]: isDefault,
                            [styles.contentPredict]: isPredict,
                        })}
                    >
                        <span className={styles.thousands}>{thousands}</span>
                        {hundreds && <span className={styles.hundreds}>{hundreds}</span>}
                    </div>
                ) : (
                    <div
                        className={clsx(styles.dot, {
                            [styles.dotDefault]: isDefault,
                            [styles.dotPredict]: isPredict,
                        })}
                    />
                )}
            </div>
            {isExpanded && (
                <div
                    className={clsx(styles.dotWrapper, {
                        [styles.dotWrapperDefault]: isDefault,
                        [styles.dotWrapperPredict]: isPredict,
                    })}
                >
                    <div
                        className={clsx(styles.dot, {
                            [styles.dotDefault]: isDefault,
                            [styles.dotPredict]: isPredict,
                        })}
                    />
                </div>
            )}
        </div>
    );
};

