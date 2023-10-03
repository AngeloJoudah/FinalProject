import { Header } from "../../components/Header/Header";
import { Footer } from '../../components/Footer/Footer'
import { SettingsAndProfile } from "../../components/misc/SettingsAndProfile";
import React from 'react'

export const Template = ({children}) => {
  return (
    <div className="container-fluid">
            <Header/>
            <SettingsAndProfile/>
            {children}
            <Footer/>
    </div>
  )
}
