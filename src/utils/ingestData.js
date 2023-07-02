// import { PineconeClient } from "@pinecone-database/pinecone";

// // const PINECONE_API_KEY = "0311d5eb-cf36-4c63-b591-66777ba9d7ec";

// // const indexName = "tiktok-comments";

// export async function ingestData(data, PINECONE_API_KEY, indexName) {
//   const client = new PineconeClient();

//   await client.init(PINECONE_API_KEY);
//   //   client.init(PINECONE_API_KEY);

//   const index = client.Index("tiktok-comments");

//   // Upsert the data into the index
//   const upsertResponse = await index.upsert(
//     indexName,
//     data.map((item) => ({ id: item.id, vector: item.vector }))
//   );
//   console.log("Data successfully ingested into Pinecone:", upsertResponse);
// }
import fetch from "node-fetch";
import { PineconeClient } from "@pinecone-database/pinecone";

global.fetch = fetch;

const PINECONE_API_KEY = "0311d5eb-cf36-4c63-b591-66777ba9d7ec";

export async function ingestData(data) {
  try {
    const client = new PineconeClient();

    await client.init({
      environment: "northamerica-northeast1-gcp" ?? "",
      apiKey: PINECONE_API_KEY ?? "",
    });

    const index = client.Index("tiktok-comments");

    // Upsert the data into the index
    const upsertResponse = await index.upsert({
      upsertRequest: {
        vectors: [data.map((item) => ({ id: item.id, values: item.vector }))],
        namespace: "tiktok-namespace",
      },
    });
    console.log("Data successfully ingested into Pinecone:", upsertResponse);
  } catch (error) {
    console.error("Error ingesting data into Pinecone:", error);
  }
}
