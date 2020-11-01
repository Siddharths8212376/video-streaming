import React, { useEffect } from 'react'
import Board from './Board'

import './whiteboard.css'

export default function Whiteboard({ room, socketRef }) {
  return (
    <div className="whiteboard-container">
      <div className="colorpicker-container">
        <input type="color" />
      </div>
      <div className="board-container">
        <Board room={room} socketRef={socketRef} />
      </div>
    </div>
  )
}
