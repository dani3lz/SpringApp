import React from 'react'

function HomeView() {
  return (
    <>
    <h1>Home Page!</h1>
    <a href='/profile'>My Profile</a>
    <a style={{marginLeft: '15px'}} href='/admin'>Admin Panel</a>
    </>
  )
}

export default HomeView