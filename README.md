# Cocktail Making API

This API provides endpoints for managing ingredients and ordering drinks for a cocktail-making system. Additionally, it offers a live stock UI for monitoring ingredient quantities in real-time.

Under the "cpee" folder, example cpee processes can be found. Endpoints should be updated before using testsets.

## Installation

To get started with the Cocktail Making API, follow these steps:

1. Clone this repository to your local machine.
2. Install dependencies by running `npm install`.
3. Start the server by running `npm run start:dev` on the root directory.
4. The API will be accessible at `http://localhost:PORT`, where `PORT` is the port number specified in the main.ts.

## Endpoints

### Ingredients

- **Get Ingredient by Name**
  - Endpoint: `GET /ingredients/:ingredientName`
  - Description: Retrieves information about a specific ingredient by name.
  - Example: `/ingredients/lemon`

- **Reduce Stock**
  - Endpoint: `GET /ingredients/:ingredientName/dec?reduceBy=3`
  - Description: Reduces the stock of a specific ingredient by the specified quantity or by 1 if "reduceBy" argument is not given.
  - Example: `/ingredients/lemon/dec?reduceBy=3`

- **Update Stock**
  - Endpoint: `PUT /ingredients/:ingredientName/`
  - Description: Updates the stock information for a specific ingredient. New ingredients can be added using this endpoint as well.
  - Example: `/ingredients/lemon/`
  - Request Body:
    ```json
    {
        "id": 1,
        "name": "lemon",
        "quantity": 10,
        "unit": "slice"
    }
    ```

- **Get All Ingredients**
  - Endpoint: `GET /ingredients`
  - Description: Retrieves a list of all available ingredients.

### Drinks

- **Get Available Drinks**
  - Endpoint: `GET /drinks`
  - Description: Retrieves a list of all available drinks.

- **Order Drink**
  - Endpoint: `GET /drinks/:drinkName/order`
  - Description: Places an order for a specific drink.
  - Example: `/drinks/gin-tonic/order`

- **Is Order Possible**
  - Endpoint: `GET /drinks/:drinkName/order-possible`
  - Description: Checks if it's possible to order a specific drink.
  - Example: `/drinks/gin-tonic/order-possible`

- **Get Recipe by Name**
  - Endpoint: `GET /drinks/:drinkName`
  - Description: Retrieves the recipe for a specific drink.
  - Example: `/drinks/gin-tonic`

## Usage

### API Usage

- Ensure the server is running.
- Use any HTTP client to send requests to the provided endpoints.
- Include necessary parameters in the request URL or body as described in the endpoint documentation.

### Live Stock UI

The API provides a live stock UI for monitoring ingredient quantities in real-time. To access the UI:

1. Ensure the server is running.
2. The UI is accessible under the base path. With the default settings, it's visible at `http://localhost:3000`.
3. The UI will display a list of ingredients and their current quantities.
4. Ingredients with a quantity of 0 will display a warning sign (⚠️) in red.
5. Ingredients with a quantity less than or equal to 3 will display a warning sign (⚠️) in yellow.

## Author

This API is maintained by Idil Sezgin.
