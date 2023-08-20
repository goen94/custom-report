import { RetrieveAllSalesRepository } from "../model/repository/retrieve-all.repository";
import { SalesReportInterface } from "../model/sales.entity";
import DatabaseConnection, { QueryInterface } from "@src/database/connection.js";

export class SalesReportService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(query: QueryInterface) {
    const retrieveAll = new RetrieveAllSalesRepository(this.db);
    const result = await retrieveAll.handle(query);

    const report: SalesReportInterface[] = [];
    for (const data of result.data) {
      if (data.items) {
        const taxPct = parseFloat(data.tax as string) / parseFloat(data.taxBase as string);
        for (const item of data.items) {
          const tax = (item.subtotal as number) * taxPct;
          report.push({
            _id: data._id,
            salesOrder: {
              number: data.salesOrder?.number,
            },
            invoiceNumber: data.salesInvoiceNumber,
            date: data.date,
            warehouse: {
              code: data.warehouse?.code,
              name: data.warehouse?.name,
            },
            customer: {
              code: data.customer?.code,
              name: data.customer?.name,
            },
            item: {
              code: item.code,
              name: item.name,
            },
            notes: data.notes,
            quantity: item.quantity,
            unit: item.unit,
            price: item.price,
            discount: item.discount,
            tax: tax,
            total: (item.subtotal as number) + tax,
          });
        }
      }
    }

    return {
      data: report,
      pagination: result.pagination,
    };
  }
}
