/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

import React, { useEffect, useState } from "react";
import axios from "axios";
import MDButton from "components/MDButton";
import { useNavigate } from "react-router-dom";

export default function data() {
  const [allProduct, setAllProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const fetchProduct = async () => {
    try {
      setLoading(true);
      const resp = await axios.get("http://localhost:3000/allProducts");
      console.log(resp);
      if (resp.data.success === false) {
        return;
      }
      if (resp.data.success === true) {
        setLoading(false);
        setAllProducts(resp.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(allProduct);
  useEffect(() => {
    fetchProduct();
  }, []);

  const deleteProduct = async (_id) => {
    try {
      console.log("--www--", _id);

      console.log(resp);
      const resp = await axios.delete("http://localhost:3000/deleteProduct", {
        _id,
      });
      if (resp.data.success === false) {
        return;
      }
      if (resp.data.success === true) {
        navigate("/allproduct");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const Author = ({ image, name, email }) => (
  //   <MDBox display="flex" alignItems="center" lineHeight={1}>
  //     {/* <MDAvatar src={image} name={name} size="sm" /> */}
  //     <MDBox ml={2} lineHeight={1}>
  //       <MDTypography display="block" variant="button" fontWeight="medium">
  //         {name}
  //       </MDTypography>
  //       <MDTypography variant="caption">{email}</MDTypography>
  //     </MDBox>
  //   </MDBox>
  // );
  const ProductName = ({ image, productName, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {productName}
        </MDTypography>
        {/* <MDTypography variant="caption">{email}</MDTypography> */}
      </MDBox>
    </MDBox>
  );
  const Price = ({ price }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {price}
        </MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );
  // width: "45%", align: "left"
  return {
    columns: [
      { Header: "ProductName", accessor: "ProductName" },
      { Header: "Price", accessor: "Price" },
      // { Header: "status", accessor: "status", align: "center" },
      // { Header: "userType", accessor: "userType", align: "center" },
      { Header: "DeleteProduct", accessor: "DeleteProduct", align: "center" },
    ],
    rows: allProduct.map((item) => {
      return {
        // author: <Author name={item?.userName} email={item?.email} />,
        ProductName: <ProductName productName={item?.productName} />,
        Price: <Price price={item?.price} />,
        // userType: (
        //   <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        //     {item?.userType}
        //   </MDTypography>
        // ),
        DeleteProduct: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            <MDButton
              color="info"
              onClick={() => {
                deleteProduct(item?._id);
              }}
            >
              Delete
            </MDButton>
          </MDTypography>
        ),
      };
    }),
  };
}
