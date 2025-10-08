import express from "express";
import cors from "cors";
import http from "http";
import cookieParser from "cookie-parser";
import {connect} from "./src/config/db.js";
import route from "./src/routes/routes.js";
const PORT = 3000;
// const cors_options = {
//     origin: [
//         'http://localhost:3001'
//     ]
// };
const app = express();
app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
connect()
    .then((result) => {
        if (result) {
            console.log('Connect successful');
        }
    })
    .catch((error) => {
        console.log(error);
    });

app.use('/', route);

const server = http.createServer(app);
server.listen(PORT, () => console.log('Sever Running At: http://localhost:3000'));
