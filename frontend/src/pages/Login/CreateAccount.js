import axios from "axios";
import { Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router";
import * as formik from 'formik';
import * as yup from 'yup';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";







const validate = values =>{
  const errors = {}
  if(!!!values.firstname){
    errors.firstname = 'This field is required'
  }
  else if(values.firstname.length < 2 || values.firstname.length > 15 || !/^[a-zA-Z0-9]+$/.test(values.firstname)){
    errors.firstname = 'First Names can only be between 2 and 15 characters and can only contain letters and numbers.'
  }
  if(!!!values.lastname){
    errors.lastname = 'This field is required'
  }
  else if(values.lastname.length < 2 || values.lastname.length > 15 || !/^[a-zA-Z0-9]+$/.test(values.lastname)){
    errors.lastname = 'Last Names can only be between 2 and 15 characters and can only contain letters and numbers.'
  }
  if(!!!values.username){
    errors.username = 'This field is required'
  }
  else if(values.username.length < 2 || values.username.length > 15 || !/^[a-zA-Z0-9]+$/.test(values.username)){
    errors.username = 'Usernames can only be between 2 and 15 characters and can only contain letters and numbers.'
  }
  if(!!!values.password){
    errors.password = 'This field is required'
  }
  else if(values.password.length < 2 || values.password.length > 15 || !/^[a-zA-Z0-9!#$]+$/.test(values.password)){
    errors.password = 'Passwords can only be between 2 and 15 characters and can only contain letters and numbers and special characters such as (!,#,$).'
  }

  if(!!!values.email){
    errors.email = 'This field is required'
  }
  else if(values.email.length < 6 || values.email.length > 30 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)){
    errors.email = 'Please provide a valid email address'
  }
  if(!values.terms){
    errors.terms = "Please agree to our terms of service."
  }
  if(!values.type){
    errors.type = "Please select what kind of user you are"
  }
  if(!values.age){
    errors.age = "Please enter your D.O.B"
  }

  return errors
}








export const CreateAccount = () =>{

    const navigate = useNavigate()
    const handleSubmit = async (values,formikBag) =>{
      console.log(values)
      const req = await axios.post('http://localhost:8080/api/v1/auth/register',values,{headers:{
        "Content-Type":"application/json"
      }
      })
      if(req.status === 200){
        navigate('/login')
      }
    }

    const { Formik } = formik;

    const typeEnum = {
      TEACHER:"TEACHER",
      LEGAL_GUARDIAN:"LEGAL_GUARDIAN",
      PARENT:"PARENT",
      STUDENT:"STUDENT"
    }
    const validType = value =>{
      return Object.values(typeEnum).includes(value)
    }

    const [selectedDate, setSelectedDate] = useState(new Date());
    const handleDateChange = (date, setFieldValue) => {
      setSelectedDate(date); // Update the local state with the selected date
      const formattedDate = date ? date.toLocaleDateString() : new Date(); 
      const currentDate = new Date();
      const birthDateObj = new Date(formattedDate);
      // Calculate the difference in milliseconds between the current date and the birth date
      const ageInMilliseconds = currentDate - birthDateObj;
      // Convert the difference into years
      const ageInYears = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25));
      setFieldValue('age', ageInYears); // Update the Formik field value
    }


    const schema = yup.object().shape({
      firstname: yup.string().required(),
      lastname: yup.string().required(),
      username: yup.string().required(),
      password: yup.string().required(),
      email : yup.string().required(),
      type: yup.string().test('Valid Type','Invalid Type',validType).required(),
      terms: yup.boolean(true).required(),
      age: yup.number().integer().required()
    });

    return(
      <div className="mx-3">
      <h1>Signup for an account</h1>
        <Formik
        validationSchema={schema}
        onSubmit={handleSubmit}
        validate={validate}
        initialValues={{
          firstname: '',
          lastname: '',
          username: '',
          password: '',
          email: '',
          terms: false,
          type:"",
          age:0
        }}
      >
        {({ handleSubmit, handleChange, setFieldValue, values, touched, errors }) => {
            return (
              <Form noValidate onSubmit={handleSubmit}>

                <Row className="mb-3">
                  <Form.Group as={Col} md="4" controlId="validationFormik01">
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstname"
                      value={values.firstname}
                      onChange={handleChange}
                      isValid={touched.firstname && !errors.firstname}
                      isInvalid={!!errors.firstname} />
                    <Form.Control.Feedback type="invalid">
                      {errors.firstname}
                    </Form.Control.Feedback>
                    <Form.Control.Feedback>
                      Looks good!
                    </Form.Control.Feedback>
                  </Form.Group>


                  <Form.Group as={Col} md="4" controlId="validationFormik02">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastname"
                      value={values.lastname}
                      onChange={handleChange}
                      isValid={touched.lastname && !errors.lastname}
                      isInvalid={!!errors.lastname} />

                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      {errors.lastname}
                    </Form.Control.Feedback>
                  </Form.Group>




                  <Form.Group as={Col} md="4" controlId="validationFormikUsername">
                    <Form.Label>Username</Form.Label>
                    <InputGroup hasValidation>
                      <Form.Control
                        type="text"
                        placeholder="Username"
                        aria-describedby="inputGroupPrepend"
                        name="username"
                        value={values.username}
                        onChange={handleChange}
                        isInvalid={!!errors.username} />
                      <Form.Control.Feedback type="invalid">
                        {errors.username}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </Row>

                <Row className="my-2">
                  <Form.Group as={Col} md="6" controlId="validationFormikPassword">
                    <Form.Label>Password</Form.Label>
                    <InputGroup hasValidation>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        aria-describedby="inputGroupPrepend"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        isValid={touched.password && !errors.password}
                        isInvalid={!!errors.password} />
                      <Form.Control.Feedback>
                        Looks Good!
                      </Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>



                  <Form.Group as={Col} md="6" controlId="validationFormik03">
                    <Form.Label>Email</Form.Label>

                    <Form.Control
                      type="text"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      isValid={touched.email && !errors.email}
                      isInvalid={!!errors.email} />

                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>





                <Row>
                <Form.Group className="m-3" as={Col} md="6">
                        {['TEACHER','LEGAL_GUARDIAN','PARENT','STUDENT'].map(type=>{return(
                          <Form.Check 
                          name="type"
                          value={type}
                          key={type}
                          onChange={handleChange}
                          required
                          style={{ fontSize: "1.5rem" }}
                          label={type.replace('_',' ').toLowerCase()}
                          type="radio"
                          isValid={touched.type && !errors.type}
                          isInvalid={!!errors.type}>

                          </Form.Check>
                        )})}
                </Form.Group>


                <Form.Group className="m-3" as={Col} md="6">
                  <DatePicker
                  name="age"
                  onChange = {(date) => handleDateChange(date, setFieldValue)}
                  isValid={touched.age && !errors.age}
                  isInvalid={!!errors.age}
                  showYearDropdown
                  selected={selectedDate}
                  scrollableYearDropdown
                  yearDropdownItemNumber={80}
                  dateFormat="MM/dd/yyyy"
                  placeholderText="MM/DD/YYYY"
                  isClearable
                  />
                </Form.Group>
                </Row>

                  <Form.Group className="mb-3" as={Col} md="6">
                    <Form.Check
                      required
                      name="terms"
                      label="Agree to terms and conditions"
                      onChange={handleChange}
                      isValid={touched.terms && values.terms}
                      isInvalid={!!errors.terms}
                      value={values.terms}
                      feedback={errors.terms}
                      feedbackType="invalid"
                      id="validationFormik04" />
                    <Form.Control.Feedback type="invalid">
                      {errors.terms}
                    </Form.Control.Feedback>
                  </Form.Group>


                <Button type="submit">Submit form</Button>
              </Form>
            );
          }}
      </Formik>
      </div>
    )
}