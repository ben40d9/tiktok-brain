import { readSpreadsheet } from "../utils/readSpreadsheet.js";
import { processData } from "../utils/processData.js";
import { ingestData } from "../utils/ingestData.js";

const data = readSpreadsheet("../../tiktok-data.xlsx"); // replace with the path to your downloaded spreadsheet

const processedData = processData(data);

ingestData(processedData); // replace with your Pinecone API key and index name
