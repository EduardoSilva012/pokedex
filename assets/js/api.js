const api = {};

function ItemApi(itemApi) {
    const item = new Item();
    item.number = itemApi.id;
    item.name = itemApi.name;
    
    const types = itemApi.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;

    item.types = types;
    item.type = type;

    item.photo = itemApi.sprites.other.dream_world.front_default;

    return item;
}

api.getItems = (item) => {
    return fetch(item.url).then((response) => response.json()).then(ItemApi);
}

api.get =  (offset = 0, limit = 0 ) => {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;
    return fetch(url)
    .then((response) => response.json())
    .then((res) => res.results)
    .then((item) => item.map(api.getItems))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((detailItem) => detailItem)
    .catch((resp) => console.log(resp));
}

api.getOne = (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
    return fetch(url)
    .then((response) => response.json())
    .catch((resp) => console.log(resp));
    
}

