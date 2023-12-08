import axios from "axios";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { Template } from "../shared/template";

export const AddCourse = () =>{
    const [name,setName] = useState(null)
    const [desc,setDesc] = useState(null)
    const [file,setFile] = useState(null)
    const [message,setMessage] = useState(<></>)
    const navigate = useNavigate()


    const handleSubmit = async (event) =>{
        await event.preventDefault()
        if(!name && !desc && !file){
            setMessage(<h1 style={{color:"red"}}><strong>Please fill out all form fields.</strong></h1>)
        }else{
            const data = {
                author:localStorage.getItem("_id"),
                name:name,
                description:desc,
                image:file
            }
            try{
                await axios
                .post('https://ofcourse.website/api/v2/courses',data,{headers:{"Content-Type":"application/json"}})
                navigate('/courses')
            }catch(err){
                setMessage(<h1 style={{color:"red"}}><strong>Something went wrong, please try again</strong></h1>)
                console.error(err)
            }
        }
    }

    return(
        <Template>
            <div className="p-5">
                <h1>Add a course!</h1>
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
        </Template>
    )
}