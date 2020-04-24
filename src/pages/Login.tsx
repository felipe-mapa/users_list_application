import React, { useState } from "react";
import * as authActions from "../store/actions/auth";
import { useDispatch } from "react-redux";

import FormCard from "../components/FormCard/FormCard";
import FormInput from "../components/FormInput/FormInput";
import validate from "../utils/validate";

const Login = () => {
  // state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  const dispatch = useDispatch();

  // check validation
  const checkValidation = () => {
    // validate email
    const val_email = validate("EMAIL", email);
    setEmailMessage(val_email.message);

    // validade password
    const val_password = validate("EMAIL", password);
    if (password === "") {
      setPasswordMessage("This field is required");
    }

    // check if both are valid
    if (val_email.isValid && val_password.isValid) {
      // submit login
      login();
    }
  };

  // submit login to backend
  const login = () => {
    const info = {
      email: email,
      password: password,
    };

    dispatch(authActions.loginUser(info));
  };

  return (
    <FormCard title="Login" onSubmit={() => checkValidation}>
      <FormInput
        name="email"
        label="Email"
        type="email"
        value={email}
        validationMsg={emailMessage}
        onChange={(value: string) => setEmail(value)}
      />
      <FormInput
        name="password"
        label="Password"
        type="password"
        value={password}
        validationMsg={passwordMessage}
        onChange={(value: string) => setPassword(value)}
      />
    </FormCard>
  );
};

export default Login;
