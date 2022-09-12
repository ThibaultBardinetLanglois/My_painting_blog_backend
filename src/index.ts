import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import apiRouter from './routes/api.routes';
import { Database } from './config/database.config';
import clc from "cli-color";


function loggerMiddleware(request: express.Request, response: express.Response, next: Function) {
  console.log("\nIncomming request from:");
  
  console.log(clc.bgMagenta(request.method) + clc.bgWhiteBright(` ${request.protocol}://${request.hostname}:${request.socket.localPort}${request.path}`));
  console.log("");
  
  next();
}

const app = express();
app.use(loggerMiddleware)
  // If you are running express 4.16 or greater, you no longer need to use body-parser to pass data and manipulate it, in order to parse the incomming request
  .use(express.json())
  .use('/api', apiRouter);


app.listen(process.env.SERVER_PORT, () => {
    console.log(clc.bgGreenBright
      (`The application is listening on port ${process.env.SERVER_PORT}!`));
    Database.checkConnection;
})