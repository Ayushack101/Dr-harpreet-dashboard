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
import { Card, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import UserData from "layouts/buyproducts/data/ProductData";
import React, { useState, useEffect } from "react";
import axios from "axios";
import MDButton from "components/MDButton";
import { useAuthContext } from "context/Auth/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress, { circularProgressClasses } from "@mui/material/CircularProgress";
import MDInput from "components/MDInput";
import { useNavigate } from "react-router-dom";
import SelectVendor from "./components/SelectVendor";

function BuyProduct() {
  const BASE_URL = process.env.REACT_APP_API_URL;
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [allProduct, setAllProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCategoryName, setSelectedCategoryName] = useState("");
  const [activeComponent, setActiveComponent] = useState("buy-product");
  const [productData, setProductData] = useState("");

  const [productRange, setProductRange] = useState({});
  const [description, setDescription] = useState({});

  const fetchCategory = async () => {
    try {
      const resp = await axios.get(`${BASE_URL}/inventory/all/category`, {
        headers: {
          Authorization: user?.token,
        },
      });
      console.log(resp);
      if (resp.data.success === true) {
        setCategory(resp.data.data);
        setSelectedCategory(resp.data.data[0]._id);
        setSelectedCategoryName(resp.data.data[0].categoryName);
        console.log(resp.data.data[0]._id);
        fetchProductByCategory(resp.data.data[0]._id);
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

  const handleCategoryChange = async (e) => {
    const selectedCategoryId = e.target.value;

    const selectedCategory = category.find((category) => category._id === selectedCategoryId);

    if (selectedCategory) {
      setSelectedCategory(selectedCategoryId);
      setSelectedCategoryName(selectedCategory.categoryName);
      fetchProductByCategory(e.target.value);
    }
  };

  const fetchProductByCategory = async (id) => {
    try {
      setLoading(true);
      const resp = await axios.get(`${BASE_URL}/invetry/all/product`, {
        params: {
          id: id,
        },
        headers: {
          Authorization: user?.token,
        },
      });
      console.log(resp);
      if (resp.data.success === false) {
        return;
      }
      if (resp.data.success === true) {
        const initialData = {};
        setLoading(false);
        setAllProducts(resp.data.data);
        resp?.data?.data.forEach((item) => {
          initialData[item?._id] = "";
        });
        setProductRange({ inputValues: initialData });
        setDescription({ inputValues: initialData });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCategory();
  }, []);

  const buyProduct = (_id) => {
    const inputValue = productRange.inputValues[_id];
    const inputValue1 = description.inputValues[_id];
    if (inputValue === "") {
      toast.warn(`Error occured, Quantity is required`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    if (inputValue1 === "") {
      toast.warn(`Error occured, Description is required`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    const productData = {
      product_id: _id,
      quantity: inputValue,
      description: inputValue1,
    };
    setProductData(productData);
    setActiveComponent("select-vendor");
  };

  const handleInputChange = (_id, value) => {
    setProductRange((prevState) => ({
      ...prevState,
      inputValues: {
        ...prevState.inputValues,
        [_id]: value,
      },
    }));
  };
  const handleInputChange2 = (_id, value) => {
    setDescription((prevState) => ({
      ...prevState,
      inputValues: {
        ...prevState.inputValues,
        [_id]: value,
      },
    }));
  };

  const columns = [
    { Header: "ProductName", accessor: "ProductName" },
    { Header: "Price", accessor: "Price" },
    { Header: "Product Description", accessor: "descriptionP" },
    { Header: "Category", accessor: "Category" },
    { Header: "Quantity", accessor: "Range", align: "center" },
    { Header: "Description", accessor: "description", align: "center" },
    { Header: "Action", accessor: "BuyProduct", align: "center" },
  ];

  const rows = allProduct.map((item) => {
    return {
      ProductName: (
        <MDBox display="flex" alignItems="center" lineHeight={1}>
          <MDBox ml={0} lineHeight={1}>
            <MDTypography display="block" variant="button" fontWeight="medium">
              {item?.productName}
            </MDTypography>
          </MDBox>
        </MDBox>
      ),
      Price: (
        <MDBox display="flex" alignItems="center" lineHeight={1}>
          <MDBox ml={0} lineHeight={1}>
            <MDTypography display="block" variant="button" fontWeight="medium">
              {item?.price}
            </MDTypography>
          </MDBox>
        </MDBox>
      ),
      descriptionP: (
        <MDBox display="flex" alignItems="center" lineHeight={1}>
          <MDBox ml={0} lineHeight={1} sx={{ width: "160px" }}>
            <MDTypography display="block" variant="button" fontWeight="medium">
              {item?.description}
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
      Range: (
        <MDBox display="flex" alignItems="center" lineHeight={1}>
          <MDBox ml={0} lineHeight={1} sx={{ width: "130px" }}>
            <MDTypography display="block" variant="button" fontWeight="medium">
              <form itemID={item?._id}>
                <MDInput
                  placeholder="Enter Quantity"
                  type="number"
                  value={productRange.inputValues[item?._id] || ""}
                  onChange={(e) => handleInputChange(item?._id, e.target.value)}
                ></MDInput>
              </form>
            </MDTypography>
          </MDBox>
        </MDBox>
      ),
      description: (
        <MDBox display="flex" alignItems="center" lineHeight={1}>
          <MDBox ml={0} lineHeight={1}>
            <MDTypography display="block" variant="button" fontWeight="medium">
              <form itemID={item?._id}>
                <MDInput
                  sx={{ width: "260px" }}
                  placeholder="Description"
                  type="text"
                  multiline
                  rows={3}
                  value={description.inputValues[item?._id] || ""}
                  onChange={(e) => handleInputChange2(item?._id, e.target.value)}
                ></MDInput>
              </form>
            </MDTypography>
          </MDBox>
        </MDBox>
      ),

      BuyProduct: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          <MDButton
            sx={{ width: "100px" }}
            color="info"
            onClick={() => {
              buyProduct(item?._id);
            }}
          >
            Vendors
          </MDButton>
        </MDTypography>
      ),
    };
  });

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ToastContainer />
      {activeComponent === "buy-product" ? (
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
                  <MDTypography color="white">Buy Products</MDTypography>
                </MDBox>
                <Grid item xs={12} md={6} lg={3}>
                  <MDBox mx={2} px={2} pt={3}>
                    <FormControl variant="standard" sx={{ mt: 0 }} style={{ width: "100%" }}>
                      <InputLabel
                        id="demo-simple-select-standard-label"
                        sx={{ mt: -2, fontSize: "14px" }}
                      >
                        <MDTypography sx={{ fontSize: "14px", fontWeight: "500" }} color="text">
                          Category
                        </MDTypography>
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        label="category"
                        value={selectedCategory}
                        onChange={(e) => {
                          handleCategoryChange(e);
                        }}
                      >
                        {category?.map((category, i) => {
                          return (
                            <MenuItem value={category?._id} key={i}>
                              <MDTypography sx={{ fontSize: "14px" }} color="text">
                                {category?.categoryName}
                              </MDTypography>
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={5}>
                  <MDBox mx={2} px={2}>
                    <MDTypography fontWeight="bold" style={{ fontSize: "16px", marginTop: "7px" }}>
                      selected Category : <em>{selectedCategoryName}</em>
                    </MDTypography>
                  </MDBox>
                </Grid>
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
      ) : (
        ""
      )}

      {activeComponent === "select-vendor" ? <SelectVendor productData={productData} /> : ""}
    </DashboardLayout>
  );
}

export default BuyProduct;
