/**
 * MongoDB Schema
 *
 * https://www.mongodb.com/docs/v6.0/core/schema-validation/update-schema-validation/
 * https://www.mongodb.com/docs/drivers/node/current/fundamentals/indexes/
 * https://www.mongodb.com/developer/products/mongodb/mongodb-schema-design-best-practices/
 */
import { IDatabaseAdapter } from "@src/database/connection.js";
import { MongoDBHelper } from "@src/database/mongodb/mongodb-helper.js";

export const collection = "purchases";

export async function createCollection(db: IDatabaseAdapter) {
  try {
    const helper = new MongoDBHelper(db);

    if (!(await helper.isExists(collection))) {
      console.info(`[schema] ${collection} - create collection`);
      await db.createCollection(collection);
    }

    console.info(`[schema] ${collection} - update schema`);
    await db.updateSchema(collection, {
      bsonType: "object",
      properties: {
        date: {
          bsonType: "string",
          description: "The first name for the example",
        },
        purchaseInvoiceNumber: {
          bsonType: "string",
          description: "The name for the example",
        },
        purchaseReceive: {
          bsonType: "object",
          properties: {
            _id: {
              bsonType: "objectId",
              description: "The _id for the purchase receive",
            },
            number: {
              bsonType: "string",
              description: "The number for the purchase receive",
            },
          },
        },
        purchaseOrder: {
          bsonType: "object",
          properties: {
            _id: {
              bsonType: "objectId",
              description: "The _id for the purchase order",
            },
            number: {
              bsonType: "string",
              description: "The number for the purchase order",
            },
          },
        },
        fakturPajak: {
          bsonType: "object",
          properties: {
            _id: {
              bsonType: "objectId",
              description: "The _id for the faktur pajak",
            },
            number: {
              bsonType: "string",
              description: "The number for the faktur pajak",
            },
          },
        },
        subTotal: {
          bsonType: "string",
          description: "The subtotal of invoice",
        },
        discount: {
          bsonType: "string",
          description: "The discount of invoice",
        },
        taxBase: {
          bsonType: "string",
          description: "Base value for added tax",
        },
        tax: {
          bsonType: "string",
          description: "Total tax to be paid",
        },
        total: {
          bsonType: "string",
          description: "Total invoice to be paid",
        },
        notes: {
          bsonType: "string",
          description: "The notes for the invoice",
        },
        approvalStatus: {
          bsonType: "string",
          enum: ["pending", "approved", "rejected"],
          description: "The approval status for the invoice",
        },
        formStatus: {
          bsonType: "string",
          enum: ["pending", "done"],
          description: "The form status for the invoice",
        },
        warehouse: {
          bsonType: "object",
          properties: {
            _id: {
              bsonType: "objectId",
              description: "The _id for the warehouse",
            },
            code: {
              bsonType: "string",
              description: "The code for the warehouse",
            },
            name: {
              bsonType: "string",
              description: "The name for the warehouse",
            },
          },
        },
        supplier: {
          bsonType: "object",
          properties: {
            _id: {
              bsonType: "objectId",
              description: "The _id for the supplier",
            },
            code: {
              bsonType: "string",
              description: "The code for the supplier",
            },
            name: {
              bsonType: "string",
              description: "The name for the supplier",
            },
          },
        },
        createdBy: {
          bsonType: "object",
          properties: {
            _id: {
              bsonType: "objectId",
              description: "The user_id for the users",
            },
            username: {
              bsonType: "string",
              description: "The username for the user",
            },
            name: {
              bsonType: "string",
              description: "The name for the user",
            },
          },
        },
        items: {
          bsonType: "array",
          items: {
            bsonType: "object",
            properties: {
              _id: {
                bsonType: "objectId",
                description: "The _id for the item",
              },
              group: {
                bsonType: "string",
                description: "The group for the item",
              },
              code: {
                bsonType: "string",
                description: "The code for the item",
              },
              name: {
                bsonType: "string",
                description: "The name for the item",
              },
              quantity: {
                bsonType: "double",
                description: "The quantity for the item",
              },
              unit: {
                bsonType: "string",
                description: "The unit for the item",
              },
              price: {
                bsonType: "double",
                description: "The price for the item",
              },
              discount: {
                bsonType: "double",
                description: "The discount for the item",
              },
              subtotal: {
                bsonType: "double",
                description: "The subtotal for the item",
              },
            },
          },
        },
      },
    });
  } catch (error) {
    throw error;
  }
}

export async function dropCollection(db: IDatabaseAdapter) {
  try {
    const helper = new MongoDBHelper(db);

    if (await helper.isExists(collection)) {
      await db.dropCollection(collection);
      console.info(`[schema] drop ${collection} collection`);
    }
  } catch (error) {
    throw error;
  }
}
