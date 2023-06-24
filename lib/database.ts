import clientPromise from "./mongodb";
import { Table, TableType } from "./types";
import { Customer, Caregiver, Appointment} from "./classes";

export class DatabaseClass {
  async get(table: TableType){
    const client = await clientPromise;
    try {
      const db = client.db("swe-projekt");
  
      if(table == new Table().Customer) {
        return await db.collection("kunde")
          .find({})
          .sort({ _id: -1 })
          .toArray();
      }
  
      if(table == new Table().Caregiver) {
        return await db.collection("pflegekraft")
          .find({})
          .sort({ _id: -1 })
          .toArray();
      }
  
      if(table == new Table().Appointment) {
        return await db.collection("termin")
          .find({})
          .sort({ _id: -1 })
          .toArray();
      }
  
    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
    }
  }
  async create(data: Customer | Caregiver | Appointment) {
    const client = await clientPromise;
    try {
      const db = client.db("swe-projekt");
  
      if(typeof data == typeof Customer) {
        return await db.collection("kunde").insertOne(data);
      }
  
      if(typeof data == typeof Caregiver) {
        return await db.collection("pflegekraft").insertOne(data);
      }
  
      if(typeof data == typeof Appointment) {
        return await db.collection("termin").insertOne(data);
      }
  
    } catch (e) {
      console.error(e);
      throw new Error("Failed to fetch data");
    } finally {
      await client.close();
    }
  }
  async update(data: Customer | Caregiver | Appointment) {
    const client = await clientPromise;
    try {
      const db = client.db("swe-projekt");
  
      if(typeof data == typeof Customer) {
        return await db.collection("kunde").updateOne(
          { _id: data.id },
          { $set: data }
        );
      }
  
      if(typeof data == typeof Caregiver) {
        return await db.collection("pflegekraft").updateOne(
          { _id: data.id },
          { $set: data }
        );
      }
  
      if(typeof data == typeof Appointment) {
        return await db.collection("termin").updateOne(
          { _id: data.id },
          { $set: data }
        );
      }
  
    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
    }
  }
  async remove(data: Customer | Caregiver | Appointment) {
    const client = await clientPromise;
    try {
      const db = client.db("swe-projekt");
  
      if(typeof data == typeof Customer) {
        await db.collection("kunde").deleteOne({ _id: data.id });
        return true;
      }
  
      if(typeof data == typeof Caregiver) {
        await db.collection("pflegekraft").deleteOne({ _id: data.id });
        return true;
      }
  
      if(typeof data == typeof Appointment) {
        await db.collection("termin").deleteOne({ _id: data.id });
        return true;
      }
  
    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
    }
  }
}