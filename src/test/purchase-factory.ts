import { faker } from "@faker-js/faker";
import { format } from "date-fns";
import {
  PurchaseInterface,
  PurchaseRecapReportInterface,
  PurchaseReportInterface,
} from "../modules/purchasing/model/purchase.entity.js";
import { CreateManyExampleRepository } from "../modules/purchasing/model/repository/create-many.repository.js";
import { PurchaseReportService } from "../modules/purchasing/services/purchase-report.service.js";
import Factory from "./factory.js";
import { QueryInterface } from "@src/database/connection";
import { db } from "@src/database/database.js";
import { CreateExampleRepository } from "@src/modules/purchasing/model/repository/create.repository.js";
import { PurchaseRecapReportService } from "@src/modules/purchasing/services/purchase-recap-report.service.js";

const iQuery: QueryInterface = {
  fields: "",
  filter: {},
  page: Number(1),
  pageSize: Number(10),
  sort: "",
};

export class PurchaseFactory extends Factory<PurchaseInterface> {
  definition() {
    const fakePrice = faker.datatype.number({ min: 10000, max: 80000, precision: 1000 });
    const fakeQty = faker.datatype.number({ min: 5, max: 10 });
    const fakeDisc = faker.datatype.number({ min: 0, max: 30000, precision: 1000 });
    const fakeSubTotal = fakePrice * fakeQty - fakeDisc;
    const fakeTax = fakeSubTotal * (11 / 100);
    const fakeTotal = fakeSubTotal + fakeTax;

    return {
      date: format(faker.date.between("2023-01-02", "2023-01-03"), "yyyy-MM-dd"),
      purchaseInvoiceNumber: faker.finance.account(),
      purchaseReceive: {
        _id: faker.database.mongodbObjectId(),
        number: faker.finance.account(),
      },
      fakturPajak: {
        _id: faker.database.mongodbObjectId(),
        number: faker.finance.account(),
      },
      purchaseOrder: {
        _id: faker.database.mongodbObjectId(),
        number: faker.finance.account(),
      },
      taxBase: fakeSubTotal.toString(),
      tax: fakeTax.toString(),
      total: fakeTotal.toString(),
      notes: faker.lorem.sentence(5),
      approvalStatus: faker.helpers.arrayElement(["pending", "approved", "rejected"]),
      formStatus: faker.helpers.arrayElement(["pending", "done"]),
      warehouse: {
        _id: faker.database.mongodbObjectId(),
        code: faker.random.alpha({ count: 2, casing: "upper" }),
        name: faker.commerce.department(),
      },
      supplier: {
        _id: faker.database.mongodbObjectId(),
        code: faker.random.alpha({ count: 2, casing: "upper" }),
        name: faker.company.name(),
      },
      createdBy: {
        _id: faker.database.mongodbObjectId(),
        name: faker.internet.userName(),
      },
      items: [
        {
          _id: faker.database.mongodbObjectId(),
          code: faker.commerce.product(),
          name: faker.commerce.productName(),
          quantity: fakeQty,
          unit: faker.helpers.arrayElement(["pcs", "kg", "gr"]),
          price: fakePrice,
          discount: fakeDisc,
          subtotal: fakeSubTotal,
        },
      ],
    };
  }

  public async retrievePurchaseRecapReport(): Promise<PurchaseRecapReportInterface[]> {
    const purchaseRecapReportService = new PurchaseRecapReportService(db);
    return (await purchaseRecapReportService.handle(iQuery, [])).data;
  }

  public async retrievePurchaseReport(): Promise<PurchaseReportInterface[]> {
    const purchaseReportService = new PurchaseReportService(db);
    return (await purchaseReportService.handle(iQuery, [])).data as unknown as Array<PurchaseReportInterface>;
  }

  public async create() {
    return await new CreateExampleRepository(db).handle(this.makeOne());
  }

  public async createMany(count: number) {
    return new CreateManyExampleRepository(db).handle(this.makeMany(count));
  }
}
