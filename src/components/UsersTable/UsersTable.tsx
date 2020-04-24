import React, { useState } from "react";
import MaterialTable from "material-table";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import * as actionUsers from "../../store/actions/users";
import validate from "../../utils/validate";
import {
  Button, Typography,
} from "@material-ui/core";

import Dialog from '../Dialog/Dialog'

const UsersTable: React.FC<{ columns: any; data: any }> = (props) => {
  // get selectors
  const isAuth = useSelector((state: RootStateOrAny) => state.auth.isLoggedIn);
  const isAdmin = useSelector((state: RootStateOrAny) => state.auth.isAdmin);
  const currentUser = useSelector((state: RootStateOrAny) => state.auth.user);

  // states
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");

  const dispatch = useDispatch();

  return (
    <React.Fragment>
      {/* show error massage dialog if input are not valid*/}
      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title={dialogTitle}
        message={<Typography variant="body2">{dialogMessage}</Typography>}
        action={
          <Button
            variant="text"
            onClick={() => setIsDialogOpen(false)}
            style={{ color: "rgb(236, 0, 140)" }}
          >
            Got it
          </Button>
        }
      />
      {/* Show table */}
      <MaterialTable
        title="Users List"
        columns={props.columns}
        data={props.data}
        options={{
          // style user's row
          rowStyle: (rowData) => ({
            backgroundColor:
              currentUser.id === rowData.id ? "rgba(236, 0, 140, .1)" : "#fff",
          }),
          search: isAuth,
          pageSize: 5,
          paging: isAuth,
        }}
        editable={
          isAdmin
          ? {
                // allow to edit if the current user is admin
                isEditable: () => isAdmin,
                // allow to delete any user except if it's admin
                isDeletable: (rowData) =>
                  rowData.id !== currentUser.id && isAdmin,
                // get row's data to be updated
                onRowUpdate: (newData: any, oldData: any) =>
                  new Promise((resolve, reject) => {
                    let dialogMsg = [];

                    // validate first name
                    const val_firstName = validate("TEXT", newData.firstName);
                    !val_firstName.isValid &&
                      dialogMsg.push(`First name: ${val_firstName.message}`);

                    // validate last name
                    const val_lastName = validate("TEXT", newData.lastName);
                    !val_lastName.isValid &&
                      dialogMsg.push(`Last name: ${val_lastName.message}`);

                    // validate email
                    const val_email = validate("EMAIL", newData.email);
                    !val_email.isValid &&
                      dialogMsg.push(`Email: ${val_email.message}`);

                    // submit update if all fields are valid
                    if (
                      val_firstName.isValid &&
                      val_lastName.isValid &&
                      val_email.isValid 
                    ) {
                      // submit update if any of the fields has got new entry
                      if (
                          oldData.firstName !== newData.firstName ||
                          oldData.secondName !== newData.secondName ||
                          oldData.email !== newData.email
                        ) {
                        // dispatch user update
                        resolve(dispatch(actionUsers.updateUser(newData)));
                      } else {
                        // return
                        resolve()
                      }
                    } else {
                      // display error message if any field is not valid
                      setIsDialogOpen(true);
                      setDialogTitle(`Incorrect information:`);
                      setDialogMessage(dialogMsg.join(""));
                      reject();
                    }
                  }),
                // delete row
                onRowDelete: (oldData: any) =>
                  new Promise((resolve) => {
                    resolve(dispatch(actionUsers.deleteUser(oldData.id)));
                  }),
              }
            : {}
        }
      />
    </React.Fragment>
  );
};

export default UsersTable;
