import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Template } from './template';
import { useSearchParams } from 'react-router-dom';
import ZoomMtgEmbedded from '@zoomus/websdk/embedded';
import { Button } from 'react-bootstrap';

export const ZoomMeeting = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const [meetingNumber, setMeetingNumber] = useState(null);
  const [meetingPassword, setMeetingPassword] = useState('');
  const [zak, setZak] = useState('');
  const client_id = '87esZo1CRee1aSSfMssyFA';

  const requestAccessToken = async () => {
    try {
      const zakRequest = await axios.post(
        `https://localhost:8081/api/v2/zoom/access`,
        { code: code, url: 'https://localhost:3000/zoom/meeting' },
        { headers: { 'Content-Type': 'application/json' } }
      );
      setZak(zakRequest.data.zak);
      setMeetingNumber(zakRequest.data.mn);
      setMeetingPassword(zakRequest.data.password);

      console.log(zakRequest.data);
    } catch (err) {
      console.log(err);
    }
  };

  const startMeeting = async () => {
    try {
      const client = ZoomMtgEmbedded.createClient();
      await requestAccessToken();
      console.log('After state update:', zak, meetingNumber, meetingPassword);
      const username = localStorage.getItem('user');
      let meetingSDKElement = document.getElementById('meetingSDKElement');
      console.log('Meeting Number: ' + meetingNumber);
      const sig = await axios.post('https://localhost:8081/api/v2/zoom/CreateMeetingToken', {
        mn: meetingNumber,
      });
      console.log({
      sdkKey: client_id,
      signature: sig.data,
      meetingNumber: meetingNumber,
      password: meetingPassword,
      userName: username,
      zak: zak})
      await client.init({ zoomAppRoot: meetingSDKElement, language: 'en-US' });
      await client.join({
        sdkKey: client_id,
        signature: sig.data,
        meetingNumber: meetingNumber,
        password: meetingPassword,
        userName: username,
        zak: zak,
      });
      console.log(client.getCurrentMeetingInfo())
    } catch (error) {
      ZoomMtgEmbedded.destroyClient();
      console.error('Error starting the meeting:', error);
    }
  };

  useEffect(() => {
    // Fetch meeting details when the component mounts
    if (code) {
      requestAccessToken();
    }
  }, [code]);

  useEffect(() => {
    // This will log the updated state values after they are set
    console.log('State values:', zak, meetingNumber, meetingPassword);
  }, [zak, meetingNumber, meetingPassword]);

  return (
    <Template>
      <div id='meetingSDKElement'>ZoomRoom</div>
      <Button onClick={startMeeting}>Start the meeting</Button>
    </Template>
  );
};