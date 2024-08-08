import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer'

const WithFooter = ({ showFooter }) => {
  return (
    <>
      <Outlet />
      {showFooter && <Footer />}
    </>
  );
};

export default WithFooter;
