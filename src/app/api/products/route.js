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
    _id: "657a9448213e7d5026b42d05",
    imageUrl:
      "https://res.cloudinary.com/dd4iqjurs/image/upload/v1702532125/51lV1fQJnlL._SX679__ecbzbi.jpg",
    amazonLink: "https://amzn.to/3Rp8NLw",
    gender: "men",
    language: "english",
  },
  {
    _id: "657a9526213e7d5026b42d06",
    imageUrl:
      "https://res.cloudinary.com/dd4iqjurs/image/upload/v1702532318/51VVtoKD6oL._SY741__xkfxjq.jpg",
    amazonLink: "https://amzn.to/46YbWI9",
    gender: "men",
    language: "tamil",
  },
  {
    _id: "657a95b1213e7d5026b42d07",
    imageUrl:
      "https://res.cloudinary.com/dd4iqjurs/image/upload/v1702532495/61ow9ddDfTL._SY741__sk7xph.jpg",
    amazonLink: "https://amzn.to/3uZvej2",
    gender: "men",
    language: "tamil",
  },
  {
    _id: "657a9679213e7d5026b42d08",
    imageUrl:
      "https://res.cloudinary.com/dd4iqjurs/image/upload/v1702532677/61rCx6_5buL._SY741__lmhs0c.jpg",
    amazonLink: "https://amzn.to/3GFAb2S",
    gender: "men",
    language: "tamil",
  },
  {
    _id: "657a9902213e7d5026b42d09",
    imageUrl:
      "https://res.cloudinary.com/dd4iqjurs/image/upload/v1702533324/51VoarDkqlL._SX679__ms3sgf.jpg",
    language: "tamil",
    gender: "men",
    amazonLink: "https://amzn.to/3GG6b71",
  },
  {
    _id: "657a9b28213e7d5026b42d0a",
    imageUrl:
      "https://res.cloudinary.com/dd4iqjurs/image/upload/v1702533867/61kdJ7qH_rL._SY741__aoocd4.jpg",
    language: "tamil",
    gender: "men",
    amazonLink: "https://amzn.to/3Nqg2lb",
  },
  {
    _id: "657a9b86213e7d5026b42d0b",
    imageUrl:
      "https://res.cloudinary.com/dd4iqjurs/image/upload/v1702533992/61kUIdYnRbL._SY741__osjoyi.jpg",
    language: "tamil",
    gender: "men",
    amazonLink: "https://amzn.to/480PIqb",
  },
  {
    _id: "657a9bdd213e7d5026b42d0c",
    imageUrl:
      "https://res.cloudinary.com/dd4iqjurs/image/upload/v1702534070/51TQbAHlieL._SX679__tyqjmk.jpg",
    language: "tamil",
    gender: "men",
    amazonLink: "https://amzn.to/3Nqg2lb",
  },
  {
    _id: "657a9c664884ecde091dcfe4",
    imageUrl:
      "https://res.cloudinary.com/dd4iqjurs/image/upload/v1702534217/611gPK8xh6L._SY741__xevzyv.jpg",
    language: "tamil",
    gender: "men",
    amazonLink: "https://amzn.to/3RpBwjD",
  },
  {
    _id: "657af18f3043b689a09cfaeb",
    imageUrl:
      "https://res.cloudinary.com/dd4iqjurs/image/upload/v1702555990/51nx0aBTDWL._SX679__ysb1yr.jpg",
    language: "english",
    gender: "men",
    amazonLink: "https://amzn.to/46WKNVV",
  },
  {
    _id: "657af1cc3043b689a09cfaec",
    imageUrl:
      "https://res.cloudinary.com/dd4iqjurs/image/upload/v1702556090/51jvOWdCNEL._SX679__lwwc3x.jpg",
    language: "english",
    gender: "men",
    amazonLink: "https://amzn.to/3RnbRrB",
  },
  {
    _id: "657af2083043b689a09cfaed",
    imageUrl:
      "https://res.cloudinary.com/dd4iqjurs/image/upload/v1702556151/51uMDIvigOL._SX679__jmpaii.jpg",
    language: "tamil",
    gender: "men",
    amazonLink: "https://amzn.to/3TqaCuy",
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
    return NextResponse.json(allProduct);
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
