import React, { Component, Fragment } from 'react'
import {Link, withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import { unsetAuthedUser } from '../actions/authedUser'
import { Redirect } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

export class Nav extends Component {
    LogOut = (e) => {
        e.preventDefault()
        this.props.dispatch(unsetAuthedUser());
       
    }
    render() {
       
        return (
            <Fragment>
                {this.props.loading === true
                ?
                null
                :
                <ul style={{display:'flex', listStyle:'none'}}>
                    
                    <li style={{marginLeft:'50px'}}/*key={'HomePage'} */><Link to='/'><span>Home Page</span></Link></li>
                    <li style={{marginLeft:'50px'}}/*key={'NewQuestion'} */><Link to = '/New'><span>New Question</span></Link></li>
                    <li style={{marginLeft:'50px'}}/*key={'Leaderboard'} */><Link to = '/Leaderboard'><span>Leaderboard</span></Link></li>
                    <li style={{marginLeft:'auto', marginRight:'100px'}}/*key={'Loggedin} */><span>Hello, {this.props.loggedin}!</span></li>
                    
                    
                    <li style={{ marginRight:'100px'}}/*key={'Logout'} */><Button primary to = '/Login' onClick={this.LogOut}><span>Logout</span></Button></li>
                    
                </ul >}
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