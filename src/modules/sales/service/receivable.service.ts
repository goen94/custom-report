import { AggregateExampleRepository } from "../model/repository/aggregate.repository.js";
import DatabaseConnection, { DocumentInterface, QueryInterface } from "@src/database/connection.js";

export class ReceivableReportService {
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
        $addFields: {
          conTotal: { $convert: { input: "$total", to: "double" } },
        },
      },
      {
        $project: {
          _id: 1,
          "salesOrder.number": 1,
          invoiceNumber: "$salesInvoiceNumber",
          date: 1,
          warehouse: 1,
          customer: 1,
          subTotal: 1,
          discount: 1,
          taxBase: 1,
          tax: 1,
          total: 1,
          items: 1,
          notes: 1,
          memoJournal: {
            number: { $ifNull: ["$memoJournal.number", "-"] },
            debit: { $ifNull: ["$memoJournal.debit", "-"] },
          },
          payment: {
            number: { $ifNull: ["$payment.number", "-"] },
            paid: { $ifNull: ["$payment.paid", "-"] },
          },
          remaining: {
            $subtract: [
              { $subtract: [{ $ifNull: ["$conTotal", 0] }, { $ifNull: ["$memoJournal.debit", 0] }] },
              { $ifNull: ["$payment.paid", 0] },
            ],
          },
        },
      },
    ];

    const repo = new AggregateExampleRepository(this.db);
    return await repo.aggregate(pipeline, { page: query.page, pageSize: query.pageSize });
  }
}
