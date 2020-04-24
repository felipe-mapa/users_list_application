import React from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { Snackbar } from "@material-ui/core";
import { clearSnackbar } from "../../store/actions/snackbar";
import { Alert } from "@material-ui/lab";

const CustomSnackbar: React.FC = () => {
  // selectors
  const snackbar = useSelector(
    (state: RootStateOrAny) => state.snackbar.snackbar
  );

  const dispatch = useDispatch();

  // close snack bar
  const handleClose = () => {
    dispatch(clearSnackbar());
  };

  return (
    <Snackbar
      open={snackbar.isOpen}
      autoHideDuration={4000}
      onClose={handleClose}
    >
      {snackbar.type !== "" ? (
        <Alert onClose={handleClose} severity={snackbar.type}>
          {snackbar.message}
        </Alert>
      ) : (
        <p style={{ display: "none" }}>placeholder</p>
      )}
    </Snackbar>
  );
};

export default CustomSnackbar;
