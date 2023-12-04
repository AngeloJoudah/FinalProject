import React from 'react'
import { Image } from 'react-bootstrap'
import avatar from '../../icons/avatar.svg'
export const Recipient = ({image,name,col,onClick}) => {
  return (
    <div className='row' onClick={onClick}>
        <Image className={col} src={image ? image : avatar} rounded={true} />
        <h5 className={col} style={{textAlign:'center'}}>{name}</h5>
    </div>
  )
}
