import { AggregateExampleRepository } from "../model/repository/aggregate.repository.js";
import DatabaseConnection, { DocumentInterface, QueryInterface } from "@src/database/connection.js";

export class SalesReportService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(query: QueryInterface, match: Array<DocumentInterface>) {
    const pipeline = [
      {
        $addFields: {
          conTaxBase: { $convert: { input: "$taxBase", to: "double" } },
          conTax: { $convert: { input: "$tax", to: "double" } },
        },
      },
      {
        $unwind: "$items",
      },
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
          invoiceNumber: "$purchaseInvoiceNumber",
          date: 1,
          warehouse: {
            name: "$warehouse.name",
            code: "$warehouse.code",
          },
          customer: 1,
          item: {
            name: "$items.name",
            code: "$items.code",
          },
          notes: 1,
          quantity: "$items.quantity",
          unit: "$items.unit",
          price: "$items.price",
          discount: "$items.discount",
          tax: {
            $multiply: [{ $divide: ["$conTax", "$conTaxBase"] }, "$items.subtotal"],
          },
          total: {
            $add: [{ $multiply: [{ $divide: ["$conTax", "$conTaxBase"] }, "$items.subtotal"] }, "$items.subtotal"],
          },
        },
      },
    ];

    const repo = new AggregateExampleRepository(this.db);
    return await repo.aggregate(pipeline, { page: query.page, pageSize: query.pageSize });
  }
}
