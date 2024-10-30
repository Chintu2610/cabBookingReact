import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Nav from "./Nav";

const Header = ({ currentRole }) => {
  return (
    <MainHeader>
      <NavLink to="/">
        <img src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="my logo img" className="logo" />
      </NavLink>
      <Nav role={{ "userRole": currentRole.userRole }} />
    </MainHeader>
  );
};

const MainHeader = styled.header`
  padding: 0 4.8rem;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 10rem;
  background-color: ${({ theme }) => theme.colors.bg};
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;

  .logo {
    height: 5rem;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    padding: 0 2.4rem;
    
    .logo {
      height: 4rem; /* Adjusted logo size for mobile */
    }
  }
`;

export default Header;
