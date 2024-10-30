import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useCookies } from 'react-cookie';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BASE_URL } from '../config'; // Adjust path based on file location
import { FiMenu, FiX } from "react-icons/fi"; 
const Nav = ({ role }) => {
  const [cookies, , removeCookie] = useCookies();
  const navigate = useNavigate();

  const handleLogout = () => {
    const uuId = cookies.uuid;
    if (uuId) {
      console.log(uuId);
      const url = `${BASE_URL}/Userlogin/logout?uuid=${uuId}`;

      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            removeCookie("currUserId");
            removeCookie("uuid");
            removeCookie("currRole");
            removeCookie("currStatus");
            removeCookie("userName");
            removeCookie("email");
            navigate("/login"); // Redirect to login page
            window.location.reload();
          } else if (response.status === 401) {
            alert("Invalid uuid. Please try again.");
            navigate("/login"); // Redirect to login page
            window.location.reload();
          } else {
            alert("An unexpected error occurred. Please try again later.");
            navigate("/login"); // Redirect to login page
            window.location.reload();
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const [menuIcon, setMenuIcon] = useState(false);

  const NavContainer = styled.nav`
    .navbar-lists {
      display: flex;
      gap: 4.8rem;
      align-items: center;

      .navbar-link {
        &:link,
        &:visited {
          text-decoration: none;
          font-size: 1.8rem;
          font-weight: 500;
          color: ${({ theme }) => theme.colors.black};
        }
        &:hover {
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

    .mobile-nav-icon {
      font-size: 3rem;
      color: ${({ theme }) => theme.colors.black};
    }

    @media (max-width: ${({ theme }) => theme.media.mobile}) {
      .mobile-navbar-btn {
        display: inline-block;
        z-index: 9999;
      }

      .navbar-lists {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 2rem;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background-color: ${({ theme }) => theme.colors.bg};
        visibility: ${menuIcon ? "visible" : "hidden"};
        opacity: ${menuIcon ? "1" : "0"};
        transform: translateX(${menuIcon ? "0" : "100%"});
        transition: all 0.3s ease-in-out;
      }
    }
  `;

  return (
    <NavContainer>
      <div className={menuIcon ? "navbar active" : "navbar"}>
      <button className="mobile-navbar-btn" onClick={() => setMenuIcon(!menuIcon)}>
          {menuIcon ? <FiX className="mobile-nav-icon" /> : <FiMenu className="mobile-nav-icon" />}
        </button>
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
              to="/cabs"
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
                <Dropdown>
                  <Dropdown.Toggle
                    variant="link"
                    id="dropdown-custom-components"
                    className="navbar-link"
                  >
                    <i className="bi bi-gear fs-5"></i>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      as={NavLink}
                      to="/profile"
                      onClick={() => setMenuIcon(false)}
                    >
                      Profile
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        setMenuIcon(false);
                        handleLogout(); // Call handleLogout function
                      }}
                    >
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            </>
          )}
           {role.userRole === "Vendor" && (
            <>
              <li>
                <NavLink
                  to="/vendor-dashboard"
                  className="navbar-link"
                  onClick={() => setMenuIcon(false)}
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <Dropdown>
                  <Dropdown.Toggle
                    variant="link"
                    id="dropdown-custom-components"
                    className="navbar-link"
                  >
                    <i className="bi bi-gear fs-5"></i>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      as={NavLink}
                      to="/profile"
                      onClick={() => setMenuIcon(false)}
                    >
                      Profile
                    </Dropdown.Item>
                    <Dropdown.Item
                      as={NavLink}
                      to={`/PasswordReset`}
                      onClick={() => setMenuIcon(false)}
                    >
                      Reset password
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        setMenuIcon(false);
                        handleLogout(); // Call handleLogout function
                      }}
                    >
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            </>
          )}
           {role.userRole === "Driver" && (
            <>
              <li>
               <NavLink
                  to="/driver-dashboard"
                  className="navbar-link"
                  onClick={() => setMenuIcon(false)}
                >
                  Dashboard
                </NavLink>
                </li>
              <li>
                <Dropdown>
                  <Dropdown.Toggle
                    variant="link"
                    id="dropdown-custom-components"
                    className="navbar-link"
                  >
                    <i className="bi bi-gear fs-5"></i>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      as={NavLink}
                      to="/profile"
                      onClick={() => setMenuIcon(false)}
                    >
                      Profile
                    </Dropdown.Item>
                    <Dropdown.Item
                      as={NavLink}
                      to={`/PasswordReset`}
                      onClick={() => setMenuIcon(false)}
                    >
                      Reset password
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        setMenuIcon(false);
                        handleLogout(); // Call handleLogout function
                      }}
                    >
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            </>
          )}
          {role.userRole === "Customer" && (
            <>
            <li>
                <NavLink
                  to="/booking-history-customer"
                  className="navbar-link"
                  onClick={() => setMenuIcon(false)}
                >
                  My Bookings
                </NavLink>
              </li>
              <li>
                <Dropdown>
                  <Dropdown.Toggle
                    variant="link"
                    id="dropdown-custom-components"
                    className="navbar-link"
                  >
                    <i className="bi bi-gear fs-5"></i>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      as={NavLink}
                      to="/profile"
                      onClick={() => setMenuIcon(false)}
                    >
                      Profile
                    </Dropdown.Item>
                    <Dropdown.Item
                      as={NavLink}
                      to={`/PasswordReset`}
                      onClick={() => setMenuIcon(false)}
                    >
                      Reset password
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        setMenuIcon(false);
                        handleLogout(); // Call handleLogout function
                      }}
                    >
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
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
    </NavContainer>
  );
};

export default Nav;
