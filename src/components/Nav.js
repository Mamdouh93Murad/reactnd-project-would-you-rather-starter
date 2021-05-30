import React, { Component, Fragment } from 'react'
import {Link, withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import { unsetAuthedUser } from '../actions/authedUser'
import { Button, Menu } from 'semantic-ui-react'

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
                <Menu tabular style={{display:'flex', listStyle:'none'}}>
                    <Menu.Item style={{marginLeft:'50px'}}/*key={'NewQuestion'} */><Link to = '/'><span>Home Page</span></Link></Menu.Item>
                    <Menu.Item style={{marginLeft:'50px'}}/*key={'NewQuestion'} */><Link to = '/New'><span>New Question</span></Link></Menu.Item>
                    <Menu.Item style={{marginLeft:'50px'}}/*key={'Leaderboard'} */><Link to = '/Leaderboard'><span>Leaderboard</span></Link></Menu.Item>
                    <Menu.Item style={{marginLeft:'auto', marginRight:'100px'}}/*key={'Loggedin} */><span>Hello, {this.props.loggedin}!</span></Menu.Item>
                    <Menu.Item style={{ marginRight:'100px'}}/*key={'Logout'} */><Button  negative to = '/Login' onClick={this.LogOut}><span>Logout</span></Button></Menu.Item>
                    
                </Menu>}
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