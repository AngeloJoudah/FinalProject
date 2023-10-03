// ALL Messages
import { Template } from './template'
import { Image } from 'react-bootstrap'
import PhoneIcon from '../../icons/phone-icon.svg'
import CalendarIcon from '../../icons/calendar-outline.svg'
import React from 'react'

export const Messages = () => {

  return (
    <Template>
        <div className='row'>

        </div>
        <div className='row'>
            <h1 className='col-4'>Who am I?</h1>
        </div>
        <div className='row'>
            <p> There should be a description here.</p>
        </div>
        <div className='row'>
          <div className='"offset-lg-11 offset-md-10 offset-6 offset-sm-10 col-lg-1 col-md-2 col-sm-2 col-6"'>
            <img src={PhoneIcon} className="p-3"  />
            <img src={CalendarIcon} className="p-3" />
          </div>
        </div>
    </Template>
  )
}