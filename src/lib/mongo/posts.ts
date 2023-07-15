// @ts-ignore
import clientPromise from '@/lib/mongo/client';

let client: any;
let db: any;
let posts: any;

async function init() {
  if (db) return;
  try {
    client = await clientPromise;
    db = await client.db();
    posts = await db.collection('posts');
  } catch (error) {
    throw new Error('Failed to connect to the database.');
  }
}

(async () => {
  await init();
})();

export async function getPosts() {
  if (!posts) await init();

  const result = await posts.find({}).toArray();

  return { posts: result };
}
