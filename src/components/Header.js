import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Nav from "./Nav";

const Header = ({currentRole}) => {
  console.log("in Header.js"+currentRole.userRole);
 
  return (
    <MainHeader>
      <NavLink to="/">
        <img src="./images/logo.png" alt="my logo img" className="logo" />
      </NavLink>
      <Nav role={{ "userRole": currentRole.userRole }}/>
    </MainHeader>
  );
};

const MainHeader = styled.header`
  padding: 0 4.8rem;
  position: fixed;
  top: 0; /* Ensures the header stays at the top */
  left: 0; /* Ensures the header stretches across the full width */
  width: 100%; /* Ensures the header stretches across the full width */
  height: 10rem;
  background-color: ${({ theme }) => theme.colors.bg};
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000; /* Ensures the header is above other content */

  .logo {
    height: 5rem;
  }
`;

export default Header;
