import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { validate, validateProperty } from "../../services/signupValidation";
import { register } from "../../services/authService";
import { UserContext } from "../../context/userContext";
import { setToken, decodeToken } from "../../services/tokenService";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Signup = (props) => {
  const history = useHistory();

  //getting update user's data function from context
  const {
    actions: { setUser: setAuthData },
  } = useContext(UserContext);

  //check if the user is already logged In
  if (localStorage.getItem("Authorization")) history.push("/");

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  //handle closing the warning alert
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const [user, setUser] = useState({
    fullname: "",
    email: "",
    password: "",
    password2: "",
  });

  const [errors, setErrors] = useState({});

  //handle changing in signup inputs
  const handleChange = (e) => {
    //validate inputs data and raise error alert if they are not validated
    const errorMessage = validateProperty(e.target);
    if (errorMessage) errors[e.target.name] = errorMessage;
    else delete errors[e.target.name];
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
    setErrors(errors);
    if (errors) setOpen(true);
  };

  //handle submitting user's registration data
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = user;
    try {
      delete newUser.password2;

      const { token } = await register(user);
      //setting the token coming from the backend in the local storage
      setToken(token);
      //getting user's data from decoding the token
      const payload = decodeToken();
      //setting user's data in context
      setAuthData(payload);
      history.push("/");
    } catch (error) {
      errors.other = true;
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      {errors.email && (
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            {errors.email}
          </Alert>
        </Snackbar>
      )}
      {errors.password && (
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            {errors.password}
          </Alert>
        </Snackbar>
      )}
      {errors.password2 && (
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            {errors.password2}
          </Alert>
        </Snackbar>
      )}
      {errors.fullname && (
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            {errors.fullname}
          </Alert>
        </Snackbar>
      )}
      {errors.other && (
        <Snackbar open={true} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            An error occured
          </Alert>
        </Snackbar>
      )}
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Fullname"
                autoComplete="fullname"
                variant="outlined"
                name="fullname"
                id="fullname"
                fullWidth
                required
                value={user.fullname}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email Address"
                autoComplete="email"
                variant="outlined"
                name="email"
                id="email"
                fullWidth
                required
                value={user.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="current-password"
                variant="outlined"
                name="password"
                label="Password"
                type="password"
                id="password"
                fullWidth
                required
                value={user.password}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="current-password"
                label="Confirm Password"
                variant="outlined"
                name="password2"
                type="password"
                id="password2"
                fullWidth
                required
                value={user.password2}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={validate(user)}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};
export default Signup;
