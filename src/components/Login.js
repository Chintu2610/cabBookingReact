import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useCaptcha } from "../components/custom-hooks/captcha";
import { useSentenseCase } from "./custom-hooks/changeCase";
import { Field } from "formik";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { BASE_URL } from "../config"; // Adjust path based on file location

const Login = () => {
  let code = useCaptcha();
  let title = useSentenseCase("user LoGiN");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = { email, password };

    try {
      const response = await fetch(`${BASE_URL}/Userlogin/Login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        removeCookie("currUserId");
        removeCookie("uuid");
        removeCookie("currRole");
        removeCookie("currStatus");
        removeCookie("userName");
        removeCookie("email");

        setCookie("currUserId", data.currUserId, {
          expires: new Date("2025-05-06"),
        });
        setCookie("uuid", data.uuid, { expires: new Date("2025-05-06") });
        setCookie("currRole", data.currRole, {
          expires: new Date("2025-05-06"),
        });
        setCookie("currStatus", data.currStatus, {
          expires: new Date("2025-05-06"),
        });
        setCookie("userName", data.userName, {
          expires: new Date("2025-05-06"),
        });
        setCookie("email", data.email, { expires: new Date("2025-05-06") });
        switch (data.currRole) {
          case "Admin":
            navigate("/admin-dashboard"); // Redirect to dashboard
            window.location.reload();
            break;
          case "Customer":
            navigate("/cabs"); // Redirect to dashboard
            window.location.reload();
            break;
          case "Driver":
            navigate("/driver-dashboard"); // Redirect to dashboard
            window.location.reload();
            break;
          case "Vendor":
            navigate("/vendor-dashboard"); // Redirect to dashboard
            window.location.reload();
            break;
          default:
            navigate("/login"); // Redirect to login if role is unknown

            break;
        }
      } else if (response.status === 401) {
        setError("Invalid email or password. Please try again.");
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container" style={{ marginTop: "15rem" }}>
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card">
            <div className="card-body">
              <h3 className="text-center mb-4">Welcome Back! Please Log In</h3>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label fs-5">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label fs-5">
                    Password
                  </label>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />

                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
                {error && (
                  <div className="alert alert-danger mt-3">{error}</div>
                )}
                <button type="submit" className="btn btn-primary w-100 fs-5">
                  Login
                </button>
              </form>
              <div className="row mt-3">
                <div className="d-flex justify-content-between align-items-center my-4">
                  <div className="col text-start fs-5">
                    <Link
                      className="btn btn-outline-danger px-4 py-2"
                      to="/forgot-password"
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  <div className="col text-end fs-5">
                    <Link
                      className="btn btn-outline-success px-4 py-2"
                      to="/register"
                    >
                      Register
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
