import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

export function CabUpdate() {
  const params = useParams();
  const [cookie] = useCookies();
  const navigate = useNavigate();
  const [cabDetails, setCabDetails] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // State for image preview
  const baseurl = "http://13.60.224.153:3000/images/cabImages/";
  useEffect(() => {
    const fetchCabDetails = async () => {
      try {
        const response = await axios.get(
          `http://13.60.224.153:1995/cab/getSingleCabDetails/${params.cabId}`
        );
        if (response.data) {
          setCabDetails(response.data);
          setImagePreview(`${baseurl}${response.data.cabImage}`);
        } else {
          alert("Failed to fetch cab details. Please try again.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while fetching the cab details.");
      }
    };
    fetchCabDetails();
  }, [params.cabId]);

  if (!cabDetails) {
    return <div>Loading...</div>; // Show a loading indicator while data is being fetched
  }

  return (
    <div className="container" style={{ marginTop: "100px" }}>
      <Formik
        initialValues={{
          cabId: cabDetails.cabId || "",
          carType: cabDetails.carType || "",
          carName: cabDetails.carName || "",
          modelName: cabDetails.modelName || "",
          carNumber: cabDetails.carNumber || "",
          perKmRate: cabDetails.perKmRate || "",
          area: cabDetails.area || "",
          manufacturingYear: cabDetails.manufacturingYear || "",
          currLocation: cabDetails.currLocation || "",
          cabCurrStatus: cabDetails.cabCurrStatus || "",
          carImage: cabDetails.cabImage,
        }}
        enableReinitialize={true} // Reinitialize form values when `cabDetails` changes
        onSubmit={async (values) => {
          try {
            // Creating a FormData object to handle the file upload
            const formData = new FormData();
            formData.append("cabId", values.cabId);
            formData.append("carType", values.carType);
            formData.append("carName", values.carName);
            formData.append("modelName", values.modelName);
            formData.append("carNumber", values.carNumber);
            formData.append("perKmRate", values.perKmRate);
            formData.append("currLocation", values.currLocation);
            formData.append("cabCurrStatus", values.cabCurrStatus);
            formData.append("area",values.area);
            formData.append("manufacturingYear",values.manufacturingYear);
            // If you want to add file upload, uncomment below line and ensure `carImage` is handled in your form
            if (values.carImage) {
              formData.append("carImage", values.carImage); // Assuming values.carImage is a file object
            }
            formData.append("uuid", cookie.uuid);

            const response = await axios.put(
              "http://13.60.224.153:1995/cab/update",
              formData, // Passing the form data
              {
                headers: {
                  "Content-Type": "multipart/form-data", // Required for file uploads
                },
              }
            );
            if (response.status === 200) {
              alert("Cab updated successfully.");
              navigate("/cabs");
            } else {
              alert("Update failed. Please try again.");
            }
          } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while updating the cab.");
          }
        }}
        validationSchema={yup.object({
          carType: yup.string().required("Car Type is required"),
          carName: yup.string().required("Car Name is required"),
          modelName: yup.string().required("Model Name is required"),
          carNumber: yup.string().required("Car Number is required"),
          perKmRate: yup
            .number()
            .required("Per Km Rate is required")
            .positive("Rate must be positive"),
          currLocation: yup
            .string()
            .required("Please provide a valid location."),
          cabCurrStatus: yup.string().required("Status is required."),
          carImage: yup.mixed().nullable().required("Image is required"),
          manufacturingYear:yup.string().required("manufacturingYear is required").matches(/^\d{4}$/, "Invalid year"),
        })}
      >
        {({ setFieldValue }) => (
          <Form>
            <div className="container" style={{ marginTop: "100px" }}>
              <div className="row justify-content-center">
                <div className="col-md-5">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="text-center mb-4">Update Cab</h5>

                      <div className="mb-3">
                        <label htmlFor="cabId" className="form-label">
                          Cab ID
                        </label>
                        <Field
                          type="text"
                          name="cabId"
                          className="form-control"
                          disabled
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="carType" className="form-label">
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
                        <label htmlFor="carName" className="form-label">
                          Car Name
                        </label>
                        <Field
                          type="text"
                          name="carName"
                          className="form-control"
                          id="carName"
                        />
                        <ErrorMessage
                          name="carName"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="modelName" className="form-label">
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
                        <label htmlFor="perKmRate" className="form-label">
                          Per Km Rate
                        </label>
                        <Field
                          type="text"
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
                        <label htmlFor="carNumber" className="form-label">
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
                        <label htmlFor="area" className="form-label">
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
                        <label
                          htmlFor="manufacturingYear"
                          className="form-label"
                        >
                          Manufacturing Year
                        </label>
                        <Field
                          type="text"
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
                        <label
                          htmlFor="currDriverStatus"
                          className="form-label"
                        >
                          Status
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
                        <label htmlFor="carImage" className="form-label">
                          Car Image
                        </label>
                        <input
                          type="file"
                          name="carImage"
                          accept="image/*"
                          className="form-control"
                          onChange={(event) => {
                            const file = event.currentTarget.files[0];
                            setFieldValue("carImage", file);
                            setImagePreview(URL.createObjectURL(file)); // Set image preview
                          }}
                        />
                        <ErrorMessage
                          name="carImage"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      {/* Display existing or new image preview */}
                      {imagePreview && (
                        <div className="mb-3 ">
                          <label className="form-label">Image Preview</label>
                          <img
                            src={imagePreview}
                            alt="Car Preview"
                            className="img-thumbnail"
                            style={{ maxHeight: "150px" }}
                          />
                        </div>
                      )}
                      <div className="d-flex justify-content-center">
                        {" "}
                        {/* Center the button horizontally */}
                        <button
                          type="submit"
                          className="btn btn-primary"
                          // disabled={isSubmitting}
                        >
                          Update Cab
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
