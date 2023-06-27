import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("swe-projekt");
  const body = req.body;
  switch (req.method) {
    case "POST":
      if (req.headers["contact-type"] == "customer") {
        console.log(req.headers["contact-type"]);
        await db.collection("kunde").deleteOne({ _id: new ObjectId(body._id) });
      }
      if (req.headers["contact-type"] == "caregiver") {
        console.log(req.headers["contact-type"]);
        await db
          .collection("pflegekraft")
          .deleteOne({ _id: new ObjectId(body._id) });
      }
      break;
  }
  res.statusCode = 200;
  res.end();
}
