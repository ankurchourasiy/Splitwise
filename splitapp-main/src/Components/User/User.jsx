import React, { useState,useEffect } from 'react'
import './User.css'
const User = () => {
  const [name,setUserName]=useState('');
  const [email,setEmail]=useState('');

  useEffect(() => {
    const Name = localStorage.getItem('userName');
    if (Name) {
      setUserName(Name);
    }

    const Email = localStorage.getItem('Email');
    if (Email) {
      setEmail(Email);
    }
  }, []); //
  return (
    <div className="user-profile">
    <div className="user-photo">
      <img src="https://picsum.photos/id/3/200/300" alt="User" />
    </div>
    <div className="user-details">
      <div className="user-field">
        <label>Name:</label>
         <p>{name}</p>
      </div>
      <div className="user-field">
        <label>Email:</label>
        <p>{email} </p>
      </div>
      <div className="user-field">
        <label>Age:</label>
        <p>30</p>
      </div>
      <div className="user-field">
        {/* <label>Social Media Handles</label><br></br> */}
        
      </div>
    </div>
  </div>
  )
}

export default User