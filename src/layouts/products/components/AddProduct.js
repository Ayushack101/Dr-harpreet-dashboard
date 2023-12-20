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

const AddProduct = () => {
  const BASE_URL = process.env.REACT_APP_API_URL;
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
      const resp = await axios.get(`${BASE_URL}/all/category`, {
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
    const productData = {
      category: data.category,
      description: data.productDescription,
      productName: data.productName,
    };
    console.log(productData);
    try {
      const resp = await axios.post(
        `${BASE_URL}/create/product`,
        {
          ...productData,
        },
        {
          headers: {
            Authorization: user?.token,
          },
        }
      );
      console.log(resp);
      if (resp.data.success === true) {
        toast.success(`Success, ${resp.data.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setTimeout(() => {
          navigate("/admin/allproduct");
        }, 700);
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
    <DashboardLayout>
      <DashboardNavbar />
      <ToastContainer />
      <MDBox mt={{ xs: 4, lg: 8 }} mb={4} px={1} width="calc(100% - 2rem)" mx="auto">
        <Grid container spacing={1} justifyContent="center">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={8}>
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
                  Add New Product
                </MDTypography>
              </MDBox>
              <MDBox pt={4} pb={3} px={3}>
                <MDBox component="form" role="form" onSubmit={handleSubmit(onSubmit)}>
                  <Grid container spacing={5}>
                    <Grid item xs={12}>
                      <MDTypography variant="h4" color="dark">
                        Product Information
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <MDBox>
                        <MDInput
                          type="text"
                          label="Product Name"
                          variant="standard"
                          fullWidth
                          {...register("productName", {
                            required: "Product Name is required",
                          })}
                        />
                        <MDTypography color="error" fontWeight="bold" style={{ fontSize: "16px" }}>
                          {errors?.productName?.message}
                        </MDTypography>
                      </MDBox>
                    </Grid>
                    {/* <Grid item xs={12} lg={6}>
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
                    </Grid> */}
                    <Grid item xs={12} lg={6}>
                      <MDBox>
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

                    <Grid item xs={12}>
                      <MDBox sx={{ display: "flex", justifyContent: "space-between" }}>
                        <MDButton
                          type="submit"
                          variant="gradient"
                          color="info"
                          onClick={() => {
                            navigate("/admin/allproduct");
                          }}
                        >
                          Back
                        </MDButton>
                        <MDButton type="submit" variant="gradient" color="info">
                          Save
                        </MDButton>
                      </MDBox>
                    </Grid>
                  </Grid>
                </MDBox>
              </MDBox>

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
};

export default AddProduct;
