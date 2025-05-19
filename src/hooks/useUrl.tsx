import { useState } from "react";

function useUrl(params: object) {
    let query = "";

    for (const [key, value] of Object.entries(params)) {
        if (key!=="sort" && typeof value === "object"){
            console.log(value);
            for (const item of value) {
                console.log(item)
                query += `${key}=${item}&`
            }
        }
        else {  
            query += `${key}=${value}&`;
        }
    }
    query = query.slice(0, -1); 

    return query;
}

export default useUrl;