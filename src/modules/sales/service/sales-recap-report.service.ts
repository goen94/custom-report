import { RetrieveAllSalesRepository } from "../model/repository/retrieve-all.repository";
import { SalesRecapReportInterface } from "../model/sales.entity";
import DatabaseConnection, { QueryInterface } from "@src/database/connection.js";

export class SalesRecapReportService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(query: QueryInterface) {
    const retrieveAll = new RetrieveAllSalesRepository(this.db);
    const result = await retrieveAll.handle(query);

    const report: SalesRecapReportInterface[] = [];
    for (const res of result.data) {
      const data = {
        ...res,
        invoiceNumber: res.salesInvoiceNumber,
      };

      delete data.salesInvoiceNumber;
      report.push(data);
    }

    return {
      data: report,
      pagination: result.pagination,
    };
  }
}
