import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useCookies } from 'react-cookie';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Nav = ({ role }) => {
  const [cookies, , removeCookie] = useCookies();
  const navigate = useNavigate();

  const handleLogout = () => {
    const uuId = cookies.uuid;
    if (uuId) {
      console.log(uuId);
      const url = `http://localhost:1995/Userlogin/logout?uuid=${uuId}`;

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
    </Nav>
  );
};

export default Nav;
