import { useState, useCallback } from 'react';

const PROVERKACHEKA_TOKEN = '36664.x06murmKxeY4REa30';
const PROVERKACHEKA_API_URL = 'https://proverkacheka.com/api/v1/check/get';

export interface ReceiptData {
    [key: string]: unknown;
}

export interface UseReceiptScanReturn {
    scanResult: string | null;
    receiptData: ReceiptData | null;
    isLoading: boolean;
    error: string | null;
    handleScanSuccess: (decodedText: string) => Promise<void>;
    clearResult: () => void;
}

export const useReceiptScan = (): UseReceiptScanReturn => {
    const [scanResult, setScanResult] = useState<string | null>(null);
    const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleScanSuccess = useCallback(async (decodedText: string) => {
        if (!decodedText) {
            setError('QR-код не содержит данных');
            return;
        }

        setScanResult(decodedText);
        setIsLoading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('token', PROVERKACHEKA_TOKEN);
            formData.append('qrraw', decodedText);

            const response = await fetch(PROVERKACHEKA_API_URL, {
                method: 'POST',
                headers: {
                    'Cookie': 'ENGID=1.1',
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            setReceiptData(result);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : String(err);
            setError(`Ошибка при отправке запроса: ${errorMessage}`);
            console.error('Error sending request:', err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const clearResult = useCallback(() => {
        setScanResult(null);
        setReceiptData(null);
        setError(null);
    }, []);

    return {
        scanResult,
        receiptData,
        isLoading,
        error,
        handleScanSuccess,
        clearResult,
    };
};

