import React from 'react'
import SettingsIcon from '../../icons/settings-outline.svg'
import AvatarIcon from '../../icons/avatar.svg'
import { useState } from 'react'
export const SettingsAndProfile = ({image}) => {
  const [img, setImg] = useState(image)
  return (
<div className="row">
  <div className="offset-lg-11 offset-md-10 offset-6 offset-sm-10 col-lg-1 col-md-2 col-sm-2 col-6">
    <div className='justify-contents-center'>
      <img src={img} style={{alignSelf:"center"}} className='img-fluid p-3' alt="Settings button" id="profile" onError={()=>setImg(AvatarIcon)}  />
      <h3 style={{textAlign:"center"}}>{localStorage.getItem("user")}</h3>
    </div>
    <img src={SettingsIcon} className='p-3' alt="Settings button" id="gear" />
  </div>
</div>
  )
}
