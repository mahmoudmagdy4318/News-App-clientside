import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Layout from "../layout/Layout";
import { useEffect } from "react";
import Pagination from "@material-ui/lab/Pagination";
import { Grid, Container, Snackbar } from "@material-ui/core";
import Source from "./Source";
import { getAllSources } from "../../services/sourcesService";
import Alert from "@material-ui/lab/Alert";
import SourcesFilter from "../filters/SourcesFilter";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(4),
    backgroundColor: theme.palette.background.paper,
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(8),
  },
}));

const Sources = (props) => {
  const classes = useStyles();
  const [sources, setSources] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [filter, setFilter] = useState({
    country: "",
    language: "",
    category: "",
  });

  //errors snackbar states
  const [error, setError] = useState(false);
  const handleClose = () => {
    setError(false);
  };

  const getSources = async () => {
    try {
      //get all sources with  option to be filtered and paginated
      const { sources, lastpage } = await getAllSources(filter, pageNum);
      setSources(sources);
      setLastPage(lastpage);
    } catch (error) {
      setError(true);
    }
  };
  //updating sources page
  useEffect(() => {
    getSources();
  }, [pageNum, filter]);

  //handle change of pagination number
  const handleChange = (event, value) => {
    setPageNum(value);
  };
  return (
    <>
      <Container className={classes.root}>
        <SourcesFilter
          filter={filter}
          setFilter={setFilter}
          setPage={setPageNum}
        />
        <Grid container spacing={4} style={{ marginTop: "10px" }}>
          {sources.map((source) => (
            <Grid item xs={12} sm={8} md={4} key={source.id}>
              <Source sourceData={source} />
            </Grid>
          ))}
        </Grid>
      </Container>
      <Pagination
        count={lastPage}
        size="large"
        page={pageNum}
        onChange={handleChange}
        variant="outlined"
        style={{ backgroundColor: "white", borderRadius: "5%" }}
      />
      {error && (
        <Snackbar open={true} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            An error occured
          </Alert>
        </Snackbar>
      )}
    </>
  );
};
export default Layout(Sources);
