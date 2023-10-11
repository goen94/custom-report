import { AggregateExampleRepository } from "../model/repository/aggregate.repository.js";
import DatabaseConnection, { DocumentInterface, QueryInterface } from "@src/database/connection.js";

export class SalesReportService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(query: QueryInterface, match: Array<DocumentInterface>) {
    const pipeline = [
      ...(match.length > 0
        ? [
            {
              $match: {
                $and: match,
              },
            },
          ]
        : []),
      {
        $project: {
          _id: 1,
          "salesOrder.number": 1,
          "deliveryNote.number": 1,
          invoiceNumber: "$salesInvoiceNumber",
          date: 1,
          "customer.name": 1,
          "warehouse.name": 1,
          createdBy: 1,
          notes: 1,
          subTotal: 1,
          discount: 1,
          taxBase: 1,
          tax: 1,
          total: 1,
          items: 1,
        },
      },
    ];

    const repo = new AggregateExampleRepository(this.db);
    return await repo.aggregate(pipeline, { page: query.page, pageSize: query.pageSize });
  }
}
