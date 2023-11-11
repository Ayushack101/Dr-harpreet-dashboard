/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

import axios from "axios";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import {useState}from "react";
function Basic() {
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userData = {
      email: data.email,
      password: data.password,
    };
    console.log(userData);
    try {
      const resp = await axios.post("localhost:3000/login", userData);
      console.log(resp);
      if (resp.data.status === false) {
        toast.warning(`Error occured, ${resp.data.msg}!`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }
      if (resp.data.status === true) {
        setTimeout(() => {
          toast.success(`Success, New user created successfully!`, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }, 500);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(`Error occured, ${error}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  // const handleForm = async () => {
  //   const userData = {
  //     email: email,
  //     password: password,
  //   };
  //   console.log(userData, "asd");
  //   try {
  //     const resp = await axios.post("localhost:3000/sign-in", userData);
  //     console.log(resp);
  //     if (resp.data.status === false) {
  //       toast.warning(`Error occured, ${resp.data.msg}!`, {
  //         position: toast.POSITION.TOP_RIGHT,
  //       });
  //       return;
  //     }
  //     if (resp.data.status === true) {
  //       setTimeout(() => {
  //         toast.success(`Success, New user created successfully!`, {
  //           position: toast.POSITION.TOP_RIGHT,
  //         });
  //       }, 500);
  //       navigate("/");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error(`Error occured, ${error}`, {
  //       position: toast.POSITION.TOP_RIGHT,
  //     });
  //   }
  // };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <ToastContainer />
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          {/* <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography> */}
          {/* <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid> */}
          <MDTypography display="block" variant="button" color="white" my={1}>
            {/* Enter your  email and password to login dashboard */}
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleSubmit(onSubmit)}>
            {/* <MDBox component="form" role="form" onSubmit={handleForm}> */}
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                fullWidth
                {...register("email", {
                  required: "email is required!",
                  pattern: {
                    value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    message: "It should be a valid email address!",
                  },
                })}
                // value={email}
                // onChange={(e) => {
                //   setEmail(e.target.value);
                // }}
              />
              <MDTypography>{errors?.email?.message}</MDTypography>
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                fullWidth
                {...register("password", {
                  required: "password is required",
                  // pattern: {
                  //   value: /^(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,16}/,
                  //   message:
                  //     "Username should be 8-16 characters and should include atleast, 1 number, 1 letter, 1 special characters ",
                  // },
                })}
                // value={password}
                // onChange={(e) => {
                //   setPassword(e.target.value);
                // }}
              />
              <MDTypography>{errors?.password?.message}</MDTypography>
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton type="submit" variant="gradient" color="info" fullWidth>
                sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
