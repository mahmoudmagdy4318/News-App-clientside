import React from "react";
import { TextField } from "@material-ui/core";

//search input to execute search queries on news api
function SearchInput(props) {
  const { filter, setFilter, setPage } = props;

  //handling change in search input
  const handleChange = (e) => {
    setPage(1);
    setFilter({ ...filter, q: e.target.value });
  };
  return (
    <TextField
      id="search"
      label="search"
      variant="outlined"
      onChange={handleChange}
    />
  );
}

export default SearchInput;
