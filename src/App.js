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

import { useState, useEffect, useMemo } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation, Router } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Material Dashboard 2 React themes
import theme from "assets/theme";
// import themeRTL from "assets/theme/theme-rtl";

// Material Dashboard 2 React Dark Mode themes
import themeDark from "assets/theme-dark";
// import themeDarkRTL from "assets/theme-dark/theme-rtl";

// RTL plugins
// import rtlPlugin from "stylis-plugin-rtl";
// import { CacheProvider } from "@emotion/react";
// import createCache from "@emotion/cache";

// Material Dashboard 2 React routes
import routes from "routes";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";

// Images
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import Profile from "layouts/profile";
import Product from "layouts/products";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import BuyProduct from "layouts/buyproducts";
import { useAuthContext } from "context/Auth/AuthContext";
import Overview from "layouts/products";
import Alluser from "layouts/profile";
import Quality from "layouts/quality";
import Accounts from "layouts/accounts";
import Guards from "layouts/guards";
import InventoryTask from "layouts/InventoryTask";
import Task from "layouts/Task";
import QualityDashboard from "layouts/QualityDashboard";
import GuardDashboard from "layouts/GuardDashboard";
import AccountDashboard from "layouts/AccountDashboard";
import AddProduct from "layouts/products/components/AddProduct";
import { ProtectedRouteAdmin } from "layouts/authentication/protectedroutes";
import { ProtectedRouteQuality } from "layouts/authentication/protectedroutes";
import { ProtectedRouteAccount } from "layouts/authentication/protectedroutes";
import { ProtectedRouteStore } from "layouts/authentication/protectedroutes";
import { ProtectedRouteGuard } from "layouts/authentication/protectedroutes";
import AllVendors from "layouts/AllVendors";
import CreateVendor from "layouts/AllVendors/Components/CreateVendor";
import VendorRegistration from "layouts/AllVendors/Components/VendorRegistration";
import VendorProductAccess from "layouts/VendorProductAccess/VendorProductAccess";
import QualityTaskVendors from "layouts/QualityDashboard/QualityTaskVendors";
import SelectedVendor from "layouts/QualityDashboard/SelectedVendor";
import SelectVendor from "layouts/buyproducts/components/SelectVendor";

export default function App() {
  // const { user, authDispatch } = useAuthContext();
  const user = JSON.parse(localStorage.getItem("Credentials"));

  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  // const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();

  // Cache for the rtl
  // useMemo(() => {
  //   const cacheRtl = createCache({
  //     key: "rtl",
  //     stylisPlugins: [rtlPlugin],
  //   });

  //   setRtlCache(cacheRtl);
  // }, []);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  // const getRoutes = (allRoutes) =>
  //   allRoutes.map((route) => {
  //     if (route.collapse) {
  //       return getRoutes(route.collapse);
  //     }

  //     if (route.route) {
  //       return <Route exact path={route.route} element={route.component} key={route.key} />;
  //     }

  //     return null;
  //   });

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );

  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
            brandName="Dr Harpreet"
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
          {configsButton}
        </>
      )}
      {layout === "vr" && <Configurator />}
      <Routes>
        <Route path="/" element={<SignIn />}></Route>
        {/* Sign up */}
        {user?.user ? (
          <Route path="/authentication/sign-up" element={<Navigate to="/" />}></Route>
        ) : (
          <Route path="/authentication/sign-up" element={<SignUp />}></Route>
        )}
        {/* Admin route */}
        <Route element={<ProtectedRouteAdmin />}>
          <Route path="/admin/alltask" element={<Task />}></Route>
          <Route path="/admin/alluser" element={<Alluser />}></Route>
          <Route path="/admin/allproduct" element={<Overview />}></Route>
          <Route path="/admin/addproduct" element={<AddProduct />}></Route>
          <Route path="/admin/inventory" element={<Dashboard />}></Route>
          <Route path="/admin/accounts" element={<Accounts />}></Route>
          <Route path="/admin/quality" element={<Quality />}></Route>
          <Route path="/admin/guards" element={<Guards />}></Route>
        </Route>

        {/* Account dashboard */}
        <Route element={<ProtectedRouteAccount />}>
          <Route path="account/dashboard/account" element={<AccountDashboard />} />
        </Route>

        {/* Inventory dashboard */}
        <Route element={<ProtectedRouteStore />}>
          <Route path="/store/dashboard/buyproduct" element={<BuyProduct />}></Route>
          <Route
            path="/store/dashboard/buyproduct/selectvendors"
            element={<SelectVendor />}
          ></Route>
          <Route path="/store/dashboard/allvendors" element={<AllVendors />}></Route>
          <Route path="/store/dashboard/create-vendors" element={<CreateVendor />}></Route>
          <Route path="/store/dashboard/inventorytask" element={<InventoryTask />}></Route>
        </Route>

        {/* Guard dashboard */}
        <Route element={<ProtectedRouteGuard />}>
          <Route path="/dashboard/guard" element={<GuardDashboard />} />
        </Route>

        {/* Quality dashboard */}
        <Route element={<ProtectedRouteQuality />}>
          <Route path="quality/dashboard/qualitytask" element={<QualityDashboard />} />
          <Route
            path="quality/dashboard/taskvendors/:ser_no/:_id"
            element={<QualityTaskVendors />}
          />
          <Route
            path="quality/dashboard/approvedvendor/:ser_no/:selectedVender"
            element={<SelectedVendor />}
          />
        </Route>

        {/* Vendor registration form */}
        <Route path="/vendor/registration/form/:val" element={<VendorRegistration />}></Route>

        {/* Vendor product access */}
        <Route path="/vendor/product/access/:ser_no/:id" element={<VendorProductAccess />}></Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </ThemeProvider>
  );

  // direction === "rtl" ? (
  //   <CacheProvider value={rtlCache}>
  //     <ThemeProvider theme={darkMode ? themeDarkRTL : themeRTL}>
  //       <CssBaseline />
  //       {layout === "dashboard" && (
  //         <>
  //           <Sidenav
  //             color={sidenavColor}
  //             brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
  //             brandName="Dr Harpreet"
  //             routes={routes}
  //             onMouseEnter={handleOnMouseEnter}
  //             onMouseLeave={handleOnMouseLeave}
  //           />
  //           <Configurator />
  //           {configsButton}
  //         </>
  //       )}
  //       {layout === "vr" && <Configurator />}
  //       <Routes>
  //         {getRoutes(routes)}
  //         <Route path="*" element={<Navigate to="/dashboard" />} />
  //       </Routes>
  //     </ThemeProvider>
  //   </CacheProvider>
  // ) : (
  //   <ThemeProvider theme={darkMode ? themeDark : theme}>
  //     <CssBaseline />
  //     {layout === "dashboard" && (
  //       <>
  //         <Sidenav
  //           color={sidenavColor}
  //           brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
  //           brandName="Dr Harpreet"
  //           routes={routes}
  //           onMouseEnter={handleOnMouseEnter}
  //           onMouseLeave={handleOnMouseLeave}
  //         />
  //         <Configurator />
  //         {configsButton}
  //       </>
  //     )}
  //     {layout === "vr" && <Configurator />}
  //     <Routes>
  //       <Route path="/inventory" element={<Dashboard />}></Route>
  //       <Route path="/accounts" element={<Tables />}></Route>
  //       <Route path="/quality" element={<Billing />}></Route>
  //       <Route path="/guards" element={<Billing />}></Route>
  //       <Route path="/orderplacement" element={<Billing />}></Route>
  //       <Route path="/alluser" element={<Profile />}></Route>
  //       <Route path="/allproduct" element={<Product />}></Route>
  //       <Route path="/alluser" element={<Profile />}></Route>
  //       <Route path="/authentication/sign-in" element={<SignIn />}></Route>
  //       <Route path="/authentication/sign-up" element={<SignUp />}></Route>
  //       <Route path="*" element={<Navigate to="/inventory" />} />
  //     </Routes>
  //   </ThemeProvider>
  // );
}
