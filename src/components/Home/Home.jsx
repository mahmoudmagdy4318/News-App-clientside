import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Layout from "../layout/Layout";
import { useEffect } from "react";
import Pagination from "@material-ui/lab/Pagination";
import { Grid, Container, Snackbar } from "@material-ui/core";
import { UserContext } from "../../context/userContext";
import Alert from "@material-ui/lab/Alert";
import { getUserNews } from "../../services/newsService";
import News from "../news/News";
import NewsFilter from "../filters/NewsFilter";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(4),
    backgroundColor: theme.palette.background.paper,
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(8),
  },
}));

const Home = () => {
  //get user's data from context
  const {
    data: {
      user: { _id },
    },
  } = useContext(UserContext);

  const classes = useStyles();
  const [news, setNews] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [filter, setFilter] = useState({
    search: "",
    language: "",
  });

  //errors snackbar states
  const [error, setError] = useState(false);
  const handleClose = () => {
    setError(false);
  };

  const getNews = async () => {
    try {
      //get news with filter options and paginated
      const { totalResults, articles } = await getUserNews(
        _id,
        pageNum,
        filter
      );
      setNews(articles);
      //to jump up to the beginning of the screen after pagination
      window.scrollTo(0, 0);
      //setting the number of total pages depending on the number of results from the backend
      totalResults < 100
        ? setLastPage(Math.ceil(totalResults / 20))
        : setLastPage(5);
    } catch (error) {
      setError(true);
    }
  };
  //updating the home news
  useEffect(() => {
    if (_id) getNews();
  }, [pageNum, filter, _id]);

  //handle change on pagination
  const handleChange = (event, value) => {
    setPageNum(value);
  };
  return (
    <>
      <Container className={classes.root}>
        <NewsFilter
          filter={filter}
          setFilter={setFilter}
          setPage={setPageNum}
        />
        <Grid container spacing={4} style={{ marginTop: "10px" }}>
          {news.map((article, index) => (
            <Grid item xs={12} sm={12} md={12} key={index}>
              <News article={article} />
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
export default Layout(Home);
