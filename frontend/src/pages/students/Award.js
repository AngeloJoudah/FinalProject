import React, { useState, useEffect } from 'react';
import { Template } from '../shared/template';
import { useParams } from 'react-router';
import Confetti from 'react-confetti';
import Trophy from '../../icons/trophy-sharp.svg';
import axios from 'axios';
import { Card } from 'react-bootstrap';

export const Award = () => {
    const { awardId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [message,setMessage] = useState('')
    const [title,setTitle] = useState('')
    const [image,setImage] = useState('')
    const getAward = async () => {
        try {
            const req = await axios.get(`http://localhost:8081/api/v2/awards/awardId/${awardId}`);
            const data = req.data.mapped._doc
            setTitle(data.title)
            setMessage(data.message)
            const base64String = btoa(String.fromCharCode(...new Uint8Array(req.data.mapped.image.data)))
            const right = base64String.split(/base64/i)[1]
            setImage(`data:${data.sticker.fileType};base64,${right}`)
        } catch (err) {
            // Handle error
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getAward();
    }, []);

    return (
        <Template >
            <div className='row'>
                <img className='col-3' src={Trophy} />
                <img className='offset-6 col-3' src={Trophy} />
                <h1 style={{textAlign:"center"}} className='mb-5'>Congratulations!</h1>
                <h3 style={{textAlign:"center"}} className='my-5'>One of your teachers think you did a swell job!</h3>
                <Card>
                    <Card.Header>
                    <Card.Title style={{textAlign:"center"}} ><h1><strong>On: {title}</strong></h1></Card.Title>
                    </Card.Header>
                    <Card.Body>
                    <Card.Text style={{marginBottom:"20vh"}}><h4><strong>Here's what they had to say...</strong></h4></Card.Text>
                    <Card.Text style={{textAlign:"center"}}><h1><strong> {message}</strong></h1></Card.Text>
                    <Card.Img  style={{aspectRatio:'1/1'}} src={image} />
                    </Card.Body>
                </Card>
            </div>
            <Confetti numberOfPieces={200} recycle={false} />
        </Template>
    );
};
