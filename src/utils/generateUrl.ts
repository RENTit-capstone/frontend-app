function generateUrl(params: object) {
    let query = '';

    for (const [key, value] of Object.entries(params)) {
        if (key !== 'sort' && typeof value === 'object') {
            for (const item of value) {
                query += `${key}=${item}&`;
            }
        } else {
            query += `${key}=${value}&`;
        }
    }
    query = query.slice(0, -1);

    return query;
}

export default generateUrl;
