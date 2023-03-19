import express, { Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import loginRoutes from './auth/auth';
import appRoutes from './app/app';
import { authMiddleware } from './auth/jwt-strategy';
import cors from "cors"
import { initialiseDatabase } from './db';
import { errorHandlerMiddleware } from './utils/error-handler';
import { initialiseGoogleStorage } from './utils/gcloud-storage';


dotenv.config();

initialiseGoogleStorage();


const app: Express = express();
const port = process.env.PORT ?? 8000;

initialiseDatabase();

app.use(cors())

app.use(bodyParser.json())
app.use(cookieParser());

app.use(errorHandlerMiddleware);


// app.get('/', (req: Request, res: Response) => {
//   res.send('Express + TypeScript Server');
// });

app.use("/login",loginRoutes)

app.use("/app", appRoutes)


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
