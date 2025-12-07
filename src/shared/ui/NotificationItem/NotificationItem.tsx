import { type FC, type ReactNode, useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { IconButton } from '@shared/ui';
import styles from './NotificationItem.module.scss';

export interface NotificationItemProps {
    categoryIcon?: ReactNode;
    label?: string;
    description?: string;
    time?: string;
    isNew?: boolean;
    onDelete?: () => void;
    className?: string;
    style?: React.CSSProperties;
}

export const NotificationItem: FC<NotificationItemProps> = ({
    categoryIcon,
    label = 'Label',
    description = 'Lorem ipsum dolor sit amet, consectetur tilatd adipiscing elit. Mauris ullamcorper mollis dui a dolor, et venenatis dui ultricies ut.',
    time = '19:10',
    isNew = true,
    onDelete,
    className,
    style,
}) => {
    const [isSwiped, setIsSwiped] = useState(false);
    const [swipeOffset, setSwipeOffset] = useState(0);
    const touchStartX = useRef<number | null>(null);
    const touchStartY = useRef<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const actionButtonWidth = 80;

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
        touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (touchStartX.current === null || touchStartY.current === null) return;

        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;
        const deltaX = touchStartX.current - currentX;
        const deltaY = Math.abs(touchStartY.current - currentY);

        if (deltaY > 30) {
            return;
        }

        if (deltaX > 0) {
            const maxOffset = Math.min(deltaX, actionButtonWidth);
            setSwipeOffset(maxOffset);
            setIsSwiped(maxOffset > 20);
        } else if (isSwiped) {
            const newOffset = Math.max(0, actionButtonWidth + deltaX);
            setSwipeOffset(newOffset);
            if (newOffset < actionButtonWidth / 2) {
                setIsSwiped(false);
                setSwipeOffset(0);
            }
        }
    };

    const handleTouchEnd = () => {
        if (isSwiped && swipeOffset > actionButtonWidth / 2) {
            setSwipeOffset(actionButtonWidth);
        } else {
            setIsSwiped(false);
            setSwipeOffset(0);
        }
        touchStartX.current = null;
        touchStartY.current = null;
    };

    const handleDelete = () => {
        if (onDelete) {
            onDelete();
        }
        setIsSwiped(false);
        setSwipeOffset(0);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsSwiped(false);
                setSwipeOffset(0);
            }
        };

        if (isSwiped) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSwiped]);

    return (
        <div
            ref={containerRef}
            className={clsx(styles.root, { [styles.swiped]: isSwiped }, className)}
            style={style}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <div
                className={clsx(styles.container, { [styles.containerSwiped]: isSwiped })}
                style={{ transform: `translateX(-${swipeOffset}px)` }}
            >
                <div className={styles.content}>
                    <div className={styles.header}>
                        <div className={styles.headerContent}>
                            <div className={styles.categoryIconWrapper}>
                                <IconButton
                                    icon={categoryIcon}
                                    variant="secondary"
                                    state="default"
                                    size="medium"
                                    badge={isNew}
                                />
                            </div>
                            <div className={styles.labelContainer}>
                                <p className={clsx(styles.label, { [styles.labelNew]: isNew, [styles.labelOld]: !isNew })}>{label}</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.descriptionContainer}>
                        <p className={styles.description}>{description}</p>
                    </div>
                </div>
                <div className={styles.timeContainer}>
                    <p className={styles.time}>{time}</p>
                </div>
            </div>
            <div
                className={clsx(styles.actionContainer, { [styles.actionContainerVisible]: isSwiped || swipeOffset > 0 })}
                style={{ opacity: Math.min(swipeOffset / actionButtonWidth, 1) }}
            >
                <div className={styles.actionButtonWrapper}>
                    <button className={styles.deleteButton} onClick={handleDelete} type="button">
                        <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.0003 5.69494C16.8288 5.38065 13.6384 5.21875 10.4574 5.21875C8.57171 5.21875 6.68599 5.31399 4.80028 5.50446L2.85742 5.69494" stroke="#C1352E" strokeWidth="1.71429" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M8.0957 4.73287L8.30523 3.48525C8.45761 2.58049 8.57189 1.9043 10.1814 1.9043H12.6767C14.2862 1.9043 14.41 2.61858 14.5528 3.49477L14.7624 4.73287" stroke="#C1352E" strokeWidth="1.71429" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M17.9519 8.70508L17.3329 18.2956C17.2281 19.7908 17.1424 20.9527 14.4852 20.9527H8.37096C5.71382 20.9527 5.62811 19.7908 5.52334 18.2956L4.9043 8.70508" stroke="#C1352E" strokeWidth="1.71429" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M9.83789 15.7148H13.0093" stroke="#C1352E" strokeWidth="1.71429" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M9.04785 11.9043H13.8098" stroke="#C1352E" strokeWidth="1.71429" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};
