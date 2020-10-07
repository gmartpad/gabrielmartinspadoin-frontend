const BASEAPI = 'https://api.kanye.rest'

const apiFetchGet = async () => {

    const res = await fetch(`${BASEAPI}`);

    const json = await res.json();

    return json;

}

const KanyeWestAPI = {

    getKanyeQuote:async () => {
        const json = await apiFetchGet();
        return json;
    }

}

export default () => KanyeWestAPI;