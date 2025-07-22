const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  const url = "mongodb+srv://dhruvkadam31yt:Yd7vHiHcM3YSJcyL@cluster0.nljpkmz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
  const con = new MongoClient(url);

  try {
    await con.connect(); // IMPORTANT
    const db = con.db("motivation");
    const coll = db.collection("messages");
    const response = await coll.find().toArray();
    const r = Math.floor(Math.random() * response.length);
    res.status(200).send(response[r]);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  } finally {
    await con.close();
  }
});

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
