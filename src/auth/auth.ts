import express, { Express, Request, Response } from 'express';
import { generateToken } from './jwt-strategy';


const router = express.Router();

router.post("/", function(req: Request, res: Response){
    const token = generateToken(req.body); 
    res.cookie("accessToken", token,{httpOnly: true, sameSite: true}).
    json({ "Successfull": true });
})


export default router;