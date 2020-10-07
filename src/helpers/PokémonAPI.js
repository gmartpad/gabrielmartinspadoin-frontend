const BASEAPI = 'https://pokeapi.co/api/v2'; 

const apiFetchGet = async (endpoint, body = 'bulbasaur') => {

    // const res = await fetch(`${BASEAPI+endpoint}`, {
    //     method:'GET',
    //     headers:{
    //         'accept':'application/json',
    //     },
    // }); //response

    const res = await fetch(`${BASEAPI+endpoint}/${body}`);

    const json = await res.json();

    return json;

}

const PokémonAPI = {

    getPokémon:async (pokémon) => {
        //pegar piadas do chuck norris
        const json = apiFetchGet(
            '/pokemon',
            pokémon
        )

        return json;

    },

};

export default () => PokémonAPI;