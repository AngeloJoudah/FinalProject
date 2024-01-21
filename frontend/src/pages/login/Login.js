import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router";
import { useAuth } from "../../auth/Auth";
import * as formik from 'formik'
import * as yup from 'yup';


export const Login = () =>{
    const { Formik } = formik;
    const auth = useAuth()
    const nav = useNavigate()
    const location = useLocation()
    const redirectPath = location.state?.path ||  '/'

    const handleSubmit = async (values,formikBag) =>{
        if(values.password && values.username) {
            await axios
            .post(`https://ofcourse.website/api/v1/auth/authentication`,values,{headers:{
                "Content-Type":"application/json"
            }
            })
            .then(async e => {
                if(e.status == 200){
                    const token = e.data.token
                    document.cookie = `${'token'}=${encodeURIComponent(token)}; expires=${Date.now() + 30 * 1000 * 60}; path=/`
                    console.log(document.cookie)
                    await auth.login({token:token,newUser:values.username})
                    const getId = await axios.get(`https://ofcourse.website/api/v2/users/username/${values.username}`).catch(err=>{
                        console.error(err)
                    })
                    localStorage.setItem("_id",getId.data._id)
                    localStorage.setItem("type",getId.data.userType)
                    nav('/',{replace:true})
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
        <div className="mx-3">
        <Formik
        validationSchema={schema}
        onSubmit={handleSubmit}
        validate={validate}
        className="mx-3"
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


                        <Form.Label htmlFor="password">Password</Form.Label>
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
                </div>
                )
            }
        }
        </Formik>
        <a href="/signup"> Don't have an account yet? Create one!</a>
        </div>
    )
}