import { QueryInterface } from "@src/database/connection";
import { db } from "@src/database/database.js";
import { CreateManyExampleRepository } from "@src/modules/sales/model/repository/create-many.repository.js";
import { SalesReportInterface } from "@src/modules/sales/model/sales.entity";
import { SalesRecapReportService } from "@src/modules/sales/service/sales-recap-report.service.js";
import { SalesReportService } from "@src/modules/sales/service/sales-report.service.js";

const iQuery: QueryInterface = {
  fields: "",
  filter: {},
  page: Number(1),
  pageSize: Number(10),
  sort: "",
};

export class SalesFactory {
  public async retrieveSalesRecapReport() {
    const salesRecapReportService = new SalesRecapReportService(db);
    return (await salesRecapReportService.handle(iQuery)).data;
  }

  public async retrieveSalesReport(): Promise<SalesReportInterface[]> {
    const salesReportService = new SalesReportService(db);
    return (await salesReportService.handle(iQuery)).data as unknown as Array<SalesReportInterface>;
  }

  public async createMany() {
    const createMany = new CreateManyExampleRepository(db);
    return await createMany.handle([
      {
        date: "2023-01-02",
        salesInvoiceNumber: "SI020123001",
        deliveryNote: {
          _id: "64e1cbb65cf72f7fbf63cc76",
          number: "DN020123001",
        },
        salesOrder: {
          _id: "64e1d52fc7ce85d93a593af0",
          number: "SO020123001",
        },
        taxBase: "230000",
        tax: "25300",
        total: "255300",
        notes: "this is note",
        approvalStatus: "approved",
        formStatus: "done",
        payment: {
          _id: "64e1d52fc7ce85d93a593af1",
          paid: 120000.0,
          number: "PAY020123001",
        },
        memoJournal: {
          _id: "64e1d52fc7ce85d93a593af2",
          debit: 80000.0,
          number: "MEMO020123001",
        },
        warehouse: {
          _id: "64e1d8e2ce2050d89aad14c9",
          code: "W01",
          name: "Warehouse 01",
        },
        customer: {
          _id: "64e1d91ecc6c49a93728b06d",
          code: "C01",
          name: "Customer 01",
        },
        createdBy: {
          _id: "64e1d91ecc6c49a93728b06e",
          name: "User",
        },
        items: [
          {
            _id: "64e1d8e2ce2050d89aad14c8",
            code: "ITEM001",
            name: "Product A",
            quantity: 5,
            unit: "pcs",
            price: 50000.0,
            discount: 20000.0,
            subtotal: 230000.0,
          },
        ],
      },
      {
        date: "2023-01-02",
        salesInvoiceNumber: "SI020123002",
        deliveryNote: {
          _id: "64e1d5a8651ecc109721d0ef",
          number: "DN020123002",
        },
        salesOrder: {
          _id: "64e1d5a8651ecc109721d0f0",
          number: "SO020123002",
        },
        taxBase: "300000",
        tax: "33000",
        total: "333000",
        notes: "this is note",
        approvalStatus: "approved",
        formStatus: "done",
        payment: {
          _id: "64e1d5a8651ecc109721d0f1",
          paid: 90000.0,
          number: "PAY020123002",
        },
        memoJournal: {
          _id: "64e1d5dbec5297d57a7e1feb",
          debit: 50000.0,
          number: "MEMO020123002",
        },
        warehouse: {
          _id: "64e1d8e2ce2050d89aad14c9",
          code: "W01",
          name: "Warehouse 01",
        },
        customer: {
          _id: "64e1d91ecc6c49a93728b06d",
          code: "C01",
          name: "Customer 01",
        },
        createdBy: {
          _id: "64e1d91ecc6c49a93728b06e",
          name: "User",
        },
        items: [
          {
            _id: "64e1d8e2ce2050d89aad14c7",
            code: "ITEM003",
            name: "Product C",
            quantity: 15,
            unit: "pcs",
            price: 20000.0,
            discount: 0.0,
            subtotal: 300000.0,
          },
        ],
      },
      {
        date: "2023-01-03",
        salesInvoiceNumber: "SI030123001",
        deliveryNote: {
          _id: "64e1d5dbec5297d57a7e1fec",
          number: "DN030123001",
        },
        salesOrder: {
          _id: "64e1d5dbec5297d57a7e1fed",
          number: "SO030123001",
        },
        taxBase: "200000",
        tax: "22000",
        total: "222000",
        notes: "this is note",
        approvalStatus: "approved",
        formStatus: "done",
        payment: {
          _id: "64e1d60b718d872b114ad2ef",
          paid: 20000.0,
          number: "PAY030123001",
        },
        memoJournal: {
          _id: "64e1d60b718d872b114ad2f0",
          debit: 30000.0,
          number: "MEMO030123001",
        },
        warehouse: {
          _id: "64e1d8e2ce2050d89aad14c9",
          code: "W01",
          name: "Warehouse 01",
        },
        customer: {
          _id: "64e1d91ecc6c49a93728b06d",
          code: "C01",
          name: "Customer 01",
        },
        createdBy: {
          _id: "64e1d91ecc6c49a93728b06e",
          name: "User",
        },
        items: [
          {
            _id: "64e1d60b718d872b114ad2f1",
            code: "ITEM002",
            name: "Product B",
            quantity: 5,
            unit: "kg",
            price: 40000.0,
            discount: 0.0,
            subtotal: 200000.0,
          },
        ],
      },
    ]);
  }
}
