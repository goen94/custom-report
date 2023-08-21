import { format } from "date-fns";
import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongodb";
import { SalesReportInterface } from "../model/sales.entity";
import { SalesReportService } from "../service/sales-report.service.js";
import { QueryInterface } from "@src/database/connection.js";
import { db } from "@src/database/database.js";

export interface PaginationInterface {
  page: number;
  pageCount: number;
  pageSize: number;
  totalDocument: number;
}

export interface ResponseInterface {
  data: Array<SalesReportInterface>;
  pagination: PaginationInterface;
}

export const salesReportController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query: QueryInterface = {
      fields:
        (req.query.field as string) ??
        "salesOrder,salesInvoiceNumber,date,warehouse,items,customer,notes,taxBase,tax,total",
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

    if (req.query.customer_id) {
      match.push({ "customer._id": new ObjectId(req.query.customer_id as string) });
    }

    const service = new SalesReportService(db);
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
