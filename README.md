# TikTok Brain

Welcome to the TikTok Brain project! This application is designed to process and ingest data from a spreadsheet into a Pinecone database. The data represents a series of comments and responses from a TikTok post, and the goal of this project is to structure and store this data in a way that's easy to access and analyze.

## Functionality

The application works in several steps:

1. **Reading the Spreadsheet:** The application begins by reading an Excel spreadsheet using the `readSpreadsheet.js` utility. This utility uses the `xlsx` library to read the spreadsheet and convert the first sheet into a JSON object.

2. **Processing the Data:** The `processData.js` utility then takes this JSON object and processes it. It filters out any rows that don't have a value for the 'Comment' or 'Reply3' fields, and then maps the data to a new format that's suitable for our Pinecone database.

3. **Ingesting the Data:** The application then ingests the processed data into the Pinecone database. It does this by calling the `ingestDataToPinecone.js` function, which handles the connection and data insertion to Pinecone.

## Intended Use

This application is intended to be a robust and efficient solution for processing and storing TikTok comment data. By storing this data in a Pinecone database, we can easily perform complex queries and analyses on the data. This could be useful for a variety of purposes, such as sentiment analysis, trend identification, or social media monitoring.

The application is designed to be flexible and adaptable. The `readSpreadsheet.js` and `processData.js` utilities can be modified to handle different spreadsheet formats or data processing requirements. Similarly, the Pinecone connection settings and data ingestion method can be adjusted to suit different databases or data structures.

## Setup

To set up the project locally, follow these steps:

1. Clone the repository.
2. Install the dependencies with `npm install`.
3. Start the development server with `npm run dev`.

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the application in production mode.
- `npm run lint`: Runs the linter.

## Contributing

Contributions are welcome! Please make sure to update tests as appropriate.

## Future Work

While the application is currently functional, there are several areas where it could be improved:

- **Error Handling:** More comprehensive error handling could be added to catch and handle any errors that might occur during the reading, processing, and inserting of data.

- **Code Review:** The code could benefit from a review by another developer. They might be able to spot any issues or areas for improvement that have been missed.

- **Documentation:** More detailed documentation could be added to explain how each part of the application works and how to use it.

- **Unit Testing:** Unit tests could be added to ensure that each part of the application is working correctly.

- **Security:** The security of the Pinecone connection could be improved by storing the connection string in an environment variable instead of in the code.
