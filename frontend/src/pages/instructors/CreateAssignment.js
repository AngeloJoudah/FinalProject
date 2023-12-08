import React, { useState } from 'react'
import { Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import { Template } from '../shared/template';
import { useNavigate } from "react-router";
import * as formik from 'formik';
import * as yup from 'yup';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from 'react-router';
import axios from 'axios';
export const CreateAssignment = () => {
    const {courseId} = useParams()
    const [file,setFile] = useState(null)
    const [date,setDate] = useState('')
    const [error,setError] = useState(<></>)
    const {Formik} = formik
    const nav = useNavigate()

    const schema = yup.object().shape({
        name: yup.string().required(),
        description: yup.string().required(),
        dueDate: yup.string().required(),
      });

      const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.name.includes(' ')) {
          alert('File name must not contain whitespace');
          setFile(null);
        } else if (file && file.type === 'application/pdf') {
          setFile(file);
        } else {
          alert('Please select a valid PDF file.');
          setFile(null); // Clear the file state if an invalid file is selected
        }
      };

    const handleDateChange = (date, setFieldValue) => {
        setDate(date);
        const formattedDate = date ? date.toLocaleDateString() : new Date(); 
        formattedDate ? setFieldValue('dueDate', formattedDate) : <></>;
    }
    const handleSubmit = async (values) => {
        try {
            const formData = new FormData();
            formData.append('file', file);
        
            // Access the file data using formData.get('file')
            console.log(formData.get('file'));
        
            await axios.post('https://ofcourse.website/api/v2/assignments', {
                name: values.name,
                description: values.description,
                content: file,
                courseId: courseId,
                instructorId: localStorage.getItem('_id'),
            },{
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            });
            nav(`/course/${courseId}`)
        }catch (err) {
            setError(<h1 style={{ color: 'black' }}>Something went wrong. Please try again</h1>);
        }
      }

    const validate = values =>{
        const errors = {}
        if(!!!values.name){
            errors.name = "Please name the assignment"
        }
        if(!!!values.description){
            errors.description = "Please enter a description"
        }

        return errors
    }
    return(
        <Template>
            <h1>Create an assignment</h1>
            <p className='col-5 my-3'>Currently, we only support assignment creation through pdf uploads. 
                In order to create an assignment, please give it a name, description, and submit a pdf file. 
                You may also assign a due date if you wish.</p>
            <Formik
            validationSchema={schema}
            onSubmit={handleSubmit}
            validate={validate}
            className="mx-3"
            initialValues={{
            name: '',
            description: '',
            dueDate:'',
            file:''
            }}>
                {({ handleSubmit, handleChange, setFieldValue, values, touched, errors }) => {
                return(
                    <div className="p-5">
                        <Form className="my-3" onSubmit={handleSubmit}>
                            <Form.Label htmlFor="name"><strong>Name:</strong></Form.Label>
                            <Form.Control
                                type="text"
                                id="name"
                                aria-describedby="form-name"
                                onChange={handleChange} 
                                isValid={touched.name && !errors.name}
                                isInvalid={touched.name && !!errors.name}
                            />


                            <Form.Label htmlFor="description"><strong>Description:</strong></Form.Label>
                            <Form.Control
                                type="text"
                                id="description"
                                aria-describedby="form-name"
                                onChange={handleChange}
                                isValid={touched.description && !errors.description}
                                isInvalid={touched.description && !!errors.description}
                            />
                            <Form.Text id="form-name" className='row mb-3' muted>
                                set a small description for the assignment
                            </Form.Text>
                            <Form.Label htmlFor="date"><strong>Due Date (optional): </strong></Form.Label>
                            <Form.Group className="m-3" as={Col} md="6" id='date'>
                                <DatePicker
                                name="age"
                                onChange = {(date) => handleDateChange(date, setFieldValue)}
                                isValid={touched.age && !errors.age}
                                isInvalid={!!errors.age}
                                showYearDropdown
                                selected={date}
                                scrollableYearDropdown
                                yearDropdownItemNumber={80}
                                dateFormat="MM/dd/yyyy"
                                placeholderText="MM/DD/YYYY"
                                isClearable
                                />
                            </Form.Group>
                            <Form.Control className='row'
                                type="file"
                                accept=".pdf"
                                onChange={handleFileChange}
                            >

                            </Form.Control>
                            <Button type="submit" className='my-5'>Submit</Button>
                        </Form>
                        {error}
                    </div>
                    )
                }
            }
            </Formik>
        </Template>
        )
}
