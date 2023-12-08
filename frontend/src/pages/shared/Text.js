import { Template } from './template';
import React, { useEffect, useState } from 'react';
import { Messagebox } from '../../components/Messages/Messagebox';
import axios from 'axios';
import { SpinnerLoader } from '../../components/misc/Spinner';
import { useParams } from 'react-router';
import avatar from '../../icons/avatar.svg'
export const Text = () => {
  const [messages, setMessages] = useState([]);
  const [initialOffset,setInitialOffset] = useState(0)
  const [offset, setOffset] = useState(0);
  const { chatId } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  const [userImage,setUserImage] = useState(null)
  const [otherImage,setOtherImage] = useState(null)


  const getUserData = async() =>{
    try{
      const request = await axios.get(`https://ofcourse.website/api/v2/chats/user/${localStorage.getItem("_id")}/chat/${chatId}`)
      console.log(request.data)
      if(request.user1._id === localStorage.getItem("_id")){
        setUserImage(request.data.user1.profilePicture)
        setOtherImage(request.data.user2.profilePicture)
      }else{
        setUserImage(request.data.user2.profilePicture)
        setOtherImage(request.data.user1.profilePicture)
      }
      
    }catch(err){
      setErr(true)
    }finally{
      setLoading(false)
    }

  } 
  useEffect(()=>{
      getUserData()
  },[])


  const loadMessages = async () => {
    try {
      const request = await axios.get(
        `https://ofcourse.website/api/v3/messages/getBase?topic=${chatId}`,
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log(request.data);
      const newMessages = request.data.messages;
      setMessages([...messages, ...newMessages]);
      setOffset(request.data.offset);
      setInitialOffset(request.data.offset);
    } catch (e) {
      console.error(e);
      setErr(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(initialOffset)
        const req = await axios.get(`https://ofcourse.website/api/v3/messages/getOffset?topic=${chatId}`);
        if (offset < req.data) {
          const newMessages = await axios.get(
            `https://ofcourse.website/api/v3/messages/get?topic=${chatId}&offset=${offset}`,
            { headers: { 'Content-Type': 'application/json' } }
          );
          if (newMessages.data.length > 0) {
            setMessages((prevMessages) => [...prevMessages, ...newMessages.data]);
          }
          const newOffset = req.data;
          setOffset(newOffset);
        }
      } catch (err) {
        console.error(err);
      }
    };
  
    const intervalId = setInterval(fetchData, 8000);
    return () => {
      clearInterval(intervalId);
    };
  }, [offset]);

  const onSubmitHandler = async event =>{
    await event.preventDefault()
    const mes = localStorage.getItem('user') + ': ' + event.target[0].value
    await axios.post(`https://ofcourse.website/api/v3/messages/post`,{message:mes,topic:chatId},{headers:{"Content-Type":"application/json"}}).then(()=>{
      setMessages([...messages,mes]);
      let textInput = event.target[0]
      textInput.value = ''
    })
    setOffset(offset+1)
  } 

  const onScrollToTop = async event =>{
    console.log(window.scrollY)
    if(window.scrollY >= 100){
      const os = initialOffset - 10;
      if(os > 0){
        try{
        const newMessages = await axios.get(
          `https://ofcourse.website/api/v3/messages/get?topic=${chatId}&offset=${os}`,
          { headers: { 'Content-Type': 'application/json' } }
        )
        setInitialOffset(initialOffset-10)
        setMessages([...newMessages.data,...messages])
        }catch(err){
          console.log(err)
        }
      }
    }
   
  }


  return (
    <Template >
      <div className='container-fluid' style={{ backgroundColor: 'black',position:"relative",overflow:"scroll", maxHeight:"80vh" }} onScroll={onScrollToTop} >
          {isLoading ? (
            <SpinnerLoader />
          ) : messages.length > 0 ? (
            messages.map((message, index) => <Messagebox key={index} text={message} Userimage={userImage} otherImage={otherImage} />)
          ) : !err ? (
            <h1>This is the beginning of your chat history</h1>
          ) : (
            <h1 style={{ textAlign: 'center' }}>Something went wrong... Refresh to try again</h1>
          )}
          <div className='row'>
            <form action='submit' method='post' style={{position:"relative"}} onSubmit={onSubmitHandler}>
              <label for="text-input"></label>
              <input className='col-12 form-control' type='text' id="text-input" placeholder='Enter a message...' style={{borderRadius:"10px", height:"8vh"}}/>
            </form>
          </div>
      </div>
    </Template>
  );
};



