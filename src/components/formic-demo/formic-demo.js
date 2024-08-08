import { useFormik } from "formik";

function FormicDemo()
{
    function userValidate(formBody)
    {
        var errors={};
        if(formBody.userName==='')
        {
            errors.userName="User name required.";
        }else if(formBody.userName.length<4)
        {
            errors.userName="size should be more than 4.";
        }else{
            errors.userName="";
        }

        if(isNaN(formBody.age))
        {
            errors.age="age should be a number";
        }else{
            errors.age="";
        }
        if(formBody.mobile==="")
        {
            errors.mobile="mobile required";
        }else
        {
            errors.mobile="";
        }
        if(formBody.City==='-1')
        {
            errors.City="city required";
        }
        
        return errors;
    }
    const formiK=useFormik({
        initialValues:{
            "userName":"",
            "Age":0,
            "City":"",

        },
        validate:userValidate,
        onSubmit:(values)=>{
            alert(JSON.stringify(values));
        }
    })
    return(
        <div className="container-fluid" style={{marginTop:"100px"}}>
            <form action="" onSubmit={formiK.handleSubmit}>
            <h2>Register</h2>
            <dl>
                <dt>user Name</dt>
                <dd><input type="text" onBlur={formiK.handleBlur} name="userName" onChange={formiK.handleChange}/></dd>
                <dd className="text-danger">{formiK.errors.userName}</dd>
                <dt>Age</dt>
                <dd><input type="text" name="Age" onChange={formiK.handleChange}/></dd>
                <dd className="form-danger">{formiK.errors.Age}</dd>
                <dt>city</dt>
                <dd>
                    <select name="City" onChange={formiK.handleChange}>
                        <option value="-1">select City</option>
                        <option value="Hyd">Hyd</option>
                        <option value="Chennai">Chennai</option>
                    </select>
                </dd>
                <dd className="text-danger">{formiK.errors.City}</dd>
                <dt >mobile</dt>
                <dd><input type="number" name="mobile" onChange={formiK.handleChange}/></dd>
                <dd className="text-danger">{formiK.errors.mobile}</dd>
            </dl>
            <button type="submit">Register</button>
            </form>
        </div>
    )
}
export default FormicDemo;