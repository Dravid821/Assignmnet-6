import React, { useEffect, useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  InputGroup,
} from "@chakra-ui/react";
import { toast } from "react-hot-toast";
import { useFormik } from "formik";
import { loginSchema } from "../../../Validation/LoginSchema";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { DecryptData } from "../../../Utils/PasswordEncry-Decry";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const initialValues = {
  email: "",
  password: "",
};
export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    let loggin = JSON.parse(localStorage.getItem("isLogin"));
    if (loggin) {
      navigate("/product");
    }
  }, [navigate]);
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: loginSchema,
      validateOnChange: true,
      validateOnBlur: false,

      onSubmit: (values, action) => {
        console.log("Form-data", values);
        //form submission for the Login form.
        values.isActive = "false";
        let signupdata = JSON.parse(localStorage.getItem("signUpData"));
        console.log(signupdata);
        if (signupdata !== null) {
          let filter = signupdata.filter((item) => item.email === values.email);
          console.log();
          if (
            filter[0] &&
            DecryptData(filter[0].password) === values.password
          ) {
            filter[0].isActive = true;
            localStorage.setItem("isLogin", true);
            toast.success("Login Successfully");
            navigate("/product");
          } else {
            toast.error("Invalid Credentials");
          }
        } else {
          toast.error("No Data Found");
        }
        // console.log("string",JSON.stringify(values))
        // console.log("object",JSON.parse(values))
        localStorage.setItem("signUpData", JSON.stringify(signupdata));
      },
    });
  // if (!loggin) {
  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}></Text>
        </Stack>
        <form onSubmit={handleSubmit}>
          <Box boxShadow={"lg"} p={8}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address&nbsp;<span className="text-danger">*</span></FormLabel>
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
              <FormControl id="password">
                <FormLabel>Password&nbsp;<span className="text-danger">*</span></FormLabel>
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
              <Stack spacing={3}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                ></Stack>
                <Button
                  id="submit"
                  type="submit"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Sign in
                </Button>
                <Stack>
                  <Text align={"center"}>
                    New user?{" "}
                    <NavLink to={`/signup`} color={"blue.400"}>
                      Signup
                    </NavLink>
                  </Text>
                </Stack>
              </Stack>
            </Stack>
          </Box>
        </form>
      </Stack>
    </Flex>
  );
}