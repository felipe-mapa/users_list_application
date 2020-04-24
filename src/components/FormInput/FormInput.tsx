import React from "react";
import { TextField } from "@material-ui/core";

// form props interface
interface FormProps {
  label: string;
  name: string;
  type: string;
  value: string;
  validationMsg: string;
  onChange: any;
}

const FormInput: React.FC<FormProps> = (props) => {
  return (
    <TextField
      label={props.label}
      name={props.name}
      type={props.type}
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
      margin="normal"
      error={props.validationMsg !== ""}
      helperText={props.validationMsg}
      required
    />
  );
};

export default FormInput;
