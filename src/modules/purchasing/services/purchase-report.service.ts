import { PurchaseReportInterface } from "../model/purchase.entity";
import { RetrieveAllPurchaseRepository } from "../model/repository/retrieve-all.repository";
import DatabaseConnection, { QueryInterface } from "@src/database/connection.js";

export class PurchaseReportService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(query: QueryInterface) {
    const retrieveAll = new RetrieveAllPurchaseRepository(this.db);
    const result = await retrieveAll.handle(query);

    const report: PurchaseReportInterface[] = [];
    for (const data of result.data) {
      if (data.items) {
        const taxPct = parseFloat(data.tax as string) / parseFloat(data.taxBase as string);
        for (const item of data.items) {
          const tax = (item.subtotal as number) * taxPct;
          report.push({
            _id: data._id,
            purchaseOrder: {
              number: data.purchaseOrder?.number,
            },
            invoiceNumber: data.purchaseInvoiceNumber,
            date: data.date,
            warehouse: {
              code: data.warehouse?.code,
              name: data.warehouse?.name,
            },
            supplier: {
              code: data.supplier?.code,
              name: data.supplier?.name,
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
