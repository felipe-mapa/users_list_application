import React from "react";
import "./Toolbar.css";
import { Link } from "react-router-dom";
import {
  Toolbar,
  Typography,
  AppBar,
  IconButton,
  Icon,
} from "@material-ui/core";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";

import AuthButtons from "../AuthButtons/AuthButtons";
import * as authActions from "../../store/actions/auth";

const CustomToolbar: React.FC = () => {
  // get authentication
  const isAuth = useSelector((state: RootStateOrAny) => state.auth.isLoggedIn);

  // LOG OUT
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(authActions.logoutUser());
  };

  return (
    <AppBar
      position="relative"
      className="Toolbar"
      style={{ backgroundColor: "#16c1f3" }}
    >
      <Toolbar
        style={{
          backgroundColor: "#16c1f3",
          color: "#fff",
          maxWidth: "900px",
          width: "90%",
          margin: "0 auto",
        }}
      >
        <Typography variant="h4">
          <Link to={`/home`}>User List App</Link>
        </Typography>
        <div className="Toolbar__buttons">
          {!isAuth ? (
            <AuthButtons />
          ) : (
            <IconButton onClick={() => logout()}>
              <Icon fontSize="large">
                <Link to={`/login`}>exit_to_app</Link>
              </Icon>
            </IconButton>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default CustomToolbar;
