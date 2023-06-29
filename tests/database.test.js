const { MongoClient } = require("mongodb");

describe("check", () => {
  let client;
  let db;

  beforeAll(async () => {
    client = await MongoClient.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await client.db();
  });
  it("Asks Database for customer list", async () => {
    const customers = await db
      .collection("kunde")
      .find({})
      .sort({ lastname: 1 })
      .toArray();
    const mockCustomer = {
      _id: "64984ea50d0b90d7b94df02c",
      name: "Max",
      lastname: "Mustermann",
      birthdate: "1999-12-31T00:00:00.000Z",
      email: "max@example.de",
      inhouse: false,
      adress: {
        street: "Musterstraße",
        nr: "42",
        zip: "40233",
        city: "Musterstadt",
      },
    };

    customers.forEach((customer) => {
      expect(customer).toEqual(mockCustomer);
    });
  });

  afterAll(async () => {
    await client.close();
  });
});
