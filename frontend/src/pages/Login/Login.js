import axios from "axios";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import * as formik from 'formik'
import * as yup from 'yup';


export const Login = () =>{
// eslint-disable-next-line
    const [message,setMessage] = useState(<></>)
    const navigate = useNavigate()

    const { Formik } = formik;

    const schema = yup.object({
        username: yup.string().required(),
        password: yup.string().required()
    })
    const handleSubmit = async (values,formikBag) =>{
        if(values.password && values.username) {
            await axios
            .get(`http://localhost:8080/api/v1/users/credentials?username=${values.username}&password=${values.password}`)
            .then(e => {if(e.data.username === values.username && e.data.password === values.password) {navigate('/')}})
        }

        //.then(request =>{setMessage(<></>)}) 
        //: setMessage(<h3>Please fill out all form fields before submitting</h3>)
    }

    const validate = values =>{
        const errors = {}
        if(!!!values.username){
            errors.username = "Please enter a username"
        }
        if(!!!values.password){
            errors.password = "Please enter a password"
        }
        return errors
    }

    return(
        <>
        <Formik
        validationSchema={schema}
        onSubmit={handleSubmit}
        validate={validate}
        initialValues={{
          username: '',
          password: ''
        }}>
            {({ handleSubmit, handleChange, setFieldValue, values, touched, errors }) => {
            return(
                <div className="p-5">
                    <Form className="my-3" onSubmit={handleSubmit}>
                        <Form.Label htmlFor="name">Username</Form.Label>
                        <Form.Control
                            type="text"
                            id="username"
                            aria-describedby="form-name"
                            onChange={handleChange} 
                            isValid={touched.username && !errors.username}
                            isInvalid={touched.username && !!errors.username}
                        />
                        <Form.Text id="form-name" muted>
                            Enter a Username
                        </Form.Text>


                        <Form.Label htmlFor="name">Password</Form.Label>
                        <Form.Control
                            type="password"
                            id="password"
                            aria-describedby="form-name"
                            onChange={handleChange}
                            isValid={touched.password && !errors.password}
                            isInvalid={touched.password && !!errors.password}
                        />
                        <Form.Text id="form-name" muted>
                            Enter Password
                        </Form.Text>
                        <Button type="submit">Submit</Button>
                    </Form>
                    {message}
                </div>
                )
            }
        }
        </Formik>
        </>
    )
}