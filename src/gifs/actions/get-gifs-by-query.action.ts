
import axios from 'axios';
import { GiphyResponse } from '../interfaces/giphy.response';
import { Gif } from '../interfaces/gif.interface'; // Interface definida por nuestro modelo de negocios

export const getGifsByQuery = async (API_KEY: string, category: string, limit: number, lang: string = "es"): Promise<Gif[]> => {
    //const url: string = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${category}&limit=${limit}&lang=${lang}`;

    const response = await axios.get<GiphyResponse>("https://api.giphy.com/v1/gifs/search", {
        params: {
            api_key: API_KEY,
            q: category,
            limit: limit,
            lang: lang
        }
    });

    // Patron Mapper
    const gifList = response.data.data.map((gif) => ({
        id: gif.id,
        title: gif.title,
        url: gif.images.original.url,
        width: parseInt(gif.images.original.width),
        height: parseInt(gif.images.original.height)
    }));

    return gifList;
}

