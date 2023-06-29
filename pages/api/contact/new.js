import clientPromise from "../../../lib/mongodb";

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
        // Create the given element inside the table (collection)
        await db.collection("kunde").insertOne(body);
      }
      if (req.headers["contact-type"] == "caregiver") {
        // Create the given element inside the table (collection)
        await db.collection("pflegekraft").insertOne(body);
      }
      break;
  }
  res.statusCode = 200;
  res.end();
}
