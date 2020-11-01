import React from 'react'

export default function ChatBubble({ message }) {
  return (
    <div className="bubble">
      <h4 style={{ margin: '0px' }}>{message.sender}</h4>
      <p style={{ margin: '0px' }}>{message.content}</p>
    </div>
  )
}
