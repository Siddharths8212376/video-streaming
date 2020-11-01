import React, { useState, useRef, useEffect } from 'react'
import io from 'socket.io-client'
import Peer from 'simple-peer'

import Video from '../components/Video'

const videoConstraints = {
  height: window.innerHeight / 2,
  width: window.innerWidth / 2,
}

export default function Room(props) {
  const [peers, setPeers] = useState([])
  const socketRef = useRef()
  const userVideo = useRef()
  const peersRef = useRef([])
  const roomId = props.match.params.roomId

  useEffect(() => {
    socketRef.current = io.connect('http://localhost:8000/')
    navigator.mediaDevices
      .getUserMedia({ video: videoConstraints, audio: true })
      .then(stream => {
        userVideo.current.srcObject = stream
        socketRef.current.emit('join p2p room', roomId)
        socketRef.current.on('all users', users => {
          const tempPeers = []
          users.forEach(userId => {
            const peer = createPeer(userId, socketRef.current.id, stream)
            peersRef.current.push({
              peerID: userId,
              peer,
            })
            tempPeers.push(peer)
          })
          setPeers(tempPeers)
          console.log('peers:', tempPeers.length)
        })
        socketRef.current.on('user joined', payload => {
          const peer = addPeer(payload.signal, payload.callerID, stream)
          peersRef.current.push({
            peerID: payload.callerID,
            peer,
          })

          setPeers(users => [...users, peer])
        })

        socketRef.current.on('receiving returned signal', payload => {
          const item = peersRef.current.find(p => p.peerID === payload.id)
          item.peer.signal(payload.signal)
        })
      })
  }, [])

  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    })

    peer.on('signal', signal => {
      socketRef.current.emit('sending signal', { userToSignal, callerID, signal })
    })

    return peer
  }

  function addPeer(incomingSignal, callerID, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    })

    peer.on('signal', signal => {
      socketRef.current.emit('returning signal', { signal, callerID })
    })

    peer.signal(incomingSignal)

    return peer
  }

  return (
    <div id="container">
      <video className="video" muted ref={userVideo} autoPlay playsInline />
      {peers.map((peer, index) => {
        console.log(peer)
        return <Video key={index} peer={peer} />
      })}
    </div>
  )
}
