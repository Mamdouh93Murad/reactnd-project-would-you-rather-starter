import React, { Component } from 'react'
import { handleAddUser } from '../actions/users'
// import {Link} from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'
import { connect } from 'react-redux'
import { Dropdown } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { Redirect } from 'react-router-dom'
export class Login extends Component {
    state = {
        id:'',
        name:'',
        password : '',
        avatarURL:'',
        toHome: false
      }
      handleChangeUp = (event) => {
        if (event.target.name === 'id') {
            this.setState({id:event.target.value})
          } else if (event.target.name === 'name'){
            this.setState({name: event.target.value})
          } else if (event.target.name === 'password'){
            this.setState({password: event.target.value})
          }
          else if (event.target.name === 'avatarURL'){
            this.setState({avatarURL: event.target.value})
          }
      }

      handleSubmitUp = (event) => {
        event.preventDefault()
        const{dispatch} = this.props
        dispatch(handleAddUser(this.state.id, this.state.name, this.state.password, this.state.avatarURL))
        
        this.setState(() => ({
            id: '',
            name:'',
            password : '',
            avatarURL:'',
            toHome: true
          }))
        }

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
        if (this.state.toHome === true) {
            return <Redirect to='/'/>
          } else {
        return (
            <div>
                <h1 style={{textAlign: 'center'}}>Choose Login User</h1>
                <div style={{textAlign : 'center'}}>
                    <Dropdown
                        placeholder='Choose User'
                        selectOnBlur={false}
                        selection
                        onChange={this.handleChange}
                        options={friendOptions}
                    />
                </div>
            <div>
            <br></br> 
            <h3 style={{textAlign:'center'}}>To Sign Up</h3>
            <div style={{textAlign:'center', justifyContent: 'space-around'}}>
                <h2>Please Insert User Details</h2>
            </div>
            <div style={{textAlign:'center', justifyContent: 'space-evenly'}}>
                <div className="new-user">
                    
                    <input
                        style={{margin:'5px'}}
                        name='id'
                        className="user-input"
                        type="text"
                        placeholder="User Name"
                        value={this.state.id}
                     onChange={this.handleChangeUp}
                     />   
                </div>
                <div className="new-user">
                    <input
                        style={{margin:'5px'}}
                        name ='name'
                        className="user-input"
                        type="text"
                        placeholder="Real Name"
                        value={this.state.name}
                        onChange={this.handleChangeUp}
                    />
                </div>
                <div className="new-user">
                    <input
                        style={{margin:'5px'}}
                        name ='password'
                        className="user-input"
                        type="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.handleChangeUp}
                    />   
                </div>
                <div className="new-user">
                    <input
                        style={{margin:'5px'}}
                        name ='avatarURL'
                        className="user-input"
                        type="text"
                        placeholder="AvatarURL"
                        value={this.state.avatarURL}
                        onChange={this.handleChangeUp}
                    />   
                </div>
            </div>
            <div style={{textAlign:'center'}}>
                <button style={{margin:'5px'}} disabled={(this.state.id.length === 0 || this.state.name.length === 0 || this.state.avatarURL.length === 0)} type="Submit"  onClick={this.handleSubmitUp}>Submit</button>
            </div>
        </div>
        </div>
        )
    }
}
}

function mapStateToProps({users}) {
    return {users: Object.values(users)}
  }
export default  connect(mapStateToProps)(Login)


