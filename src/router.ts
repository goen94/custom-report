import express, { Express } from "express";
import purchasingRouter from "./modules/purchasing/router.js";
import salesRouter from "./modules/sales/router.js";

export default function () {
  const app: Express = express();

  /**
   * Register all available modules
   * <modules>/router.ts
   */
  app.use("/v1", purchasingRouter);
  app.use("/v1", salesRouter);

  return app;
}
