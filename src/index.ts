import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import loginRoutes from './auth/auth';
import appRoutes from './app/app';
import { authMiddleware } from './auth/jwt-strategy';


dotenv.config();

const app: Express = express();
const port = process.env.PORT ?? 8000;

app.use(bodyParser.json())
app.use(cookieParser());


// app.get('/', (req: Request, res: Response) => {
//   res.send('Express + TypeScript Server');
// });

app.use("/login",loginRoutes)

app.use("/app", appRoutes)


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
