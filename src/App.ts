import express from 'express';
import { Listing } from "./interfaces/Listing";

const app = express();
app.use(express.json());

let listings: Map<number, Listing> = new Map();

const isValidListing = (listing: any): boolean => {
    let keys = ["id", "title", "price", "description"];
    for (let key of Object.keys(listing)) {
        if (!keys.includes(key))
            return false;
    }

    if (listing.id === undefined || typeof listing.id !== 'number')
        return false;
    if (listing.title === undefined || typeof listing.title !== 'string')
        return false;
    if (listing.price === undefined || typeof listing.price !== 'number')
        return false;
    if (listing.description === undefined || typeof listing.description !== 'string')
        return false;
    return true;
}

app.post('/listings', (req, res) => {
    const newListing: Listing = req.body;
    if (!isValidListing(newListing)) {
        console.log(`LOG:POST:ERROR: Listing is an invalid object.`);
        return res.status(400).send({ message: `Listing provided is an invalid object type.` });
    }
    if (listings.has(newListing.id)) {
        console.log(`LOG:POST:ERROR: Listing with id ${newListing.id} already exists.`);
        return res.status(400).send({ message: `Listing with id ${newListing.id} already exists.` });
    }
    console.log(`LOG:POST: New listing: ${JSON.stringify(newListing)}`);
    listings.set(newListing.id, newListing);
    res.status(201).send(newListing);
});

app.get('/listings', (req, res) => {
    console.log(`LOG:GET: Listings.`);
    let listingsArray = Array.from(listings.values());
    listingsArray.sort((a,b) => a.id - b.id);
    res.send(listingsArray);
});

app.delete('/listings/:id', (req, res) => { 
    const id = parseInt(req.params.id);
    if (!listings.has(id)) {
        console.log(`LOG:DELETE:ERROR: Listing ${id} doesn't exist or was already deleted.`);
        return res.status(400).send({ message: `Listing ${id} doesn't exist or was already deleted.` });
    }
    listings.delete(id);
    console.log(`LOG:DELETE: Listing ${id} deleted.`);
    res.send({ message: `Listing ${id} deleted.` });
});

app.listen(3000, () => console.log('Server running on port 3000'));