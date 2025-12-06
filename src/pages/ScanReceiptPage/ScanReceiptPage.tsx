import { type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@shared/ui';
import { ArrowBackIcon } from '@shared/ui/icons';
import { ReceiptScanner, useReceiptScan } from '@features/scan-receipt';
import styles from './ScanReceiptPage.module.scss';

export const ScanReceiptPage: FC = () => {
    const navigate = useNavigate();
    const { receiptData, isLoading, error, handleScanSuccess, clearResult } = useReceiptScan();

    return (
        <div className={styles.root}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.headerTop}>
                        <IconButton
                            icon={<ArrowBackIcon />}
                            variant="primary"
                            state="default"
                            size="large"
                            onClick={() => navigate(-1)}
                        />
                    </div>
                    <h1 className={styles.title}>Сканер чека</h1>
                </div>

                <div className={styles.content}>
                    <div className={styles.scannerContainer}>
                        <ReceiptScanner
                            onScanSuccess={handleScanSuccess}
                            onScanError={(errorMessage) => {
                                console.error('Ошибка сканирования:', errorMessage);
                            }}
                        />
                    </div>

                    {isLoading && (
                        <div className={styles.status}>
                            <div className={styles.statusText}>Обработка чека...</div>
                        </div>
                    )}

                    {error && (
                        <div className={styles.error}>
                            <div className={styles.errorText}>{error}</div>
                            <button
                                className={styles.retryButton}
                                onClick={clearResult}
                            >
                                Попробовать снова
                            </button>
                        </div>
                    )}

                    {receiptData && !isLoading && (
                        <div className={styles.result}>
                            <div className={styles.resultHeader}>
                                <h2 className={styles.resultTitle}>Данные чека:</h2>
                                <button
                                    className={styles.clearButton}
                                    onClick={clearResult}
                                >
                                    Очистить
                                </button>
                            </div>
                            <pre className={styles.resultContent}>
                                {JSON.stringify(receiptData, null, 2)}
                            </pre>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

