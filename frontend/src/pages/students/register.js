import React, { useState } from 'react'
import { Template } from '../shared/template'
import { Button, Form, Image } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import axios from 'axios'
export const Register = () => {
    const [course,setCourse] = useState(null)
    const [showModal,setShowModal] = useState(false)
    const [err,setErr] = useState(false)
    const [code, setCode] = useState('')
    const [regError,setRegError] = useState(false)
    const [success,setSuccess] = useState(false)
    const id = localStorage.getItem('_id')
    const find = async (event) =>{
        event.preventDefault()
        const code = event.target[0].value
        try{
            console.log(code)
            const request = await axios.get(`https://localhost:8081/api/v2/courses/get/code/${code}`,{headers:{"Content-Type":"application/json"}})
            setCode(code)
            setCourse(request.data)
            setErr(false)
            setShowModal(true)
        }catch(error){
            setErr(true)
            console.log(error)
        }
    }
    const register = async() =>{
      try{
        await axios.put(`https://localhost:8081/api/v2/courses/enroll`,{code:code,id:localStorage.getItem('_id')})
        setRegError(false)
        setShowModal(false)
        setSuccess(true)
      }catch{
        setRegError(true)
      }
    }

    const modal = course ? <Modal className='container' show={showModal} onHide={()=>{setShowModal(false)}}>
    <Modal.Header className='row' closeButton>
      <Modal.Title>{course.name}</Modal.Title>
    </Modal.Header>
    <Modal.Body className='row'>
      <h5>{course.description}</h5>
      <Image src={course.image} />
      <h3 style={{textAlign:'center'}} className='my-4'>Instructor: {course.author.username}</h3>
    </Modal.Body>
    <Modal.Footer>
      {regError ?  <h5 style={{color:"red"}}>Something went wrong...</h5> : <></>}
      <Button variant="secondary" onClick={()=>{setShowModal(false)}}>
        Not the right one!
      </Button>
      <Button variant="primary" onClick={register}>
        Enroll
      </Button>
    </Modal.Footer>
  </Modal> : null


  return (
    <Template>
        {showModal ? modal : null}
        <p className='p-5 row'>
            If an instructor has shared their secret "code" with you, you can apply for their course
            Even after applying, you must wait for them to verify you and accept you to allow you to officially register. This step is dependent on the instructor.
            If you feel that your instructor has not let you register, reach out to them as needed.
        </p>
        <Form className='row' onSubmit={find}>
            <Form.Group className='offset-1 col-3'>
                <Form.Label><h3><strong>Registration Code:</strong></h3></Form.Label>
                <Form.Control id='code-input' name='code' />
            </Form.Group>
            <div className='offset-8'></div>
            <Button type='submit' className='offset-1 col-3 my-3'>Submit</Button>
        </Form>
        {err ? <h1 style={{color:"red"}}>No courses matching this code found.</h1> : <></>}
        {success ? <h5 style={{color:"green"}}>Enrollment Successful!</h5> : <></>}
    </Template>
  )
}
