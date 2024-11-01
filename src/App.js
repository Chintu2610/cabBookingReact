import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './About';
import Home from './Home';
import { HashRouter as Router } from 'react-router-dom';

import Contact from './Contact';
import Cart from './Cart';
import SingleProduct from './SingleProduct';
import ErrorPage from './ErrorPage';
import { GlobalStyle } from './GlobalStyle';
import { ThemeProvider } from 'styled-components';
import Header from './components/Header';
import Login from './components/Login';
import Dashboard from './components/AdminDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import BookingHistory from './components/bookingHistory';
import Users from './components/users';
import FormicDemo from './components/formic-demo/formic-demo';
import YupDemo from './components/YUP_Eemo/YUP';
import { FormikComponent } from './components/formik-component/formik-component';
import { UserRegister } from './components/UserRegister';
import Drivers from './components/drivers';
import { DriverRegister } from './components/registerDriver';
import WithFooter from './components/WithFooter';
import { CabRegister } from './components/registerCab';
import Cabs from './Cabs';
import BookingPage from './components/BookingPage';
import { useCookies } from 'react-cookie';

import ResetPassword from './components/forgot-password';
import EnterOTP from './components/EnterOTP';
import PasswordReset from './components/PasswordReset';

import AdminProfile from './components/Profile';

import ContextDemo from './components/context-demo/context-demo';
import { ReducerDemo } from './components/reducerDemo/reducer-demo';
import { DriverUpdate } from './components/updateDriver';
import { CabUpdate } from './components/updateCab';
import BookingHistoryCustomer from './components/bookingHistory-customer';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {  VendorRegister } from './components/vendorRegister';
import Vendors from './components/vendors';
import { VendorUpdate } from './components/updateVendor';
import VendorDashboard from './components/VendorDashBoard';
import DriverDashboard from './components/DriverDashboard';
import SubmitRating from './components/SubmitRating';
import Ratings from './components/Ratings';
import Earnings from './components/Earnings';
import SubmitReport from './components/submitReport.js';
import Reports from './components/Reports.js';
import { UpdateReport } from './components/updateReport.js';


const App = () => {
  const theme = {
    colors: {
      heading: 'rgb(24 24 29)',
      text: 'rgba(29 ,29, 29, .8)',
      white: '#fff',
      black: ' #212529',
      helper: '#8490ff',
      bg: '#F6F8FA',
      footer_bg: '#0a1435',
      btn: 'rgb(98 84 243)',
      border: 'rgba(98, 84, 243, 0.5)',
      hr: '#ffffff',
      gradient: 'linear-gradient(0deg, rgb(132 144 255) 0%, rgb(98 189 252) 100%)',
      shadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;',
      shadowSupport: ' rgba(0, 0, 0, 0.16) 0px 1px 4px',
    },
    media: {
      mobile: '768px',
      tab: '998px',
    },
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const[cookies,setCookie,removeCookie]=useCookies();
  useEffect(() => {
    const uuid = sessionStorage.getItem('uuid');
    setIsLoggedIn(!!uuid);
    const role = cookies.currRole;
    setUserRole(role);
    console.log("in app.js"+userRole);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <GlobalStyle />
        <Header currentRole={{"userRole":userRole}} />
        <div style={{marginTop:'100px'}}>
        <Routes>
          <Route path="/urbanwheels" element={Home}></Route>
          <Route path="/" element={<WithFooter showFooter={true} />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="/updatedriver/:driverId" element={<DriverUpdate />} />
            <Route path="/updateVendor/:vendorId" element={<VendorUpdate />} />
            <Route path="/updatecab/:cabId" element={<CabUpdate />} />
            <Route path="contextdemo" element={<ContextDemo />} />
            <Route path="reducerdemo" element={<ReducerDemo />} />
            <Route path="cabs" element={<Cabs />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<Login />} />
            <Route path="forgot-password" element={<ResetPassword />} />
            <Route path="PasswordReset" element={<PasswordReset />} />
            <Route path="/profile" element={<AdminProfile />} />
            
            <Route path="EnterOTP" element={<EnterOTP />} />
           
            <Route path="singleproduct/:id" element={<SingleProduct />} />
            <Route path="cart" element={<Cart />} />
            <Route path="register" element={<UserRegister />} />
            <Route path="/register-vendor" element={<VendorRegister />} />
            <Route path="formiK-demo" element={<FormicDemo />} />
            <Route path="yup-demo" element={<YupDemo />} />
            <Route path="formik-component" element={<FormikComponent />} />
            <Route path="/booking/:cabId" element={<BookingPage />} />
          </Route>
          <Route path="/admin-dashboard" element={<WithFooter showFooter={false} />}>
            <Route index element={<Dashboard />} />
          </Route>
          <Route path="/vendor-dashboard" element={<WithFooter showFooter={false} />}>
            <Route index element={<VendorDashboard />} />
          </Route>
          <Route path="/reports" element={<WithFooter showFooter={false} />}>
            <Route index element={<Reports />} />
          </Route>
          <Route path="/driver-dashboard" element={<WithFooter showFooter={false} />}>
            <Route index element={<DriverDashboard />} />
          </Route>
          <Route path="/booking-history" element={<WithFooter showFooter={false} />}>
            <Route index element={<BookingHistory />} />
          </Route>
          <Route path="/submit-rating" element={<WithFooter showFooter={false} />}>
            <Route index element={<SubmitRating />} />
          </Route>
          <Route path="/submit-report" element={<WithFooter showFooter={false} />}>
            <Route index element={<SubmitReport />} />
          </Route>
          <Route path="/earnings" element={<WithFooter showFooter={false} />}>
          <Route  index element={<Earnings />} />
          </Route>
          <Route path="/update-report/:reportId" element={<WithFooter showFooter={false} />}>
          <Route  index element={<UpdateReport />} />
          </Route>
          <Route path="/booking-history-customer" element={<WithFooter showFooter={false} />}>
            <Route index element={<BookingHistoryCustomer />} />
          </Route>
          <Route path="/users" element={<WithFooter showFooter={false} />}>
            <Route index element={<Users />} />
          </Route>
          <Route path="/ratings" element={<WithFooter showFooter={false} />}>
            <Route index element={<Ratings />} />
          </Route>
          <Route path="/drivers" element={<WithFooter showFooter={false} />}>
            <Route index element={<Drivers />} />
          </Route>
          <Route path="/vendors" element={<WithFooter showFooter={false} />}>
            <Route index element={<Vendors />} />
          </Route>
          <Route path="/registerDriver" element={<WithFooter showFooter={false} />}>
            <Route index element={<DriverRegister />} />
          </Route>
          <Route path="/registerCab" element={<WithFooter showFooter={false} />}>
            <Route index element={<CabRegister />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
