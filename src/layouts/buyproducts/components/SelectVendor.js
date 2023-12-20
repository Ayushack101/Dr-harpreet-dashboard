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
import MDBadge from "components/MDBadge";

function SelectVendor({ productData }) {
  const BASE_URL = process.env.REACT_APP_API_URL;
  const { user } = useAuthContext();
  const [allVendor, setAllVendor] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [selectedVendorsId, setSelectedVendorsId] = useState([]);
  const fetchAllVendors = async () => {
    try {
      setLoading(true);
      const resp = await axios.get(`${BASE_URL}/get/allvender/Quality`, {
        params: {
          product_id: productData.product_id,
        },
        headers: {
          Authorization: user?.token,
        },
      });
      console.log(resp);
      if (resp.data.success === false) {
        setLoading(false);
        return;
      }
      if (resp.data.success === true) {
        setLoading(false);
        setAllVendor(resp.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllVendors();
  }, []);

  const selectedVendors = (_id) => {
    setSelectedVendorsId([...selectedVendorsId, _id]);
  };
  console.log({ ...productData, selectedVendorsId });

  const emailToSelectedVendors = async () => {
    try {
      const resp = await axios.post(
        `${BASE_URL}/buyProduct/perticular`,
        { ...productData, selectedVendorsId },
        {
          headers: {
            Authorization: user?.token,
          },
        }
      );
      if (resp.data.success === false) {
        toast.warn(`Error occured, ${resp.data.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }
      if (resp.data.success === true) {
        toast.success(`Success, Email send to selected vendors and new task created`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setTimeout(() => {
          navigate("/store/dashboard/inventorytask");
        }, 1000);
      }
    } catch (error) {
      toast.error(`Error, ${error}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const emailToAllVendors = async () => {
    try {
      const resp = await axios.post(`${BASE_URL}/buyProduct`, productData, {
        headers: {
          Authorization: user?.token,
        },
      });
      if (resp.data.success === false) {
        toast.warn(`Error occured, ${resp.data.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }
      if (resp.data.success === true) {
        toast.success(`Success, Email send to All vendors and new task created`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setTimeout(() => {
          navigate("/store/dashboard/inventorytask");
        }, 1000);
      }
    } catch (error) {
      toast.error(`Error, ${error}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const columns = [
    { Header: "Vender Name", accessor: "venderName" },
    { Header: "Complete Info", accessor: "completeinfo" },
    { Header: "Address", accessor: "address" },
    { Header: "Phone", accessor: "phoneNum", align: "center" },
    { Header: "Category", accessor: "category", align: "center" },
    { Header: "Select", accessor: "Select", align: "center" },
  ];

  const rows = allVendor.map((item) => {
    return {
      venderName: (
        <MDBox display="flex" alignItems="center" lineHeight={1}>
          <MDBox lineHeight={1}>
            <MDTypography display="block" variant="button" fontWeight="medium">
              {item?.venderName}
            </MDTypography>
          </MDBox>
        </MDBox>
      ),
      phoneNum: (
        <MDBox display="flex" alignItems="center" lineHeight={1}>
          <MDBox lineHeight={1}>
            <MDTypography display="block" variant="button" fontWeight="medium">
              {item?.phoneNum}
            </MDTypography>
          </MDBox>
        </MDBox>
      ),
      address: (
        <MDBox display="flex" alignItems="center" lineHeight={1}>
          <MDBox lineHeight={1} sx={{ width: "140px" }}>
            <MDTypography display="block" variant="button" fontWeight="medium">
              {item?.address}
            </MDTypography>
          </MDBox>
        </MDBox>
      ),
      completeinfo: (
        <MDBox display="flex" alignItems="center" lineHeight={1}>
          <MDBox lineHeight={1} sx={{ width: "220px" }}>
            <MDTypography display="block" variant="button" fontWeight="medium">
              {item?.completeinfo}
            </MDTypography>
          </MDBox>
        </MDBox>
      ),
      category: (
        <MDBox display="flex" alignItems="center" lineHeight={1}>
          <MDBox lineHeight={1} sx={{ width: "220px" }}>
            <MDTypography display="block" variant="button" fontWeight="medium">
              {item?.category.map((item) => {
                return `${item}, `;
              })}
            </MDTypography>
          </MDBox>
        </MDBox>
      ),
      Select: (
        <MDBox display="flex" alignItems="center" lineHeight={1}>
          <MDBox lineHeight={1}>
            {selectedVendorsId.find((id) => item?._id === id) ? (
              <MDButton color="warning" fontWeight="medium">
                Selected
              </MDButton>
            ) : (
              <MDButton
                color="info"
                fontWeight="medium"
                onClick={() => {
                  selectedVendors(item?._id);
                }}
              >
                Select
              </MDButton>
            )}
          </MDBox>
        </MDBox>
      ),
    };
  });

  return (
    // <DashboardLayout>
    //   <DashboardNavbar />
    //   <ToastContainer />

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
                <Grid item xs={5} lg={3}>
                  <MDBox variant="h6" color="white">
                    Select Vendors for Product
                  </MDBox>
                </Grid>
                <Grid item xs={5} lg={2}>
                  <MDButton color="dark" onClick={emailToSelectedVendors}>
                    Email Vendors
                  </MDButton>
                </Grid>
                <Grid item xs={5} lg={3}>
                  <MDButton color="dark" onClick={emailToAllVendors}>
                    Send Email to All Vendors
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
                  entriesPerPage={{ defaultValue: 20, entries: [20, 40, 60, 80, 100] }}
                  showTotalEntries={true}
                  noEndBorder={false}
                  pagination={true}
                />
              </MDBox>
            )}
          </Card>
        </Grid>
      </Grid>
    </MDBox>
    // </DashboardLayout>
  );
}

export default SelectVendor;
