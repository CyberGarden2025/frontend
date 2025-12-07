import type { Category } from '@shared/ui/PieChart';

export type ChartType = 'pieChart' | 'chart';

export interface PieChartData {
    type: 'pieChart';
    data: Category[];
}

export interface ColumnChartData {
    type: 'chart';
    data: [number, number, number, number, number, number, number];
}

export type ChartData = PieChartData | ColumnChartData;

export const parseChartData = (content: string): ChartData | null => {
    try {
        const trimmedContent = content.trim();
        const jsonMatch = trimmedContent.match(/\{[\s\S]*\}/);
        
        if (!jsonMatch) {
            return null;
        }

        const jsonString = jsonMatch[0];
        const parsed = JSON.parse(jsonString);

        if (!parsed || typeof parsed !== 'object') {
            return null;
        }

        if (parsed.type === 'pieChart' && Array.isArray(parsed.data)) {
            const categories = parsed.data as Category[];
            if (categories.every(cat => cat.name && typeof cat.value === 'number')) {
                return {
                    type: 'pieChart',
                    data: categories,
                };
            }
        }

        if (parsed.type === 'chart' && Array.isArray(parsed.data)) {
            const values = parsed.data as number[];
            if (values.length === 7 && values.every(v => typeof v === 'number')) {
                return {
                    type: 'chart',
                    data: values as [number, number, number, number, number, number, number],
                };
            }
        }

        return null;
    } catch (error) {
        return null;
    }
};

export const extractTextFromMessage = (content: string, chartData: ChartData | null): string => {
    if (!chartData) {
        return content;
    }

    try {
        const trimmedContent = content.trim();
        const jsonMatch = trimmedContent.match(/\{[\s\S]*\}/);
        
        if (jsonMatch) {
            const textBefore = trimmedContent.substring(0, jsonMatch.index || 0).trim();
            const textAfter = trimmedContent.substring((jsonMatch.index || 0) + jsonMatch[0].length).trim();
            
            return [textBefore, textAfter].filter(Boolean).join(' ').trim();
        }
    } catch (error) {
        return content;
    }

    return content;
};

