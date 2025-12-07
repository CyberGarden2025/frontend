import type { FC } from 'react';
import type { LimitBarWidgetProps } from './LimitBarWidget.props';
import cls from './LimitBarWidget.module.scss';
import clsx from 'clsx';

export const LimitBarWidget: FC<LimitBarWidgetProps> = ({ expense, color = '#50b848', income }) => {
    return (
        <div className={cls.content}>
            <div className={cls.sectionsRow}>
                <div className={cls.incomeSection}>
                    <div className={cls.label}>Потрачено</div>
                    <div className={cls.amount}>
                        <span className={cls.amountValue}>{income}</span>
                        <span className={cls.currency}>₽</span>
                    </div>
                </div>

                <div className={cls.expensesSection}>
                    <div className={cls.label}>Лимит</div>
                    <div className={cls.amount}>
                        <span className={cls.amountValue}>{expense}</span>
                        <span className={cls.currency}>₽</span>
                    </div>
                </div>
            </div>

            <div className={cls.barContainer}>
                <div className={cls.barsWrapper}>
                    <div
                        className={clsx(cls.bar, cls.barIncome)}
                        style={{
                            flexGrow: income,
                            flexBasis: 0,
                            backgroundColor: color,
                        }}
                    />
                    <div
                        className={clsx(cls.bar, cls.barExpenses)}
                        style={{
                            flexGrow: expense,
                            flexBasis: 0,
                        }}
                    />
                </div>
            </div>
        </div>
    );
};
