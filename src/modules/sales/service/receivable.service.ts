import { AggregateExampleRepository } from "../model/repository/aggregate.repository.js";
import DatabaseConnection, { DocumentInterface, QueryInterface } from "@src/database/connection.js";

export class ReceivableReportService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(query: QueryInterface, match: Array<DocumentInterface>) {
    const pipeline = [
      {
        $facet: {
          items: [
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
                invoiceNumber: "$salesInvoiceNumber",
                date: 1,
                warehouse: 1,
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
                  $add: [
                    { $multiply: [{ $divide: ["$conTax", "$conTaxBase"] }, "$items.subtotal"] },
                    "$items.subtotal",
                  ],
                },
                "memoJournal.debit": "0",
                "payment.paid": "0",
                remaining: "0",
              },
            },
          ],
          emptyItems: [
            {
              $addFields: {
                conTotal: { $convert: { input: "$total", to: "double" } },
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
                invoiceNumber: "$salesInvoiceNumber",
                date: 1,
                warehouse: 1,
                customer: 1,
                item: {
                  name: "",
                  code: "",
                },
                notes: 1,
                quantity: "0",
                unit: "-",
                price: "0",
                discount: "0",
                tax: 1,
                total: 1,
                memoJournal: {
                  debit: 1,
                },
                payment: {
                  paid: 1,
                },
                remaining: {
                  $subtract: [{ $subtract: ["$conTotal", "$memoJournal.debit"] }, "$payment.paid"],
                },
              },
            },
          ],
        },
      },
      {
        $project: {
          rows: { $concatArrays: ["$items", "$emptyItems"] },
        },
      },
      {
        $unwind: "$rows",
      },
      {
        $replaceRoot: {
          newRoot: "$rows",
        },
      },
      {
        $sort: {
          date: 1,
          invoiceNumber: 1,
        },
      },
    ];

    const repo = new AggregateExampleRepository(this.db);
    return await repo.aggregate(pipeline, { page: query.page, pageSize: query.pageSize });
  }
}
