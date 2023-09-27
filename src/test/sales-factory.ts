import { faker } from "@faker-js/faker";
import { format } from "date-fns";
import Factory from "./factory.js";
import { DocumentInterface, QueryInterface } from "@src/database/connection";
import { db } from "@src/database/database.js";
import { CreateManyExampleRepository } from "@src/modules/sales/model/repository/create-many.repository.js";
import { CreateExampleRepository } from "@src/modules/sales/model/repository/create.repository.js";
import { SalesInterface } from "@src/modules/sales/model/sales.entity.js";
import { ReceivableReportService } from "@src/modules/sales/service/receivable.service.js";
import { SalesRecapReportService } from "@src/modules/sales/service/sales-recap-report.service.js";
import { SalesReportService } from "@src/modules/sales/service/sales-report.service.js";

const iQuery: QueryInterface = {
  fields: "",
  filter: {},
  page: Number(1),
  pageSize: Number(10),
  sort: "",
};

export class SalesFactory extends Factory<SalesInterface> {
  definition() {
    const fakePrice = faker.datatype.number({ min: 10000, max: 80000, precision: 1000 });
    const fakeQty = faker.datatype.number({ min: 5, max: 10 });
    const fakeDisc = faker.datatype.number({ min: 0, max: 30000, precision: 1000 });
    const fakeSubTotal = fakePrice * fakeQty - fakeDisc;
    const fakeDiscount = faker.datatype.number({ min: 0, max: 30000, precision: 1000 });
    const fakeTax = (fakeSubTotal - fakeDiscount) * (11 / 100);
    const fakeTotal = fakeSubTotal + fakeTax;

    return {
      date: format(faker.date.between("2023-01-02", "2023-01-03"), "yyyy-MM-dd"),
      salesInvoiceNumber: faker.finance.account(),
      deliveryNote: {
        _id: faker.database.mongodbObjectId(),
        number: faker.finance.account(),
      },
      salesOrder: {
        _id: faker.database.mongodbObjectId(),
        number: faker.finance.account(),
      },
      subTotal: fakeSubTotal.toString(),
      fakeDisc: fakeDiscount.toString(),
      taxBase: fakeSubTotal.toString(),
      tax: fakeTax.toString(),
      total: fakeTotal.toString(),
      notes: faker.lorem.sentence(5),
      approvalStatus: faker.helpers.arrayElement(["pending", "approved", "rejected"]),
      formStatus: faker.helpers.arrayElement(["pending", "done"]),
      payment: {
        _id: faker.database.mongodbObjectId(),
        paid: faker.datatype.number({ min: 10000, max: 80000, precision: 1000 }),
        number: faker.finance.account(),
      },
      memoJournal: {
        _id: faker.database.mongodbObjectId(),
        debit: faker.datatype.number({ min: 10000, max: 80000, precision: 1000 }),
        number: faker.finance.account(),
      },
      warehouse: {
        _id: faker.database.mongodbObjectId(),
        code: faker.random.alpha({ count: 2, casing: "upper" }),
        name: faker.commerce.department(),
      },
      customer: {
        _id: faker.database.mongodbObjectId(),
        code: faker.random.alpha({ count: 2, casing: "upper" }),
        name: faker.name.fullName(),
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

  public async retrieveReceivableReport() {
    const receivableReportService = new ReceivableReportService(db);
    return (await receivableReportService.handle(iQuery, [])).data as any;
  }

  public async retrieveSalesRecapReport() {
    const salesRecapReportService = new SalesRecapReportService(db);
    return (await salesRecapReportService.handle(iQuery, [])).data as any;
  }

  public async retrieveSalesReport() {
    const salesReportService = new SalesReportService(db);
    return (await salesReportService.handle(iQuery, [])).data as unknown as Array<DocumentInterface>;
  }

  public async create() {
    return await new CreateExampleRepository(db).handle(this.makeOne());
  }

  public async createMany(count: number) {
    return new CreateManyExampleRepository(db).handle(this.makeMany(count));
  }
}
