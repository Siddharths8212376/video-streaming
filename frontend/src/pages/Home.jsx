import React from 'react'
import { v1 as uuid } from 'uuid'

export default function Home(props) {
  const create = () => {
    const id = uuid()
    props.history.push(`/room/${id}`)
  }

  return (
    <div>
      <h1>Create a room</h1>
      <button onClick={create}>Create room</button>
    </div>
  )
}
