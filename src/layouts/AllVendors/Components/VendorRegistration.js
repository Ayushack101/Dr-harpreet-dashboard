import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React from "react";
import {
  Button,
  Card,
  CircularProgress,
  FormControl,
  Grid,
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
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import authorsTableData from "layouts/tables/data/authorsTableData";
import UserData from "layouts/products/data/ProductData";
import { useEffect, useState } from "react";
import axios from "axios";
import MDButton from "components/MDButton";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "context/Auth/AuthContext";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MDInput from "components/MDInput";
import { useForm } from "react-hook-form";

import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import PageLayout from "examples/LayoutContainers/PageLayout";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
const VendorRegistration = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [category, setCategory] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const fetchCategory = async () => {
    try {
      const resp = await axios.get("http://localhost:3000/alls/category", {
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
    const vendorData = {
      category: data.category,
      price: data.price,
      description: data.productDescription,
      productName: data.vendorName,
    };
    console.log(vendorData);
    // try {
    //   const resp = await axios.post("http://localhost:3000/create/product", {
    //     ...productData,
    //   });
    //   console.log(resp);
    //   if (resp.data.success === true) {
    //     toast.success(`Success, ${resp.data.message}`, {
    //       position: toast.POSITION.TOP_RIGHT,
    //     });
    //     setTimeout(() => {
    //       navigate("/admin/allproduct");
    //     }, 700);
    //   }
    //   if (resp.data.success === false) {
    //     toast.warn(`Error, ${resp.data.message}`, {
    //       position: toast.POSITION.TOP_RIGHT,
    //     });
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
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
                          type="number"
                          label="Product Price"
                          variant="standard"
                          fullWidth
                          {...register("price", {
                            required: "Product price is required!",
                          })}
                        />
                        <MDTypography color="error" fontWeight="bold" style={{ fontSize: "16px" }}>
                          {errors?.price?.message}
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
                        <FormControl variant="standard" sx={{ mt: 0 }} style={{ width: "100%" }}>
                          <InputLabel
                            id="demo-multiple-checkbox-label"
                            sx={{ mt: -2, fontSize: "14px" }}
                          >
                            <MDTypography sx={{ fontSize: "14px", fontWeight: "500" }} color="text">
                              Category
                            </MDTypography>
                          </InputLabel>
                          <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            // multiple
                            {...register("category", { required: "Category is required" })}
                            label="category"
                          >
                            <MenuItem value="" disabled>
                              <em>Category</em>
                            </MenuItem>
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
                        <MDTypography color="error" fontWeight="bold" style={{ fontSize: "16px" }}>
                          {errors?.category?.message}
                        </MDTypography>
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
