const Pool =require("pg").Pool;
const pool = new Pool({
    user:'postgres',
    password:'priyanka@8888',
    host:'localhost',
    port:5432, 
    database:'trendifymart_db' 
})
module.exports = pool;