import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Home from './pages/Home'
import Room from './pages/Room'
import Subject from './pages/Subject'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/room/:roomId" component={Room} />
        <Route path="/subject/:subId" component={Subject} />
      </Switch>
    </Router>
  )
}

export default App
