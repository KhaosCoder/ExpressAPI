import { Listing } from "./interfaces/Listing";

export class Client {
    public async POSTListing(listing: Listing): Promise<Response> {
        return fetch(`http://127.0.0.1:3000/listings/`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(listing),
            }).then((response) => response.json())
            .catch((error) => {
                console.error("Error posting listing:", error);
            });
    }

    public async GETListings(): Promise<Listing[]> {
        return fetch(`http://127.0.0.1:3000/listings/`)
            .then((response) => response.json())
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }

    public async DELETEListing(id: number): Promise<Response> {
        return fetch(`http://127.0.0.1:3000/listings/${id}`, {
                method: "DELETE",
            }).then((response) => response.json())
            .catch((error) => {
                console.error("Error deleting listing:", error);
            });
    }
}

(async () => {
    let cl = new Client();
    await cl.DELETEListing(1).then(req => console.log(req));
    await cl.DELETEListing(2).then(req => console.log(req));
    await cl.DELETEListing(3).then(req => console.log(req));
    await cl.POSTListing({id: 1, title: "test1", price: 1100, description: "test1"}).then(req => console.log(req));
    await cl.POSTListing({id: 2, title: "test2", price: 2100, description: "test2"}).then(req => console.log(req));
    await cl.POSTListing({id: 3, title: "test3", price: 3100, description: "test3"}).then(req => console.log(req));
    console.log(await cl.GETListings());
    await cl.POSTListing({id: 1, title: "test1", price: 1100, description: "test1"}).then(req => console.log(req));
    await cl.DELETEListing(1).then(req => console.log(req));
    await cl.POSTListing({id: 1, title: "TESTER 1", price: 1100, description: "rewrite after delete"}).then(req => console.log(req));
    console.log(await cl.GETListings());
})();
