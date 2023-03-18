import { NextFunction, Response, Request } from "express"

const isProd = process.env.NODE_ENV === 'production'


export const errorHandlerMiddleware = (err: any, req : Request, res: Response, next: NextFunction) => {
    console.error(err)
    res.status(err.status || 500).send(isProd
      ? {}
      : { originalError: err })
  }


export interface IAsyncError{
    status: number;
    error: any;
}  
export const handleAsyncError = (req: Request, res: Response,err : IAsyncError) =>{
    console.error(err)
    res.status(err.status || 500).send(isProd
      ? {}
      : { originalError: err })
}