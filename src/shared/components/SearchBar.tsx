import { useState, useEffect, type KeyboardEvent, useRef } from "react";

interface Props {
  placeholder?: string;
  onSubmittedSearch: (data:string) => void;
}

export const SearchBar = ({placeholder, onSubmittedSearch: onSubmittedSearch}: Props) => {

  const [inputValue, setInputValue] = useState("");

  // Debounde Effect
  const firstRender = useRef(true);
  useEffect(() => {
    if(firstRender.current == true){
      firstRender.current = false;
      return;
    }

    const timeOutId = setTimeout(() => {
      if(inputValue !== ''){
        handleSearch()
      }
    }, 1000)
    
    return () => {
      clearTimeout(timeOutId);
    }
  },[inputValue])
  

  const handleSearch = () => {
    const formattedInput = inputValue.toLowerCase().trim();
    if(formattedInput == ''){
      return;
    }
    setInputValue("");
    onSubmittedSearch(formattedInput);
  }

  const onHandleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    console.log("teta")
    if(event.key == "Enter"){
      handleSearch()
    }
  }

  return (
    <>
        <div className="search-container">
            <input 
              type="text"
              placeholder={placeholder}
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              onKeyDown={(event) => onHandleKeyDown(event)}
            ></input>
            <button
              onClick={() => {handleSearch()}}
            >Buscar</button>
        </div>
    </>
  )
}
