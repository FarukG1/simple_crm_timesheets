import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("swe-projekt");
  const body = req.body;
  switch (req.method) {
    case "POST":
      await db.collection("termine").updateOne(
        { _id: new ObjectId(body._id) },
        {
          $set: {
            name: body.name,
            lastname: body.lastname,
            birthdate: body.birthdate,
            adress: {
              street: body.adress.street,
              nr: body.adress.nr,
              zip: body.adress.zip,
              city: body.adress.city,
            },
            email: body.email,
            inhouse: body.inhouse,
          },
        },
        { upsert: false }
      );
      break;
  }
  res.statusCode = 200;
  res.end();
}
