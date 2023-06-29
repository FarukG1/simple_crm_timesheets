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
        // Delete the given element inside the table (collection)
        await db.collection("kunde").deleteOne({ _id: new ObjectId(body._id) });
      }
      if (req.headers["contact-type"] == "caregiver") {
        // Delete the given element inside the table (collection)
        await db
          .collection("pflegekraft")
          .deleteOne({ _id: new ObjectId(body._id) });
      }
      break;
  }
  res.statusCode = 200;
  res.end();
}
