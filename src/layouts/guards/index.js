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
import { Card } from "@mui/material";
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

function Guards() {
  const { user } = useAuthContext();
  const [allAccounts, setAllAccounts] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const fetchQuality = async () => {
    try {
      setLoading(true);
      const resp = await axios.get("http://localhost:3000/allGuard", {
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
        setAllAccounts(resp.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deleteUser = async (_id) => {
    try {
      const resp = await axios.post(
        "http://localhost:3000/delete",
        {
          id: _id,
        },
        {
          headers: {
            Authorization: user?.token,
          },
        }
      );
      console.log(resp);
      if (resp.data.success === false) {
        return;
      }
      if (resp.data.success === true) {
        fetchQuality();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchQuality();
  }, []);

  const columns = [
    { Header: "author", accessor: "author" },
    { Header: "email", accessor: "email" },
    { Header: "userType", accessor: "userType", align: "center" },
    { Header: "action", accessor: "action", align: "center" },
  ];

  const rows = allAccounts.map((item) => {
    return {
      author: (
        <MDBox display="flex" alignItems="center" lineHeight={1}>
          <MDBox ml={2} lineHeight={1}>
            <MDTypography display="block" variant="button" fontWeight="medium">
              {item?.userName}
            </MDTypography>
          </MDBox>
        </MDBox>
      ),
      email: (
        <MDBox display="flex" alignItems="center" lineHeight={1}>
          <MDBox ml={2} lineHeight={1}>
            <MDTypography display="block" variant="button" fontWeight="medium">
              {item?.email}
            </MDTypography>
          </MDBox>
        </MDBox>
      ),
      userType: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {item?.userType}
        </MDTypography>
      ),

      action: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          <MDButton
            color="info"
            onClick={() => {
              deleteUser(item?._id);
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
                <MDTypography color="white">Guards</MDTypography>
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

export default Guards;
