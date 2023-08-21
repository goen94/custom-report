import { PurchaseRecapReportInterface, PurchaseReportInterface } from "../modules/purchasing/model/purchase.entity";
import { CreateManyExampleRepository } from "../modules/purchasing/model/repository/create-many.repository";
import { PurchaseReportService } from "../modules/purchasing/services/purchase-report.service.js";
import { QueryInterface } from "@src/database/connection";
import { db } from "@src/database/database.js";
import { PurchaseRecapReportService } from "@src/modules/purchasing/services/purchase-recap-report.service.js";

const iQuery: QueryInterface = {
  fields: "",
  filter: {},
  page: Number(1),
  pageSize: Number(10),
  sort: "",
};

export class PurchaseFactory {
  public async retrievePurchaseRecapReport(): Promise<PurchaseRecapReportInterface[]> {
    const purchaseRecapReportService = new PurchaseRecapReportService(db);
    return (await purchaseRecapReportService.handle(iQuery, [])).data;
  }

  public async retrievePurchaseReport(): Promise<PurchaseReportInterface[]> {
    const purchaseReportService = new PurchaseReportService(db);
    return (await purchaseReportService.handle(iQuery, [])).data as unknown as Array<PurchaseReportInterface>;
  }

  public async createMany() {
    const createMany = new CreateManyExampleRepository(db);
    return await createMany.handle([
      {
        date: "2023-01-02",
        purchaseInvoiceNumber: "PI020123001",
        purchaseReceive: {
          _id: "64e1cbb65cf72f7fbf63cc76",
          number: "RECEIVE020123001",
        },
        purchaseOrder: {
          _id: "64e1cbb65cf72f7fbf63cc77",
          number: "ORDER020123001",
        },
        taxBase: "530000",
        tax: "58300",
        total: "588300",
        notes: "this is note",
        approvalStatus: "approved",
        formStatus: "done",
        warehouse: {
          _id: "64e1cbb65cf72f7fbf63cc75",
          code: "W01",
          name: "Warehouse 01",
        },
        supplier: {
          _id: "64e1cc9f8fbb90046ce53e94",
          code: "S01",
          name: "Supplier 01",
        },
        createdBy: {
          _id: "64e1cc9f8fbb90046ce53e95",
          name: "User",
        },
        items: [
          {
            _id: "64e1cce47d35acc590d66f9e",
            code: "ITEM001",
            name: "Product A",
            quantity: 5,
            unit: "pcs",
            price: 50000.0,
            discount: 20000.0,
            subtotal: 230000.0,
          },
          {
            _id: "64e1cce47d35acc590d66f9d",
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
        date: "2023-01-02",
        purchaseInvoiceNumber: "PI020123002",
        purchaseReceive: {
          _id: "64e1cc6f39260abaf7accc6e",
          number: "RECEIVE020123002",
        },
        purchaseOrder: {
          _id: "64e1cc6f39260abaf7accc6f",
          number: "ORDER020123002",
        },
        taxBase: "300000",
        tax: "33000",
        total: "333000",
        notes: "this is note",
        approvalStatus: "approved",
        formStatus: "done",
        warehouse: {
          _id: "64e1cbb65cf72f7fbf63cc75",
          code: "W01",
          name: "Warehouse 01",
        },
        supplier: {
          _id: "64e1cc9f8fbb90046ce53e94",
          code: "S01",
          name: "Supplier 01",
        },
        createdBy: {
          _id: "64e1cc9f8fbb90046ce53e95",
          name: "User",
        },
        items: [
          {
            _id: "64e1cce47d35acc590d66f9d",
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
        purchaseInvoiceNumber: "PI030123001",
        purchaseReceive: {
          _id: "64e1cc6f39260abaf7accc70",
          number: "RECEIVE030123001",
        },
        purchaseOrder: {
          _id: "64e1cc9f8fbb90046ce53e93",
          number: "ORDER030123001",
        },
        taxBase: "200000",
        tax: "22000",
        total: "222000",
        notes: "this is note",
        approvalStatus: "approved",
        formStatus: "done",
        warehouse: {
          _id: "64e1cbb65cf72f7fbf63cc75",
          code: "W01",
          name: "Warehouse 01",
        },
        supplier: {
          _id: "64e1cc9f8fbb90046ce53e94",
          code: "S01",
          name: "Supplier 01",
        },
        createdBy: {
          _id: "64e1cc9f8fbb90046ce53e95",
          name: "User",
        },
        items: [
          {
            _id: "64e1cce47d35acc590d66f9c",
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
      {
        date: "2023-01-30",
        purchaseInvoiceNumber: "PI300123001",
        purchaseReceive: {
          _id: "64e36b4e9dfa2517f580acc9",
          number: "RECEIVE300123001",
        },
        purchaseOrder: {
          _id: "64e36b4e9dfa2517f580acca",
          number: "ORDER300123001",
        },
        taxBase: "200000",
        tax: "22000",
        total: "222000",
        notes: "this is note",
        approvalStatus: "approved",
        formStatus: "done",
        warehouse: {
          _id: "64e1cbb65cf72f7fbf63cc75",
          code: "W01",
          name: "Warehouse 01",
        },
        supplier: {
          _id: "64e1cc9f8fbb90046ce53e94",
          code: "S01",
          name: "Supplier 01",
        },
        createdBy: {
          _id: "64e1cc9f8fbb90046ce53e95",
          name: "User",
        },
        items: [
          {
            _id: "64e1cce47d35acc590d66f9c",
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
