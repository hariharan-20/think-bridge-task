import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from './Components/Login/Login' 
import Dashboard from './Components/Dashboard/Dashboard'

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' component={Login} exact={true} />
        <Route path= '/Dashboard' component={Dashboard} />
      </Switch>
    </BrowserRouter>
  )
}

export default App