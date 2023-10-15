import { format } from "date-fns";
import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongodb";
import { PurchaseReportInterface } from "../model/purchase.entity";
import { PurchaseReportService } from "../services/purchase-report.service.js";
import { QueryInterface } from "@src/database/connection.js";
import { db } from "@src/database/database.js";

export interface PaginationInterface {
  page: number;
  pageCount: number;
  pageSize: number;
  totalDocument: number;
}

export interface ResponseInterface {
  data: Array<PurchaseReportInterface>;
  pagination: PaginationInterface;
}

export const purchaseReportController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query: QueryInterface = {
      fields:
        (req.query.field as string) ??
        "purchaseOrder,purchaseInvoiceNumber,date,warehouse,items,supplier,purchaseReceive,notes,taxBase,tax,total",
      filter: (req.query.filter as any) ?? {},
      page: Number(req.query.page ?? 1),
      pageSize: Number(req.query.pageSize ?? 10),
      sort: (req.query.sort as any) ?? "date",
    };

    let dateFrom = format(new Date(), "yyyy-MM-dd");
    if (req.query.dateFrom) {
      dateFrom = req.query.dateFrom as string;
    }

    let dateTo = format(new Date(), "yyyy-MM-dd");
    if (req.query.dateTo) {
      dateTo = req.query.dateTo as string;
    }

    const match = [];
    match.push({ date: { $gte: dateFrom, $lte: dateTo } });

    if (req.query.supplier_id) {
      match.push({ "supplier._id": new ObjectId(req.query.supplier_id as string) });
    }
    if (req.query.warehouse_id) {
      match.push({ "warehouse._id": new ObjectId(req.query.warehouse_id as string) });
    }
    if (req.query.item_id) {
      match.push({ "items._id": new ObjectId(req.query.item_id as string) });
    }
    if (req.query.supplier) {
      match.push({ "supplier.name": new RegExp(".*" + req.query.supplier + ".*", "i") });
    }

    if (req.query.warehouse_id) {
      match.push({ "warehouse._id": new ObjectId(req.query.warehouse_id as string) });
    }

    if (req.query.item_id) {
      match.push({ "items._id": new ObjectId(req.query.item_id as string) });
    }

    const service = new PurchaseReportService(db);
    const result = await service.handle(query, match);

    const pagination: PaginationInterface = {
      page: result.pagination.page,
      pageSize: result.pagination.pageSize,
      pageCount: result.pagination.pageCount,
      totalDocument: result.pagination.totalDocument,
    };

    const response: ResponseInterface = {
      data: result.data,
      pagination: pagination,
    };
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
