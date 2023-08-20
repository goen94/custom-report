import { PurchaseRecapReportInterface } from "../model/purchase.entity";
import { RetrieveAllPurchaseRepository } from "../model/repository/retrieve-all.repository";
import DatabaseConnection, { QueryInterface } from "@src/database/connection.js";

export class PurchaseRecapReportService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(query: QueryInterface) {
    const retrieveAll = new RetrieveAllPurchaseRepository(this.db);
    const result = await retrieveAll.handle(query);

    const report: PurchaseRecapReportInterface[] = [];
    for (const res of result.data) {
      const data = {
        ...res,
        invoiceNumber: res.purchaseInvoiceNumber,
      };

      delete data.purchaseInvoiceNumber;
      report.push(data);
    }

    return {
      data: report,
      pagination: result.pagination,
    };
  }
}
