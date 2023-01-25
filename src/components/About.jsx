import React, { useEffect } from 'react'

const About = () => {

  useEffect(() => {
    document.title = "About Us - CLoudNote Pro"
  }, [])

  return (
    <>
      <div className="container" style={{ padding: "5rem" }}>
        <div className="row">
          <div className="col-4 text-center">
            <img src="/logo512.png" className="rounded" alt="logo" style={{ width: '50%' }} />
          </div>
          <div className="col-8">
            <h1 style={{ paddingBottom: "1rem" }}>About Us</h1>
            <p >
              Welcome to CloudNote Pro! Our app is a powerful and easy-to-use notes taking tool that allows you to store and manage your notes in the cloud. Built using the MERN stack, CloudNote Pro allows you to sign up and log in to access your notes. Once logged in, you can easily create, edit, and delete notes, as well as view them at any time.
            </p>
            <p >
              One of the key features of Cloud Note Pro is that it is a Progressive Web App (PWA), meaning it can be accessed from any device with a web browser, and can even be installed on your device for offline use.
              In addition, we take the security of your notes very seriously, so we have implemented robust security measures to ensure that your notes are always safe and secure and your password are encypted so no can can see it.
            </p>
            <p >
              Thank you for choosing Cloud Note Pro! We hope you find it to be a valuable tool for organizing and managing your notes.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default About