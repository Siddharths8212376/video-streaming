import React from 'react'

export default function ChatBubble({ message }) {
  return (
    <div className="bubble">
      <h5 style={{ margin: '0px' }}>{message.sender}</h5>
      <p style={{ margin: '0px' }}>{message.content}</p>
    </div>
  )
}
