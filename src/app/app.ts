import express, { Express, Request, Response } from 'express';
import { authMiddleware } from '../auth/jwt-strategy';



const router = express.Router();

router.use(authMiddleware)

// app.get('/app/', authMiddleware, (req, res) => {
//     res.send('This is a protected route');
// });

router.get("/users", function(req: Request, res: Response){
    res.json({ "Successfull": true });
})


export default router;