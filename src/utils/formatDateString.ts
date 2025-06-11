function formatISOtoDate(rawDate: string | Date): string {
    if (typeof rawDate === 'string') {
        rawDate = new Date(rawDate);
    }
    const date = new Date(rawDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
}
export default formatISOtoDate;
