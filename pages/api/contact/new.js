import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("swe-projekt");
  const body = req.body;
  switch (req.method) {
    case "POST":
      if (req.headers["contact-type"] == "customer") {
        await db.collection("kunde").insertOne(body);
      }
      if (req.headers["contact-type"] == "caregiver") {
        await db.collection("pflegekraft").insertOne(body);
      }
      break;
  }
  res.statusCode = 200;
  res.end();
}
