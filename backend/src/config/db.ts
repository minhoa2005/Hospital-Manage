import sql from "mssql";
import "dotenv/config";
const ConnectionPool = sql.ConnectionPool;

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    server: `host.docker.internal`,
    options: {
        encrypt: false,
        trustServerCertificate: true
    },
    port: 1433
}
let pool: any;
const connect = async () => {
    try {
        if (!pool) {
            pool = await sql.connect(config);
            return pool;
        }
        else return pool
    }
    catch (error) {
        console.log(error);
    }
}

export { connect, sql }