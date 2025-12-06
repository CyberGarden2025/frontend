export const formatDateToRu = (dateString: string): string => {
    const date = new Date(dateString);
    
    const formatter = new Intl.DateTimeFormat('ru-RU', {
        day: '2-digit',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit',
    });
    
    const parts = formatter.formatToParts(date);
    const day = parts.find(part => part.type === 'day')?.value;
    const month = parts.find(part => part.type === 'month')?.value;
    const time = `${parts.find(part => part.type === 'hour')?.value}:${parts.find(part => part.type === 'minute')?.value}`;
    
    return `${day} ${month}, ${time}`;
};
