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
import { Button, Card, Icon, Menu, MenuItem, Modal } from "@mui/material";
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
import MDInput from "components/MDInput";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";

function QualityTaskVendors() {
  const BASE_URL = process.env.REACT_APP_API_URL;
  const { user } = useAuthContext();
  const { ser_no, _id, price } = useParams();
  const [allVendorTask, setAllVendorTask] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [menu, setMenu] = useState(null);
  const [item, setItem] = useState({});
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [negotiateValue, setNegotiateValue] = useState("");
  const [isLoadingSend, setIsLoadingSend] = useState(false);

  const openMenu = (currentTarget) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  useEffect(() => {
    fetchAllVendorTask();
  }, []);

  const approvedByQuality = async (_id, venderid) => {
    console.log(_id, venderid);
    try {
      const resp = await axios.post(
        `${BASE_URL}/quality/taskApproved`,
        {
          _id,
          venderid,
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
        toast.success(`Success,  Approved by Quality!`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setTimeout(() => {
          navigate("/quality/dashboard/qualitytask");
        }, 400);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const rejectVendor = async (_id, venderid) => {
    console.log(_id, venderid);
    try {
      const resp = await axios.post(
        `${BASE_URL}/quality/venderDelete`,
        {
          _id,
          venderid,
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
        toast.success(`Success, vendor rejected!`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        fetchAllVendorTask();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const negotiateVendor = async (_id) => {
    if (negotiateValue === "") {
      toast.warn(`Negotaite value cannot be empty!`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    setIsLoadingSend(true);
    try {
      const resp = await axios.post(
        `${BASE_URL}/negotiable/vender`,
        {
          _id,
          venderid: item?.ven_id,
          negotiateValue,
        },
        {
          headers: {
            Authorization: user?.token,
          },
        }
      );
      console.log(resp);
      setIsLoadingSend(false);
      if (resp.data.success === false) {
        toast.warn(`Error occuerd, ${resp.data.message}!`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }
      if (resp.data.success === true) {
        toast.success(`Success, ${resp.data.message}!`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        handleClose();
        fetchAllVendorTask();
      }
    } catch (error) {
      console.log(error);
      toast.warn(`Error occuerd, ${error}!`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsLoadingSend(false);
    }
  };

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
        setAllVendorTask(resp.data.data.venders);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      <MenuItem
        onClick={() => {
          approvedByQuality(_id, item?.ven_id);
          closeMenu();
        }}
      >
        Approve
      </MenuItem>
      <MenuItem
        onClick={() => {
          rejectVendor(_id, item?.ven_id);
          closeMenu();
        }}
      >
        Reject
      </MenuItem>
      <MenuItem
        onClick={() => {
          closeMenu();
          handleOpen();
        }}
      >
        Negotiation
      </MenuItem>
    </Menu>
  );

  const columns = [
    { Header: "Vender Name", accessor: "venderName" },
    // { Header: "Complete Info", accessor: "completeinfo" },
    // { Header: "Address", accessor: "address" },
    { Header: "Phone", accessor: "phoneNum", align: "center" },
    { Header: "Category", accessor: "category" },
    { Header: "Product Price", accessor: "product price" },
    { Header: "Vendor Price", accessor: "price", align: "center" },
    { Header: "Details ", accessor: "description", align: "center" },
    { Header: "Delivery Date", accessor: "date", align: "center" },
    { Header: "Action", accessor: "Approve", align: "center" },
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
        <MDBox color="text" px={4}>
          <Icon
            sx={{ cursor: "pointer", fontWeight: "light" }}
            fontSize="medium"
            onClick={(e) => {
              openMenu(e.target);
              setItem(item);
            }}
          >
            more_vert
          </Icon>
          {renderMenu}
          <Modal open={open} onClose={handleClose}>
            <MDBox
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                // bgcolor: "background.paper",
                backgroundColor: "#0b0614",
                opacity: 1,
                boxShadow: 24,
                border: "2px solid black",
                p: 2,
                py: 3,
                borderRadius: "7px",
              }}
            >
              <MDBox display="flex" justifyContent="space-between" alignItems="center">
                <MDTypography variant="h6" color="white">
                  Send the Negotiation price to the vendor
                </MDTypography>
                <DisabledByDefaultIcon
                  fontSize="large"
                  onClick={handleClose}
                  sx={{
                    borderRadius: 50,
                    color: "#1A73E8",
                    cursor: "pointer",
                  }}
                />
              </MDBox>

              <MDTypography sx={{ mt: 2 }} color="white">
                <MDInput
                  type="number"
                  placeholder="price"
                  value={negotiateValue}
                  onChange={(e) => {
                    setNegotiateValue(e.target.value);
                  }}
                ></MDInput>
              </MDTypography>
              <MDBox sx={{ mt: 2.5 }}>
                <MDButton
                  color="info"
                  onClick={() => {
                    negotiateVendor(_id);
                  }}
                >
                  {isLoadingSend === true ? (
                    <CircularProgress
                      variant="indeterminate"
                      disableShrink
                      sx={{
                        color: (theme) => (theme.palette.mode === "light" ? "#fcfffe" : "#fcfffe"),
                        animationDuration: "550ms",

                        [`& .${circularProgressClasses.circle}`]: {
                          strokeLinecap: "round",
                        },
                      }}
                      size={25}
                      thickness={5}
                    />
                  ) : (
                    "Send"
                  )}
                </MDButton>
              </MDBox>
            </MDBox>
          </Modal>
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
                <MDTypography color="white">Task Vendors</MDTypography>
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
                <>
                  {allVendorTask.length === 0 ? (
                    <MDBox sx={{ display: "flex", justifyContent: "center", margin: "20px" }}>
                      <MDTypography sx={{ fontWeight: 700, fontSize: "24px" }}>
                        No Vendor found
                      </MDTypography>
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
                </>
              )}
              {/* )} */}
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default QualityTaskVendors;
