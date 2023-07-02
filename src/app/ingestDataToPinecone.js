import { readSpreadsheet } from "../utils/readSpreadsheet.js";
import { processData } from "../utils/processData.js";
import { ingestData } from "../utils/ingestData.js";

const PINECONE_API_KEY = "0311d5eb-cf36-4c63-b591-66777ba9d7ec";
const PINECONE_INDEX_NAME = "tiktok-comments";

const data = readSpreadsheet("../../tiktok-data.xlsx"); // replace with the path to your downloaded spreadsheet
const processedData = processData(data);
ingestData(processedData, PINECONE_INDEX_NAME); // replace with your Pinecone API key and index name
