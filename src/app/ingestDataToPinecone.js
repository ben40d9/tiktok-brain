// import { readSpreadsheet } from "../utils/readSpreadsheet.js";
// import { processData } from "../utils/processData.js";
// import { ingestData } from "../utils/ingestData.js";

// const data = readSpreadsheet("../../tiktok-data.xlsx"); // replace with the path to your downloaded spreadsheet
// console.log(data);

// const processedData = processData(data);

// ingestData(processedData); // replace with your Pinecone API key and index name

import { useEffect } from "react";
import { PineconeClient } from "@pinecone-database/pinecone";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { LLMChain } from "langchain/chains";
import {
  StructuredOutputParser,
  OutputFixingParser,
} from "langchain/output_parsers";
import { z } from "zod";

import { readSpreadsheet } from "../utils/readSpreadsheet.js";
import { ingestData } from "../utils/ingestData.js";

import "dotenv/config";

//get all of the data from the spreadsheet
const data = readSpreadsheet("../../tiktok-data.xlsx");

const processedData = ingestData(data);
console.log(processedData);

const tiktokData = [data];

const outputParser = StructuredOutputParser.fromZodSchema(
  z
    .array(
      z.object({
        fields: z.object({
          comment: z.string().describe("The comment made on the TikTok post"),
          response: z.string().describe("The response to the comment"),
        }),
      })
    )
    .describe(
      "An array of objects, each representing a TikTok comment and its response"
    )
);

const chatModel = new ChatOpenAI({
  modelName: "gpt-4",
  temperature: 0,
});

const outputFixingParser = OutputFixingParser.fromLLM(chatModel, outputParser);

const IndexPage = () => {
  useEffect(() => {
    const processDataAndIngestToPinecone = async () => {
      const client = new PineconeClient();
      await client.init({
        environment: "northamerica-northeast1-gcp",
        apiKey: process.env.PINECONE_API_KEY,
      });

      const index = client.Index("tiktok-comments");

      for (const item of tiktokData) {
        const chain = new LLMChain({
          llm: chatModel,
          prompt: item.comment,
          outputKey: "records",
          outputParser: outputFixingParser,
        });

        const result = await chain.call();

        const vector = result.records.map((record) => record.fields);

        await index.upsert({
          upsertRequest: {
            vectors: [{ id: item.id, values: vector }],
          },
        });
      }
    };

    processDataAndIngestToPinecone();
  }, []);

  return console.log("Processing data...");
  //   return <div>Processing data...</div>;
};

export default IndexPage;
