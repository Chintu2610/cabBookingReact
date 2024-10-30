import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { BASE_URL } from '../config'; // Adjust path based on file location

export function UpdateReport() {
  const params = useParams();
  const [cookie] = useCookies();
  const navigate = useNavigate();
  const [reportDetails, setReportDetails] = useState(null);
  
  useEffect(() => {
    const fetchDriverDetails = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/tripBooking/viewReport?reportId=${params.reportId}&uuid=${cookie.uuid}`
        );
        if (response) {
          setReportDetails(response.data);
        } else {
          alert("Failed to fetch driver details. Please try again.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchDriverDetails();
  }, [cookie.uuid, params.reportId]);

  if (!reportDetails) {
    return <div>Loading...</div>; // Show a loading indicator while data is being fetched
  }
  return (
    <div className="container" style={{ marginTop: "100px" }}>
      <Formik
        initialValues={{
          reportId: reportDetails.reportId || "",
          driverUserName: reportDetails.driverUserName || "",
          complaint_by:reportDetails.complaint_by || "",
          subject:reportDetails.subject || "",
          description:reportDetails.description || "",
          status:reportDetails.status || "",
        }}
        enableReinitialize={true} // Reinitialize form values when `driverDetails` changes
        onSubmit={async (values) => {
          try {
            const response = await axios.put(
              `${BASE_URL}/tripBooking/updateReport`,
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
              alert("Report updated successfully.");
              navigate("/reports");
            } else {
              alert("Update failed. Please try again.");
            }
          } catch (error) {
            console.error("Error:", error);
          }
        }}
        validationSchema={yup.object({
          driverUserName: yup
            .string()
            .required("Username is required")
            .min(4, "Minimum length should be 4")
            .max(10, "Length should not exceed 10"),         
            complaint_by: yup
            .string()
            .required("Email is required")
            .email("Invalid email format"),
            subject: yup.string().required("subject is required"),        
            description: yup.string().required("Description is required"),          
            status: yup.string().required("status is required."),
        })}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="container" style={{ marginTop: "100px" }}>
              <div className="row justify-content-center">
                <div className="col-md-5">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="text-center mb-4">Update Report</h5>
                      <div className="mb-3">
                        <label htmlFor="driverId" className="form-label">
                          Report ID
                        </label>
                        <Field
                          type="text"
                          name="reportId"
                          className="form-control"
                          disabled
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="userName" className="form-label">
                          Driver User Name
                        </label>
                        <Field
                          type="text"
                          name="driverUserName"
                          className="form-control"
                          disabled
                        />
                        <ErrorMessage
                          name="driverUserName"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="address" className="form-label">
                        subject
                        </label>
                        <Field
                          type="text"
                          name="subject"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="subject"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="licenceNo" className="form-label">
                          Description
                        </label>
                        <Field
                          type="text"
                          name="description"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="description"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                        Complain By
                        </label>
                        <Field
                          type="email"
                          name="complaint_by"
                          className="form-control"
                          disabled
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-danger"
                        />
                      </div>                    
                      <div className="mb-3">
                        <label htmlFor="currDriverStatus" className="form-label">
                        Status
                        </label>
                    <Field
                      name="status"
                      as="select"
                      className="form-control"
                      disabled={cookie.currRole === 'Customer' ? true : false}
                    >
                          <option value="">Select status</option>
                          <option value="open">Open</option>
                          <option value="resolved">Resolved</option>
                        </Field>
                        <ErrorMessage
                          name="status"
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
                          Update Report
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
