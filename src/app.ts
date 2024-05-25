import express from 'express';
import cors from 'cors';
import * as http from 'http';
import {config} from 'dotenv';
import {setupWebSocket} from './websocket';
import mongoDB from "./connection/mongo";
import router from './routes';

config();

const app = express();
const server = http.createServer(app);

// Set up WebSocket
setupWebSocket(server);

app.use(express.json());
mongoDB.connectDB();

/** RULES OF OUR API */
const corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: true,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

app.get("/health",async (req:Request,res:Response)=>{
    //@ts-ignore
    res.status(200).send("server is up");
})
/** API ROUTES **/
app.use('/api/v1', router);




server.listen(process.env.PORT || 8001, () => {
    const addr = server.address();
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
    console.log(`Server started on ${bind}`);
});
