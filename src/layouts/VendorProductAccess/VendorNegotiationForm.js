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

const VendorNegotiationForm = () => {
  const BASE_URL = process.env.REACT_APP_API_URL;
  const { ser_no, id, price } = useParams();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const resp = await axios.post(`${BASE_URL}/vender/negotiable`, {
        price: data.price,
        ser_no,
        id,
      });
      console.log(resp);
      if (resp.data.success === true) {
        setIsLoading(false);
        setTimeout(() => {
          setIsSuccess(true);
        }, 500);
      }
      if (resp.data.success === false) {
        setIsLoading(false);
        toast.warn(`Error, ${resp.data.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  if (isSuccess) {
    return (
      <MDBox sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Card sx={{ py: 4, px: 8, my: 4 }}>
          <MDTypography variant="h3">
            Success
            <DoneAllIcon />
          </MDTypography>
          <MDTypography variant="h5">
            Negotiation Price send successfully. You can close this page now!
          </MDTypography>
        </Card>
      </MDBox>
    );
  }

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
                  Vendor Negotiation Form
                </MDTypography>
              </MDBox>
              <MDBox pt={3} pb={3} px={3}>
                <MDBox component="form" role="form" onSubmit={handleSubmit(onSubmit)}>
                  <Grid container spacing={4}>
                    <Grid item xs={12}>
                      <MDTypography variant="h4" color="dark">
                        Negotiation price for product: {price}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <MDBox>
                        <MDInput
                          type="number"
                          label="Negotiation Price"
                          fullWidth
                          variant="standard"
                          {...register("price", {
                            required: "Price is required",
                          })}
                        />
                        <MDTypography color="error" fontWeight="bold" style={{ fontSize: "16px" }}>
                          {errors?.price?.message}
                        </MDTypography>
                      </MDBox>
                    </Grid>

                    <Grid item xs={12}>
                      <MDButton type="submit" variant="gradient" color="info" fullWidth>
                        {isLoading === true ? (
                          <CircularProgress
                            variant="indeterminate"
                            disableShrink
                            sx={{
                              color: (theme) =>
                                theme.palette.mode === "light" ? "#fcfffe" : "#fcfffe",
                              animationDuration: "550ms",

                              [`& .${circularProgressClasses.circle}`]: {
                                strokeLinecap: "round",
                              },
                            }}
                            size={25}
                            thickness={5}
                          />
                        ) : (
                          "Submit"
                        )}
                      </MDButton>
                    </Grid>
                  </Grid>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </PageLayout>
  );
};

export default VendorNegotiationForm;
