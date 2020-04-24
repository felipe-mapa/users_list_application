import React from "react";
import {
  DialogActions,
  DialogTitle,
  DialogContent,
  Dialog,
} from "@material-ui/core";

// dialog props interface
interface DialogProps {
  open: boolean;
  onClose: any;
  title: string;
  message: JSX.Element;
  action: JSX.Element;
}

const CustomDialog: React.FC<DialogProps> = (props) => {
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>{props.message}</DialogContent>
      <DialogActions>{props.action}</DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
