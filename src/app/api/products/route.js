import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri =
  "mongodb+srv://admin:admin123@cluster0.glemluw.mongodb.net/?retryWrites=true&w=majority";
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

const mongo = new MongoClient(uri, options);

const sampleProduct = [
  {
    _id: "1",
    imageUrl:
      "/empty.jpg",
    category: "mens-tamil",
    amazonLink: "https://games.smileyshopy.in/",
  },
];

export async function GET(req) {
  const url = new URL(req.url);
  // const query = new URLSearchParams(url.search);
  // const id = query.get("id");
  try {
    const client = await mongo.connect();
    const db = client.db("smiley");
    const allProduct = await db.collection("product").find({}).toArray();
    await mongo.close();
    // return NextResponse.json(allProduct);
    return NextResponse.json(sampleProduct);
  } catch (error) {
    return NextResponse.json(sampleProduct);
  }
}

export async function POST(req) {
  try {
    let bodyObject = await req.json();
    const client = await mongo.connect();
    const db = client.db("smiley");
    await db.collection("product").insertOne(bodyObject);
    await mongo.close();
    return NextResponse.json({ message: "success" });
  } catch (error) {
    return NextResponse.json({ message: "failed" });
  }
}
