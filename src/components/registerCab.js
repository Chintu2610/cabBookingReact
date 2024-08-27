import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { useCookies } from "react-cookie";


export function CabRegister() {
  const navigate = useNavigate();
  const [cookies, ] = useCookies();
  useEffect(() => {
    if (!cookies.uuid) {
      navigate("/login");
    }
  }, [cookies.uuid, navigate]);
  var redirect="";
  if(cookies.currRole==="Driver"){
   redirect="/driver-dashboard";
  }else if(cookies.currRole==="Admin")
  {
    redirect="/admin-dashboard";
  }else if(cookies.currRole==="Customer")
    {
      redirect="/";
    }else
    {
    redirect="/vendor-dashboard";
  }

  return (
    <div className="container" style={{ marginTop: "100px" }}>
      <Formik
        initialValues={{
          carType: "",
          carName: "",
          modelName:"",
          carNumber: "",
          perKmRate: "",
          currLocation: "",
          cabCurrStatus: "",
          cabImage: null,
          area:"",
          manufacturingYear:"",
          email:cookies.email,
        }}
        onSubmit={async (values) => {
          try {
            // Create a FormData object
            const formData = new FormData();
            formData.append("carType", values.carType);
            formData.append("carName", values.carName);
            formData.append("carNumber", values.carNumber);
            formData.append("modelName",values.modelName);
            formData.append("perKmRate", values.perKmRate);
            formData.append("currLocation", values.currLocation);
            formData.append("cabCurrStatus", values.cabCurrStatus);
            formData.append("area", values.area);
            formData.append("manufacturingYear",values.manufacturingYear);
            formData.append("email",values.email);
            if (values.cabImage) {
              formData.append("file", values.cabImage); // Append the file
            }

            const response = await fetch("http://localhost:1995/cab/register", {
              method: "POST",
              body: formData,
            });

            if (response.ok) {
              alert("Cab registration successful!");
              navigate("/cabs");
            } else {
              alert("Registration failed. Please try again.");
            }
          } catch (error) {
            console.error("Error:", error);
          }
        }}
        validationSchema={yup.object({
          carType: yup.string().required("Car type is required"),
          carName: yup.string().required("Brand name is required"),
          modelName:yup.string().required("Model Name is required"),
          carNumber: yup.string().required("Car number is required"),
          perKmRate: yup
            .number()
            .required("Per km rate is required")
            .positive("Rate must be a positive number")
            .typeError("Rate must be a number"),
            manufacturingYear: yup
            .number()
            .required("Manufacturing Year is required")
            .positive("Manufacturing Year must be a positive number")
            .integer("Manufacturing Year must be an integer")
            .test(
              "len",
              "Please enter a valid manufacturing year (yyyy)",
              (val) => val && val.toString().length === 4
            )
          
           
            ,
            
          currLocation: yup.string().required("Current location is required"),
          area: yup.string().required("Current area is required"),
          cabCurrStatus: yup
            .string()
            .required("Cab status is required"),
            
          cabImage: yup
            .mixed()
            .required("Cab image is required")
            .test("fileSize", "The file is too large", (value) => {
              return !value || (value && value.size <= 2 * 1024 * 1024); // 2MB
            }),

        })}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <div className="container" style={{ marginTop: "100px" }}>
            <div className="col-12">
                    <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item"><a href={redirect}>Home</a></li>
                        <li className="breadcrumb-item active">Register Cab</li>
                    </ol>
                </div>
              <div className="row justify-content-center">
                <div className="col-md-5">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="text-center mb-4">Register Cab</h5>
                      <div className="mb-3">
                        <label htmlFor="carType" className="form-label fs-5">
                          Car Type
                        </label>
                        <Field
                          name="carType"
                          as="select"
                          className="form-control"
                        >
                          <option value="">Select Car Type</option>
                          <option value="Sedan">Sedan</option>
                          <option value="SUV">SUV</option>
                          <option value="Hatchback">Hatchback</option>
                          <option value="Coupe">Coupe</option>
                          <option value="Convertible">Convertible</option>
                          <option value="Minivan">Minivan</option>
                          <option value="Pickup Truck">Pickup Truck</option>
                          <option value="Luxury">Luxury</option>
                          <option value="Electric">Electric</option>
                          <option value="Hybrid">Hybrid</option>
                          <option value="Wagon">Wagon</option>
                          <option value="Van">Van</option>
                        </Field>
                        <ErrorMessage
                          name="carType"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="carName" className="form-label fs-5">
                          Brand Name
                        </label>
                        <Field
                          type="text"
                          name="carName"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="carName"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="modelName" className="form-label fs-5">
                          Model Name
                        </label>
                        <Field
                          type="text"
                          name="modelName"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="modelName"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="carNumber" className="form-label fs-5">
                          Car Number
                        </label>
                        <Field
                          type="text"
                          name="carNumber"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="carNumber"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="perKmRate" className="form-label fs-5">
                          Per Km Rate
                        </label>
                        <Field
                          type="number"
                          name="perKmRate"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="perKmRate"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="manufacturingYear" className="form-label fs-5">
                          Manufacturing Year
                        </label>
                        <Field
                          type="number"
                          name="manufacturingYear"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="manufacturingYear"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="currLocation" className="form-label fs-5">
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
                        <label htmlFor="area" className="form-label fs-5">
                          Area
                        </label>
                        <Field
                          type="text"
                          name="area"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="area"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="cabCurrStatus" className="form-label fs-5">
                          Cab Status
                        </label>
                        <Field
                          name="cabCurrStatus"
                          as="select"
                          className="form-control"
                        >
                          <option value="">Select status</option>
                          <option value="Available">Active</option>
                          <option value="Not Available">Inactive</option>
                        </Field>
                        <ErrorMessage
                          name="cabCurrStatus"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="mb-3">
                      <label htmlFor="cabCurrStatus" className="form-label fs-5">
                         Owner Email
                        </label>
                       <Field
                         type="email"
                         name="email"
                         className="form-control"
                         readOnly={cookies.currRole !== 'Admin'}
                       />
                       <ErrorMessage
                         name="email"
                         component="div"
                         className="text-danger"
                       />
                     </div>
                      <div className="mb-3">
                        <label htmlFor="cabImage" className="form-label fs-5">
                          Cab Image
                        </label>
                        <input
                          type="file"
                          name="cabImage"
                          className="form-control"
                          onChange={(event) => {
                            setFieldValue(
                              "cabImage",
                              event.currentTarget.files[0]
                            );
                          }}
                        />
                        <ErrorMessage
                          name="cabImage"
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
