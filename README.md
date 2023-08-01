# Project Documentation: portfolio-site-krivtsoff

The deployed project can be accessed at http://209.38.216.33:7777/ or www.krivtsoff.me. \
The source code with explanatory comments is available on GitHub [repository](https://github.com/jesuisstan/portfolio-site-krivtsoff).

## Objective

The objective of this web project was to recreate and deploy a personal portfilio site.

## Implementation

The project was implemented using functional components and popular hooks in ReactJS with Javascript and [Create React App](https://facebook.github.io/create-react-app/docs/getting-started), leveraging the Bootstrap and Material UI libraries for its components and styling, in addition to custom CSS modules. The search bar was developed to be responsive, following a mobile-first approach.

## Demonstration


....


## Future Improvements

While the project has been successfully implemented and deployed, there are potential areas for improvement:

- **Error Handling**: Error handling mechanisms can be implemented to gracefully handle scenarios such as API failures, network issues, and invalid user inputs. This would provide a more robust and reliable user experience.

- **Unit Testing**: Implementing unit tests for the components and functionality of the search bar would help ensure the stability and maintainability of the codebase, allowing for easier future modifications and bug fixes.

By addressing these areas for improvement, the project can be further optimized and polished.

## How to use
#### A) With NPM:
Firstly install all the dependencies according to 'package.json' file:
```sh
npm install
```
### To run the production build of the app:
1. Install [serve](https://github.com/vercel/serve) and let it handle the rest:
```sh
npm install -g serve
```

2. Start the App:
```sh
npm run build
```

### To run the app in the development mode:
1. Start the App:
```sh
npm start
```

#### B) With Docker:
1. Build the Docker image:
```sh
docker build -t portfolio .
```
2. Run the Docker container using the following command:
```sh
docker run -p 7777:7777 portfolio
```

Open [http://localhost:7777](http://localhost:7777) to view the App in browser.
