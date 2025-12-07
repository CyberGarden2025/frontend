import { type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@shared/ui';
import { GraphIcon } from '@shared/ui/icons';
import styles from './FinancialForecastInfoWidget.module.scss';

export const FinancialForecastInfoWidget: FC = () => {
    const navigate = useNavigate();

    const handleConnect = () => {
        navigate('/financial-forecast');
    };

    return (
        <div className={styles.root}>
            <div className={styles.content}>
                <div className={styles.textContainer}>
                    <h3 className={styles.title}>Улучшите финансовое прогнозирование</h3>
                    <div className={styles.description}>
                        <p>
                            Получайте точные прогнозы доходов и расходов
                            <br />
                            на основе вашей финансовой истории.
                        </p>
                        <p>
                            Анализируем тренды и помогаем планировать
                            <br />
                            бюджет на месяцы вперед.
                        </p>
                    </div>
                </div>
            </div>
            <Button
                label="Подключить"
                variant="primary"
                state="default"
                size="large"
                icon={<GraphIcon />}
                showIcon={true}
                onClick={handleConnect}
                className={styles.button}
            />
        </div>
    );
};

