import React from 'react';
import { useFormik } from "formik";
import * as yup from "yup";

function UserForm() {
  const formik = useFormik({
    initialValues: {
      userName: "",
      Age: "",
      City: "",
      mobile: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values));
    },
    validationSchema: yup.object({
      userName: yup
        .string()
        .required("Username is required")
        .min(4, "Username should be at least 4 characters")
        .max(10, "Username is too long"),
      Age: yup
        .number("age must be a number.")
        .required("Age is required")
        .min(0, "Age must be a positive number"),
      mobile: yup
        .string()
        .required("Mobile number is required")
        .matches(/^\+91\d{10}$/, "Invalid mobile number, format {+91 ten digit mobile number}"),
    }),
  });

  return (
    <div className="container-fluid" style={{ marginTop: "100px" }}>
      <form onSubmit={formik.handleSubmit}>
        <h2>Register</h2>
        <dl>
          <dt>Username</dt>
          <dd>
            <input
              type="text"
              name="userName"
              {...formik.getFieldProps("userName")}
            />
          </dd>
          <dd className="text-danger">
            { formik.errors.userName}
          </dd>

          <dt>Age</dt>
          <dd>
            <input
              type="text"
              name="Age"
              {...formik.getFieldProps("Age")}
              
            />
          </dd>
          <dd className="text-danger">
            {formik.touched.Age && formik.errors.Age}
          </dd>

          <dt>City</dt>
          <dd>
            <select
              name="City"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.City}
            >
              <option value="">Select City</option>
              <option value="Hyd">Hyd</option>
              <option value="Chennai">Chennai</option>
            </select>
          </dd>
          <dd className="text-danger">
            {formik.touched.City && formik.errors.City}
          </dd>

          <dt>Mobile</dt>
          <dd>
            <input
              type="text"
              name="mobile"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.mobile}
            />
          </dd>
          <dd className="text-danger">
            {formik.touched.mobile && formik.errors.mobile}
          </dd>
        </dl>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default UserForm;
