import React, { useState, useRef, useEffect } from 'react'
import io from 'socket.io-client'
import immer from 'immer'
import NavBar from '../components/NavBar'
import ChatBubble from '../components/ChatBubble'
const initialMessageState = {
  1605: [],
  room2: [],
  room3: [],
}

export default function Subject(props) {
  const [active, setActive] = useState('Video')
  const [messages, setMessages] = useState(initialMessageState)
  const [message, setMessage] = useState('')
  const socketRef = useRef()

  console.log('MESSAGES:', messages[1605])

  const roomJoinCallback = (incomingMessages, room) => {
    const newMessages = immer(messages, draft => {
      draft[room] = incomingMessages
    })
    setMessages(newMessages)
  }

  useEffect(() => {
    socketRef.current = io.connect('http://localhost:8000/')
    socketRef.current.emit('join server', props.location.data.username)
    socketRef.current.emit('join room', props.match.params.subId, messages =>
      roomJoinCallback(messages, props.match.params.subId)
    )

    socketRef.current.on('new message', ({ content, sender, chatName }) => {
      setMessages(messages => {
        const newMessages = immer(messages, draft => {
          if (draft[chatName]) {
            draft[chatName].push({ content, sender })
          } else draft[chatName] = [{ content, sender }]
        })
        return newMessages
      })
    })
  })

  const options = ['Video', 'Powerpoint', 'Whiteboard']

  const buttonList = () => {
    return options.map(option => {
      let state = active === option ? 'active' : ''
      return (
        <button
          className={`list-group-item list-group-item-action ${state}`}
          onClick={e => {
            e.preventDefault()
            setActive(option)
          }}
        >
          {option}
        </button>
      )
    })
  }

  const handleKeyPress = e => {
    if (e.key === 'Enter') sendMessage()
  }

  const sendMessage = () => {
    const payload = {
      content: message,
      to: props.match.params.subId,
      sender: props.location.data.username,
      chatName: props.match.params.subId,
    }

    socketRef.current.emit('send message', payload)
    let subId = props.match.params.subId
    console.log(messages.subId)
    const newMessages = immer(messages, draft => {
      draft[props.match.params.subId].push({
        sender: props.location.data.username,
        content: message,
      })
    })
    setMessage('')
    setMessages(newMessages)
  }

  const chatText = () => {
    return (
      <>
        {messages[props.match.params.subId].map((message, idx) => (
          <ChatBubble key={idx} message={message} />
        ))}
      </>
    )
  }

  return (
    <div>
      <NavBar
        contents={`Welcome to ${props.match.params.subId}, ${props.location.data.username}!`}
      />
      <div className="container-fluid " style={{ backgroundColor: 'lightblue' }}>
        <div className="row">
          <div className="list-group col-3 py-5">{buttonList()}</div>
          <div className="blk col-6"></div>
        </div>
        <div className="row mt-4">
          <div className="col-3" />
          <div className="chatbox col-6">{chatText()}</div>
        </div>
        <div className="row mt-4">
          <div className="col-3" />

          <textarea
            className="textarea col-6"
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Send a message..."
          />
        </div>
      </div>
    </div>
  )
}
