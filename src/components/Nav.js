import React, { Component, Fragment } from 'react'
import {Link, withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import { unsetAuthedUser } from '../actions/authedUser'
export class Nav extends Component {
    LogOut = (e) => {
        e.preventDefault()
        this.props.dispatch(unsetAuthedUser())
        this.props.history.push('/')
    }
    render() {
       
        return (
            <Fragment>
                {this.props.loading === true
                ?
                null
                :
                <ul style={{display:'flex', 'justifyContent': 'space-around'}}>
                    <li key='HomePage'><Link to='/'><span>Home Page</span></Link></li>
                    <li key='Questions'><Link to = '/Questions'><span>Questions</span></Link></li>
                    <li key='NewQuestions'><Link to = '/Add'><span>New Question</span></Link></li>
                    <li key='Leaderboard'><Link to = '/Leaderboard'><span>Leaderboard</span></Link></li>
                    <li key={this.props.loggedin}><span>Hello, {this.props.loggedin}!</span></li>
                    <li key='Login'><Link to = '/Login' onClick={this.LogOut}><span>Logout</span></Link></li>
                </ul>}
            </Fragment>
        )
    }
}

function mapStateToProps ({authedUser, users}) {
    var loggedin
    authedUser ? loggedin = users[authedUser].name
               : loggedin = null
    return {
      loading: authedUser === null, loggedin
      
    }
  }
  
export default withRouter(connect(mapStateToProps)(Nav))