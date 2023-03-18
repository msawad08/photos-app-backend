import express, { Express, Request, Response } from "express";
import { authMiddleware } from "../auth/jwt-strategy";
import { handleAsyncError, IAsyncError } from "../utils/error-handler";
import { makeValidateQuery } from "../utils/express-class-validator";
import { getAllPhotos, getAllUsers } from "./app.service";
import { PaginationParam } from "./pagination-params.dto";


const router = express.Router();

router.use(authMiddleware);
router.use(makeValidateQuery(PaginationParam));


router.get("/users", async function (req: Request, res: Response) {
    const {  rowsPerPage, page}  = req.query as unknown as PaginationParam; 
    const data = await getAllUsers({  rowsPerPage, page})
    if((data as IAsyncError).error) return handleAsyncError(req, res, data as IAsyncError)
    res.json(data);

});

router.get("/photos",async function (req: Request, res: Response) {
    const {  rowsPerPage, page}  = req.query as unknown as PaginationParam; 
    const data = await getAllPhotos({  rowsPerPage, page})
    if((data as IAsyncError).error) return handleAsyncError(req, res, data as IAsyncError)
    res.json( data)
});

export default router;
