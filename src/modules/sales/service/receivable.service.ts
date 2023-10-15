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
        $unwind: "$items",
      },
      {
        $group: {
          _id: {
            group: "$items.group", // Group by the items.group field
            _id: "$_id",
            salesOrder: "$salesOrder.number",
            invoiceNumber: "$salesInvoiceNumber",
            date: "$date",
            warehouse: "$warehouse",
            customer: "$customer",
            subTotal: "$subTotal",
            discount: "$discount",
            taxBase: "$taxBase",
            tax: "$tax",
            total: "$total",
            items: "$items",
            notes: "$notes",
            memoJournal: "$memoJournal",
            payment: "$payment",
            remaining: "$remaining",
          },
          items: { $push: "$items" },
        },
      },
      {
        $addFields: {
          conTotal: { $convert: { input: "$_id.total", to: "double" } },
        },
      },
      {
        $project: {
          _id: "$_id._id",
          "salesOrder.number": "$_id.salesOrder",
          invoiceNumber: "$_id.invoiceNumber",
          date: "$_id.date",
          warehouse: "$_id.warehouse",
          customer: "$_id.customer",
          subTotal: "$_id.subTotal",
          discount: "$_id.discount",
          taxBase: "$_id.taxBase",
          tax: "$_id.tax",
          total: "$_id.total",
          items: "$_id.items",
          notes: "$_id.notes",
          memoJournal: "$_id.memoJournal",
          payment: "$_id.payment",
          remaining: {
            $subtract: [
              { $subtract: [{ $ifNull: ["$conTotal", 0] }, { $ifNull: ["$_id.memoJournal.debit", 0] }] },
              { $ifNull: ["$_id.payment.paid", 0] },
            ],
          },
        },
      },
    ];

    const repo = new AggregateExampleRepository(this.db);
    return await repo.aggregate(pipeline, { page: query.page, pageSize: query.pageSize });
  }
}
