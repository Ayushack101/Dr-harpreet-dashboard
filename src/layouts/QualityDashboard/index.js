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
import { useNavigate } from "react-router-dom";

function QualityDashboard() {
  const { user } = useAuthContext();
  const [qualityTask, setQualityTask] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchTaskApprovedByAccount = async () => {
    try {
      setLoading(true);
      const resp = await axios.get("http://localhost:3000/quality/allTask", {
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
        setQualityTask(resp.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // fetchTaskApprovedByAccount();
    fetchTask();
  }, []);

  const approvedByQuality = async (_id) => {
    try {
      const resp = await axios.post(
        "http://localhost:3000/quality/taskApproved",
        {
          _id: _id,
        },
        {
          headers: {
            Authorization: user?.token,
          },
        }
      );
      console.log(resp);
      if (resp.data.success === false) {
        toast.warn(`Error occuerd, ${resp.data.message}!`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }
      if (resp.data.success === true) {
        toast.success(`Success,  ${resp.data.message}!`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        fetchTaskApprovedByAccount();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTask = async () => {
    try {
      setLoading(true);

      const resp = await axios.get("http://localhost:3000/allTask/quality", {
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
        setQualityTask(resp.data.data);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  console.log(qualityTask);

  const columns = [
    { Header: "ProductName", accessor: "ProductName" },
    { Header: "Description", accessor: "Description" },
    { Header: "Price", accessor: "Price", align: "center" },
    { Header: "Quantity", accessor: "Quantity", align: "center" },
    { Header: "Task_no", accessor: "Task_no", align: "center" },
    { Header: "Vendors", accessor: "Vendors", align: "center" },
    { Header: "Status", accessor: "status", align: "center" },
  ];

  const rows = qualityTask.map((item) => {
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
          <MDBox lineHeight={1} sx={{ width: "220px" }}>
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

      Vendors: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="bold">
          {item?.selectedVender === null ? (
            <MDButton
              color="info"
              onClick={() => {
                navigate(`/quality/dashboard/taskvendors/${item?.task_no}/${item?._id}`);
              }}
            >
              View Vendors
            </MDButton>
          ) : (
            <MDButton
              color="info"
              onClick={() => {
                navigate(
                  `/quality/dashboard/approvedvendor/${item?.task_no}/${item?.selectedVender}`
                );
              }}
            >
              Approved Vendor
            </MDButton>
          )}
        </MDTypography>
      ),
      status: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="bold">
          {item?.approvedByQualityChaker === true ? (
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
                <MDTypography color="white">Quality Task</MDTypography>
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

export default QualityDashboard;
