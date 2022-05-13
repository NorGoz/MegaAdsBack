import {createPool} from "mysql2/promise";

export const pool = createPool({
    host:'localhost',
    user:'root',
    database: 'mega_maps',
    namedPlaceholders:true,
    decimalNumbers:true,
})
