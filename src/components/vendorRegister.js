import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import {  useCookies } from "react-cookie";

export function VendorRegister() {
  const navigate = useNavigate();
  const [cookie]=useCookies();
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
          userRole:"vendor",
        }}
        onSubmit={async (values) => {
          try {
            const response = await fetch(
              `http://localhost:1995/admin/register/${cookie.currRole}`,
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
            .min(4, "Minimum length should be 4")
            .max(10, "Length should not exceed 10"),
          mobileNumber: yup
            .string() // Use .string() since Mobile is a text input
            .required("Mobile number is required"),
          email: yup
            .string()
            .required("Email is required")
            .email("Invalid email format"),
          address: yup.string().required("Address is required"),
          userRole:yup.string(),
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
           <div className="container" style={{ marginTop: "150px" }}>
             <div className="row justify-content-center">
               <div className="col-md-5">
                 <div className="card">
                   <div className="card-body">
                     <h5 className="text-center mb-4">Register a vendor</h5>
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
                       <Field
                         type="password"
                         name="password"
                         className="form-control"
                       />
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
                       
                       <Field
                       type="text"
                       name="userRole"
                       className="form-control"                                       
                       style={{display:"none"}}
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