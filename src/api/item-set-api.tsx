import { PokemonTCG } from "pokemon-tcg-sdk-typescript";
import { Set } from "pokemon-tcg-sdk-typescript/dist/sdk";


const urlForUpdate = "https://crud-nextjs-mongo-kappa.vercel.app/api/sets";
const headersForUpdate = {
    'X-API-KEY': '7b651729-1270-4d37-9dca-1730d2ebc0ee',
    'Content-Type': 'application/json'
};

const fetchSetById = async (id: string) => {
    console.log("Before fetch by id")
    const data: Set = await PokemonTCG.findSetByID(id);
    console.log("After fetch By Id");
    console.log(data);
    return data;
}

export default fetchSetById;



export const fetchSets = async () => {
    const data: Set[] = Array.from(await PokemonTCG.getAllSets());
    console.log("Pokemon Sets --- ");
    console.log(data);
    // TODO: get new to old here
    // return data.slice(0, 10);
    return data;
};

export const updateSetItem = async (itemName: string, itemSetToBeUpdated: any) => {
    const response = await fetch(`${urlForUpdate}/${itemName}`, {
        method: 'PUT', // or 'POST', 'PUT', etc. based on your API
        headers: headersForUpdate,
        body: JSON.stringify(itemSetToBeUpdated)
    });

    if(!response.ok) {
        throw new Error("Failed to update item!");
    }

    return await response.json();
}

export const fetchUpdatedSetByName = async (name: string) => {
    console.log("Before fetch by name (updated)")
    //   const response = await fetch(`https://jsonplaceholder.typicode.com/photos/${id}`);
    const response = await fetch(`${urlForUpdate}/${name}`, {
        method: 'GET', // or 'POST', 'PUT', etc. based on your API
        headers: headersForUpdate,
    });
    const data = await response.json();
    console.log("After fetch by name (updated)")
    console.log(data);
    return data;
}