import React from "react";
import NavBar from "./NavBar";

//higher order component to wrap the different components under the navbar
const Layout = (Cmp) => (props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <NavBar value={props.value} />
      <Cmp {...props} />
    </div>
  );
};

export default Layout;
