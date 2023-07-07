import { PineconeClient } from "@pinecone-database/pinecone";

import "dotenv/config";

import { App } from "embedchain";

export async function ingestData(data) {
  try {
    const client = new PineconeClient();

    //initialize the client
    await client.init({
      environment: "northamerica-northeast1-gcp" ?? "",
      apiKey: `${process.env.PINECONE_API_KEY}` ?? "",
    });

    // // Create an index
    // const index = await client.createIndex({
    //   createRequest: {
    //     name: "tiktok-comments",
    //     dimension: 768,
    //   },
    // });

    //list the indexes
    const indexList = await client.listIndexes();
    console.log(`This is the index list: ${indexList}`);

    //refrence to the index
    const index = client.Index("tiktok-comments");

    // //create a collection
    // const collection = await client.createCollection({
    //   CreateCollectionRequest: {
    //     name: "tiktok-comments-collection",

    //     source: "tiktok-comments",
    //   },
    // });

    //list collections
    const collectionList = await client.listCollections();
    console.log(collectionList);

    // const upsertRequest = {
    //   vectors: data.map((item) => ({
    //     id: item.id ?? "",
    //     comment: item.vector[0] ?? "",
    //     response: item.vector[1] ?? "",
    //   })),
    // };
    // const upsertResponse = await index.upsert({ upsertRequest });

    // Log the data that is being ingested
    console.log(
      "Ingesting data:",
      data.map((item) => ({
        id: item.id,
        comment: item.vector[0],
        response: item.vector[1],
      }))
    );

    // Upsert the data into the index
    const upsertResponse = await index.upsert({
      upsertRequest: {
        vectors: data.map((item) => ({
          id: item.id ?? "",
          comment: item.vector[0] ?? "",
          response: item.vector[1] ?? "",
        })),
      },
    });

    console.log("Data successfully ingested into Pinecone:", upsertResponse);
  } catch (error) {
    console.error("Error ingesting data into Pinecone:", error);
  }
}
