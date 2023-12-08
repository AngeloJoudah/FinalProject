import React from 'react';
import axios from 'axios';
import { Template } from './template';
import { useSearchParams } from 'react-router-dom';
import ZoomMtgEmbedded from '@zoomus/websdk/embedded';
import { Button } from 'react-bootstrap';
export const ZoomMeeting = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const client_id = 'O06Zp5G2S1ORaByQI1UM6Q';

  const requestAccessToken = () => {
    axios.post(
      `https://ofcourse.website/api/v2/zoom/access`,
      { code: code, url: 'https://ofcourse.website:443/zoom/meeting' },
      { headers: { 'Content-Type': 'application/json' } }
    )
    .then(zakRequest => {
      const { zak, mn, password, tk } = zakRequest.data;
      startMeeting(zak, mn, password, tk);
    })
    .catch(err => {
      console.log(err);
    });
  };

  const startMeeting = (zak, mn, password, tk, email) => {
    const client = ZoomMtgEmbedded.createClient();
    const username = localStorage.getItem('user');
    let meetingSDKElement = document.getElementById('meetingSDKElement');

    axios.post('https://ofcourse.website/api/v2/zoom/CreateMeetingToken', {
      mn: mn,
    })
    .then(promise => {
      console.log(mn)
      client.init({ zoomAppRoot: meetingSDKElement, language: 'en-US', debug: true, patchJsMedia:true })
        .then(() => {
          client.join({
            sdkKey: client_id,
            signature: promise.data,
            meetingNumber: mn,
            password: password,
            userName: username,
            userEmail:'angelojoudah@gmail.com',
            zak: zak,
            success: (success) => {
              console.log('joined successfully');
            },
            error: (error) => {
              console.log(error);
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
  };

  return (
    <Template>
      <div id='meetingSDKElement'>ZoomRoom</div>
      <Button onClick={requestAccessToken}>Start the meeting</Button>
    </Template>
  );
};