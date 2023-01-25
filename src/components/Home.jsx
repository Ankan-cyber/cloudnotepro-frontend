import React, { useEffect } from "react"
import Notes from "./Notes"

const Home = () => {
  useEffect(() => {
    document.title = "Home - CLoudNote Pro"
  }, [])
  return (
    <>
      <Notes />
    </>
  )
}

export default Home