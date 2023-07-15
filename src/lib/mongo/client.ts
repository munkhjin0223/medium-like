import { MongoClient } from 'mongodb';

const URI = process.env.DATABASE_URL;
const options = {};

if (!URI) throw new Error('Please add your Mongo URI to .env.local');

let client = new MongoClient(URI, options);
let clientPromise: any;

if (process.env.NODE_ENV !== 'production') {
  // @ts-ignore
  if (!global._mongoClientPromise) {
    // @ts-ignore
    global._mongoClientPromise = client.connect();
  }

  // @ts-ignore
  clientPromise = global._mongoClientPromise;
} else {
  clientPromise = client.connect();
}

export default clientPromise;
