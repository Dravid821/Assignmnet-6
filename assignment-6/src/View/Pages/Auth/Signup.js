import { useState, useEffect } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { signupSchema } from "../../../Validation/SignupSchema";
import { NavLink } from "react-router-dom";

import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { EncryptData } from "../../../Utils/PasswordEncry-Decry";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
//   import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
//Start Signup Function.
export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);
  const [showcPassword, setShowcPassword] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    password: "",
    confirm_password: "",
    isActive: false,
  };
  // Signup Validation Code
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: signupSchema,
      validateOnChange: true,
      validateOnBlur: false,

      onSubmit: (values, action) => {
        console.log("Form-data", values);
        //form submission for the signup form.
        values.password = EncryptData(values.password);
        values.confirm_password = EncryptData(values.confirm_password);
        values.isActive = false;
        let signupdata = JSON.parse(localStorage.getItem("signUpData"));
        let temp = [];
        if (signupdata !== null) {
          let filter = signupdata.filter((item) => item.email === values.email);
          if (filter[0]) {
            toast.error("User is Alraddy Exits");
            action.resetForm();
          } else {
            const olddata = [...signupdata];
            temp = [...olddata, values];
            localStorage.setItem("signUpData", JSON.stringify(temp));
            toast.success("Account Created Successfully");
            navigate("/login");
          }
        } else {
          temp.push(values);
          localStorage.setItem("signUpData", JSON.stringify(temp));
          toast.success("Account Created Successfully");
          navigate("/login");
        }
        // console.log("string",JSON.stringify(values))
        // console.log("object",JSON.parse(values))
        action.resetForm();
      },
    });
  useEffect(() => {
    let loggin = JSON.parse(localStorage.getItem("isLogin"));
    if (loggin) {
      navigate("/product");
    }
  }, [navigate]);
  console.log(errors);
  // if (!loggin) {
  return (
    <Flex H={"100vh"} minW={"100vw"} align={"cnter"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up Form
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}></Text>
        </Stack>
        <form onSubmit={handleSubmit}>
          <Box rounded={"lg"} boxShadow={"lg"} p={8} w={[300, 400, 500]}>
            <Stack spacing={3}>
              <Box>
                <FormControl id="first_name" className="text-start">
                  <FormLabel>
                    First Name&nbsp;<span className="text-danger">*</span>
                  </FormLabel>
                  <Input
                    type="first_name"
                    autoComplete="off"
                    name="first_name"
                    id="first_name"
                    placeholder="First Name"
                    value={values.first_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.first_name && touched.first_name ? (
                    <p className="text-danger">{errors.first_name}</p>
                  ) : null}
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName"  className="text-start">
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    type="last_name"
                    autoComplete="off"
                    name="last_name"
                    id="last_name"
                    placeholder="Last Name"
                    value={values.last_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.last_name && touched.last_name ? (
                    <p className="">{errors.last_name}</p>
                  ) : null}
                </FormControl>
              </Box>
              <FormControl id="email"  className="text-start">
                <FormLabel>
                  Email address&nbsp;<span className="text-danger">*</span>
                </FormLabel>
                <Input
                  type="email"
                  autoComplete="off"
                  name="email"
                  id="email"
                  placeholder="Email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email ? (
                  <p className="text-danger">{errors.email}</p>
                ) : null}
              </FormControl>
              <FormControl id="mobile"  className="text-start">
                <FormLabel>
                  Mobile No.&nbsp;<span className="text-danger">*</span>
                </FormLabel>
                <Input
                  type="mobile"
                  autoComplete="off"
                  name="mobile"
                  id="mobile"
                  placeholder="Mobile"
                  value={values.mobile}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.mobile && touched.mobile ? (
                  <p className="text-danger">{errors.mobile}</p>
                ) : null}
              </FormControl>
              <FormControl id="password"  className="text-start">
                <FormLabel>
                  Password&nbsp;<span className="text-danger">*</span>
                </FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    autoComplete="off"
                    name="password"
                    id="password"
                    placeholder="Password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {errors.password && touched.password ? (
                  <p className="text-danger">{errors.password}</p>
                ) : null}{" "}
              </FormControl>
              <FormControl id="confirm_password"  className="text-start">
                <FormLabel>
                  Confirm Password&nbsp;<span className="text-danger">*</span>
                </FormLabel>
                <InputGroup>
                  <Input
                    type={showcPassword ? "text" : "password"}
                    autoComplete="off"
                    name="confirm_password"
                    id="confirm_password"
                    placeholder="Confirm Password"
                    value={values.confirm_password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  <InputRightElement h={"full"}>
                    <Button
                      variant={"gho"}
                      onClick={() =>
                        setShowcPassword((showcPassword) => !showcPassword)
                      }
                    >
                      {showcPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {errors.confirm_password && touched.confirm_password ? (
                  <p className="text-danger">{errors.confirm_password}</p>
                ) : null}{" "}
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  id="submit"
                  type="submit"
                  loadingText="Submitting"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Already a user?{" "}
                  <NavLink to={`/login`} color={"blue.400"}>
                    Login
                  </NavLink>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </form>
      </Stack>
    </Flex>
  );
}
