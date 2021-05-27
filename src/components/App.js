import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Login from './Login'
import LoadingBar from 'react-redux-loading'
import Leaderboard from './Leaderboard'
import HomePage from './Homepage'
import NewQuestion from './NewQuestion'
import Question from './Question'
import Nav from './Nav'

class App extends Component {
    componentDidMount(){
        this.props.dispatch(handleInitialData())
    }

    render() {
      
        return (

          <Router>
        <Fragment>
          <LoadingBar />
          <Nav />
          <div className='container'>
          {this.props.loading === true
              ? <Login/>
              : <div>
                  <Route exact path='/' component={HomePage} />
                  <Route exact path='/New' component={NewQuestion} />
                  <Route exact path = '/Leaderboard' component={Leaderboard} />
                  <Route path = '/Questions/:id' component={Question} />
                </div>}
          </div>
        </Fragment>
      </Router>
        )
    }
}


function mapStateToProps ({ authedUser }) {
    return {
      loading: authedUser === null
    }
  }
  
export default connect(mapStateToProps)(App)