import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCookies } from "react-cookie";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import the eye icons
import { BASE_URL } from "../config"; // Adjust path based on file location
import styled from "styled-components";

export function VendorRegister() {
  const navigate = useNavigate();
  const [cookie] = useCookies();
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="container" style={{ marginTop: "100px" }}>
      <Formik
        initialValues={{
          userName: "",
          age: 0,
          address: "",
          mobileNumber: "",
          email: "",
          password: "",
          confirmPassword: "",
          userRole: "Vendor",
          gender: "",
        }}
        onSubmit={async (values) => {
          try {
            const response = await fetch(
              `${BASE_URL}/admin/register/${cookie.currRole}`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
              }
            );

            if (response.ok) {
              alert("Registration successful!");
              navigate("/admin-dashboard");
            } else {
              alert("Registration failed. Please try again.");
            }
          } catch (error) {
            console.error("Error:", error);
          }
        }}
        validationSchema={yup.object({
          userName: yup
            .string()
            .required("Username is required")
            .min(4, "Minimum length should be 4"),

          firstName: yup.string().required("Username is required"),
          lastName: yup.string().required("Username is required"),
          mobileNumber: yup
            .string() // Use .string() since Mobile is a text input
            .required("Mobile number is required"),
          email: yup
            .string()
            .required("Email is required")
            .email("Invalid email format")
            .matches(
              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              "Email must include a valid domain"
            )
            .matches(/\.com$/, "Email must end with .com"), // Ensure it ends with .com
          address: yup.string().required("Address is required"),
          userRole: yup.string(),
          gender: yup.string().required("Gender is required"),
          password: yup
            .string()
            .required("Password is required")
            .min(8, "Password must be at least 8 characters")
            .matches(
              /[A-Z]/,
              "Password must contain at least one uppercase letter"
            )
            .matches(
              /[a-z]/,
              "Password must contain at least one lowercase letter"
            )
            .matches(/[0-9]/, "Password must contain at least one digit")
            .matches(
              /[\W_]/,
              "Password must contain at least one special character"
            ),
          confirmPassword: yup
            .string()
            .required("Confirm Password is required")
            .oneOf([yup.ref("password"), null], "Passwords must match"),
        })}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="container" style={{ marginTop: "150px" }}>
              <div className="row justify-content-center">
                <div className="col-md-5">
                  <div className="card">
                    <div className="card-body">
                      <StyledHeader>
                        <h4 className="text-center mb-4">
                          Vendor Registration
                        </h4>
                        <h5 className="text-center mb-4">
                          Be your own boss with UrbanWheels
                        </h5>
                      </StyledHeader>
                      <div className="mb-3 align-items-center">
                        <label
                          htmlFor="userName"
                          className="form-label fs-4 fw-bold text-dark"
                        >
                          User Name
                        </label>
                        <Field
                          type="text"
                          name="userName"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="userName"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="mb-3 align-items-center">
                        <label
                          htmlFor="userName"
                          className="form-label fs-4 fw-bold text-dark"
                        >
                          First Name
                        </label>
                        <Field
                          type="text"
                          name="firstName"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="firstName"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="mb-3 align-items-center">
                        <label
                          htmlFor="userName"
                          className="form-label fs-4 fw-bold text-dark"
                        >
                          Last Name
                        </label>
                        <Field
                          type="text"
                          name="lastName"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="lastName"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="password"
                          className="form-label fs-4 fw-bold text-dark"
                        >
                          Password
                        </label>
                        <div className="input-group">
                          <Field
                            type={showPassword ? "text" : "password"}
                            name="password"
                            className="form-control"
                          />
                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={togglePasswordVisibility}
                          >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="confirmPassword"
                          className="form-label fs-4 fw-bold text-dark"
                        >
                          Confirm Password
                        </label>
                        <div className="input-group">
                          <Field
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            className="form-control"
                          />
                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={toggleConfirmPasswordVisibility}
                          >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>
                        <ErrorMessage
                          name="confirmPassword"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="address"
                          className="form-label fs-4 fw-bold text-dark"
                        >
                          Address
                        </label>
                        <Field
                          type="text"
                          name="address"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="address"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="mobileNumber"
                          className="form-label fs-4 fw-bold text-dark"
                        >
                          Mobile
                        </label>
                        <Field
                          type="text"
                          name="mobileNumber"
                          className="form-control"
                          maxLength="10"
                          pattern="\d*"
                        />
                        <ErrorMessage
                          name="mobileNumber"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="email"
                          className="form-label fs-4 fw-bold text-dark"
                        >
                          Email
                        </label>
                        <Field
                          type="email"
                          name="email"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="cabCurrStatus"
                          className="form-label fs-4 fw-bold text-dark"
                        >
                          Gender
                        </label>
                        <Field
                          name="gender"
                          as="select"
                          className="form-control"
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="others">Others</option>
                        </Field>
                        <ErrorMessage
                          name="gender"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="mb-3">
                        <Field
                          type="text"
                          name="userRole"
                          className="form-control"
                          style={{ display: "none" }}
                        />
                        <ErrorMessage
                          name="userRole"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary form-control"
                        style={{ backgroundColor: "blue" }}
                        disabled={isSubmitting}
                      >
                        Register
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
const StyledHeader = styled.div`
  h4 {
    font-size: 2.4rem;
    font-weight: 700;
    color: #2d2d2d;
    margin-bottom: 1.5rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    text-align: center;
  }

  h5 {
    font-size: 1.8rem;
    font-weight: 500;
    color: #5a5a5a;
    margin-bottom: 2rem;
    text-align: center;
    font-style: italic;
  }
`;

export default StyledHeader;
