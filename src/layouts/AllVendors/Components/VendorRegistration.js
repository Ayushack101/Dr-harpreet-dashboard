import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React from "react";
import {
  Button,
  Card,
  Checkbox,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
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
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import authorsTableData from "layouts/tables/data/authorsTableData";
import UserData from "layouts/products/data/ProductData";
import { useEffect, useState } from "react";
import axios from "axios";
import MDButton from "components/MDButton";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "context/Auth/AuthContext";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MDInput from "components/MDInput";
import { useForm } from "react-hook-form";

import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import PageLayout from "examples/LayoutContainers/PageLayout";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const VendorRegistration = () => {
  const BASE_URL = process.env.REACT_APP_API_URL;
  const { val } = useParams();
  const { user } = useAuthContext();
  const [category, setCategory] = useState([]);
  const [personName, setPersonName] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const fetchCategory = async () => {
    try {
      const resp = await axios.get(`${BASE_URL}/alls/category`, {
        headers: {
          Authorization: user?.token,
        },
      });
      console.log(resp);
      if (resp.data.success === true) {
        setCategory(resp.data.data);
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

  useEffect(() => {
    fetchCategory();
  }, []);

  const onSubmit = async (data) => {
    if (personName.length === 0) {
      toast.warn(`Error, Please select the category`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    const vendorData = {
      category: personName,
      email: data.email,
      phoneNum: data.phone,
      address: data.address,
      val,
      completeinfo: data.productDescription,
      venderName: data.vendorName,
    };
    console.log(vendorData);
    try {
      const resp = await axios.post(`${BASE_URL}/post/email/form`, {
        ...vendorData,
      });
      console.log(resp);
      if (resp.data.success === true) {
        toast.success(`Success, ${resp.data.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        // setTimeout(() => {
        //   navigate("/admin/allproduct");
        // }, 700);
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
  return (
    <PageLayout>
      <DefaultNavbar
        action={{
          type: "external",
          route: "https://creative-tim.com/product/material-dashboard-react",
          label: "",
          color: "dark",
        }}
      />
      <MDBox
        // position="absolute"
        width="100%"
        height="100%"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            bgImage &&
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <MDBox px={1} width="100%" height="100%" mx="auto" mt={17}>
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
          <Grid item xs={11} sm={9} md={6} lg={5}>
            <ToastContainer />
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
                <MDTypography variant="h5" color="white">
                  Vendor Registration form
                </MDTypography>
              </MDBox>
              <MDBox pt={3} pb={3} px={3}>
                <MDBox component="form" role="form" onSubmit={handleSubmit(onSubmit)}>
                  <Grid container spacing={4}>
                    <Grid item xs={12}>
                      <MDTypography variant="h4" color="dark">
                        Vendor Information
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <MDBox>
                        <MDInput
                          type="text"
                          label="Vendor Name"
                          variant="standard"
                          fullWidth
                          {...register("vendorName", {
                            required: "Vendor Name is required",
                          })}
                        />
                        <MDTypography color="error" fontWeight="bold" style={{ fontSize: "16px" }}>
                          {errors?.vendorName?.message}
                        </MDTypography>
                      </MDBox>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <MDBox>
                        <MDInput
                          type="email"
                          label="Email"
                          // rows={4}
                          variant="standard"
                          // multiline
                          fullWidth
                          {...register("email", {
                            required: "Email is required",
                          })}
                        />
                        <MDTypography color="error" fontWeight="bold" style={{ fontSize: "16px" }}>
                          {errors?.email?.message}
                        </MDTypography>
                      </MDBox>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <MDBox>
                        <MDInput
                          type="text"
                          label="address"
                          variant="standard"
                          fullWidth
                          {...register("address", {
                            required: "address is required!",
                          })}
                        />
                        <MDTypography color="error" fontWeight="bold" style={{ fontSize: "16px" }}>
                          {errors?.address?.message}
                        </MDTypography>
                      </MDBox>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <MDBox>
                        <MDInput
                          type="number"
                          label="phone number"
                          variant="standard"
                          fullWidth
                          {...register("phone", {
                            required: "phone number is required!",
                          })}
                        />
                        <MDTypography color="error" fontWeight="bold" style={{ fontSize: "16px" }}>
                          {errors?.phone?.message}
                        </MDTypography>
                      </MDBox>
                    </Grid>

                    <Grid item xs={12} lg={6}>
                      <MDBox>
                        <MDInput
                          type="text"
                          label="Description (optional)"
                          rows={4}
                          multiline
                          fullWidth
                          {...register("productDescription", {
                            required: "Product Description is required",
                          })}
                        />
                        <MDTypography color="error" fontWeight="bold" style={{ fontSize: "16px" }}>
                          {errors?.productDescription?.message}
                        </MDTypography>
                      </MDBox>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <MDBox>
                        <FormControl sx={{ m: 0 }} style={{ width: "100%" }}>
                          <InputLabel id="demo-multiple-checkbox-label" sx={{ fontSize: "14px" }}>
                            Category
                          </InputLabel>
                          <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            fullWidth
                            value={personName}
                            onChange={handleChange}
                            input={<OutlinedInput label="Category" />}
                            renderValue={(selected) => selected.join(", ")}
                            MenuProps={MenuProps}
                            sx={{ p: 2 }}
                          >
                            {category.map((category, i) => (
                              <MenuItem
                                key={i}
                                value={category?.categoryName}
                                sx={{ p: 0, fontSize: "14px" }}
                              >
                                <Checkbox
                                  checked={personName.indexOf(category?.categoryName) > -1}
                                />
                                <ListItemText
                                  primary={category?.categoryName}
                                  sx={{ p: 0, fontSize: "14px" }}
                                />
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        {/* <MDTypography color="error" fontWeight="bold" style={{ fontSize: "16px" }}>
                          {errors?.category?.message}
                        </MDTypography> */}
                      </MDBox>
                    </Grid>

                    <Grid item xs={12}>
                      <MDButton type="submit" variant="gradient" color="info" fullWidth>
                        Submit
                      </MDButton>
                    </Grid>
                  </Grid>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      {/* <Footer light /> */}
    </PageLayout>
  );
};

export default VendorRegistration;
