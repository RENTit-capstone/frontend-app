const toISOStringWithoutMs = (date: Date) => {
    return date.toISOString().split('.')[0];
};
export default toISOStringWithoutMs;
