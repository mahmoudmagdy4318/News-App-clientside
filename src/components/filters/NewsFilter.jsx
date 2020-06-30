import React from "react";
import FilterInput from "./FilterInput";
import FilterListIcon from "@material-ui/icons/FilterList";
import { languages } from "./filters.json";
import SearchInput from "./SearchInput";
import SearchIcon from "@material-ui/icons/Search";

//filter component for news
function NewsFilter(props) {
  const { filter, setFilter, setPage } = props;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FilterListIcon fontSize="large" />
      <FilterInput
        setFilter={setFilter}
        filter={filter}
        label="language"
        options={languages}
        setPage={setPage}
      />
      <SearchIcon fontSize="large" style={{ marginLeft: "10px" }} />
      <SearchInput setFilter={setFilter} filter={filter} setPage={setPage} />
    </div>
  );
}

export default NewsFilter;
