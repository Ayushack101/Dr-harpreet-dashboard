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

function InventoryTask() {
  const BASE_URL = process.env.REACT_APP_API_URL;
  const { user } = useAuthContext();
  const [inventoryTask, setInventoryTask] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const fetchTaskByInventory = async () => {
    try {
      setLoading(true);

      const resp = await axios.get(`${BASE_URL}/inventry/allTask`, {
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
        setInventoryTask(resp.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchTaskByInventory();
  }, []);

  const columns = [
    { Header: "ProductName", accessor: "ProductName" },
    { Header: "Description", accessor: "Description" },
    // { Header: "Price", accessor: "Price", align: "center" },
    { Header: "Quantity", accessor: "Quantity", align: "center" },
    { Header: "Task_no", accessor: "Task_no", align: "center" },
    { Header: "Admin", accessor: "Admin", align: "center" },
    { Header: "Account", accessor: "Account", align: "center" },
    { Header: "Qualtiy", accessor: "Quality", align: "center" },
    { Header: "Guard", accessor: "Guard", align: "center" },
  ];

  const rows = inventoryTask.map((item) => {
    return {
      ProductName: (
        <MDBox display="flex" alignItems="center" lineHeight={1}>
          <MDBox lineHeight={1}>
            <MDTypography display="block" variant="button" fontWeight="medium">
              {item?.productID?.productName}
            </MDTypography>
          </MDBox>
        </MDBox>
      ),
      Price: (
        <MDBox display="flex" alignItems="center" lineHeight={1}>
          <MDBox lineHeight={1}>
            <MDTypography display="block" variant="button" fontWeight="medium">
              {item?.price}
            </MDTypography>
          </MDBox>
        </MDBox>
      ),
      Quantity: (
        <MDBox display="flex" alignItems="center" lineHeight={1}>
          <MDBox lineHeight={1}>
            <MDTypography display="block" variant="button" fontWeight="medium">
              {item?.quantity}
            </MDTypography>
          </MDBox>
        </MDBox>
      ),
      Description: (
        <MDBox display="flex" alignItems="center" lineHeight={1}>
          <MDBox lineHeight={1} sx={{ width: "270px" }}>
            <MDTypography display="block" variant="button" fontWeight="medium">
              {item?.description}
            </MDTypography>
          </MDBox>
        </MDBox>
      ),
      Task_no: (
        <MDBox display="flex" alignItems="center" lineHeight={1}>
          <MDBox lineHeight={1}>
            <MDTypography display="block" variant="button" fontWeight="medium">
              {item?.task_no}
            </MDTypography>
          </MDBox>
        </MDBox>
      ),

      Admin: (
        <MDTypography variant="caption" color="text" fontWeight="bold">
          {item?.approvedByAdmin === true ? (
            <MDBadge badgeContent="Approved" color="warning" variant="gradient" size="lg" />
          ) : (
            <MDBadge badgeContent="Pending" color="dark" variant="gradient" size="lg" />
          )}
        </MDTypography>
      ),
      Account: (
        <MDTypography variant="caption" color="text" fontWeight="bold">
          {item?.approvedByAccount === true ? (
            <MDBadge badgeContent="Approved" color="warning" variant="gradient" size="lg" />
          ) : (
            <MDBadge badgeContent="Pending" color="dark" variant="gradient" size="lg" />
          )}
        </MDTypography>
      ),
      Quality: (
        <MDTypography variant="caption" color="text" fontWeight="bold">
          {item?.approvedByQualityChaker === true ? (
            <MDBadge badgeContent="Approved" color="warning" variant="gradient" size="lg" />
          ) : (
            <MDBadge badgeContent="Pending" color="dark" variant="gradient" size="lg" />
          )}
        </MDTypography>
      ),
      Guard: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="bold">
          {item?.approvedByGuird === true ? (
            <MDBadge badgeContent="Approved" color="warning" variant="gradient" size="lg" />
          ) : (
            <MDBadge badgeContent="Pending" color="dark" variant="gradient" size="lg" />
          )}
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
                <MDTypography color="white">Inventory Task</MDTypography>
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
    </DashboardLayout>
  );
}

export default InventoryTask;
