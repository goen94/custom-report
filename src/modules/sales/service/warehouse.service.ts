import { AggregateExampleRepository } from "../model/repository/aggregate.repository.js";
import DatabaseConnection, { QueryInterface } from "@src/database/connection.js";

export class WarehouseService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(query: QueryInterface) {
    const pipeline = [
      {
        $group: {
          _id: "$warehouse",
        },
      },
      {
        $project: {
          _id: 0,
          warehouse: "$_id",
          count: 1,
        },
      },
      {
        $replaceRoot: { newRoot: "$warehouse" },
      },
    ];

    const repo = new AggregateExampleRepository(this.db);
    return await repo.aggregate(pipeline, { page: query.page, pageSize: query.pageSize });
  }
}
