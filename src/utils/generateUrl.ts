export const generateUrl = () => {
    // 일단 모든 status, page=0, size=20(고정), sort=requestDate, desc
    const statuses = ["REQUESTED", "APPROVED"];
    const page = 0;
    const size = 20;
    const sort = {
        criterion: "requestDate",
        sequence: "desc",
    }
    
    let queryParams = "?";
    statuses.map((condition: string) => {
        queryParams = queryParams + `statuses=${condition}&`;
    })
    queryParams = queryParams + `page=${page}&`;
    queryParams = queryParams + `size=${size}`;
    queryParams = queryParams + `sort=${sort.criterion},${sort.sequence}`;
    console.log(queryParams);

    return queryParams;    
}