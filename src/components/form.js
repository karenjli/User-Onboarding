import React, {useState, useEffect} from "react";
import axios from "axios";
import { Form, Field, withFormik} from 'formik';
import * as Yup from "yup";
import { reset } from "ansi-colors";

const UserForm = ({errors, touched, values, status}) => {
    const [user, setUser] = useState([]);
    console.log(user);

  useEffect(() => {
    if (status) {
      setUser([...user, status]);
    }
  }, [status]);



    return(
        <div className="userForm"> 
            <h2>Register Today!</h2>
            <Form>
                <Field type="text" name="name" placeholder="Name"></Field>
                    {touched.name && errors.name && (
                        <p className="error"> {errors.name}</p>
                    )}
                <Field type="text" name="email" placeholder="E-mail"></Field>
                    {touched.email && errors.email && (
                        <p className="error"> {errors.email}</p>
                    )}
                <Field type="password" name="password" placeholder="Password"></Field>
                    {touched.password && errors.password && (
                        <p className="error"> {errors.password}</p>
                    )}
                <label className="checkbox-container">
                    <span className="checkmark" />
                   You must agree with the Terms of Service in order to use our service.
 
                   Do you agree with the Terms? 
                    <Field type="checkbox" name="terms" />
                </label>
            <button>Submit</button>
            </Form>
            <h3>Welcome the following new members</h3>
            {user.map(member => (
        <p key={member.id}>{member.name}</p>
      ))}
        </div>
    )
};

const FormikUserForm = withFormik ({
    mapPropsToValues ({ name, email, password, terms}) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            terms: terms || false
        };
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required ("Name is required"),
        email: Yup.string().email().required("Valid e-mail address is required"),
        password: Yup.string().required("Password is required")
    }),

    handleSubmit (values, {setStatus, resetForm}) {
        axios.post("https://reqres.in/api/users", values)
        .then (res => {
            console.log("handleSubmit: then: res: ", res);
            setStatus (res.data);
            resetForm();
        })
        .catch (err => {
            console.log("handleSubmit: catch: err: ", err);
        });
    }
});

const UserFormWithFormik = FormikUserForm(UserForm);


export default UserFormWithFormik;