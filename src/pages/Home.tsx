import React, { useEffect, useState, useRef } from "react";
import { Container, Typography, Button } from "@material-ui/core";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { Skeleton } from "@material-ui/lab";
import { Column } from "material-table";

import UsersTable from "../components/UsersTable/UsersTable";
import Dialog from "../components/Dialog/Dialog";
import AuthButtons from "../components/AuthButtons/AuthButtons";
import { useHistory } from "react-router-dom";
import FormInput from "../components/FormInput/FormInput";
import validate from "../utils/validate";
import * as usersActions from "../store/actions/users";

// set table row interface
interface Row {
  avatar: string | JSX.Element;
  firstName: string | JSX.Element;
  lastName: string | JSX.Element;
  email: string | JSX.Element;
  isAdmin: string | JSX.Element;
}

// set table state
interface TableState {
  columns: Array<Column<Row>>;
  data: Row[];
}

const Home: React.FC = () => {
  // get selectors
  const isAuth = useSelector((state: RootStateOrAny) => state.auth.isLoggedIn);
  const currentUser = useSelector((state: RootStateOrAny) => state.auth.user);
  const users = useSelector((state: RootStateOrAny) => state.users.users);

  // state
  const [newPassword, setNewPassword] = useState("");
  const [userPassId, setUserPassId] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  // define columns
  const columns = [
    {
      title: "Avatar",
      field: "avatar",
      editComponent: () => (
        <Skeleton animation={false} variant="circle" width={50} height={50} />
      ),
    },
    { title: "Name", field: "firstName" },
    { title: "Surname", field: "lastName" },
    { title: "Email", field: "email" },
    {
      title: "",
      field: "isAdmin",
      editComponent: ({ rowData }: any) => (
        <Button
          variant="text"
          onClick={() => {
            setUserPassId(rowData.id);
            setIsDialogOpen(true);
          }}
          style={{ color: "rgb(236, 0, 140)" }}
          disabled={currentUser.id === rowData.id}
        >
          {currentUser.id === rowData.id ? "" : "Update Password"}
        </Button>
      ),
    },
  ];

  // state when user is not logged in
  const tableInicialState = {
    columns: columns,
    data: [...Array(4)].map((_, i) => ({
      key: i,
      avatar: <Skeleton variant="circle" width={50} height={50} />,
      firstName: <Skeleton variant="text" width="100%" height={30} />,
      lastName: <Skeleton variant="text" width="100%" height={30} />,
      email: <Skeleton variant="text" width="100%" height={30} />,
      isAdmin: <Skeleton variant="text" width="60%" height={50} />,
    })),
  };

  // table state
  const [tableState, setTableState] = useState<TableState>(tableInicialState);

  // update table state if user logs in or out
  useEffect(() => {
    if (isAuth) {
      setTableState({
        columns: columns,
        data: users.map((u: any) => {
          return {
            id: u.id,
            avatar: (
              <Skeleton
                animation={false}
                variant="circle"
                width={50}
                height={50}
              />
            ),
            firstName: u.firstName,
            lastName: u.lastName,
            email: u.email,
            isAdmin: u.isAdmin ? (
              <Button variant="contained" disabled>
                ADMIN
              </Button>
            ) : null,
          };
        }),
      });
    } else {
      setTableState(tableInicialState);
    }
  }, [isAuth, users]);

  // password validation check
  const checkValidation = () => {
    // validade password
    const val_password = validate("PASS", newPassword);
    setPasswordMessage(val_password.message);

    if (val_password.isValid) {
      dispatch(usersActions.updateUserPass(newPassword, userPassId));
      setIsDialogOpen(false);
      setUserPassId("");
      setNewPassword("");
    }
  };

  // Ref to check if it's the first mount
  const loaded = useRef(false);
  // load table if user is logged in
  useEffect(() => {
    if (loaded && isAuth) {
      dispatch(usersActions.fetchUsers());
    } else {
      loaded.current = true;
    }
  }, [isAuth, dispatch]);

  return (
    <Container maxWidth="md">
      {/* show personalized header if user is logged in or a dialog asking to log in if user if logged out */}
      {isAuth ? (
        <Typography variant="h4">Welcome {currentUser.firstName}</Typography>
      ) : (
        <Dialog
          open={!isAuth}
          onClose={() => history.push("/login")}
          title="You are not logged in!"
          message={
            <Typography variant="body2">
              To access the user list you need to be logged in.
            </Typography>
          }
          action={<AuthButtons />}
        />
      )}

      {/* display table */}
      <UsersTable columns={tableState!.columns} data={tableState!.data} />

      {/* password update dialog */}
      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title="Password update!"
        message={
          <FormInput
            name="password"
            label="Password"
            type="password"
            value={newPassword}
            validationMsg={passwordMessage}
            onChange={(value: string) => setNewPassword(value)}
          />
        }
        action={
          <React.Fragment>
            <Button
              style={{ margin: "0 auto" }}
              variant="contained"
              onClick={() => {
                setUserPassId("");
                setIsDialogOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              style={{ margin: "0 auto" }}
              variant="contained"
              color="primary"
              onClick={() => checkValidation()}
            >
              Submit
            </Button>
          </React.Fragment>
        }
      />
    </Container>
  );
};

export default Home;
