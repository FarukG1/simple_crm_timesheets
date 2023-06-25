import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("swe-projekt");
  const body = req.body;
  switch (req.method) {
    case "POST":
      await db.collection("termine").insertOne(body);
      break;
  }
  res.statusCode = 200;
  res.end();
}
