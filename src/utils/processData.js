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

import { LangChain, Embeddings } from "langchain";

import "dotenv/config";

export async function processData(data) {
  // Initialize LangChainJS with your OpenAI API key
  const langChain = new LangChain({ apiKey: process.env.OPENAI_API_KEY });

  // Create an instance of the Embeddings class
  const embeddings = new Embeddings(langChain, "model-name");

  // Process the data
  const processedData = [];
  for (const item of data) {
    let commentEmbedding = [];
    let reply3Embedding = [];

    try {
      // Create embeddings for the Comment and Reply3 fields
      commentEmbedding = item.Comment
        ? await embeddings.create(item.Comment)
        : [];
      reply3Embedding = item.Reply3 ? await embeddings.create(item.Reply3) : [];
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
