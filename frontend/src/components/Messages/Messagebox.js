import React from 'react';
import Card from 'react-bootstrap/Card';

export const Messagebox = ({ text, userImage, otherImage }) => {
  const regExp = new RegExp(localStorage.getItem('user'));
  const isUserMessage = regExp.test(text);

  const offsets = isUserMessage ? 'offset-7' : 'offset-1';

  const ind = text.indexOf(':');
  const split = text.slice(0, ind - 1);
  const message = text.slice(ind + 1, text.length);
  const date = new Date(split * 10);
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const year = date.getUTCFullYear();
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const formattedDate = `${month}/${day}/${year} ${hours}:${minutes}`;

  return (
    <div className='row'>
      <Card className={`mb-3 col-3 ${offsets}`}>
        <Card.Img src={isUserMessage ? userImage : otherImage} style={{ maxHeight: '200px', maxWidth: '200px' }} />
        <Card.Body>
          <Card.Title></Card.Title>
          <Card.Text>
            <h6 style={{ opacity: '40%' }}>{formattedDate}</h6>
            <h6>{message}</h6>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};