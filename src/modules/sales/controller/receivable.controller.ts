import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongodb";
import { ReceivableReportService } from "../service/receivable.service.js";
import { DocumentInterface, QueryInterface } from "@src/database/connection.js";
import { db } from "@src/database/database.js";

export interface PaginationInterface {
  page: number;
  pageCount: number;
  pageSize: number;
  totalDocument: number;
}

export interface ResponseInterface {
  data: Array<DocumentInterface>;
  pagination: PaginationInterface;
}

export const receivablesReportController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query: QueryInterface = {
      fields:
        (req.query.field as string) ??
        "salesInvoiceNumber,salesOrder,date,warehouse,customer,notes,taxBase,tax,total,items,memoJournal,payment",
      filter: (req.query.filter as any) ?? {},
      page: Number(req.query.page ?? 1),
      pageSize: Number(req.query.pageSize ?? 10),
      sort: (req.query.sort as any) ?? "date",
    };

    const match = [];

    if (req.query.customer_id) {
      match.push({ "customer._id": new ObjectId(req.query.customer_id as string) });
    }
    if (req.query.search) {
      const search = new RegExp(".*" + req.query.search + ".*", "i");
      match.push({
        $or: [
          { "customer.name": search },
          { "customer.code": search },
          { "items.name": search },
          { "items.code": search },
          { "items.group": search },
          { salesInvoiceNumber: search },
          { date: search },
          { notes: search },
        ],
      });
    }
    if (req.query.warehouse_id) {
      match.push({ "warehouse._id": new ObjectId(req.query.warehouse_id as string) });
    }
    if (req.query.item_id) {
      match.push({ "items._id": new ObjectId(req.query.item_id as string) });
    }

    const service = new ReceivableReportService(db);
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
