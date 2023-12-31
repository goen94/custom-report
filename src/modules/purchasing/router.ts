import { Router } from "express";
import * as controller from "./controller/index.js";

const router = Router();

router.get("/purchase-recap-report", controller.purchaseRecapReportController);
router.get("/purchase-report", controller.purchaseReportController);
router.get("/supplier", controller.supplierController);
router.get("/purchase/warehouse", controller.warehouseController);
router.get("/purchase/item", controller.itemController);

export default router;
