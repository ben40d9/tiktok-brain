# TikTok Brain

TikTok Brain is a Next.js application that uses the Pinecone database to process and analyze TikTok data. The application is built with TypeScript and uses Tailwind CSS for styling.

## Repository Structure

```
.
├── .eslintrc.json
├── .gitignore
├── README.md
├── next.config.js
├── package-lock.json
├── package.json
├── postcss.config.js
├── public
│   ├── next.svg
│   └── vercel.svg
├── src
│   ├── app
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── ingestDataToPinecone.js
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── utils
│       ├── ingestData.js
│       ├── processData.js
│       └── readSpreadsheet.js
├── tailwind.config.js
├── tiktok-data.xlsx
└── tsconfig.json
```

## Key Files

- `package.json`: This file lists the project dependencies and scripts. The application uses Next.js for the frontend, Pinecone for the database, and several other libraries for various functionalities.

- `next.config.js`: This file contains the configuration for Next.js. Currently, it's an empty configuration.

- `src/app/page.tsx`: This is the main application file. It contains the layout and main logic of the application.

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

```

```
