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
import profilesListData from "layouts/profile/data/profilesListData";

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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  circularProgressClasses,
} from "@mui/material";
import authorsTableData from "layouts/tables/data/authorsTableData";
import UserData from "layouts/profile/data/UserData";
import React, { useEffect, useState } from "react";
import axios from "axios";
import MDButton from "components/MDButton";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "context/Auth/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Alluser() {
  const BASE_URL = process.env.REACT_APP_API_URL;
  const [allUsers, setAllUsers] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const resp = await axios.get(`${BASE_URL}/allUser`, {
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
        setAllUsers(resp.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(allUsers);
  useEffect(() => {
    fetchUsers();
  }, []);

  const changeQuality = async (_id) => {
    try {
      const resp = await axios.put(
        `${BASE_URL}/convert/Quality`,
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
        toast.warn(`Error occuerd, ${resp.data.message}!`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }
      if (resp.data.success === true) {
        toast.success(`Success,  ${resp.data.message}!`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        fetchUsers();
        navigate("/admin/quality");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const changeAccounts = async (_id) => {
    try {
      const resp = await axios.put(
        `${BASE_URL}/convert/account`,
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
        toast.warn(`Error occuerd, ${resp.data.message}!`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }
      if (resp.data.success === true) {
        toast.success(`Success,  ${resp.data.message}!`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        fetchUsers();
        navigate("/admin/accounts");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const changeGuards = async (_id) => {
    try {
      const resp = await axios.put(
        `${BASE_URL}/convert/guard`,
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
        toast.warn(`Error occuerd, ${resp.data.message}!`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }
      if (resp.data.success === true) {
        toast.success(`Success,  ${resp.data.message}!`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        fetchUsers();
        navigate("/admin/guards");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const changeInventory = async (_id) => {
    try {
      const resp = await axios.put(
        `${BASE_URL}/convert/inventry`,
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
        toast.warn(`Error occuerd, ${resp.data.message}!`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }
      if (resp.data.success === true) {
        toast.success(`Success,  ${resp.data.message}!`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        fetchUsers();
        navigate("/admin/inventory");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const Author = ({ name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
      </MDBox>
    </MDBox>
  );
  const Email = ({ email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {email}
        </MDTypography>
      </MDBox>
    </MDBox>
  );

  const columns = [
    { Header: "author", accessor: "author" },
    { Header: "email", accessor: "email" },
    { Header: "userType", accessor: "userType", align: "center" },
    { Header: "convert User", accessor: "convert", align: "center" },
  ];
  const rows = allUsers.map((item) => {
    return {
      author: <Author name={item?.userName} email={item?.email} />,
      email: <Email email={item?.email} />,
      userType: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {item?.userType}
        </MDTypography>
      ),
      convert: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          <MDButton
            color="info"
            onClick={() => {
              changeInventory(item?._id);
            }}
            style={{ marginRight: "8px" }}
          >
            Inventory
          </MDButton>
          <MDButton
            color="info"
            onClick={() => {
              changeQuality(item?._id);
            }}
            style={{ marginRight: "8px" }}
          >
            Quality
          </MDButton>
          <MDButton
            color="info"
            onClick={() => {
              changeAccounts(item?._id);
            }}
            style={{ marginRight: "8px" }}
          >
            Accounts
          </MDButton>
          <MDButton
            color="info"
            onClick={() => {
              changeGuards(item?._id);
            }}
            style={{ marginRight: "8px" }}
          >
            Guards
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
                <MDTypography variant="h6" color="white">
                  All User
                </MDTypography>
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
      {/* <Header>
        <MDBox mt={5} mb={3}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} xl={4}>
              <PlatformSettings />
            </Grid>
            <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
              <ProfileInfoCard
                title="profile information"
                description="Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality)."
                info={{
                  fullName: "Alec M. Thompson",
                  mobile: "(44) 123 1234 123",
                  email: "alecthompson@mail.com",
                  location: "USA",
                }}
                social={[
                  {
                    link: "https://www.facebook.com/CreativeTim/",
                    icon: <FacebookIcon />,
                    color: "facebook",
                  },
                  {
                    link: "https://twitter.com/creativetim",
                    icon: <TwitterIcon />,
                    color: "twitter",
                  },
                  {
                    link: "https://www.instagram.com/creativetimofficial/",
                    icon: <InstagramIcon />,
                    color: "instagram",
                  },
                ]}
                action={{ route: "", tooltip: "Edit Profile" }}
                shadow={false}
              />
              <Divider orientation="vertical" sx={{ mx: 0 }} />
            </Grid>
            <Grid item xs={12} xl={4}>
              <ProfilesList title="conversations" profiles={profilesListData} shadow={false} />
            </Grid>
          </Grid>
        </MDBox>
      </Header> */}
    </DashboardLayout>
  );
}

export default Alluser;
