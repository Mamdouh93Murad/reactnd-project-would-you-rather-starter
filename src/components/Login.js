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
        idIn:'',
        name:'',
        password : '',
        passwordUp : '',
        avatarURL:'',
        toHome: false
      }
      handleChangeUp = (event) => {
        if (event.target.name === 'id') {
            this.setState({id:event.target.value})
          } else if (event.target.name === 'name'){
            this.setState({name: event.target.value})
          } else if (event.target.name === 'password-up'){
            this.setState({passwordUp: event.target.value})
          }
          else if (event.target.name === 'avatarURL'){
            this.setState({avatarURL: event.target.value})
          }
      }
      handleChangeIn = (event) => {
        if (event.target.name === 'password-in'){
            this.setState({password: event.target.value})
        }
    }

      handleSubmitUp = (event) => {
        event.preventDefault()
        const{dispatch} = this.props
        dispatch(handleAddUser(this.state.id, this.state.name, this.state.passwordUp, this.state.avatarURL))
        
        this.setState(() => ({
            id: '',
            name:'',
            passwordUp: '',
            avatarURL:'',
            toHome: true
          }))
        }

        handleSubmitIn = (event) => {
            event.preventDefault()
            var user_id
            var loginPassword
                this.props.users.map((user) =>
                    {if(user.id === this.state.idIn)
                    {
                        user_id = user.id
                        loginPassword = user.password
                    }
                    })    
                
                {if(user_id === this.state.idIn && loginPassword === this.state.password)
                {
                    this.props.dispatch(setAuthedUser(this.state.idIn))
                    this.setState(() => ({
                        idIn: '',
                        password: '',
                      }))
                }
                else
                {

                    alert('Wrong User Info')
                }                
                }
        
    }  

    handleChange = (event,data) => {
        event.preventDefault()
        this.setState({idIn: data.value})
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
                    <input
                        style={{margin:'5px'}}
                        name ='password-in'
                        className="user-input"
                        type="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.handleChangeIn}
                    />  
                    <div style={{textAlign:'center'}}>
                        <button style={{margin:'5px'}} disabled={(this.state.password.length === 0)} type="Submit"  onClick={this.handleSubmitIn}>Submit</button>
                    </div>
                </div>
            <div>
            <br></br> 
            <h1 style={{textAlign:'center'}}>To Sign Up</h1>
            <div style={{textAlign:'center', justifyContent: 'space-around'}}>
                <h3>Please Enter User Details</h3>
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
                        name ='password-up'
                        className="user-input"
                        type="password"
                        placeholder="Password"
                        value={this.state.passwordUp}
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
                <button style={{margin:'5px'}} disabled={(this.state.id.length === 0 || this.state.name.length === 0 || this.state.passwordUp.length === 0 || this.state.avatarURL.length === 0)} type="Submit"  onClick={this.handleSubmitUp}>Submit</button>
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


