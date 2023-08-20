import { format } from "date-fns";
import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongodb";
import { PurchaseRecapReportInterface } from "../model/purchase.entity";
import { PurchaseRecapReportService } from "../services/purchase-recap-report.service";
import { QueryInterface } from "@src/database/connection.js";
import { db } from "@src/database/database.js";

export interface PaginationInterface {
  page: number;
  pageCount: number;
  pageSize: number;
  totalDocument: number;
}

export interface ResponseInterface {
  data: Array<PurchaseRecapReportInterface>;
  pagination: PaginationInterface;
}

export const purchaseRecapReportController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query: QueryInterface = {
      fields:
        (req.query.field as string) ?? "purchaseInvoiceNumber,date,supplier,purchaseReceive,notes,taxBase,tax,total",
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

    let costumeFilter = {};
    costumeFilter = {
      date: {
        $gte: dateFrom,
        $lte: dateTo,
      },
    };

    if (req.query.supplier_id) {
      costumeFilter = { ...costumeFilter, "supplier._id": new ObjectId(req.query.supplier_id as string) };
    }

    query.filter = { ...query.filter, ...costumeFilter };

    const service = new PurchaseRecapReportService(db);
    const result = await service.handle(query);
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
