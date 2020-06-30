import React, { useContext } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ViewListIcon from "@material-ui/icons/ViewList";
import { Button, Toolbar } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HomeIcon from "@material-ui/icons/Home";
import { logout } from "../../services/authService";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 50,
  },
  tabs: { margin: "auto" },
}));

export default function NavBar(props) {
  const history = useHistory();
  const classes = useStyles();

  //getting authenticated user's fullname from context
  const {
    data: {
      user: { fullname },
    },
  } = useContext(UserContext);

  const [value, setValue] = React.useState(props.value);

  //handling change of tabs clicking
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="default">
        <Toolbar>
          <AccountCircleIcon style={{ marginLeft: 100 }} />
          <Typography>{fullname}</Typography>
          <Tabs
            className={classes.tabs}
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="on"
            indicatorColor="primary"
            textColor="primary"
            aria-label="scrollable force tabs example"
          >
            <Tab
              label="Home"
              icon={<HomeIcon />}
              {...a11yProps(0)}
              onClick={() => history.push("/")}
            />
            <Tab
              label="Sources"
              icon={<ViewListIcon />}
              {...a11yProps(1)}
              onClick={() => history.push("/sources")}
            />
          </Tabs>

          <Button
            color="secondary"
            style={{ marginRight: 100 }}
            onClick={() => {
              history.push("/login");
              logout();
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
