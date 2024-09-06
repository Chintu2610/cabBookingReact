import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

export function VendorUpdate() {
  const params = useParams();
  const [cookie] = useCookies();
  const navigate = useNavigate();
  const [vendorDetails, setvendorDetails] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility

  useEffect(() => {
    const fetchvendorDetails = async () => {
      try {
        const response = await axios.get(
          `http://185.199.52.133:1996/vendor/viewVendor/${params.vendorId}?uuid=${cookie.uuid}`
        );
        if (response) {
          setvendorDetails(response.data);
        } else {
          alert("Failed to fetch driver details. Please try again.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchvendorDetails();
  }, [params.driverId, cookie.uuid]);

  if (!vendorDetails) {
    return <div>Loading...</div>; // Show a loading indicator while data is being fetched
  }

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="container" style={{ marginTop: "100px" }}>
      <Formik
        initialValues={{
            adminId: vendorDetails.adminId || "",
          userName: vendorDetails.userName || "",
          address: vendorDetails.address || "",
          mobileNumber: vendorDetails.mobileNumber || "",
          email: vendorDetails.email || "",
          password: vendorDetails.password || "",
          
          licenceNo: vendorDetails.licenceNo || "",
          rating: vendorDetails.rating || 0,
          currLocation: vendorDetails.currLocation || "",
          currDriverStatus: vendorDetails.currDriverStatus || "",
        }}
        enableReinitialize={true} // Reinitialize form values when `vendorDetails` changes
        onSubmit={async (values) => {
          try {
            const response = await axios.put(
              "http://185.199.52.133:1996/vendor/update",
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
              alert("Vendor updated successfully.");
              navigate("/vendors");
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
         
        })}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="container" style={{ marginTop: "100px" }}>
              <div className="row justify-content-center">
                <div className="col-md-5">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="text-center mb-4">Update Vendor</h5>

                      <div className="mb-3">
                        <label htmlFor="vendorId" className="form-label">
                          Vendor ID
                        </label>
                        <Field
                          type="text"
                          name="adminId"
                          className="form-control"
                          readOnly
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
                      <div className="text-center">
                        <button
                          type="submit"
                          className="btn btn-primary"
                          disabled={isSubmitting}
                        >
                          Update Vendor
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
