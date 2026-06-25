import { Router } from "express";
import { createSale, createSaleDetail } from "../controllers/sale.controllers.js";
import { validarStock, validateSaleReq } from "../middlewares/sale.middleware.js";

const router = Router();

router.post('/', validateSaleReq, validarStock, createSale);
 
// router.post('/details', createSaleDetail);



export default router;