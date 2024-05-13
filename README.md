# Express Listings API

You are tasked with creating a simple RESTful API using TypeScript and Node.js. This API will manage a small database of real estate listings, enabling users to add a new listing, retrieve all listings, and delete a listing.

## Technology Stack

- TypeScript
- Node.js
- Express.js (or any similar framework you're comfortable with)

## File: App.ts `npm run server`

This is the main application file. It sets up an Express.js server and defines the API endpoints:

- The **POST** endpoint `/listings` that allows users to add a new listing. This endpoint should accept JSON data matching the Listing interface and add it to an in-memory store (e.g., an array).
- The **GET** endpoint `/listings` that retrieves all current listings from the in-memory store.
- The **DELETE** endpoint `/listings/:id` where `:id` is the unique identifier of the listing to be deleted. This endpoint should remove the specified listing from the in-memory store.

### Function:

- `isValidListing(listing: any): boolean`: This function checks if a given object is a valid listing. It checks if the object has the required properties (`id`, `title`, `price`, `description`) and if the types of these properties are correct.

## File: Client.ts `npm run client`

This file contains the client-side logic for interacting with the server's API endpoints.

- `POSTListing(listing: Listing): Promise<Response>`: This method sends a POST request to the server to create a new listing. It takes a `Listing` object as a parameter and returns a Promise that resolves to the server's response.

- `GETListings(): Promise<Listing[]>`: This method sends a GET request to the server to retrieve all listings. It returns a Promise that resolves to an array of `Listing` objects.

- `DELETEListing(id: number): Promise<Response>`: This method sends a DELETE request to the server to delete a listing. It takes the ID of the listing as a parameter and returns a Promise that resolves to the server's response.

## How to Run

To run this application, you need to have Node.js and npm installed. Then, you can run the following commands:

```bash
npm install -g ts-node
npm install
npm run server