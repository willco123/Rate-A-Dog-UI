Live at: https://rateadog.netlify.app/

# React User Interface for Rate a Dog

Welcome to the React User Interface for Rate a Dog! This repository contains a web-based user interface built with React.js and written in Typescript.

## Features

    User-friendly interface for interacting with the API
    Authentication and authorization mechanisms
    Seemless scrolling mechanism for browsing various dogs
    Table for viewing data aggregations with filtering options

The UI features a carousel allowing users to seamlessly navigate the collection. This Carousel makes use of the Intersection Observer API to lazy load the images, along with a dynamic loading system. The loading system loads in new data and removes trailing data as the user navigates the carousel. The current sample size is set to 100 and the boundaries are at either either extremes of the carousel. If you were to lower or increase the sample size the boundaries would also need to be configured.

## Getting Started

```bash
git clone https://github.com/willco123/Rate-A-Dog-UI
```

Install the dependencies using a package manager such as npm or Yarn:

```bash
npm install
```

Open the webpack.dev.mjs file and replace desiredPort with the port of your choice.
The UI will run locally on http://localhost:xxxx/

Start the development server:

```bash
npm start
```

This command will start the development server and open the application in your default browser.

## License

This project is licensed under the MIT License.
