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
        $unwind: {
          path: "$items",
          preserveNullAndEmptyArrays: true, // Preserve documents with empty 'items' array
        },
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
            name: {
              $ifNull: ["$warehouse.name", "-"] // Set quantity to 0 if it's null
            },
            code: {
              $ifNull: ["$warehouse.code", "-"] // Set quantity to 0 if it's null
            },
          },
          customer: 1,
          item: {
            name: {
              $ifNull: ["$items.name", "-"] // Set quantity to 0 if it's null
            },
            code: {
              $ifNull: ["$items.code", "-"] // Set quantity to 0 if it's null
            },
          },
          notes: {
            $ifNull: ["$note", "-"] // Set quantity to 0 if it's null
          },
          quantity: {
            $ifNull: ["$items.quantity", 0] // Set quantity to 0 if it's null
          },
          unit: {
            $ifNull: ["$items.unit", "-"] // Set quantity to 0 if it's null
          },
          price: {
            $ifNull: ["$items.price", 0] // Set quantity to 0 if it's null
          },
          discount: {
            $ifNull: ["$items.discount", 0] // Set quantity to 0 if it's null
          },
          tax: "$tax",
          total: "$total",
        },
      },
    ];

    const repo = new AggregateExampleRepository(this.db);
    return await repo.aggregate(pipeline, { page: query.page, pageSize: query.pageSize });
  }
}
