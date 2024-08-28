import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

export function DriverUpdate() {
  const params = useParams();
  const [cookie] = useCookies();
  const navigate = useNavigate();
  const [driverDetails, setDriverDetails] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility

  useEffect(() => {
    const fetchDriverDetails = async () => {
      try {
        const response = await axios.get(
          `http://13.60.224.153:1995/driver/viewDriver?driverId=${params.driverId}&uuid=${cookie.uuid}`
        );
        if (response) {
          setDriverDetails(response.data);
        } else {
          alert("Failed to fetch driver details. Please try again.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchDriverDetails();
  }, [params.driverId, cookie.uuid]);

  if (!driverDetails) {
    return <div>Loading...</div>; // Show a loading indicator while data is being fetched
  }

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="container" style={{ marginTop: "100px" }}>
      <Formik
        initialValues={{
          driverId: driverDetails.driverId || "",
          userName: driverDetails.userName || "",
          address: driverDetails.address || "",
          mobileNumber: driverDetails.mobileNumber || "",
          email: driverDetails.email || "",
          password: driverDetails.password || "",
          userRole: "Driver",
          licenceNo: driverDetails.licenceNo || "",
          rating: driverDetails.rating || 0,
          currLocation: driverDetails.currLocation || "",
          currDriverStatus: driverDetails.currDriverStatus || "",
        }}
        enableReinitialize={true} // Reinitialize form values when `driverDetails` changes
        onSubmit={async (values) => {
          try {
            const response = await axios.put(
              `http://13.60.224.153:1995/driver/update?driverId=${values.driverId}`,
              values,
              {
                params:{
                    uuid:cookie.uuid
                },
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            if (response.status === 200) {
              alert("Driver updated successfully.");
              navigate("/drivers");
            } else {
              alert("Update failed. Please try again.");
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
            .string()
            .required("Mobile number is required")
            .matches(/^\d{10}$/, "Please enter a valid 10-digit mobile number"),
          email: yup
            .string()
            .required("Email is required")
            .email("Invalid email format"),
          address: yup.string().required("Address is required"),
          password: yup
            .string()
            .required("Password is required")
            .min(8, "Password must be at least 8 characters")
            .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
            .matches(/[a-z]/, "Password must contain at least one lowercase letter")
            .matches(/[0-9]/, "Password must contain at least one digit")
            .matches(/[\W_]/, "Password must contain at least one special character"),
          licenceNo: yup.string().required("Licence number is required"),
          currLocation: yup.string().required("Please provide a valid location."),
          currDriverStatus: yup.string().required("Status is required."),
        })}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="container" style={{ marginTop: "100px" }}>
              <div className="row justify-content-center">
                <div className="col-md-5">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="text-center mb-4">Update Driver</h5>

                      <div className="mb-3">
                        <label htmlFor="driverId" className="form-label">
                          Driver ID
                        </label>
                        <Field
                          type="text"
                          name="driverId"
                          className="form-control"
                          disabled
                        />
                      </div>

                      <div className="mb-3">
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
                            type={showPassword ? "text" : "password"}
                            name="password"
                            className="form-control"
                            id="password"
                          />
                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={togglePasswordVisibility}
                          >
                            <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
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
                        <label htmlFor="licenceNo" className="form-label">
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
                        <label htmlFor="currLocation" className="form-label">
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
                        <label htmlFor="currDriverStatus" className="form-label">
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

                      <div className="text-center">
                        <button
                          type="submit"
                          className="btn btn-primary"
                          disabled={isSubmitting}
                        >
                          Update Driver
                        </button>
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
