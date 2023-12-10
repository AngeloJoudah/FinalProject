import React, { useEffect, useState } from 'react'
import { Template } from '../shared/template'
import { SpinnerLoader } from '../../components/misc/Spinner'
import { useNavigate, useParams } from 'react-router'
import { Form, Col, Button } from 'react-bootstrap'
import * as formik from 'formik';
import * as yup from 'yup';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'

export const Submit = () => {
    
    const [name,setName] = useState('')
    const [isLoading,setIsLoading] = useState(true)
    const [desc,setDesc] = useState('')
    const [err,setErr] = useState(false)
    const [file,setFile] = useState(null)
    const nav = useNavigate()
    const {courseId, assignmentId} = useParams()
    const {Formik} = formik
    const schema = yup.object().shape({
        name: yup.string().required(),
        description: yup.string().required(),
        dueDate: yup.string(),
      });

      const handleFileChange = (event) => {
        const f = event.target.files[0];
        if (f && f.name.includes(' ')) {
          alert('File name must not contain whitespace');
          setFile(null);
        } else if (f && f.type === 'application/pdf') {
          setFile(f);
        } else {
          alert('Please select a valid PDF file.');
          setFile(null); // Clear the file state if an invalid file is selected
        }
        console.log(file)
      };
    const handleSubmit = async (values) => {
        try {
            console.log('submitted')
            const formData = new FormData();
            formData.append('file', values.file);
            await axios.post('https://ofcourse.website/api/v2/submissions', {
                content: file,
                courseId: courseId,
                studentId: localStorage.getItem('_id'),
                assignmentId: assignmentId
            },{
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            });
            nav(`/course/${courseId}`)
        }catch (err) {
            setErr(true);
            console.log(err)
        }
      }
    const ErrorMessage = 
    <div style={{textAlign:'center'}}>
        <h1><strong>Something went wrong...</strong></h1>
        <h5>Refresh to try again.</h5>
    </div>
    const validate = values =>{
        const errors = {}
        if(!!!values.file){
            errors.file = "Please upload a submission in PDF form"
        }

        return errors
    }
    const request = async()=>{
        setIsLoading(true)
        try{
            const req = await axios.get(`https://ofcourse.website/api/v2/assignments/${assignmentId}`)
            setName(req.data.name)
            setDesc(req.data.description)
        }catch(err){
            setErr(true)
            console.log(err)
        }finally{
            setIsLoading(false)
        }
    }
    useEffect(()=>{
        request()
    },[])

  return (
    <Template>
        { isLoading ? <SpinnerLoader />
        :
        <>
            {err ? 
                <h1 style={{color:"red",textAlign:"center"}}>Something went wrong. Refresh to try again.</h1> :
            <div style={{textAlign:"center"}}>
                <h1 className='my-3'><strong>Make a submission to: {name}</strong></h1>
                <h3>Description: {desc}</h3>
                <Formik
            onSubmit={handleSubmit}
            className="mx-3"
            initialValues={{
            file:''
            }}>
                {({ handleSubmit, handleChange, setFieldValue, values, touched, errors }) => {
                return(
                    <div className="p-5">
                        <Form className="my-3" onSubmit={handleSubmit}>
                            <Form.Label>Upload your file here:</Form.Label>
                            <Form.Control className='row'
                                type="file"
                                accept=".pdf"
                                onChange={handleFileChange}
                            >
                            </Form.Control>
                            <Button type="submit" className='my-5'>Submit</Button>
                        </Form>
                        {err ? ErrorMessage : <></>}
                    </div>
                    )
                }
            }
            </Formik>
                
            </div>
            }
        </>
        }
    </Template>
  )
}
