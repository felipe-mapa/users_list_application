import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Typography,
  Container,
} from "@material-ui/core";
import { RootStateOrAny, useSelector } from "react-redux";

// form props interface
interface FormProps {
  title: "Login" | "Register";
  onSubmit: any;
}

const FormCard: React.FC<FormProps> = (props) => {
   // selectors
  const isAuth = useSelector((state: RootStateOrAny) => state.auth.isLoggedIn);

  const history = useHistory();

  // redirect to home page if user is logged in
  useEffect(() => {
    isAuth && history.push("/home");
  });

  return (
    <Container maxWidth="xs">
      <form>
        <Card>
          <CardHeader
            title={props.title}
            style={{
              backgroundColor: "#ec008c",
              color: "#fff",
              textAlign: "center",
            }}
          />
          <CardContent style={{ display: "flex", flexDirection: "column" }}>
            {props.children}
            <Button
              style={{ margin: "20px auto 0", width: "70%" }}
              variant="contained"
              color="primary"
              onClick={props.onSubmit()}
            >
              Submit
            </Button>
          </CardContent>
          {props.title === "Login" ? (
            <Typography
              style={{ textAlign: "right", padding: "10px 20px" }}
              variant="body1"
            >
              Not registered yet? <Link to={`/register`}>Sign Up</Link>
            </Typography>
          ) : (
            <Typography
              style={{ textAlign: "right", padding: "10px 20px" }}
              variant="body1"
            >
              Already registered? <Link to={`/login`}>Log in</Link>
            </Typography>
          )}
        </Card>
      </form>
    </Container>
  );
};

export default FormCard;
