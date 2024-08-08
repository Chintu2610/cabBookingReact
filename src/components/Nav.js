import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { CgMenu, CgClose } from "react-icons/cg";

const Nav = ({role}) => {
  console.log("in Nav.js"+role.userRole);
  const [menuIcon, setMenuIcon] = useState(false);
 
  const navigate = useNavigate();
  const handleLogout = () => {
    const uuId = sessionStorage.getItem("uuid");
    if (uuId) {
      console.log(uuId);
      // Check if uuid exists in local storage
      const url = `http://localhost:1995/Userlogin/logout?uuid=${uuId}`;

      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            sessionStorage.removeItem("currUserId");
            sessionStorage.removeItem("uuid");
            sessionStorage.removeItem("currRole");
            sessionStorage.removeItem("currStatus");
            sessionStorage.removeItem("userName");
            sessionStorage.removeItem("email");
           

            
            navigate("/login"); // Redirect to login page
          } else if (response.status === 401) {
            alert("Invalid uuid. Please try again.");
            navigate("/login"); // Redirect to login page
          } else {
            alert("An unexpected error occurred. Please try again later.");
            navigate("/login"); // Redirect to login page
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  useEffect(() => {
    // Retrieve user role from local storage or API
    // const role = sessionStorage.getItem("currRole");
    // setUserRole(role);
  }, []);
  const Nav = styled.nav`
    .navbar-lists {
      display: flex;
      gap: 4.8rem;
      align-items: center;

      .navbar-link {
        &:link,
        &:visited {
          display: inline-block;
          text-decoration: none;
          font-size: 1.8rem;
          font-weight: 500;
          text-transform: uppercase;
          color: ${({ theme }) => theme.colors.black};
          transition: color 0.3s linear;
        }

        &:hover,
        &:active {
          color: ${({ theme }) => theme.colors.helper};
        }
      }
    }

    .mobile-navbar-btn {
      display: none;
      background-color: transparent;
      cursor: pointer;
      border: none;
    }

    .mobile-nav-icon[name="close-outline"] {
      display: none;
    }

    .close-outline {
      display: none;
    }

    .cart-trolley--link {
      position: relative;

      .cart-trolley {
        position: relative;
        font-size: 3.2rem;
      }

      .cart-total--item {
        width: 2.4rem;
        height: 2.4rem;
        position: absolute;
        background-color: #000;
        color: #000;
        border-radius: 50%;
        display: grid;
        place-items: center;
        top: -20%;
        left: 70%;
        background-color: ${({ theme }) => theme.colors.helper};
      }
    }

    .user-login--name {
      text-transform: capitalize;
    }

    .user-logout,
    .user-login {
      font-size: 1.4rem;
      padding: 0.8rem 1.4rem;
    }

    @media (max-width: ${({ theme }) => theme.media.mobile}) {
      .mobile-navbar-btn {
        display: inline-block;
        z-index: 9999;
        border: ${({ theme }) => theme.colors.black};

        .mobile-nav-icon {
          font-size: 4.2rem;
          color: ${({ theme }) => theme.colors.black};
        }
      }

      .active .mobile-nav-icon {
        display: none;
        font-size: 4.2rem;
        position: absolute;
        top: 30%;
        right: 10%;
        color: ${({ theme }) => theme.colors.black};
        z-index: 9999;
      }

      .active .close-outline {
        display: inline-block;
      }

      .navbar-lists {
        width: 100vw;
        height: 100vh;
        position: absolute;
        top: 0;
        left: 0;
        background-color: #fff;

        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        visibility: hidden;
        opacity: 0;
        transform: translateX(100%);
        /* transform-origin: top; */
        transition: all 3s linear;
      }

      .active .navbar-lists {
        visibility: visible;
        opacity: 1;
        transform: translateX(0);
        z-index: 999;
        transform-origin: right;
        transition: all 3s linear;

        .navbar-link {
          font-size: 4.2rem;
        }
      }
      .cart-trolley--link {
        position: relative;

        .cart-trolley {
          position: relative;
          font-size: 5.2rem;
        }

        .cart-total--item {
          width: 4.2rem;
          height: 4.2rem;
          font-size: 2rem;
        }
      }

      .user-logout,
      .user-login {
        font-size: 2.2rem;
        padding: 0.8rem 1.4rem;
      }
    }
  `;

  return (
    <Nav>
      <div className={menuIcon ? "navbar active" : "navbar"}>
        <ul className="navbar-lists">
          <li>
            <NavLink
              to="/"
              className="navbar-link"
              onClick={() => setMenuIcon(false)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className="navbar-link"
              onClick={() => setMenuIcon(false)}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className="navbar-link"
              onClick={() => setMenuIcon(false)}
            >
              Cabs
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className="navbar-link"
              onClick={() => setMenuIcon(false)}
            >
              Contact
            </NavLink>
          </li>
          {role.userRole === "Admin" && (
            <>
              <li>
                <NavLink
                  to="/admin-dashboard"
                  className="navbar-link"
                  onClick={() => setMenuIcon(false)}
                >
                  Dashboard
                </NavLink>
              </li>
             
              <li>
                <NavLink
                  className="navbar-link"
                  onClick={() => {
                    setMenuIcon(false);
                    handleLogout(); // Call handleLogout function
                  }}
                >
                  LogOut
                </NavLink>
              </li>
            </>
          )}
          {(role.userRole === "Customer") && (
            <>
              <li>
                <NavLink
                  to="/customer-dashboard"
                  className="navbar-link"
                  onClick={() => setMenuIcon(false)}
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/customer-orders"
                  className="navbar-link"
                  onClick={() => setMenuIcon(false)}
                >
                  My Bookings
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="navbar-link"
                  onClick={() => {
                    setMenuIcon(false);
                    handleLogout(); // Call handleLogout function
                  }}
                >
                  LogOut
                </NavLink>
              </li>
            </>
          )}
          {!role.userRole && (
            <li>
              <NavLink
                to="/login"
                className="navbar-link"
                onClick={() => setMenuIcon(false)}
              >
                Login
              </NavLink>
            </li>
          )}
        </ul>

       
      </div>
    </Nav>
  );
};

export default Nav;
