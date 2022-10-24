import sanityClient from "@sanity/client";
import fs from "fs";
import path from "path";

// @TODO: Update with your project's config
const client = sanityClient({
  projectId: "wzcguan9",
  dataset: "production",
  apiVersion: "v1",
  // As this runs in a static generation context, we can afford not using the CDN to always get the freshest data
  useCdn: false,
  token: "skfzCQ9ynO0LktfawwZW3JaWiUok3aHox81f7Gk4KyjAgGdryrb1zEf1rOFjzIPhGCfweRx3cIPxtWKlmBpnKIcfAKiPzz1Gje1PPAaegDq8haOoJ1yBP3kmvezL7IZ72BrOZjSx3Wreq5yfzwtUxHmZw1tCo4GSYywGs2VxTHUH0VB3RS14",
});

// @TODO: write your GROQ queries here
const QUERIES = [
  {
    filename: "conversations.json",
    query: `*[_type == "conversations"]`,
  }
];

const promises = QUERIES.map(({ filename, query }) => {
  return new Promise(async (resolve, reject) => {
    try {
      // 1. Get the data from Sanity
      const data = await client.fetch(query);

      // 2. Save that as JSON to disk
      fs.writeFileSync(
        path.join("data", filename),
        JSON.stringify(data, null, 2)
      );
      resolve(true);
    } catch (error) {
      console.error(`${filename} went wrong`, error);
      reject();
    }
  });
});

async function getData() {
  await Promise.allSettled(promises);
}

getData();
