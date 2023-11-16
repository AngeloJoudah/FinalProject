import axios from 'axios';
import express from 'express';
const KJUR = require('jsrsasign')
const ZoomRouter = express.Router();
const querystring = require('querystring')
ZoomRouter.post('/CreateMeetingToken', async (request, response) => {
    try {
        const iat = Math.round(new Date().getTime() / 1000);
        const exp = iat + 60 * 60 * 2;

        const oHeader = { alg: 'HS256', typ: 'JWT' };
        const sHeader = JSON.stringify(oHeader);

        const oPayload = {
            appKey: process.env.ZOOM_SDK_CLIENT_ID,
            sdkKey: process.env.ZOOM_SDK_CLIENT_ID,
            meetingNumber: request.body.mn,
            role: 1,
            iat: iat,
            exp: exp,
            tokenExp: exp,
        };

        const sPayload = JSON.stringify(oPayload);

        // Sign the JWT
        const sdkJWT = KJUR.jws.JWS.sign('HS256', sHeader, sPayload, process.env.ZOOM_SDK_CLIENT_SECRET);

        return response.status(200).json(sdkJWT);
    } catch (err) {
        console.log(err);
        return response.status(500).json({ error: 'Internal server error' });
    }
});

ZoomRouter.post('/JoinMeetingToken',async(request,response)=>{
    try{
        const iat = Math.round(new Date().getTime() / 1000) - 30
        const exp = iat + 60 * 60 * 2
        const oHeader = { alg: 'HS256', typ: 'JWT' }
        const sHeader = JSON.stringify(oHeader)
        const oPayload = {
            "appKey": process.env.ZOOM_SDK_CLIENT_ID,
            "sdkKey": process.env.ZOOM_SDK_CLIENT_ID,
            "mn": request.body.mn,
            "role": 0,
            "iat": iat,
            "exp": exp,
            "tokenExp": exp
        }
        const sPayload = JSON.stringify(oPayload)
        const sdkJWT = KJUR.jws.JWS.sign('HS256', sHeader, sPayload, process.env.ZOOM_SDK_CLIENT_SECRET)
        return response.status(200).json(sdkJWT)
    }
    catch(err){
        console.log(err)
        return response.status(500).json({error:'Internal server error'})
    }
})


ZoomRouter.post('/access', async (request, response) => {
    if (!request.body.code || !request.body.url) {
        return response.status(400).json({ error: 'Invalid request body' });
    }

    try {
        const client_id = process.env.ZOOM_SDK_CLIENT_ID;
        const client_secret = process.env.ZOOM_SDK_CLIENT_SECRET;

        const data = {
            code: request.body.code,
            grant_type: 'authorization_code',
            redirect_uri: request.body.url,
        };

        const formData = querystring.stringify(data);

        const authHeader = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

        const config = {
            headers: {
                Authorization: `Basic ${authHeader}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };

        const accessToken = (await axios.post('https://zoom.us/oauth/token', formData, config)).data.access_token;
        console.log(`Bearer ${accessToken}`)
        const zakToken = await axios.get('https://api.zoom.us/v2/users/me/token?type=zak',{headers:{Authorization:'Bearer ' + accessToken}})
        let working = false
        let tryCounter = 0
        let meeting = null
        const pause = (milliseconds:number) => {
            return new Promise(resolve => setTimeout(resolve, milliseconds));
          };
        await pause(5000);
        while(!working && tryCounter <= 2){
            try{

                meeting = await axios.post('https://api.zoom.us/v2/users/me/meetings',{},{
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    },
                })
                working = true
                console.log('success')
            }catch{
                tryCounter += 1
                console.log('catch')
                await pause(10000);
            }
        }
        console.log(meeting?.data)
        return response.status(200).json({zak:zakToken.data.token,mn:meeting?.data.id,password:meeting?.data.password,email:meeting?.data.host_email});
    } catch (err) {
        console.log(err)
        return response.status(500).json({ error: 'Internal server error' });
    }
});

export default ZoomRouter;