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
import React, { useEffect, useState } from "react";
import axios from "axios";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { useAuthContext } from "context/Auth/AuthContext";

function InventoryTask() {
  const { user } = useAuthContext();
  const [inventoryTask, setInventoryTask] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const [productRange, setProductRange] = useState({});

  const fetchTaskByInventory = async () => {
    try {
      setLoading(true);

      const resp = await axios.get("http://localhost:3000/inventry/allTask", {
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

  const handleInputChange = (_id, value) => {
    setProductRange((prevState) => ({
      ...prevState,
      inputValues: {
        ...prevState.inputValues,
        [_id]: value,
      },
    }));
  };

  const columns = [
    { Header: "ProductName", accessor: "ProductName" },
    { Header: "Price", accessor: "Price", align: "center" },
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
          <MDBox ml={2} lineHeight={1}>
            <MDTypography display="block" variant="button" fontWeight="medium">
              {item?.productID?.productName}
            </MDTypography>
          </MDBox>
        </MDBox>
      ),
      Price: (
        <MDBox display="flex" alignItems="center" lineHeight={1}>
          <MDBox ml={2} lineHeight={1}>
            <MDTypography display="block" variant="button" fontWeight="medium">
              {item?.price}
            </MDTypography>
          </MDBox>
        </MDBox>
      ),
      Quantity: (
        <MDBox display="flex" alignItems="center" lineHeight={1}>
          <MDBox ml={2} lineHeight={1}>
            <MDTypography display="block" variant="button" fontWeight="medium">
              {item?.quantity}
            </MDTypography>
          </MDBox>
        </MDBox>
      ),
      Task_no: (
        <MDBox display="flex" alignItems="center" lineHeight={1}>
          <MDBox ml={2} lineHeight={1}>
            <MDTypography display="block" variant="button" fontWeight="medium">
              {item?.task_no}
            </MDTypography>
          </MDBox>
        </MDBox>
      ),

      Admin: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="bold">
          <MDButton
            color="info"
            disableRipple
            disableElevation
            disableFocusRipple
            style={{ PointerEvent: "none" }}
          >
            {item?.approvedByAdmin === true ? "Approved" : "Pending"}
          </MDButton>
        </MDTypography>
      ),
      Account: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="bold">
          <MDButton
            color="info"
            disableRipple
            disableElevation
            disableFocusRipple
            style={{ PointerEvent: "none" }}
          >
            {item?.approvedByAccount === true ? "Approved" : "Pending"}
          </MDButton>
        </MDTypography>
      ),
      Quality: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="bold">
          <MDButton
            color="info"
            disableRipple
            disableElevation
            disableFocusRipple
            style={{ PointerEvent: "none" }}
          >
            {item?.approvedByQualityChaker === true ? "Approved" : "Pending"}
          </MDButton>
        </MDTypography>
      ),
      Guard: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="bold">
          <MDButton
            color="info"
            disableRipple
            disableElevation
            disableFocusRipple
            style={{ PointerEvent: "none" }}
          >
            {item?.approvedByGuird === true ? "Approved" : "Pending"}
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
                <MDTypography color="white">Inventory Task</MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
              {/* )} */}
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default InventoryTask;
