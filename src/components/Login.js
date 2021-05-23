import React, { Component } from 'react'
import Nav from './Nav'
import { setAuthedUser } from '../actions/authedUser'
import { connect } from 'react-redux'
// import {Link, withRouter} from 'react-router-dom'
import { Dropdown } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

export class Login extends Component {

    handleChange = (e,data) => {
        e.preventDefault()
        this.props.dispatch(setAuthedUser(data.value))
        
    }  
    render() {
        const { users} = this.props
        const friendOptions = []
        for (var user of users){
            friendOptions.push({
                text: user.name,
                value: user.id,
                image: { avatar: true, src: user.avatarURL },
            })
        }
        return (
            <div>
                <Nav />
                <h1 style={{textAlign: 'center'}}>Choose Login User</h1>
                <div style={{textAlign : 'center'}}>
                    <Dropdown
                        placeholder='Choose User'
                        // fluid
                        selection
                        onChange={this.handleChange}
                        options={friendOptions}
                    />
                </div>
            </div>
        )
    }
}

function mapStateToProps({users}) {
   
    return {users: Object.values(users)}
  }
export default  connect(mapStateToProps)(Login)


