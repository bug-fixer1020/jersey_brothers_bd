import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('MONGODB_URI is missing in .env');
}

const client = new MongoClient(uri);

const clientPromise = client.connect();

export async function getCollection(collectionName) {
  const connection = await clientPromise;

  const db = connection.db('jersey_brother_bd');

  return db.collection(collectionName);
}

export default clientPromise;