const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
app.use(cors());
app.use(express.json());

const url = "mongodb+srv://dhruvkadam31yt:Yd7vHiHcM3YSJcyL@cluster0.nljpkmz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(url);
const dbName = "motivation";

app.get("/", async (req, res) => {
  try {
    await client.connect(); // 🔴 THIS IS IMPORTANT
    const db = client.db(dbName);
    const coll = db.collection("messages");
    const response = await coll.find().toArray();

    if (response.length === 0) {
      return res.status(404).send({ error: "No messages found" });
    }

    const r = Math.floor(Math.random() * response.length);
    res.status(200).send(response[r]);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).send({ error: "Internal Server Error" });
  } finally {
    await client.close(); // Optional: You can keep it open if hitting frequently
  }
});

app.listen(9000, () => {
  console.log("✅ Server ready @ http://localhost:9000");
});
