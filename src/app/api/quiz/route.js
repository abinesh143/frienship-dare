import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri =
  "mongodb+srv://admin:admin123@cluster0.glemluw.mongodb.net/?retryWrites=true&w=majority";
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

const mongo = new MongoClient(uri, options);

const sampleQuestion = [
  {
    _id: "64a610666ba854150f100589",
    userName: "Friend",
    userId: "64830198",
    selected: [
      {
        quesId: "ques1",
        ansId: "1",
      },
      {
        quesId: "ques2",
        ansId: "6",
      },
      {
        quesId: "ques3",
        ansId: "9",
      },
      {
        quesId: "ques4",
        ansId: "14",
      },
      {
        quesId: "ques5",
        ansId: "15",
      },
      {
        quesId: "ques8",
        ansId: "31",
      },
      {
        quesId: "ques9",
        ansId: "37",
      },
      {
        quesId: "ques10",
        ansId: "39",
      },
      {
        quesId: "ques11",
        ansId: "40",
      },
      {
        quesId: "ques12",
        ansId: "43",
      },
      {
        quesId: "ques13",
        ansId: "44",
      },
      {
        quesId: "ques16",
        ansId: "55",
      },
      {
        quesId: "ques18",
        ansId: "63",
      },
      {
        quesId: "ques22",
        ansId: "79",
      },
    ],
  },
];

export async function GET(req) {
  const url = new URL(req.url);
  const query = new URLSearchParams(url.search);
  const id = query.get("id");
  try {
    const client = await mongo.connect();
    const db = client.db("games");
    const allPosts = await db
      .collection("dares")
      .find({ userId: id })
      .toArray();
    await mongo.close();
    return NextResponse.json(allPosts[0]);
  } catch (error) {
    return NextResponse.json(sampleQuestion[0]);
  }
}

export async function POST(req) {
  try {
    let bodyObject = await req.json();
    const client = await mongo.connect();
    const db = client.db("games");
    await db.collection("dares").insertOne(bodyObject);
    await mongo.close();
    return NextResponse.json({ message: "success" });
  } catch (error) {
    return NextResponse.json({ message: "failed" });
  }
}
