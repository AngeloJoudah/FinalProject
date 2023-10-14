// ALL Messages
import { Template } from './template'
import React, { useEffect, useState } from 'react'
import { Messagebox } from '../../components/Messages/Messagebox'
import axios from 'axios'
export const Text = ({other}) => {
  const [messages,setMessages] = useState([])
  const [offset,setOffset] = useState(0)
  const str = [other,localStorage.getItem("user")].sort()
  const topic = str[0] + ":" + str[1]
  useEffect(()=>{
    const intervalFunction = async () => {     
      await axios.get(
        `localhost:8082/api/v3/messages?topic=${topic}&offset=${offset}`,
        {"Content-Type":"application/json"}
      ).then(e =>{
        setMessages(messages.concat(e.data))
      })
      }
      const intervalId = setInterval(intervalFunction, 5000);
      return () => {
        clearInterval(intervalId);
      };

  },[])

  /*useEffect(() => {
    const client = new Client('ws://localhost:8082/api/v3/kafka');
    const consumer = new Consumer(client, [{ topic: topic, partition: 0 }]);
    consumer.on(topic, (message) => {
      setMessages(messages.concat(message));
    });
    return () => {
      consumer.close();
    };
  }, []);*/



  return (
    <Template>
      <div className='container-fluid' style={{backgroundColor:"black"}}>
        <div className="chatbox m-2">
          {messages.length > 0 ? messages.map(message =>{<Messagebox text={message}/>}) : <h1>This is the beggining of your chat history</h1>}
        </div>
      </div>
    </Template>
  )
}