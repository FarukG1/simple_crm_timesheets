import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("swe-projekt");
  const body = req.body;
  switch (req.method) {
    case "POST":
      console.log(body);
      await db.collection("termine").deleteOne({ _id: new ObjectId(body._id) });
      break;
  }
  res.statusCode = 200;
  res.end();
}
