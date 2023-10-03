import React from 'react'
import SettingsIcon from '../../icons/settings-outline.svg'
import AvatarIcon from '../../icons/avatar.svg'
export const SettingsAndProfile = () => {
  return (
<div className="row">
  <div className="offset-lg-11 offset-md-10 offset-6 offset-sm-10 col-lg-1 col-md-2 col-sm-2 col-6">
    <img src={AvatarIcon} className='p-3' alt="Settings button" id="profile" />
    <img src={SettingsIcon} className='p-3' alt="Settings button" id="gear" />
  </div>
</div>
  )
}
