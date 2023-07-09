import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri =
  "mongodb+srv://admin:admin123@cluster0.glemluw.mongodb.net/?retryWrites=true&w=majority";
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

let mongo = new MongoClient(uri, options);

const sampleResult = [
  {
    name: "Pooja",
    quesId: "64830198",
    score: 15,
  },
  {
    name: "Abi",
    quesId: "64830198",
    score: 12,
  },
  {
    name: "Aswin",
    quesId: "64830198",
    score: 9,
  },
  {
    name: "Vicky",
    quesId: "64830198",
    score: 1,
  },
  {
    name: "Anish",
    quesId: "64830198",
    score: 10,
  },
];

export async function GET(req) {
  const url = new URL(req.url);
  const query = new URLSearchParams(url.search);
  const id = query.get("id");
  try {
    const client = await mongo.connect();
    const db = client.db("games");
    const result = await db
      .collection("answer")
      .find({
        quesId: id,
      })
      .toArray();
    await mongo.close();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(sampleResult);
  }
}

export async function POST(req) {
  try {
    let bodyObject = await req.json();
    const client = await mongo.connect();
    const db = client.db("games");
    await db.collection("answer").insertOne(bodyObject);
    await mongo.close();
    return NextResponse.json({ message: "success" });
  } catch (error) {
    return NextResponse.json({ message: "failed" });
  }
}
