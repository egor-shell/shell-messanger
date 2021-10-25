// NPM
import React from "react";

// Files
import './UserInfo.css'

export const UserInfo = () => {
    const user = localStorage.getItem('user')

    console.log(user)

    return (
        <div className='userInfo'>
            <h4>{user}</h4>
        </div>
    )
}