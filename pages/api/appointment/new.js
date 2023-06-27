import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("swe-projekt");
  const body = req.body;
  switch (req.method) {
    case "POST":
      await db.collection("termine").insertOne({
        customer_id: new ObjectId(body.customer_id),
        caregiver_id: new ObjectId(body.caregiver_id),
        date: body.date,
      });
      break;
  }
  res.statusCode = 200;
  res.end();
}
