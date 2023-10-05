import axios from "axios";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router";

export const AddCourse = () =>{
    const [name,setName] = useState(null)
    const [desc,setDesc] = useState(null)
    const [file,setFile] = useState(null)
    const [message,setMessage] = useState(<></>)
    const navigate = useNavigate()


    const handleSubmit = async (event) =>{
        await event.preventDefault()
        const data = {
            name:name,
            description:desc,
            image:file
        }
        if(desc) await axios
        .post('http://localhost:8081/api/v2/courses',data)
        navigate('/courses')
        //.then(request =>{setMessage(<></>)}) 
        //: setMessage(<h3>Please fill out all form fields before submitting</h3>)
    }

    return(
        <div className="p-5">
            <Form className="my-3" onSubmit={handleSubmit}>
                <Form.Label htmlFor="name">Name:</Form.Label>
                <Form.Control
                    type="text"
                    id="name"
                    aria-describedby="form-name"
                    onChange={e=>{setName(e.target.value)}}
                />
                <Form.Text id="form-name" muted>
                    Enter
                </Form.Text>


                <Form.Label htmlFor="name">Description:</Form.Label>
                <Form.Control
                    type="text"
                    id="name"
                    aria-describedby="form-name"
                    onChange={e=>{setDesc(e.target.value)}}
                />
                <Form.Text id="form-name" muted>
                    Enter
                </Form.Text>

        
                <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Default file input example</Form.Label>
                <Form.Control type="file"
                onChange={e=>{
                    const file = e.target.files[0]
                    const fr = new FileReader();
                    fr.onload = e => {setFile(e.target.result)}
                    fr.readAsDataURL(file);
                }}
                />
                </Form.Group>
                <Button type="submit">Submit</Button>
            </Form>
            {message}
        </div>
    )
}