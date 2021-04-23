import './App.css'
import React from 'react'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'
import Container from '@material-ui/core/Container'
import { Button, AppBar, Toolbar } from '@material-ui/core'
import Notification from './components/Notification'
import Home from './views/Home/index'
import Create from './views/Create/index'
import Details from './views/Details/index'
import { BlogsContextProvider } from './context/BlogsContext'
import { NotificationContextProvider } from './context/NotificationContext'

const App = () => {

  return (
    <BlogsContextProvider>
      <NotificationContextProvider>
        <Router>
          <AppBar position='static'>
              <Toolbar>
                <Button color='inherit' component={Link} to='/'>
                  Home
                </Button>
                <Button color='inherit' component={Link} to='/create'>
                  Create Blog
                </Button>
              </Toolbar>
          </AppBar>

          <Notification />

          <Container align='center'>
            <Switch>
                <Route path='/details/:id'>
                  <Details />
                </Route>
                <Route path='/create'>
                  <Create />
                </Route>
                <Route path='/'>
                  <Home />
                </Route>   
            </Switch>
          </Container> 
        </Router>
      </NotificationContextProvider>
    </BlogsContextProvider>  
  )
}

export default App;
