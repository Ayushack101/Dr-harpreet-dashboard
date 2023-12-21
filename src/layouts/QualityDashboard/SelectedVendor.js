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
import DataTable from "examples/Tables/DataTable";
import { Button, Card } from "@mui/material";
import UserData from "layouts/buyproducts/data/ProductData";
import React, { useState, useEffect } from "react";
import axios from "axios";
import MDButton from "components/MDButton";
import { useAuthContext } from "context/Auth/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress, { circularProgressClasses } from "@mui/material/CircularProgress";
import MDBadge from "components/MDBadge";
import { useNavigate, useParams } from "react-router-dom";

function SelectedVendor() {
  const BASE_URL = process.env.REACT_APP_API_URL;
  const { user } = useAuthContext();
  const { ser_no, selectedVender, price } = useParams();
  const [allVendorTask, setAllVendorTask] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllVendorTask();
  }, []);

  const fetchAllVendorTask = async () => {
    try {
      setLoading(true);

      const resp = await axios.get(`${BASE_URL}/allvender/task`, {
        params: {
          ser_no,
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
        console.log(resp.data.data);
        const approvedVendor = resp.data.data.venders.filter((item) => {
          return item?.ven_id === selectedVender;
        });
        console.log(approvedVendor);
        setAllVendorTask(approvedVendor);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const columns = [
    { Header: "Vender Name", accessor: "venderName" },
    // { Header: "Complete Info", accessor: "completeinfo" },
    // { Header: "Address", accessor: "address" },
    { Header: "Phone", accessor: "phoneNum", align: "center" },
    { Header: "Category", accessor: "category" },
    { Header: "Product Price", accessor: "product price" },
    { Header: "Vendor Price", accessor: "price", align: "center" },
    { Header: "Details", accessor: "description", align: "center" },
    { Header: "Delivery Date", accessor: "date", align: "center" },
    { Header: "Status", accessor: "Approve", align: "center" },
  ];

  const rows = allVendorTask?.map((item) => {
    return {
      venderName: (
        <MDBox display="flex" alignItems="center" lineHeight={1}>
          <MDBox lineHeight={1}>
            <MDTypography display="block" variant="button" fontWeight="medium">
              {item?.ven_info?.venderName}
            </MDTypography>
          </MDBox>
        </MDBox>
      ),
      phoneNum: (
        <MDBox display="flex" alignItems="center" lineHeight={1}>
          <MDBox lineHeight={1}>
            <MDTypography display="block" variant="button" fontWeight="medium">
              {item?.ven_info?.phoneNum}
            </MDTypography>
          </MDBox>
        </MDBox>
      ),
      address: (
        <MDBox display="flex" alignItems="center" lineHeight={1}>
          <MDBox lineHeight={1} sx={{ width: "140px" }}>
            <MDTypography display="block" variant="button" fontWeight="medium">
              {item?.ven_info?.address}
            </MDTypography>
          </MDBox>
        </MDBox>
      ),
      completeinfo: (
        <MDBox display="flex" alignItems="center" lineHeight={1}>
          <MDBox lineHeight={1} sx={{ width: "220px" }}>
            <MDTypography display="block" variant="button" fontWeight="medium">
              {item?.ven_info?.completeinfo}
            </MDTypography>
          </MDBox>
        </MDBox>
      ),
      category: (
        <MDBox display="flex" alignItems="center" lineHeight={1}>
          <MDBox lineHeight={1} sx={{ width: "120px" }}>
            <MDTypography display="block" variant="button" fontWeight="medium">
              {item?.ven_info?.category.map((item) => {
                return `${item}, `;
              })}
            </MDTypography>
          </MDBox>
        </MDBox>
      ),
      "product price": (
        <MDBox display="flex" alignItems="center" lineHeight={1}>
          <MDBox lineHeight={1}>
            <MDTypography display="block" variant="button" fontWeight="medium">
              {price}
            </MDTypography>
          </MDBox>
        </MDBox>
      ),
      price: (
        <MDBox display="flex" alignItems="center" lineHeight={1}>
          <MDBox lineHeight={1}>
            <MDTypography display="block" variant="button" fontWeight="medium">
              {item?.price}
            </MDTypography>
          </MDBox>
        </MDBox>
      ),
      description: (
        <MDBox display="flex" alignItems="center" lineHeight={1}>
          <MDBox lineHeight={1} sx={{ width: "200px" }}>
            <MDTypography display="block" variant="button" fontWeight="medium">
              {item?.Prod_desc}
            </MDTypography>
          </MDBox>
        </MDBox>
      ),
      date: (
        <MDBox display="flex" alignItems="center" lineHeight={1}>
          <MDBox lineHeight={1}>
            <MDTypography display="block" variant="button" fontWeight="medium">
              {/* {item?.send_Prod_date} */}
              {item?.send_Prod_date
                ? new Date(item.send_Prod_date).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long", // or 'short' for abbreviated month
                    day: "numeric",
                  })
                : "No date available"}
            </MDTypography>
          </MDBox>
        </MDBox>
      ),
      Approve: (
        <MDBox display="flex" alignItems="center" lineHeight={1}>
          <MDBox lineHeight={1}>
            <MDBadge badgeContent="Approved" color="warning" variant="gradient" size="lg" />
          </MDBox>
        </MDBox>
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
                <MDTypography color="white">Approved Vendor</MDTypography>
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
              {/* )} */}
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default SelectedVendor;
