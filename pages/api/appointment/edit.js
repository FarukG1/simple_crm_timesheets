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
      // Update the given element inside the table (collection)
      await db.collection("termine").updateOne(
        { _id: new ObjectId(body._id) },
        {
          $set: {
            customer_id: new ObjectId(body.customer_id),
            caregiver_id: new ObjectId(body.caregiver_id),
            date: body.date,
          },
        },
        { upsert: false }
      );
      break;
  }
  res.statusCode = 200;
  res.end();
}
