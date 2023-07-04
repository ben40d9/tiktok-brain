// export function processData(data) {
//   return data.map((item, index) => {
//     console.log(
//       `Processing item ${index}: Comment = ${item.Comment}, Reply3 = ${item.Reply3}`
//     );
//     return {
//       id: index.toString(),
//       vector: [item.Comment, item.Reply3],
//     };
//   });
// }

import { OpenAI } from "langchain";
import "dotenv/config";

export async function processData(data) {
  // Check if data is undefined or an empty array
  if (!data || data.length === 0) {
    console.error("No data to process");
    return [];
  }

  // Create an instance of the OpenAI class
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    temperature: 0,
    maxTokens: 500,
  });

  // Process the data
  const processedData = [];
  for (const item of data) {
    let commentEmbedding = [];
    let reply3Embedding = [];

    try {
      // Create embeddings for the Comment and Reply3 fields
      commentEmbedding = item.Comment
        ? await openai.complete({ prompt: item.Comment })
        : [];
      reply3Embedding = item.Reply3
        ? await openai.complete({ prompt: item.Reply3 })
        : [];
    } catch (error) {
      console.error("Error creating embeddings:", error);
    }

    // Add the processed item to the processedData array
    processedData.push({
      id: item.id.toString(),
      vector: [...commentEmbedding, ...reply3Embedding],
    });
  }

  return processedData;
}
