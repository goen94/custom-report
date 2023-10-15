import { AggregateExampleRepository } from "../model/repository/aggregate.repository.js";
import DatabaseConnection, { QueryInterface } from "@src/database/connection.js";

export class ItemService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(query: QueryInterface) {
    const pipeline = [
      {
        $group: {
          _id: "$items",
        },
      },
      {
        $project: {
          _id: 0,
          items: "$_id",
          count: 1,
        },
      },
      {
        $unwind: "$items", // Unwind the items array
      },
      {
        $replaceRoot: { newRoot: "$items" },
      },
    ];

    const repo = new AggregateExampleRepository(this.db);
    return await repo.aggregate(pipeline, { page: query.page, pageSize: query.pageSize });
  }
}
