import React, { useEffect, useState } from "react";

import useDebounce from "./hooks/useDebounce";
import useDataApi from "./hooks/useDataApi";
import { style } from "./App.style";
import List from "./components/List";

function App() {
  // console.log("App: render");
  const endpoint = "https://api.github.com/search/users?q=";

  //ref to input
  const textInput = React.createRef<HTMLInputElement>();

  //state input
  const [value, setValue] = useState<string>("");

  //custom hook to fetch data from api
  const [{ isLoading, data, isError }, setQuery] = useDataApi(endpoint, {});

  //custom hook returns the same value after 500 milliseconds
  const debouncedSearchTerm = useDebounce(value, 600);

  useEffect(() => {
    //focus => input when components mounts
    textInput?.current?.focus();
  }, [textInput]);

  useEffect(() => {
    //updateQuery when value update
    if (debouncedSearchTerm) setQuery(debouncedSearchTerm);
  }, [debouncedSearchTerm, setQuery]);

  return (
    <div style={style.div}>
      <input
        ref={textInput}
        style={style.input}
        type="text"
        placeholder="recherche un github user"
        value={value}
        onChange={(e) => setValue(e.target.value.toLowerCase())}
      />
      {isLoading && <p style={style.text}> .... chargement .... </p>}
      {isError && debouncedSearchTerm && !data[debouncedSearchTerm] && (
        <p style={{ ...style.text, ...style.textError }}>il y a une erreur</p>
      )}
      <List listUsers={data[debouncedSearchTerm]} />
    </div>
  );
}

export default App;
