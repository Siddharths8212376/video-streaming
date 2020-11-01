import React, { useState } from 'react'
import { v1 as uuid } from 'uuid'
import axios from 'axios'
const baseUrl = 'http://localhost:8000/api/login'


export default function Home(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [userType, setUserType] = useState('student')
  const [username, setUsername] = useState('')
  const create = () => {
    const id = uuid()
    props.history.push(`/room/${id}`)
  }
  const NavBar = ({contents, roomtype, uname}) => {
    return (
    <nav className="navbar navbar-dark bg-dark" style={{justifyContent:"center", color:"white"}}>{contents} {roomtype}'s portal {uname}!</nav>
  )}
  const NavBarLogin = ({contents}) => {
    return (
    <nav className="navbar navbar-dark bg-dark" style={{justifyContent:"center", color:"white"}}>{contents}</nav>
  )}
  const loginForm = () => (
    <div style={{backgroundColor:'lightblue'}}>
      <NavBarLogin contents="Join Classroom"/>
    <div style={{width:"100%", height:"92vh", display:"flex", justifyContent:'center', alignItems:'center'}}> 
      <div className="card" style={{width: "18rem", padding: "25px"}}>
    <form onSubmit={handleLogin}>
    <div className="form-group" >
      <label for="email">Email</label>
        <input
        className="form-control"
        type="email"
        value={email}
        name="Email"
        onChange={({ target }) => setEmail(target.value)}
      />
    </div>
    <div className="form-group" >
      <label for="password">Password</label>
        <input
        type="password"
        className="form-control"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    <button className="btn btn-primary" type="submit">login</button>
  </form>   
  </div>
  </div>
  </div>
  )

  const studentLandingPage = () => (
    <div style={{backgroundColor:'lightblue'}}>
      <NavBar contents="Welcome to " uname={username} roomtype={userType} />
   <div style={{width:"100%", height:"92vh", display:"flex", justifyContent:'center', alignItems:'center'}}> 
      <table className="table table-dark" style={{width:"20rem"}}>
        <thead>
          <tr>
            <th scope="col">Subjects</th>
            <th scope="col">Classrooms</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Subject 1</th>
            <td><button className="btn btn-primary">Join Class</button></td> 
          </tr>
           <tr>
            <th scope="row">Subject 2</th>
            <td><button className="btn btn-primary">Join Class</button></td> 
          </tr>
          <tr>
            <th scope="row">Subject 3</th>
            <td><button className="btn btn-primary">Join Class</button></td> 
          </tr>
        </tbody>
      </table>
    </div>
    </div>
  )
  const teacherLandingPage = () => (
    <div style={{backgroundColor:"lightblue"}}>
    <NavBar contents="Welcome to " uname={username} roomtype={userType}/>
 <div style={{width:"100%", height:"92vh", display:"flex", justifyContent:'center', alignItems:'center'}}> 
    <table className="table table-dark" style={{width: "20rem"}}>
      <thead>
        <tr>
          <th scope="col">Subjects</th>
          <th scope="col">Classrooms</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Subject 1</th>
          <td><button className="btn btn-primary" onClick={create}>Create Class</button></td> 
        </tr>
         <tr>
          <th scope="row">Subject 2</th>
          <td><button className="btn btn-primary" onClick={create}>Create Class</button></td> 
        </tr>
        <tr>
          <th scope="row">Subject 3</th>
          <td><button className="btn btn-primary" onClick={create}>Create Class</button></td> 
        </tr>
      </tbody>
    </table>
  </div>
  </div>
  )
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await axios.post(baseUrl, {email, password}) 
      setUser(user)
      setEmail('')
      setPassword('')
      const type = user.data.type 
      setUserType(type)
      setUsername(user.data.username)
    } catch (exception) {
      console.log(exception)
      console.log('wrong credentials')
    }
  }
  return (
    <div>
      {user === null && loginForm()}
      {user !== null && (userType==='student' ? studentLandingPage() : teacherLandingPage())}
    
    </div>
  )
}
