import express, { Express, Request, Response } from 'express';
import { generateToken } from './jwt-strategy';
import { makeValidateBody } from 'express-class-validator'
import { LoginDTO } from './login.dto';


const router = express.Router();

router.post("/",makeValidateBody(LoginDTO), function(req: Request, res: Response){
    const token = generateToken(req.body); 
    res.cookie("accessToken", token,{httpOnly: true, sameSite: true}).
    json({ "Successfull": true });
})


export default router;