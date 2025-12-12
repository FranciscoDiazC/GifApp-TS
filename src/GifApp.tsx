import { SearchBar } from "./shared/components/SearchBar"
import { CustomHeader } from "./shared/components/CustomHeader"
import { PreviousSearches } from "./gifs/components/PreviousSearches"
import { GifList } from "./gifs/components/GifList"
import { useGifs } from "./gifs/hooks/useGifs"

export const GifApp = () => {

    const {
        searchList,
        gifList,
        handleSearch,
        onPreviousSearchesClicked
    } = useGifs();

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
