import React, { useState } from "react";
import FormInput from "../components/FormInput/FormInput";
import FormCard from "../components/FormCard/FormCard";
import { useDispatch } from "react-redux";

import * as authActions from "../store/actions/auth";
import validate from "../utils/validate";

const Register = () => {
  // input states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // message states
  const [firstNameMessage, setFirstNameMessage] = useState("");
  const [lastNameMessage, setLastNameMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  const dispatch = useDispatch();

  // check input validation
  const checkValidation = () => {
    // validate first name
    const val_firstName = validate("TEXT", firstName);
    setFirstNameMessage(val_firstName.message);

    // validate last name
    const val_lastName = validate("TEXT", lastName);
    setLastNameMessage(val_lastName.message);

    // validate email
    const val_email = validate("EMAIL", email);
    setEmailMessage(val_email.message);

    // validade password
    const val_password = validate("PASS", password);
    setPasswordMessage(val_password.message);

    // check if they are all valid
    if (
      val_firstName.isValid &&
      val_lastName.isValid &&
      val_email.isValid &&
      val_password.isValid
    ) {
      // submit registration
      register();
    }
  };

  // submit registration to backend
  const register = () => {
    // format data
    const info = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      is_admin: "0",
      password: password.trim(),
    };

    dispatch(authActions.register(info));
  };

  return (
    <FormCard title="Register" onSubmit={() => checkValidation}>
      <FormInput
        name="fName"
        label="First Name"
        type="text"
        value={firstName}
        validationMsg={firstNameMessage}
        onChange={(value: string) => setFirstName(value)}
      />
      <FormInput
        name="lName"
        label="Last Name"
        type="text"
        value={lastName}
        validationMsg={lastNameMessage}
        onChange={(value: string) => setLastName(value)}
      />
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

export default Register;
