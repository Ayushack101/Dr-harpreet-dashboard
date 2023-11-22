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
import { useAuthContext } from "context/Auth/AuthContext";

export default function data() {
  const [allUsers, setAllUsers] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const resp = await axios.get("http://localhost:3000/allUser", {
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

  const changeUserType = async (_id) => {
    try {
      const resp = await axios.put(
        "http://localhost:3000/convert/inventry",
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
        return;
      }
      if (resp.data.success === true) {
        navigate("/inventory");
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
  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        {/* <MDTypography variant="caption">{email}</MDTypography> */}
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
      { Header: "author", accessor: "author" },
      { Header: "email", accessor: "email" },
      // { Header: "status", accessor: "status", align: "center" },
      { Header: "userType", accessor: "userType", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],
    rows: allUsers.map((item) => {
      return {
        author: <Author name={item?.userName} email={item?.email} />,
        email: <Email email={item?.email} />,
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
                changeUserType(item?._id);
              }}
            >
              Convert inventory
            </MDButton>
          </MDTypography>
        ),
      };
    }),
  };
}
