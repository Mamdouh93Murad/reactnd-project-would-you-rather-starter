import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Login from './Login'
import LoadingBar from 'react-redux-loading'
import Leaderboard from './Leaderboard'
import HomePage from './Homepage'
import NewQuestion from './NewQuestion'
import Questions from './Questions'
import Question from './Question'


class App extends Component {
  

    componentDidMount(){
        this.props.dispatch(handleInitialData())
    }

    render() {
      
        return (

          <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
          {this.props.loading === true
              ? <Login/>
              : <div>
                  <Route exact path='/' component={HomePage} />
                  <Route path='/Questions' component={Questions} />
                  <Route path='/Add' component={NewQuestion} />
                  <Route path = '/Leaderboard' component={Leaderboard} />
                  <Route path = '/Question/:id' component={Question} />
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