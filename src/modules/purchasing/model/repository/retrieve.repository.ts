import { PurchaseInterface } from "../purchase.entity";
import DatabaseConnection, { RetrieveOptionsInterface } from "@src/database/connection.js";
import DatabaseManager from "@src/database/database-manager.js";

interface ResponseInterface extends PurchaseInterface {
  _id: string;
}

export class RetrieveExampleRepository {
  public databaseManager;

  constructor(databaseConnection: DatabaseConnection) {
    this.databaseManager = new DatabaseManager(databaseConnection, "examples");
  }

  public async handle(id: string, options?: RetrieveOptionsInterface): Promise<ResponseInterface> {
    const response: ResponseInterface = await this.databaseManager.retrieve(id, options);

    return {
      ...response,
    };
  }
}
