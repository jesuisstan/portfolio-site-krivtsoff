# Project Documentation: portfolio-site-krivtsoff

The deployed project can be accessed at http://209.38.216.33:7777/. \
The source code with explanatory comments is available on GitHub [repository](https://github.com/jesuisstan/portfolio-site-krivtsoff).

## Objective

The objective of this web project was to recreate and deploy a search bar that closely resembles the one found on Omio (Recréer et déployer une barre de recherche le plus proche possible de celle de Omio).

## Implementation

The project was implemented using functional components and popular hooks in ReactJS with TypeScript and [Create React App](https://facebook.github.io/create-react-app/docs/getting-started), leveraging the Material UI library for its components and styling, in addition to custom CSS modules. The search bar was developed to be responsive, following a mobile-first approach. The following steps were taken to complete the project:

1.  **API Integration**: Three APIs provided by Tictactrip were used to populate the autocomplete functionality of the search bar. The APIs used are as follows:

    1.1. Autocomplete for cities available on Tictactrip:

        Endpoint: https://api.comparatrip.eu/cities/autocomplete/?q=par (Replacing "par" with user input)

    1.2. Popular cities:

        Endpoint: https://api.comparatrip.eu/cities/popular/5 (Retrieving the 5 most popular cities)

    1.3. Popular cities from a specific city (e.g., Paris):

        Endpoint: https://api.comparatrip.eu/cities/popular/from/paris/5 (Retrieving the 5 most popular cities departing from a given city)

Proper API calls were made to fetch the required data for autocomplete suggestions.

2. **Material UI Components**: Material UI components were utilized to achieve a consistent and visually appealing design. Components such as TextField, Dropdown Menus, and Buttons were used to create the search bar and related elements. The styling and layout were customized to match the design of Omio.

3. **Custom Styling with CSS Modules & Custom Fonts**: In addition to Material UI, custom styling was implemented using CSS modules. To closely resemble the typography used on the Omio website, the GTWalsheimPro font was installed and applied to the project. This helps in achieving a consistent visual representation and enhances the similarity to the Omio search bar.

4. **Deployment**: The code was deployed on a Digital Ocean web server and made accessible through the [URL](http://209.38.216.33:7777/).

5. **Version Control**: The code was hosted on GitHub and made publicly accessible. The repository can be found at https://github.com/jesuisstan/portfolio-site-krivtsoff.

## Results

The implemented search bar closely resembles the one found on Omio, providing autocomplete suggestions based on user input. The responsive design ensures a seamless experience across different devices. The deployment of the project on a web server allows users to access and interact with the search bar through the provided [URL](http://209.38.216.33:7777/).

## Demonstration


https://github.com/jesuisstan/OmioSearchBar/assets/82715902/d4079f8e-1b19-4c48-a47a-21982cd0f59c


## Future Improvements

While the project has been successfully implemented and deployed, there are potential areas for improvement:

- **Error Handling**: Error handling mechanisms can be implemented to gracefully handle scenarios such as API failures, network issues, and invalid user inputs. This would provide a more robust and reliable user experience.

- **Unit Testing**: Implementing unit tests for the components and functionality of the search bar would help ensure the stability and maintainability of the codebase, allowing for easier future modifications and bug fixes.

- **Safari browser support** was not tested.

By addressing these areas for improvement, the project can be further optimized and polished, providing an even better user experience similar to that of Omio.

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

2. Start 'Omio-Like Search Bar' App:
```sh
npm run build
```

### To run the app in the development mode:
1. Start 'Omio-Like Search Bar' App:
```sh
npm start
```

#### B) With Docker:
1. Build the Docker image:
```sh
docker build -t krivtsoff-portfolio-image .
```
2. Run the Docker container using the following command:
```sh
docker run -d -p 7777:7777 krivtsoff-portfolio-image
```

Open [http://localhost:7777](http://localhost:7777) to view the App in browser.
