import * as Yup from "yup";
export const signupSchema = Yup.object({
  first_name : Yup.string().min(2,"First Name Must Be At Least 3 Characters").max(25,"First Name Must Be At Most 25 Characters").test("no-three-spaces", "Please enter a valid FirstName", (value) => {
    // Check if FirstName contains exactly three spaces
    return !value || value.split(" ").length !== 4;
  }).required("First Name is Require"),
  last_name: Yup.string(),
  email: Yup.string().email('Invalid Email Address').required('Email is Require'),
  mobile:Yup.string().matches(/^[0-9]+$/, 'Mobile Number Can Only Contain Numeric Characters').min(10).max(12).required("Mobile is Require"),
  password: Yup.string().matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number And One Special Case Character').required("Password is Require"),
  confirm_password: Yup.string()
    .required("Confirm Password Is Require")
    .oneOf([Yup.ref("password"),], "Password Must Match"),
});