import { Router } from "express";
import * as controller from "./controller/index.js";

const router = Router();

router.get("/purchase-recap-report", controller.purchaseRecapReportController);
router.get("/purchase-report", controller.purchaseReportController);

export default router;
