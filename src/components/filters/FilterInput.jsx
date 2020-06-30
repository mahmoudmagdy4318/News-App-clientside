import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";

const filterOptions = createFilterOptions({
  matchFrom: "start",
  stringify: (option) => option,
});

//general input for different filter inputs
export default function FilterInput(props) {
  const { filter, setFilter, options, label, setPage } = props;
  return (
    <Autocomplete
      id={`${label}-filter`}
      options={options}
      getOptionLabel={(option) => option}
      filterOptions={filterOptions}
      style={{ width: 300, marginRight: 20 }}
      renderInput={(params) => (
        <TextField {...params} label={label} variant="outlined" />
      )}
      onChange={(e, value) => {
        setFilter({ ...filter, [label]: value });
        setPage(1);
      }}
    />
  );
}
