import { SearchBar } from "./shared/components/SearchBar"
import { CustomHeader } from "./shared/components/CustomHeader"
import { PreviousSearches } from "./gifs/components/PreviousSearches"
import { useState } from "react"
import { GifList } from "./gifs/components/GifList"
import { getGifsByQuery } from "./gifs/actions/get-gifs-by-query.action"
import { Gif } from "./gifs/interfaces/gif.interface"

export const GifApp = () => {

    const [searchList, setSearchList] = useState<string[]>([]);
    
    const [gifList, setGifList] = useState<Gif[]>([]);


    const handleSearch = async (searchTerm: string) => {
        if(searchList.includes(searchTerm)){
            return;
        }else{
            if(searchList.length < 8){
                setSearchList((list) => [...list, searchTerm]);
            }else{
                setSearchList((list) => [...list.slice(1), searchTerm]);
            }
            const response = await getGifsByQuery(import.meta.env.VITE_GIF_API_KEY, searchTerm, 10, "es");
            console.log(response)
            setGifList(response);
        }
    }

    const onPreviousSearchesClicked = async (certainSearch: string) => {
        const response = await getGifsByQuery(import.meta.env.VITE_GIF_API_KEY, certainSearch, 10, "es");
        setGifList(response);
    }

  return (
    <>
        {/* Header */}
        <CustomHeader
            title="Buscador de Gifs V1.0"
            description="Descubre y comparte el Gif perfecto."
        ></CustomHeader>

        {/* Search */}
        <SearchBar
            placeholder="Buscar Gifs"
            onSubmittedSearch={(data: string) => handleSearch(data)}
        ></SearchBar>

        {/* Busquedas Previas */}
        <PreviousSearches 
            previousSearches={searchList}
            onLabelClicked={(certainSearch) => onPreviousSearchesClicked(certainSearch)}
        ></PreviousSearches>

        {/* Gifs */}
        <GifList gifList={gifList}></GifList>
    </>
  )
}
