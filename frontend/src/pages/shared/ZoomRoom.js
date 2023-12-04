import React from 'react'
import {Template} from './template'
import { Button } from 'react-bootstrap'
export const ZoomRoom = () => {
    const client_id = 'O06Zp5G2S1ORaByQI1UM6Q'
    const getZAK = async() =>{
      try{
        window.location.href = `https://zoom.us/oauth/authorize?response_type=code&client_id=${client_id}&redirect_uri=https://localhost:443/zoom/meeting`
      }
      catch(err){
        console.log(err)
      }
    }

  return (
    <Template>
        <div id='meetingSDKElement'>ZoomRoom</div>
        <Button onClick={getZAK}>Start a meeting</Button>
    </Template>
  )
}
