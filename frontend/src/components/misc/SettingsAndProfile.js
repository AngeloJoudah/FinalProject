import React from 'react'
import AvatarIcon from '../../icons/avatar.svg'
import { useState } from 'react'
import { useNavigate } from 'react-router'
export const SettingsAndProfile = ({image}) => {
  const [img, setImg] = useState(image)
  const nav = useNavigate()
  return (
<div className="row">
  <div className="offset-lg-11 offset-md-10 offset-xs-6 offset-sm-10 col-lg-1 col-md-2 col-sm-2 col-xs-6">
    <div className='justify-contents-center'>
      <img src={img ? img : AvatarIcon} onClick={()=>{nav('/me')}} style={{alignSelf:"center", borderRadius:"50%",aspectRatio:'1/1'}} className='img-fluid p-3' alt="Settings button" id="profile"  />
      <h3 style={{textAlign:"center"}}>{localStorage.getItem("user")}</h3>
    </div>
  </div>
</div>
  )
}
