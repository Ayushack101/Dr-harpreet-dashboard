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
  const [isLoading, setIsLoading] = useState(true);

  const vendorProductAccess = async () => {
    try {
      const resp = await axios.get("http://localhost:3000/buy/product/vender", {
        params: {
          ser_no,
          id,
        },
      });
      console.log(resp);
      if (resp.data.success === true) {
        setIsLoading(false);
        toast.success(`Success, ${resp.data.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      if (resp.data.success === false) {
        setIsLoading(false);
        toast.warn(`Error, ${resp.data.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    vendorProductAccess();
  }, []);
  return (
    <PageLayout>
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
      <MDBox px={1} width="100%" height="100%" mx="auto" mt={2}>
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
          <Grid item xs={12} sm={9} md={6} lg={5}>
            <ToastContainer />
            <Card>
              {isLoading === true ? (
                <MDBox
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "25px",
                    marginBottom: "25px",
                  }}
                >
                  <CircularProgress
                    variant="indeterminate"
                    disableShrink
                    sx={{
                      color: (theme) => (theme.palette.mode === "light" ? "#1a90ff" : "#308fe8"),
                      animationDuration: "550ms",

                      [`& .${circularProgressClasses.circle}`]: {
                        strokeLinecap: "round",
                      },
                    }}
                    size={50}
                    thickness={4}
                  />
                </MDBox>
              ) : (
                <>
                  <MDTypography variant="h5" color="dark" py={3} px={2}>
                    Product access successfully
                    <DoneAllIcon />
                  </MDTypography>
                  <MDTypography variant="h6" color="dark" pb={3} px={2}>
                    You can close this page!
                  </MDTypography>
                </>
              )}
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </PageLayout>
  );
};

export default VendorProductAccess;
