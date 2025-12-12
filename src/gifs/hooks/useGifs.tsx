import { useState, useRef } from "react";
import { Gif } from "../interfaces/gif.interface";
import { getGifsByQuery } from "../actions/get-gifs-by-query.action";



export const useGifs = () => {

    const [searchList, setSearchList] = useState<string[]>([]);
    const [gifList, setGifList] = useState<Gif[]>([]);

    const gifsCache = useRef<Record<string, Gif[]>>({});


    const handleSearch = async (searchTerm: string) => {
        if(searchList.includes(searchTerm)){
            return;
        }else{
            // Se agrega la busqueda a la lista de ultimos terminos buscados
            if(searchList.length < 8){
                setSearchList((list) => [...list, searchTerm]);
            }else{
                setSearchList((list) => [...list.slice(1), searchTerm]);
            }

            if(searchTerm in gifsCache.current){
                console.log("El termino buscado esta en cache, evitando realizar solicitud HTTP.");
                setGifList(gifsCache.current[searchTerm]);
            }else{
                console.log("El termino buscado no esta cacheado, realizando solicitud HTTP.");
                // Fetcheamos
                const response = await getGifsByQuery(import.meta.env.VITE_GIF_API_KEY, searchTerm, 10, "es");
                console.log(response)
                setGifList(response);
                gifsCache.current[searchTerm] = response; // Agregamos la busqueda a cache
            }
        }
    }
  
    const onPreviousSearchesClicked = async (searchTerm: string) => {
        if(searchTerm in gifsCache.current){
            console.log("El termino buscado esta en cache, evitando realizar solicitud HTTP.");
            setGifList(gifsCache.current[searchTerm]);
        }else{
            console.log("El termino buscado no esta cacheado, realizando solicitud HTTP.");
            // Fetcheamos
            const response = await getGifsByQuery(import.meta.env.VITE_GIF_API_KEY, searchTerm, 10, "es");
            console.log(response)
            setGifList(response);
            gifsCache.current[searchTerm] = response; // Agregamos la busqueda a cache
        }
    }


  return {
    searchList,
    gifList,
    handleSearch,
    onPreviousSearchesClicked
  }
}
