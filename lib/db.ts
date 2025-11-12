import { MongoClient, ServerApiVersion } from "mongodb";

const uri = `mongodb+srv://${process.env.NEXT_PUBLIC_db_user}:${process.env.NEXT_PUBLIC_db_pass}@cluster0.wwjbp.mongodb.net/?appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const users = client.db("usersDB").collection("users");

export default  users 
