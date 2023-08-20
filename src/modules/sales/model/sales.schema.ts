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
        salesInvoiceNumber: {
          bsonType: "string",
          description: "The name for the example",
        },
        deliveryNote: {
          bsonType: "object",
          properties: {
            _id: {
              bsonType: "objectId",
              description: "The _id for the delivery note",
            },
            number: {
              bsonType: "string",
              description: "The number for the delivery note",
            },
          },
        },
        salesOrder: {
          bsonType: "object",
          properties: {
            _id: {
              bsonType: "objectId",
              description: "The _id for the sales order",
            },
            number: {
              bsonType: "string",
              description: "The number for the sales order",
            },
          },
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
        createdBy: {
          bsonType: "object",
          properties: {
            _id: {
              bsonType: "objectId",
              description: "The user_id for the users",
            },
            name: {
              bsonType: "string",
              description: "The name for the user",
            },
          },
        },
        payment: {
          bsonType: "object",
          properties: {
            _id: {
              bsonType: "objectId",
              description: "The _id for the payment",
            },
            paid: {
              bsonType: "double",
              description: "The total payment for the invoice",
            },
            number: {
              bsonType: "string",
              description: "The number for the payment",
            },
          },
        },
        memoJournal: {
          bsonType: "object",
          properties: {
            _id: {
              bsonType: "objectId",
              description: "The _id for the memo journal",
            },
            debit: {
              bsonType: "double",
              description: "The total memo journal for the invoice",
            },
            number: {
              bsonType: "string",
              description: "The number for the memo journal",
            },
          },
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
        customer: {
          bsonType: "object",
          properties: {
            _id: {
              bsonType: "objectId",
              description: "The _id for the customer",
            },
            code: {
              bsonType: "string",
              description: "The code for the customer",
            },
            name: {
              bsonType: "string",
              description: "The name for the customer",
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
