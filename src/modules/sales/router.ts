import { Router } from "express";
import * as controller from "./controller/index.js";

const router = Router();

router.get("/sales-recap-report", controller.salesRecapReportController);
router.get("/sales-report", controller.salesReportController);
router.get("/receivables", controller.receivablesReportController);
router.get("/customer", controller.customerController);
router.get("/sales/warehouse", controller.warehouseController);
router.get("/sales/item", controller.itemController);

export default router;
