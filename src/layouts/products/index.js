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
  OutlinedInput,
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

function Overview() {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const [allProduct, setAllProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const fetchProduct = async () => {
    try {
      setLoading(true);
      const resp = await axios.get("http://localhost:3000/allProducts", {
        headers: {
          Authorization: user?.token,
        },
      });
      console.log(resp);
      if (resp.data.success === false) {
        return;
      }
      if (resp.data.success === true) {
        setLoading(false);
        setAllProducts(resp.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(allProduct);
  useEffect(() => {
    fetchProduct();
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

  const addProduct = async () => {
    if (productName === "") {
      toast.warn(`Product name can not be empty!`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    if (productPrice === "") {
      toast.warn(`Product price can not be empty!`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    try {
      const resp = await axios.post(
        "http://localhost:3000/create/product",
        {
          productName: productName,
          price: productPrice,
        },
        {
          headers: {
            Authorization: user?.token,
          },
        }
      );
      console.log(resp);
      if (resp.data.success === true) {
        toast.success(`Success, ${resp.data.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        fetchProduct();
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

  const ProductName = ({ image, productName, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {productName}
        </MDTypography>
        {/* <MDTypography variant="caption">{email}</MDTypography> */}
      </MDBox>
    </MDBox>
  );
  const Price = ({ price }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {price}
        </MDTypography>
      </MDBox>
    </MDBox>
  );

  const columns = [
    { Header: "ProductName", accessor: "ProductName" },
    { Header: "Price", accessor: "Price" },
    { Header: "DeleteProduct", accessor: "DeleteProduct", align: "center" },
  ];
  const rows = allProduct.map((item) => {
    return {
      ProductName: <ProductName productName={item?.productName} />,
      Price: <Price price={item?.price} />,

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
                  <Grid item xs={2}>
                    <MDBox variant="h6" color="white">
                      Create Product
                    </MDBox>
                  </Grid>
                  <Grid item xs={3}>
                    <OutlinedInput
                      color="primary"
                      placeholder="Product Name "
                      value={productName}
                      onChange={(e) => {
                        setProductName(e.target.value);
                      }}
                    ></OutlinedInput>
                  </Grid>
                  <Grid item xs={3}>
                    <OutlinedInput
                      color="primary"
                      placeholder="Product Price"
                      value={productPrice}
                      onChange={(e) => {
                        setProductPrice(e.target.value);
                      }}
                      type="number"
                    ></OutlinedInput>
                  </Grid>
                  <Grid item xs={2}>
                    <MDButton color="secondary" onClick={addProduct}>
                      Add Product
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
              {/* <MDBox pt={2} px={2} lineHeight={1.25}>
                <MDTypography variant="h6" fontWeight="medium">
                  Projects
                </MDTypography>
                <MDBox mb={1}>
                  <MDTypography variant="button" color="text">
                    Architects design houses
                  </MDTypography>
                </MDBox>
              </MDBox>
              <MDBox p={2}>
                <Grid container spacing={6}>
                  <Grid item xs={12} md={6} xl={3}>
                    <DefaultProjectCard
                      image={homeDecor1}
                      label="project #2"
                      title="modern"
                      description="As Uber works through a huge amount of internal management turmoil."
                      action={{
                        type: "internal",
                        route: "/pages/profile/profile-overview",
                        color: "info",
                        label: "view project",
                      }}
                      authors={[
                        { image: team1, name: "Elena Morison" },
                        { image: team2, name: "Ryan Milly" },
                        { image: team3, name: "Nick Daniel" },
                        { image: team4, name: "Peterson" },
                      ]}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} xl={3}>
                    <DefaultProjectCard
                      image={homeDecor2}
                      label="project #1"
                      title="scandinavian"
                      description="Music is something that everyone has their own specific opinion about."
                      action={{
                        type: "internal",
                        route: "/pages/profile/profile-overview",
                        color: "info",
                        label: "view project",
                      }}
                      authors={[
                        { image: team3, name: "Nick Daniel" },
                        { image: team4, name: "Peterson" },
                        { image: team1, name: "Elena Morison" },
                        { image: team2, name: "Ryan Milly" },
                      ]}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} xl={3}>
                    <DefaultProjectCard
                      image={homeDecor3}
                      label="project #3"
                      title="minimalist"
                      description="Different people have different taste, and various types of music."
                      action={{
                        type: "internal",
                        route: "/pages/profile/profile-overview",
                        color: "info",
                        label: "view project",
                      }}
                      authors={[
                        { image: team4, name: "Peterson" },
                        { image: team3, name: "Nick Daniel" },
                        { image: team2, name: "Ryan Milly" },
                        { image: team1, name: "Elena Morison" },
                      ]}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} xl={3}>
                    <DefaultProjectCard
                      image={homeDecor4}
                      label="project #4"
                      title="gothic"
                      description="Why would anyone pick blue over pink? Pink is obviously a better color."
                      action={{
                        type: "internal",
                        route: "/pages/profile/profile-overview",
                        color: "info",
                        label: "view project",
                      }}
                      authors={[
                        { image: team4, name: "Peterson" },
                        { image: team3, name: "Nick Daniel" },
                        { image: team2, name: "Ryan Milly" },
                        { image: team1, name: "Elena Morison" },
                      ]}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} xl={3}>
                    <DefaultProjectCard
                      image={homeDecor4}
                      label="project #4"
                      title="gothic"
                      description="Why would anyone pick blue over pink? Pink is obviously a better color."
                      action={{
                        type: "internal",
                        route: "/pages/profile/profile-overview",
                        color: "info",
                        label: "view project",
                      }}
                      authors={[
                        { image: team4, name: "Peterson" },
                        { image: team3, name: "Nick Daniel" },
                        { image: team2, name: "Ryan Milly" },
                        { image: team1, name: "Elena Morison" },
                      ]}
                    />
                  </Grid>
                </Grid>
              </MDBox> */}
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Overview;
