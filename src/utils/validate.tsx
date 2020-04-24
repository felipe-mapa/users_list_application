export default (type: string, input: string) => {
  // initial values
  let isValid: boolean = true;
  let message: string = "";

  switch (type) {
    // password check
    case "PASS":
      if (input === "") {
        // check if it's empty
        message = "Input cannot be blank!";
        isValid = false;
      } else if (input.length < 6) { // check length
        message = "Password must be over 6 characters!";
        isValid = false;
      } else if (
        !/[a-z]/.test(input) || // check for lowercase letter
        !/[A-Z]/.test(input) || // check for capital letter
        !/[0-9]/.test(input)    // check for number
      ) {
        message =
          "Password must contain at least one number (0-9), one lowercase letter (a-z) and one uppercase letter (A-Z)";
        isValid = false;
      } else {
        message = "";
        isValid = true;
      }
      return { isValid: isValid, message: message }; // return validation and message

    // email check
    case "EMAIL":
      if (input === "") {  // check if it's empty
        message = "Input cannot be blank!";
        isValid = false;
      } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(input)) { // check if email is valid
        message = "Invalid email!";
        isValid = false;
      } else {
        message = "";
        isValid = true;
      }
      return { isValid: isValid, message: message }; // return validation and message

    // text check
    case "TEXT":
      if (input === "") { // check if it's empty
        message = "Input cannot be blank!";
        isValid = false;
      } else if (input.match(/\d/)) { // check if contains number
        message = "Numbers not allowed!";
        isValid = false;
      } else {
        message = "";
        isValid = true;
      }
      return { isValid: isValid, message: message }; // return validation and message

    default:
      return { isValid: isValid, message: message }; // return initial values
  }
};
