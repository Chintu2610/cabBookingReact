import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
import { useState } from "react";

export function DriverRegister() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

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
          userRole: "Driver",
          licenceNo: "",
          rating: 0,
          gender: "",
          currLocation: "",
          currDriverStatus: "",
        }}
        onSubmit={async (values) => {
          try {
            const response = await fetch(
              "http://localhost:1995/driver/register",
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
              navigate("/drivers");
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
            .min(4, "Minimum length should be 4")
            .max(10, "Length should not exceed 10"),
            mobileNumber: yup
            .string() // Ensures the input is treated as a string
            .required("Mobile number is required") // Makes the field mandatory
            .matches(/^\d{10}$/, "Please enter a valid 10-digit mobile number"), // Validates exactly 10 digits
            email: yup
            .string()
            .required("Email is required")
            .email("Invalid email format"),
          address: yup.string().required("Address is required"),
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
            age: yup
            .number()
            .required("Age is required")
            .positive("Age must be a positive number")
            .integer("Age must be an integer")
            .min(18, "Age must be greater than or equal to 18")
          ,

          licenceNo: yup.string().required("licence is required"),
          gender: yup.string().required("please provide Gender"),
          currLocation: yup.string().required("please provide a valid location."),
          currDriverStatus: yup.string().nonNullable().required("status is required."),
        })}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="container" style={{ marginTop: "100px" }}>
              <div className="row justify-content-center">
                <div className="col-md-5">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="text-center mb-4">Register Driver</h5>
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
                      <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                          Password
                        </label>
                        <div className="input-group">
                          <Field
                            type={showPassword ? "text" : "password"} // Toggle between password and text
                            name="password"
                            className="form-control"
                          />
                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
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
                           maxLength="10"
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
                        <label htmlFor="age" className="form-label">
                          Age
                        </label>
                        <Field
                          type="number"
                          name="age"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="age"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="gender" className="form-label">
                          Gender
                        </label>
                        <Field
                          name="gender"
                          as="select"
                          className="form-control"
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Others">Others</option>
                        </Field>
                        <ErrorMessage
                          name="gender"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="licence" className="form-label">
                          Licence Number
                        </label>
                        <Field
                          type="text"
                          name="licenceNo"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="licenceNo"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                          Current Location
                        </label>
                        <Field
                          type="text"
                          name="currLocation"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="currLocation"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="status" className="form-label">
                          Driver Status
                        </label>
                        <Field
                          name="currDriverStatus"
                          as="select"
                          className="form-control"
                        >
                          <option value="">Select status</option>
                          <option value="Available">Active</option>
                          <option value="Not Available">Inactive</option>
                          
                        </Field>
                        <ErrorMessage
                          name="currDriverStatus"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary form-control"
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
