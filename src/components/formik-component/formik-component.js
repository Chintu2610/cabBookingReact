import { Formik,Form,Field,ErrorMessage } from "formik";
import * as yup from "yup"
export function FormikComponent(){
    
        return(
            <div className="container-fluid" style={{marginTop:"100px"}}>
                <h1>Formik components</h1>
                
                <Formik  
                initialValues={
                    {
                        "userName":"",
                        "Age":0,
                        "City":"",
                        "Mobile":""
                    }
                }
                onSubmit={
                    (values)=>{
                        alert(JSON.stringify(values));
                    }
                } 
                validationSchema={
                    yup.object(
                        {
                            "userName":yup.string().required("username is required")
                            .min(4,"min length should be 4")
                            .max(10,"length should not exceed 10"),
                            "Mobile":yup.number().required("mobile is required"),
                            "Age":yup.number().required("Age is required"),
                            "city":yup.string().required("city is required")
                        }
                    )
                }
            >{props=>
                    <Form>
                        <dl>
                            <dt>User Name</dt>
                            <dd><Field type="text" name="userName"></Field></dd>
                            <dd className="text-danger"><ErrorMessage name="userName"/></dd>
                            <dt>City</dt>
                            <dd><Field as="select" name="city">
                                <option value="-1">Choose City</option>
                                <option value="Hyderabad">Hyderabad</option>
                                <option value="Chennai">Chennai</option>
                                </Field></dd>
                                <dt className="text-danger"><ErrorMessage name="city"/></dt>
                            <dt>Mobile</dt>
                            <dd>
                                <Field type="text" name="Mobile">

                                </Field>
                            </dd>
                            <dd className="text-danger"><ErrorMessage name="Mobile"/></dd>
                        </dl>
                        <button disabled={!props.is}>Register</button>
                    </Form>}
                </Formik>
            </div>
        )
    
    }