import React from "react";
import { Button } from "@material-ui/core";

import "./AuthButton.css";
import { Link } from "react-router-dom";

const AuthButtons: React.FC = () => {
  return (
    <React.Fragment>
      <Button
        variant="contained"
        className="AuthButton"
        style={{ backgroundColor: "#ec008c", marginRight: "10px" }}
      >
        <Link to={`/register`}>Sign Up</Link>
      </Button>
      <Button className="AuthButton AuthButton__Login">
        <Link to={`/login`}>Log in</Link>
      </Button>
    </React.Fragment>
  );
};

export default AuthButtons;
