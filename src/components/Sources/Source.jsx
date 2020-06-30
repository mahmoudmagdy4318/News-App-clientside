import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { ListSubheader, Snackbar } from "@material-ui/core";
import { UserContext } from "../../context/userContext";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import { subscribe, unSubscribe } from "../../services/sourcesService";
import Alert from "@material-ui/lab/Alert";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  actionArea: { backgroundColor: "#E0FFFF" },
}));

const Source = (props) => {
  //get user's data from context
  const {
    data: { user: currentUser },
    actions: { setUser },
  } = useContext(UserContext);

  const { _id, sources } = currentUser;
  const { sourceData } = props;
  const { id: sourceId, name, description, category, url } = sourceData;
  const classes = useStyles();

  //errors snackbar states
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const handleClose = () => {
    setError(false);
    setOpen(false);
  };
  //to cancel registration in an course
  const handleUnsubscription = async () => {
    try {
      await unSubscribe(_id, sourceId);
      setUser({
        ...currentUser,
        sources: sources.filter((s) => s !== sourceId),
      });
    } catch (err) {
      setError(true);
    }
  };
  //to enroll in a course
  const handleSubscription = async () => {
    await subscribe(_id, sourceId);
    setUser({ ...currentUser, sources: [...sources, sourceData] });
  };
  return (
    <>
      <Card className={classes.root}>
        <CardActionArea
          className={classes.actionArea}
          style={{ flexGrow: 1 }}
          onClick={() => window.open(url, "_blank")}
        >
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {description}
            </Typography>
            <ListSubheader style={{ color: "grey" }}>{category}</ListSubheader>
          </CardContent>
        </CardActionArea>
        <CardActions>
          {sources && sources.find((s) => s === sourceId) ? (
            <>
              <PlaylistAddCheckIcon />
              <Typography>subscribed</Typography>
              <Button
                size="small"
                color="secondary"
                onClick={handleUnsubscription}
              >
                unsubscribe
              </Button>
            </>
          ) : (
            <Button size="small" color="primary" onClick={handleSubscription}>
              subscribe
            </Button>
          )}
        </CardActions>
      </Card>
      {error && (
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            An error occured
          </Alert>
        </Snackbar>
      )}
    </>
  );
};
export default Source;
