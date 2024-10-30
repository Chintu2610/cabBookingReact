import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { useCookies } from "react-cookie";
import { BASE_URL } from "../config"; // Adjust path based on file location
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export function UserRegister() {
  const navigate = useNavigate();
  const [cookie] = useCookies();
  const [showPassword, setShowPassword] = useState(false);
  const [showWarning, setShowWarning] = useState(true);
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
          firstName: "",
          lastName: "",
          gender: "",
        }}
        onSubmit={async (values) => {
          try {
            debugger;
            const response = await fetch(`${BASE_URL}/customer/register`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values),
            });

            if (response.ok) {
              alert("Registration successful!");
              navigate("/login");
            } else {
              alert("Email is already used. Please try with new email.");
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
          firstName: yup.string().required("firstName is required"),

          lastName: yup.string().required("lastName is required"),

          mobileNumber: yup
            .string() // Use .string() since Mobile is a text input
            .required("Mobile number is required")
            .min(10, "please enter valid 10 digit mobile.")
            .max(10, "please enter valid 10 digit mobile."),
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
        })}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="container" style={{ marginTop: "100px" }}>
              <div className="row justify-content-center">
                <div className="col-md-5">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="text-center mb-4">Join Our Community</h5>
                      <div className="mb-3 align-items-center">
                        <label htmlFor="userName" className="form-label">
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
                        <label htmlFor="firstName" className="form-label">
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
                        <label htmlFor="lastName" className="form-label">
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
                        <label htmlFor="password" className="form-label">
                          Password
                        </label>
                        <div className="input-group">
                          <Field
                            type={showPassword ? "text" : "password"}
                            name="password"
                            className="form-control"
                            onFocus={() => setShowWarning(false)} // Hide warning on focus
                          />
                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                          >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>
                        {/* Initial warning message about password format */}
                        {showWarning && (
                          <div className="text-warning">
                            Password must contain at least 8 characters,
                            including uppercase, lowercase, and special
                            characters.
                          </div>
                        )}
                        {/* Error message shown if password validation fails */}
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="text-danger mt-2" // Adds spacing below the input field
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="address" className="form-label">
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
                        <label htmlFor="mobileNumber" className="form-label">
                          Mobile
                        </label>
                        <Field
                          type="text"
                          name="mobileNumber"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="mobileNumber"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">
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
                          className="form-label fs-5"
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
                      <button
                        type="submit"
                        className="btn btn-primary form-control"
                        //  disabled={isSubmitting}
                      >
                        Register
                      </button>
                      <div className="mt-3 ml-5">
                        <a href="/login">Already have an account? Log In</a>
                      </div>
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
