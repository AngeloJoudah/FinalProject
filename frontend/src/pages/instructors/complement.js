import React, { useEffect, useState } from 'react';
import { Template } from '../shared/template';
import { Button, Dropdown, DropdownButton, Image } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';

export const Complement = () => {
  const [complements, setComplements] = useState([]);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState({});
  const [file,setFile] = useState(null)
  const [text,setText] = useState('')
  const [submissionError,setSubmissionError] = useState(false)
  const [title,setTitle] = useState('')
  const [name, setName] = useState('')
  const {id} = useParams()
  const nav = useNavigate()

  const getComplements = async () => {
    try {
      const request = await axios.get(`http://localhost:8081/api/v2/complements/user/${localStorage.getItem('_id')}/pagination/${pagination}`);
      const data = request.data;
      const images = data.map(buffer => {
        const base64String = btoa(String.fromCharCode(...new Uint8Array(buffer.data.data)))
        console.log(base64String)
        const right = base64String.split(/base64/i)[1]
        console.log(right)
        let start = ''
        if(buffer.fileType === 'image/jpeg'){
          start = 'data:image/jpeg;base64,'
        }else if(buffer.fileType === 'image/jpg'){
          start = 'data:image/jpg;base64,'
        }else if(buffer.fileType === 'image/png'){
          start = 'data:image/png;base64,'
        }
        const dataURI = `${start}${right}`;
        return { _id: buffer._id, url: dataURI };
      });
      setData(images);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateFile = async(event) =>{
    if(!event.target.files[0]){
      return;
    }
    await event.preventDefault()
    const file = event.target.files[0]
    if(file.size > 1024000){
      alert('File is too large. We limit files to 1mb or less.')
      return
    }
    setFile(file)
    console.log(event.target.files[0],event.target.files[0].type)
    console.log(file.type)
  }

  const createOwn = async (event) => {
    event.preventDefault();
  
    try {
      const str = name.replace(' ', '_');
      const reader = new FileReader();
      reader.onload = function (e) {
        const base64 = e.target.result;
        const request = axios.post(`http://localhost:8081/api/v2/complements/`,{
          file: base64,
          fileName: str,
          _id: localStorage.getItem('_id'),
          fileType: file.type
        }) 
      };
  
      reader.readAsDataURL(file);
    } catch (err) {
      alert('Something went wrong. Try again.');
      console.log(err);
    }
  };

  useEffect(() => {
    getComplements();
  }, []);

  useEffect(() => {
    setComplements(
      data.length > 0
        ? data.map(complement => (
            <Dropdown.Item
              onClick={() => setSelected(complement)}
              key={complement._id}
              className="col-3"
            >
              <Image className='img dropdown-item' src={complement.url} alt={complement._id} />
            </Dropdown.Item>
          ))
        : []
    );
  }, [data]);

  const handleSubmit = async (event) => {
    await event.preventDefault()
    try{
        await axios.post(`http://localhost:8081/api/v2/awards/`,{complementId:selected._id,_id:id,message:text,creatorId:localStorage.getItem('_id'),title:title})
        nav(`/courses`)
    }catch(err){
        console.log(err)
        setSubmissionError(true)
    }
  };

  return (
    <Template>
      <h5 className='offset-1 col-8'>Awards a neat way to express how great a student has done. You can award them for just about anything and they will receive it as a notification as soon as they get it.</h5>
      {!isLoading
        ? <div className='row'>
          <DropdownButton className='my-5 col-5' id="dropdown-basic-button" title="Dropdown button">
            <form onSubmit={createOwn}>
              <input type='file' onChange={updateFile} accept='.jpeg, .jpg, .png' />
              <input type='text' onChange={e=>setName(e.target.value)} />
              <Button onClick={null} type='submit' className='col-12'>Create your own!</Button>
            </form>
            {complements}
          </DropdownButton>
          <form  onSubmit={handleSubmit}>
            {selected ? <img style={{textAlign:"center"}} className='offset-lg-3 offset-md-2 offset-sm-1 col-lg-6 col-md-8 col-sm-10 col-xs-12' src={selected.url}/> : null}
            <div className='col-12'/>
            <h1 className='offset-1 col-2'>{text.length} / 500 {text.length > 500 ? "Text message is too long." : null}</h1>
            <div className='offset-1 col-10'>
              <label for='title' className='m-3'>What's this for? </label>
              <input type='text' id='title' placeholder='   Well done on the assignment...' onChange={e=>setTitle(e.target.value)} className='col-8'/>
            </div>
            <label for='textbox' className='offset-1 col-12 my-3'>Write a message to them to tell them how great they did!</label>
            <textarea id='textbox' type='text'  className='offset-1 col-10' onChange={event=>setText(event.target.value)}/>
            <Button className='col-3 p-3 m-5' type='submit'>submit</Button>
          </form>
        </div>
        : <></>
      }
    </Template>
  );
};