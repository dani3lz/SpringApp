import React, { useState, useEffect } from 'react'
import { request } from '../axios_helper'

function ProfileView() {

    const[userEmail, setUserEmail] = useState("");

    useEffect(() => {
        request(
          "GET",
          "/users/info",
          {}
        ).then((response) => {
          setUserEmail(response.data)
        }).catch((error) => {
          console.error("Error fetching users");
        });
      }, [])

  return (
    <>
    <h1>Profile Page!</h1>
    <h3>Your email is: <u>{userEmail}</u></h3>
    </>
  )
}

export default ProfileView