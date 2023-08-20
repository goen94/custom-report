import request from "supertest";
import { createApp } from "@src/app.js";
import { SalesFactory } from "@src/test/sales-factory.js";
import { resetDatabase, retrieveAll } from "@src/test/utils.js";

describe("retrieve sales report", () => {
  beforeEach(async () => {
    await resetDatabase();
  });
  it("should be able to filter report by date", async () => {
    const app = await createApp();

    const salesFactory = new SalesFactory();
    await salesFactory.createMany();

    const data = await salesFactory.retrieveSalesReport();

    const response = await request(app).get(`/v1/sales-report`).query({
      dateFrom: "2023-01-01",
      dateTo: "2023-01-08",
    });

    // expect http response
    expect(response.statusCode).toEqual(200);

    // expect response json
    expect(response.body.data.length).toStrictEqual(3);
    expect(response.body.data[0]._id).toBeDefined();
    expect(response.body.data[0].salesOrder.number).toStrictEqual(data[0].salesOrder?.number);
    expect(response.body.data[0].invoiceNumber).toStrictEqual(data[0].invoiceNumber);
    expect(response.body.data[0].date).toStrictEqual(data[0].date);
    expect(response.body.data[0].warehouse.name).toStrictEqual(data[0].warehouse?.name);
    expect(response.body.data[0].warehouse.code).toStrictEqual(data[0].warehouse?.code);
    expect(response.body.data[0].customer.code).toStrictEqual(data[0].customer?.code);
    expect(response.body.data[0].customer.name).toStrictEqual(data[0].customer?.name);
    expect(response.body.data[0].item.code).toStrictEqual(data[0].item?.code);
    expect(response.body.data[0].item.name).toStrictEqual(data[0].item?.name);
    expect(response.body.data[0].notes).toStrictEqual(data[0].notes);
    expect(response.body.data[0].quantity).toStrictEqual(data[0].quantity);
    expect(response.body.data[0].unit).toStrictEqual(data[0].unit);
    expect(response.body.data[0].price).toStrictEqual(data[0].price);
    expect(response.body.data[0].discount).toStrictEqual(data[0].discount);
    expect(response.body.data[0].tax).toStrictEqual(data[0].tax);
    expect(response.body.data[0].total).toStrictEqual(data[0].total);

    expect(response.body.pagination.page).toStrictEqual(1);
    expect(response.body.pagination.pageSize).toStrictEqual(10);
    expect(response.body.pagination.pageCount).toStrictEqual(1);
    expect(response.body.pagination.totalDocument).toStrictEqual(3);
  });
  it("should be able to filter report by date and customer", async () => {
    const app = await createApp();

    const salesFactory = new SalesFactory();
    await salesFactory.createMany();

    const allData = await retrieveAll("sales");
    const data = await salesFactory.retrieveSalesReport();

    const response = await request(app).get(`/v1/sales-report`).query({
      dateFrom: "2023-01-01",
      dateTo: "2023-01-08",
      customer_id: allData[0].customer._id,
    });

    // expect http response
    expect(response.statusCode).toEqual(200);

    // expect response json
    expect(response.body.data.length).toStrictEqual(3);
    expect(response.body.data[0]._id).toBeDefined();
    expect(response.body.data[0].salesOrder.number).toStrictEqual(data[0].salesOrder?.number);
    expect(response.body.data[0].invoiceNumber).toStrictEqual(data[0].invoiceNumber);
    expect(response.body.data[0].date).toStrictEqual(data[0].date);
    expect(response.body.data[0].warehouse.name).toStrictEqual(data[0].warehouse?.name);
    expect(response.body.data[0].warehouse.code).toStrictEqual(data[0].warehouse?.code);
    expect(response.body.data[0].customer.code).toStrictEqual(data[0].customer?.code);
    expect(response.body.data[0].customer.name).toStrictEqual(data[0].customer?.name);
    expect(response.body.data[0].item.code).toStrictEqual(data[0].item?.code);
    expect(response.body.data[0].item.name).toStrictEqual(data[0].item?.name);
    expect(response.body.data[0].notes).toStrictEqual(data[0].notes);
    expect(response.body.data[0].quantity).toStrictEqual(data[0].quantity);
    expect(response.body.data[0].unit).toStrictEqual(data[0].unit);
    expect(response.body.data[0].price).toStrictEqual(data[0].price);
    expect(response.body.data[0].discount).toStrictEqual(data[0].discount);
    expect(response.body.data[0].tax).toStrictEqual(data[0].tax);
    expect(response.body.data[0].total).toStrictEqual(data[0].total);

    expect(response.body.pagination.page).toStrictEqual(1);
    expect(response.body.pagination.pageSize).toStrictEqual(10);
    expect(response.body.pagination.pageCount).toStrictEqual(1);
    expect(response.body.pagination.totalDocument).toStrictEqual(3);
  });
});
