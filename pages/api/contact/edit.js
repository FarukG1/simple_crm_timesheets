import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  // Get mongodb client connection
  const client = await clientPromise;
  // Get the databes
  const db = client.db("swe-projekt");
  // Get the body of the HTTP request
  const body = req.body;
  switch (req.method) {
    case "POST":
      if (req.headers["contact-type"] == "customer") {
        // Update the given element inside the table (collection)
        await db.collection("kunde").updateOne(
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
      }
      if (req.headers["contact-type"] == "caregiver") {
        // Update the given element inside the table (collection)
        await db.collection("pflegekraft").updateOne(
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
      }
      break;
  }
  res.statusCode = 200;
  res.end();
}
