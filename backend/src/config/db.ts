import sql from "mssql";
const ConnectionPool = sql.ConnectionPool;

const config = {
    user: 'sa',
    password: '123',
    database: 'PE_DBI202_Fa2024',
    server: `host.docker.internal`,
    options: {
        encrypt: false,
        trustServerCertificate: true
    },
    port: 1433
}
let pool:any;
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

export {connect, sql}