import React from 'react'

export default function Subject(props) {
    console.log(props)
   return (
       <div>
           <p>Current User: {props.location.state.detail}</p>
           <h3>Welcome to {props.match.params.subId}</h3>
       </div>
   ) 
}