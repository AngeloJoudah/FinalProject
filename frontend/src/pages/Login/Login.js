import axios from "axios";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useAuth } from "../../auth/Auth";
import * as formik from 'formik'
import * as yup from 'yup';


export const Login = () =>{
// eslint-disable-next-line
    const [message,setMessage] = useState(<></>)
    const navigate = useNavigate()
    const auth = useAuth()
    const { Formik } = formik;


    const handleSubmit = async (values,formikBag) =>{
        if(values.password && values.username) {
            await axios
            .post(`http://finalprojectangelo.azurewebsites.net/api/v1/authentication`,values)
            .then(e => {
                if(e.status == 200){
                    auth.login(axios.get(`mongodb://docdbfp:Ols5yE5Gqvn0ikyzcRkccAa8HC7gq8ASNm329sdpuaJKEl15ruuxV26fj4H3BValc4TfOxO7WzSGACDbtBu1iA==@docdbfp.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&r/api/users/${values.username}`))
                }
            }
            )
        }
    }
    const schema = yup.object().shape({
        username: yup.string().required(),
        password: yup.string().required()
      });

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