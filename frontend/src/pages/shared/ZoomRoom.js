import React from 'react'
import {Template} from './template'
import { Button } from 'react-bootstrap'
import axios from 'axios'
export const ZoomRoom = () => {
    const client_id = '87esZo1CRee1aSSfMssyFA'
    const getZAK = async() =>{
      try{
        window.location.href = `https://zoom.us/oauth/authorize?response_type=code&client_id=87esZo1CRee1aSSfMssyFA&redirect_uri=https://localhost:3000/zoom/meeting`
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
