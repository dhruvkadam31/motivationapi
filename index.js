const express=require("express");
const cors=require("cors");
const {MongoClient}=require("mongodb");


const app=express();
app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
	const url="mongodb+srv://dhruvkadam31yt:Yd7vHiHcM3YSJcyL@cluster0.nljpkmz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
	const con=new MongoClient(url);
	const db=con.db("motivation");
	const coll=db.collection("messages");
	coll.find().toArray()
	.then(response=>{
		const r=parseInt(Math.random()*response.length);
		res.status(200).send(response[r]);
	})
	.catch(error=>{
		res.status(500).send(error);
	});
});

app.listen(9000,()=>{console.log("Ready @9000");});
