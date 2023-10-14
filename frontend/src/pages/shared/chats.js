import React, { useState } from 'react'
import axios from 'axios'
import { Template } from './template'
import {PersonCard} from './../../components/Messages/PersonCard'
export const Chats = () => {
  const [chats,setChats] = useState([])
  const people = axios.get(`http://localhost:8081/api/v2/chats/username/${localStorage.getItem('user')}`).then(people=>{
    setChats(chats.concat(people))
  }).catch(err =>{

  })
  return (
    
    <Template>
        {people.length > 0 ? chats.map(person=>{return <PersonCard name={person}/>}) : <h1 style={{textAlign:"center"}}>There are no chats here!</h1>}
    </Template>
  )
}
