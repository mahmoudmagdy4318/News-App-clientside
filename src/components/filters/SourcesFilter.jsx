import React from "react";
import FilterInput from "./FilterInput";
import FilterListIcon from "@material-ui/icons/FilterList";
import { languages, categories, countries } from "./filters.json";

//filter component for sources
function SourcesFilter(props) {
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
      <FilterInput
        setFilter={setFilter}
        filter={filter}
        label="country"
        options={countries}
        setPage={setPage}
      />
      <FilterInput
        setFilter={setFilter}
        filter={filter}
        label="category"
        options={categories}
        setPage={setPage}
      />
    </div>
  );
}

export default SourcesFilter;
