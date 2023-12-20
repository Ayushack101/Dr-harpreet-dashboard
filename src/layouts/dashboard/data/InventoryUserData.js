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

import React, { useEffect, useState } from "react";
import axios from "axios";
import MDButton from "components/MDButton";
import { useAuthContext } from "context/Auth/AuthContext";

export default function data() {
  const BASE_URL = process.env.REACT_APP_API_URL;
  const [allUsers, setAllUsers] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState("");
  const { user } = useAuthContext();
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const resp = await axios.get(`${BASE_URL}/inventry/user`, {
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

  const deleteUser = async (_id) => {
    try {
      const resp = await axios.post(
        `${BASE_URL}/delete`,
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
        toast.success(`Success, ${resp.data.message}!`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setDeleteMessage(resp.data.message);
        fetchUsers();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
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

  return {
    deleteMessage,
    isLoading,
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
                deleteUser(item?._id);
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
