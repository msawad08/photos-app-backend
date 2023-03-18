import { transformAndValidate } from 'class-transformer-validator'
import { Request, Response, NextFunction } from 'express'

const isProd = process.env.NODE_ENV === 'production'

function makeValidateBody<T>(c: T, whitelist = true, errorHandler?: (err: any, req: Request, res: Response, next: NextFunction) => void) {
    return async function ExpressClassValidate(req: Request, res: Response, next: NextFunction) {
        const toValidate = req.body
        try{
            const data = await validateRequest(toValidate, c,req, res, next, whitelist, errorHandler);
            if(data){
                req.body = data;
                next();
            }
        }catch(err){
        }

    }
}

export function makeValidateQuery<T>(c: T, whitelist = true, errorHandler?: (err: any, req: Request, res: Response, next: NextFunction) => void) {
    return async function ExpressClassValidate(req: Request, res: Response, next: NextFunction) {
        const toValidate = req.query;
        try{
            const data = await validateRequest(toValidate, c,req, res, next, whitelist, errorHandler);
            if(data){
                req.query = data as Record<string, any>;
                next();
            }
        }catch(err){
        }

    }
}


function validateRequest<T>(toValidate: any,c: T,req: Request, res: Response, next: NextFunction,whitelist = true, errorHandler?: (err: any, req: Request, res: Response, next: NextFunction) => void){
    return new Promise((resolve, reject) =>{
        if (!toValidate) {
            if (errorHandler) {
                errorHandler({ type: 'no-body' }, req, res, next)
                reject()
            } else {
                res.status(400).json({
                    error: true,
                    message: 'Validation failed',
                    ...(isProd
                        ? {}
                        : { originalError: { message: 'No request body found' } }
                    )
                })
                reject()
            }
        } else {
            transformAndValidate(c as any, toValidate, { validator: { whitelist } })
                .then(transformed => {
                    // req.body = transformed
                    // next()
                    resolve(transformed);
                })
                .catch(err => {
                    if (errorHandler) {
                        errorHandler(err, req, res, next)
                    } else {
                        res.status(400).json({
                            error: true,
                            message: 'Validation failed',
                            ...(isProd
                                ? {}
                                : { originalError: err }
                            )
                        })
                    }
                    reject()
                })
        }
    })
   
}
export { makeValidateBody }