import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React from "react";
import {
  Button,
  Card,
  Checkbox,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  circularProgressClasses,
} from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import authorsTableData from "layouts/tables/data/authorsTableData";
import UserData from "layouts/products/data/ProductData";
import { useEffect, useState } from "react";
import axios from "axios";
import MDButton from "components/MDButton";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "context/Auth/AuthContext";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MDInput from "components/MDInput";
import { useForm } from "react-hook-form";

import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import PageLayout from "examples/LayoutContainers/PageLayout";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DoneAllIcon from "@mui/icons-material/DoneAll";

const VendorProductAccess = () => {
  const { ser_no } = useParams();
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const resp = await axios.post("http://localhost:3000/buy/product/vender", {
        price: data.price,
        date: data.date,
        description: data.productDescription,
        ser_no,
        id,
      });
      console.log(resp);
      if (resp.data.success === true) {
        toast.success(`Success, ${resp.data.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      if (resp.data.success === false) {
        toast.warn(`Error, ${resp.data.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PageLayout>
      <DefaultNavbar
        action={{
          type: "external",
          route: "https://creative-tim.com/product/material-dashboard-react",
          label: "",
          color: "dark",
        }}
      />
      <MDBox
        // position="absolute"
        width="100%"
        height="100%"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            bgImage &&
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <MDBox px={1} width="100%" height="100%" mx="auto" mt={17}>
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
          <Grid item xs={11} sm={9} md={6} lg={5}>
            <ToastContainer />
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h5" color="white">
                  Vendor Details Form
                </MDTypography>
              </MDBox>
              <MDBox pt={3} pb={3} px={3}>
                <MDBox component="form" role="form" onSubmit={handleSubmit(onSubmit)}>
                  <Grid container spacing={4}>
                    <Grid item xs={12}>
                      <MDTypography variant="h4" color="dark">
                        Vendor details for product
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <MDBox>
                        <MDInput
                          type="text"
                          label="Price"
                          fullWidth
                          {...register("price", {
                            required: "Price is required",
                          })}
                        />
                        <MDTypography color="error" fontWeight="bold" style={{ fontSize: "16px" }}>
                          {errors?.price?.message}
                        </MDTypography>
                      </MDBox>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <MDBox>
                        <MDInput
                          type="date"
                          fullWidth
                          {...register("date", {
                            required: "phone number is required!",
                          })}
                        />
                        <MDTypography color="error" fontWeight="bold" style={{ fontSize: "16px" }}>
                          {errors?.date?.message}
                        </MDTypography>
                      </MDBox>
                    </Grid>

                    <Grid item xs={12} lg={6}>
                      <MDBox>
                        <MDInput
                          type="text"
                          label="Description"
                          rows={4}
                          multiline
                          fullWidth
                          {...register("productDescription", {
                            required: "Description is required",
                          })}
                        />
                        <MDTypography color="error" fontWeight="bold" style={{ fontSize: "16px" }}>
                          {errors?.productDescription?.message}
                        </MDTypography>
                      </MDBox>
                    </Grid>

                    <Grid item xs={12}>
                      <MDButton type="submit" variant="gradient" color="info" fullWidth>
                        Submit
                      </MDButton>
                    </Grid>
                  </Grid>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      {/* <Footer light /> */}
    </PageLayout>
  );
};

export default VendorProductAccess;
