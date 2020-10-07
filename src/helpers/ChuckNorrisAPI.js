const BASEAPI = 'https://api.chucknorris.io'; 

const apiFetchGet = async (endpoint, body = []) => {

    const res = await fetch(`${BASEAPI+endpoint}`, {
        method:'GET',
        headers:{
            'accept':'application/json',
        },
    }); //response

    // const res = await fetch(`${BASEAPI+endpoint}?${qs.stringify(body)}`);

    const json = await res.json();

    return json;

}

const ChuckNorrisAPI = {

    getJokes:async () => {
        //pegar piadas do chuck norris
        const json = apiFetchGet(
            '/jokes/random',
        )

        return json;

    },

};

export default () => ChuckNorrisAPI;