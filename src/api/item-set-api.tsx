import { ItemSet } from "@/models/models";
import { PokemonTCG } from "pokemon-tcg-sdk-typescript";

const baseUrl = "https://crud-nextjs-mongo-kappa.vercel.app/api/sets";
const headers = {
    'X-API-KEY': '7b651729-1270-4d37-9dca-1730d2ebc0ee',
    'Content-Type': 'application/json'
};

const fetchSetByName = async (name: string) => {
    console.log("Before fetch by id")
    // const data: ItemSet = await PokemonTCG.findSetByID(id);
      // const response = await fetch(`https://jsonplaceholder.typicode.com/photos/${id}`);
    const response = await fetch(`${baseUrl}/${name}`, {
        method: 'GET', // or 'POST', 'PUT', etc. based on your API
        headers,
    });
    const data = await response.json();
    console.log("After fetch By Id");
    console.log(data);
    return data;
}

export default fetchSetByName;



export const fetchSets = async () => {
    // const response = await fetch("https://jsonplaceholder.typicode.com/photos");
    // const data: any[] = Array.from(await PokemonTCG.getAllSets());
    const response = await fetch(`${baseUrl}`, {
        method: 'GET', // or 'POST', 'PUT', etc. based on your API
        headers,
    });
    const data = await response.json();
    console.log("Pokemon Sets --- ");
    console.log(data);
    // TODO: get new to old here
    return data.slice(0, 10);
};

export const updateSetItem = async (itemName: string, itemSetToBeUpdated: ItemSet) => {
    const response = await fetch(`${baseUrl}/${itemName}`, {
        method: 'POST', // or 'POST', 'PUT', etc. based on your API
        headers,
        body: JSON.stringify(itemSetToBeUpdated)
    });

    if(!response.ok) {
        throw new Error("Failed to update item!");
    }

    return await response.json();
}