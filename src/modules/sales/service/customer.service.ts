import { AggregateExampleRepository } from "../model/repository/aggregate.repository.js";
import DatabaseConnection, { QueryInterface } from "@src/database/connection.js";

export class CustomerService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(query: QueryInterface) {
    const pipeline = [
      {
        $group: {
          _id: "$customer",
        },
      },
      {
        $project: {
          _id: 0,
          customer: "$_id",
          count: 1,
        },
      },
      {
        $replaceRoot: { newRoot: "$customer" },
      },
    ];

    const repo = new AggregateExampleRepository(this.db);
    return await repo.aggregate(pipeline, { page: query.page, pageSize: query.pageSize });
  }
}
