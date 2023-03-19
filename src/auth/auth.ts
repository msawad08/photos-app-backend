import express, { Express, Request, Response } from 'express';
import { authMiddleware, generateToken } from './jwt-strategy';
import { makeValidateBody } from '../utils/express-class-validator'
import { LoginDTO } from './login.dto';
import { verifyCredential, verifyUser } from '../app/app.service';
import { handleAsyncError, IAsyncError } from '../utils/error-handler';
import { IUser } from '../app/user.model';


const router = express.Router();

router.post("/",makeValidateBody(LoginDTO), async function(req: Request, res: Response){
    const data = await verifyCredential(req.body)
    if((data as IAsyncError).error) return handleAsyncError(req, res, data as IAsyncError)

    
    const token = generateToken(data as IUser); 
    const {email, name, username} = (data as IUser);

    res.cookie("accessToken", token,{httpOnly: true, sameSite: false, secure: true}).json({email, name, username, token});

})

router.get("/verify",authMiddleware, async function(req: Request, res: Response){

    res.json(req.user);

})


export default router;