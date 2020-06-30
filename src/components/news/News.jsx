import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Moment from "react-moment";

const useStyles = makeStyles({
  root: {
    maxWidth: 1200,
    backgroundColor: "#E0FFFF",
  },
});

//single news card componnet
export default function News(props) {
  const {
    article: { author, title, description, url, publishedAt, urlToImage },
  } = props;
  const classes = useStyles();

  //handle clicking on the news or the see more button
  const handleClick = () => {
    window.open(url, "_blank");
  };
  return (
    <Card className={classes.root}>
      <CardActionArea onClick={handleClick}>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="500"
          image={urlToImage}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {author}
          </Typography>
          <Typography variant="h5" component="h3">
            {title}
          </Typography>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            style={{ color: "red" }}
          >
            <Moment format="YYYY-MM-DD HH:mm">{publishedAt}</Moment>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={handleClick}>
          see More
        </Button>
      </CardActions>
    </Card>
  );
}
