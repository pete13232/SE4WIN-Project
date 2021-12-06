import React, { useState, createContext } from "react";

const QueryContext = createContext({
  queryState: 1,
  setQueryState: (val)=>{},
  searchName: "",
  setSearchName: (val)=>{},
  filterCategoryId: null,
  setFilterCategoryId: (val)=>{},
}
);


function QueryProvider(props) {
  const [queryState, setQueryState] = useState(1);
  const [searchName, setSearchName] = useState("");
  const [filterCategoryId, setFilterCategoryId] = useState();

  return (
    <QueryContext.Provider
      value={{
        queryState: queryState,
        setQueryState: setQueryState,
        searchName: searchName,
        setSearchName: setSearchName,
        filterCategoryId: filterCategoryId,
        setFilterCategoryId: setFilterCategoryId,
      }}
      {...props}
    />
  );
}

export { QueryContext, QueryProvider };
