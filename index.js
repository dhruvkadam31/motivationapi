const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
app.use(cors());
app.use(express.json());

const url = "mongodb+srv://dhruvkadam31yt:Yd7vHiHcM3YSJcyL@cluster0.nljpkmz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(url);
const dbName = "motivation";

// 🔁 Keep the client connected for the lifetime of the app
let coll;

async function initDB() {
  try {
    await client.connect();
    const db = client.db(dbName);
    coll = db.collection("messages");
    console.log("✅ Connected to MongoDB Atlas");
  } catch (err) {
    console.error("❌ Error connecting to MongoDB:", err.message);
  }
}

app.get("/", async (req, res) => {
  try {
    const response = await coll.find().toArray();

    if (!response || response.length === 0) {
      return res.status(404).send({ error: "No messages found" });
    }

    const r = Math.floor(Math.random() * response.length);
    res.status(200).send(response[r]);
  } catch (error) {
    console.error("❌ Error fetching data:", error.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.listen(9000, async () => {
  await initDB();
  console.log("🚀 Server ready @ http://localhost:9000");
});
