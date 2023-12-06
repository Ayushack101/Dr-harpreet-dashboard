/* eslint-disable react/prop-types */
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

// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

// Overview page components
import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";

// Data
import profilesListData from "layouts/products/data/profilesListData";

// Images
import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import homeDecor4 from "assets/images/home-decor-4.jpeg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import DataTable from "examples/Tables/DataTable";
import {
  Button,
  Card,
  CircularProgress,
  FormControl,
  InputLabel,
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
import authorsTableData from "layouts/tables/data/authorsTableData";
import UserData from "layouts/products/data/ProductData";
import React, { useEffect, useState } from "react";
import axios from "axios";
import MDButton from "components/MDButton";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "context/Auth/AuthContext";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MDInput from "components/MDInput";

function AllVendors() {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const [allProduct, setAllProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  // const fetchProduct = async () => {
  //   try {
  //     setLoading(true);
  //     const resp = await axios.get("http://localhost:3000/allProducts", {
  //       headers: {
  //         Authorization: user?.token,
  //       },
  //     });
  //     console.log(resp);
  //     if (resp.data.success === false) {
  //       setLoading(false);
  //       return;
  //     }
  //     if (resp.data.success === true) {
  //       setLoading(false);
  //       setAllProducts(resp.data.data);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  console.log(allProduct);
  useEffect(() => {
    // fetchProduct();
  }, []);

  const deleteProduct = async (_id) => {
    try {
      console.log("--www--", _id);
      const resp = await axios.post(
        "http://localhost:3000/deleteProduct",
        {
          _id,
        },
        {
          headers: {
            Authorization: user?.token,
          },
        }
      );
      console.log(resp);
      if (resp.data.success === false) {
        toast.warn(`Error, ${resp.data.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }
      if (resp.data.success === true) {
        toast.success(`Success, ${resp.data.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        fetchProduct();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const ProductName = ({ image, productName, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox ml={0} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {productName}
        </MDTypography>
        {/* <MDTypography variant="caption">{email}</MDTypography> */}
      </MDBox>
    </MDBox>
  );
  const Price = ({ price }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox ml={0} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {price}
        </MDTypography>
      </MDBox>
    </MDBox>
  );

  const columns = [
    { Header: "ProductName", accessor: "ProductName" },
    { Header: "Product Description", accessor: "Description" },
    { Header: "Product Category", accessor: "Category" },
    { Header: "Price", accessor: "Price" },
    { Header: "DeleteProduct", accessor: "DeleteProduct", align: "center" },
  ];
  const rows = allProduct.map((item) => {
    return {
      ProductName: <ProductName productName={item?.productName} />,
      Price: <Price price={item?.price} />,
      Description: (
        <MDBox display="flex" alignItems="center" lineHeight={1}>
          <MDBox ml={0} lineHeight={1}>
            <MDTypography display="block" variant="button" fontWeight="medium">
              {item.description.split(" ").slice(0, 25).join(" ")}...
            </MDTypography>
          </MDBox>
        </MDBox>
      ),
      Category: (
        <MDBox display="flex" alignItems="center" lineHeight={1}>
          <MDBox ml={0} lineHeight={1}>
            <MDTypography display="block" variant="button" fontWeight="medium">
              {item?.category?.categoryName}
            </MDTypography>
          </MDBox>
        </MDBox>
      ),

      DeleteProduct: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          <MDButton
            color="info"
            onClick={() => {
              deleteProduct(item?._id);
            }}
          >
            Delete
          </MDButton>
        </MDTypography>
      ),
    };
  });

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ToastContainer />

      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
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
                <Grid container spacing={1}>
                  <Grid item xs={5} lg={2}>
                    <MDBox variant="h6" color="white">
                      All Vendors
                    </MDBox>
                  </Grid>
                  <Grid item xs={6} lg={3}>
                    <MDButton
                      color="dark"
                      onClick={() => {
                        navigate("/store/dashboard/create-vendors");
                      }}
                    >
                      Create New Vendor
                    </MDButton>
                  </Grid>
                </Grid>
              </MDBox>

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
                <MDBox pt={3}>
                  <DataTable
                    table={{ columns, rows }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                  />
                </MDBox>
              )}
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default AllVendors;
