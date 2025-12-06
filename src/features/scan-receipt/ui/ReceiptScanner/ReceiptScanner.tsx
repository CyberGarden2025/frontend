import { useEffect, useRef, useState, useId, useCallback, type FC } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import styles from './ReceiptScanner.module.scss';

export interface ReceiptScannerProps {
    onScanSuccess: (decodedText: string) => void;
    onScanError?: (errorMessage: string) => void;
    className?: string;
    style?: React.CSSProperties;
}

export const ReceiptScanner: FC<ReceiptScannerProps> = ({
    onScanSuccess,
    onScanError,
    className,
    style,
}) => {
    const scannerRef = useRef<Html5QrcodeScanner | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const onScanSuccessRef = useRef(onScanSuccess);
    const onScanErrorRef = useRef(onScanError);
    const [isInitialized, setIsInitialized] = useState(false);
    const scannerId = useId().replace(/:/g, '-');
    const isCleaningUpRef = useRef(false);

    useEffect(() => {
        onScanSuccessRef.current = onScanSuccess;
        onScanErrorRef.current = onScanError;
    }, [onScanSuccess, onScanError]);

    useEffect(() => {
        if (!containerRef.current || isCleaningUpRef.current) {
            return;
        }

        const containerElement = containerRef.current;
        containerElement.id = scannerId;

        const scanner = new Html5QrcodeScanner(
            scannerId,
            {
                fps: 10,
                qrbox: { width: 250, height: 250 },
                aspectRatio: 1.0,
            },
            false
        );

        scannerRef.current = scanner;

        const handleScanSuccess = (decodedText: string) => {
            if (!isCleaningUpRef.current) {
                onScanSuccessRef.current(decodedText);
            }
        };

        const handleScanError = (errorMessage: string) => {
            if (!isCleaningUpRef.current && onScanErrorRef.current) {
                onScanErrorRef.current(errorMessage);
            }
        };

        try {
            scanner.render(handleScanSuccess, handleScanError);
            setIsInitialized(true);
        } catch (error) {
            console.error('Error initializing scanner:', error);
            if (onScanErrorRef.current) {
                onScanErrorRef.current('Ошибка инициализации сканера');
            }
        }

        return () => {
            isCleaningUpRef.current = true;
            const currentScanner = scannerRef.current;
            const currentContainer = containerRef.current;

            if (currentScanner && currentContainer) {
                try {
                    currentScanner.clear().catch(() => {
                        const container = document.getElementById(scannerId);
                        if (container) {
                            container.innerHTML = '';
                        }
                    });
                } catch (error) {
                    console.error('Error clearing scanner:', error);
                    const container = document.getElementById(scannerId);
                    if (container) {
                        container.innerHTML = '';
                    }
                }
            }

            scannerRef.current = null;
            setIsInitialized(false);
            
            setTimeout(() => {
                isCleaningUpRef.current = false;
            }, 100);
        };
    }, [scannerId]);

    return (
        <div
            ref={containerRef}
            className={`${styles.root} ${className || ''}`}
            style={style}
        >
            {!isInitialized && (
                <div className={styles.loading}>Инициализация сканера...</div>
            )}
        </div>
    );
};

