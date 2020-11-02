import React, { useState, useRef, useEffect } from 'react'
import io from 'socket.io-client'
import immer from 'immer'
import NavBar from '../components/NavBar'
import ChatBubble from '../components/ChatBubble'
import VideoPlayer from '../components/VideoPlayer'
import Whiteboard from '../components/Whiteboard'
import Present from '../components/Present'

export default function Subject(props) {
  const [active, setActive] = useState('Video')
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')
  const socketRef = useRef()

  //   console.log('MESSAGES:', messages)

  const roomJoinCallback = (incomingMessages, room) => {
    // console.log('incomingMessages', incomingMessages)
    setMessages(incomingMessages)
  }

  useEffect(() => {
    socketRef.current = io.connect('http://localhost:8000/')
    socketRef.current.emit('join server', props.location.state.detail)
    socketRef.current.emit('join room', props.match.params.subId, messages =>
      roomJoinCallback(messages, props.match.params.subId)
    )

    socketRef.current.on('new message', ({ content, sender, chatName }) => {
      //   setMessages(messages => {
      //     const newMessages = immer(messages, draft => {
      //       if (draft[chatName]) {
      //         draft[chatName].push({ content, sender })
      //       } else draft[chatName] = [{ content, sender }]
      //     })
      //     return newMessages
      //   })
      setMessages([...messages, { content, sender }])
    })
  })

  const options = ['Video', 'Whiteboard', 'Powerpoint']

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
      sender: props.location.state.detail,
      chatName: props.match.params.subId,
    }

    socketRef.current.emit('send message', payload)
    console.log('Messages: ', messages)
    // const newMessages = immer(messages, draft => {
    //   draft[props.match.params.subId].push({
    //     sender: props.location.state.detail,
    //     content: message,
    //   })
    // })
    setMessages([...messages, { sender: props.location.state.detail, content: message }])
    setMessage('')
  }

  const chatText = () => {
    return (
      <>
        {messages.map((message, idx) => (
          <ChatBubble key={idx} message={message} />
        ))}
      </>
    )
  }

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    preload: 'none',
    height: '600px',
    width: '1000px',
    sources: [
      {
        src: 'http://ec2-13-235-70-74.ap-south-1.compute.amazonaws.com/hls/test_src.m3u8',
        type: 'application/x-mpegURL',
        label: 'src',
        res: '1080',
      },
      {
        src: 'http://ec2-13-235-70-74.ap-south-1.compute.amazonaws.com/hls/test_mid.m3u8',
        type: 'application/x-mpegURL',
        label: 'mid',
        res: '480',
      },
      {
        src:
          'http://ec2-13-235-70-74.ap-south-1.compute.amazonaws.com/hls/test_high.m3u8',
        type: 'application/x-mpegURL',
        label: 'high',
        res: '720',
      },
      {
        src: 'http://ec2-13-235-70-74.ap-south-1.compute.amazonaws.com/hls/test_low.m3u8',
        type: 'application/x-mpegURL',
        label: 'low',
        res: '360',
      },
    ],
  }
  //   ['Video', 'Powerpoint', 'Whiteboard']
  const mainContent = () => {
    if (active === 'Video') return <VideoPlayer {...videoJsOptions} />
    else if (active === 'Whiteboard')
      return <Whiteboard room={props.match.params.subId} socketRef={socketRef} />
    else if (active === 'Powerpoint') return <Present/>
  }

  return (
    <div>
      <NavBar
        contents={`Welcome to ${props.match.params.subId}, ${props.location.state.detail}!`}
      />
      <div className="container-fluid " style={{ backgroundColor: 'lightblue' }}>
        <div className="row">
          <div className="list-group col-3 py-5">{buttonList()}</div>
          <div className="col-6">
            {mainContent()}
            {/* <Whiteboard room={props.match.params.subId} socketRef={socketRef} /> */}
          </div>
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
