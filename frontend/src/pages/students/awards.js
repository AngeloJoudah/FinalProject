import React, { useEffect } from 'react'
import { Template } from '../shared/template'
import axios from 'axios'
import { useState } from 'react'
import { AwardCard } from '../../components/misc/AwardCard'
import { useNavigate } from 'react-router'
export const Awards = () => {

  const [awards,setAwards] = useState([])
  const [cards,setCards] = useState([])
  const nav = useNavigate()
  const getAwards = async()=>{
    try{
      const req = await axios.get(`https://localhost:8081/api/v2/awards/id/${localStorage.getItem('_id')}`)
      setAwards(req.data)
      console.log(req.data)
    }catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{
    getAwards()
  },
  [])
  useEffect(()=>{
    if(awards.length > 0){
      setCards(awards.map(award =>{
        const base64String = btoa(String.fromCharCode(...new Uint8Array(award.image.data)))
        const right = base64String.split(/base64/i)[1]
        return(<AwardCard onClick={()=>nav(`/me/awards/${award._id}`)} read={award.read} key={award._id} title={award.title} instructor={award.instructor.username} image={right} fileType={award.fileType} time={award.time} />)
        })
      )
    }
  },[awards])
  return (
    <Template>
      <div className='row'>
        {cards}
      </div>
    </Template>
  )
}
