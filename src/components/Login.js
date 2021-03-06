import React, { Component } from 'react'
import { handleAddUser } from '../actions/users'
// import {Link} from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'
import { connect } from 'react-redux'
import { Dropdown } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { Redirect } from 'react-router-dom'
import { Button, Input, Card } from 'semantic-ui-react'
export class Login extends Component {
    state = {
        id:'',
        idIn:'',
        name:'',
        password : '',
        passwordUp : '',
        avatarURL:'',
        toHome: false,
        status: true
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
                this.props.users.forEach((user) =>
                    {if(user.id === this.state.idIn)
                    {
                        user_id = user.id
                        loginPassword = user.password
                    }
                    })    
                
                if(user_id === this.state.idIn && loginPassword === this.state.password)
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
                    <div  style={{textAlign:'center', display:'flex', margin:'auto', position:'absolute', top:'15%', left:'45%'}}>
                        <div >
                            <Button primary id="Login" onClick={()=> this.setState({status:false})}>Login</Button>
                        </div>
                        <div >
                            <Button positive id="SignUp" onClick={()=> this.setState({status:true})}>Sign Up</Button>
                        </div>
                    {this.state.status === false ?
                (<Card color='blue' style={{marginLeft:'-25%',minWidth:'150%',textAlign:'center', position:'absolute', top:'120%'}}>
                
                    <h1 style={{textAlign: 'center'}}>Choose User</h1>
                    <div  style={{ textAlign : 'center'}}>
                        <Dropdown
                            
                            className='ui form small'
                            placeholder='Choose User'
                            selectOnBlur={false}
                            selection
                            onChange={(event,data)=> event.preventDefault() + this.setState({idIn: data.value})}
                            options={friendOptions}
                        />
                        </div>
                        <div style={{textAlign : 'center'}}>
                        <Input
                            style={{width:'70%',margin:'5px'}}
                            name ='password-in'
                            className="user-input"
                            type="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={(event) => this.setState({password: event.target.value})}
                        />  
                        <div style={{textAlign:'center'}}>
                            <Button primary style={{width:'70%',margin:'5px'}} disabled={(this.state.password.length === 0)} type="Submit"  onClick={this.handleSubmitIn}>Submit</Button>
                        </div>
                    </div>
                    </Card>)
                :
                (<Card color='green' style={{marginLeft:'-25%',minWidth:'150%',textAlign:'center', position:'absolute', top:'120%'}}>
                    <h1 style={{textAlign:'center'}}>To Sign Up</h1>
            
                <div className="new-user">       
                    <h3>Enter User Details</h3>
            
                    <Input
                        style={{width:'70%',margin:'5px'}}
                        name='id'
                        className="user-input"
                        type="text"
                        placeholder="User Name"
                        value={this.state.id}
                     onChange={(event) => this.setState({id:event.target.value})}
                     />   
                
                
                    <Input
                        style={{width:'70%',margin:'5px'}}
                        name ='name'
                        className="user-input"
                        type="text"
                        placeholder="Real Name"
                        value={this.state.name}
                        onChange={(event) => this.setState({name: event.target.value})}
                    />
                
                
                    <Input
                        style={{width:'70%',margin:'5px'}}
                        name ='password-up'
                        className="user-input"
                        type="password"
                        placeholder="Password"
                        value={this.state.passwordUp}
                        onChange={(event) => this.setState({passwordUp: event.target.value})}
                    />   
                
                
                    <Input
                        style={{width:'70%',margin:'5px'}}
                        name ='avatarURL'
                        className="user-input"
                        type="text"
                        placeholder="AvatarURL"
                        value={this.state.avatarURL}
                        onChange={(event) => this.setState({avatarURL: event.target.value})}
                    />   
                
            </div>
                <div style={{textAlign:'center'}}>
                    <Button positive style={{width:'70%',margin:'5px'}} disabled={(this.state.id.length === 0 || this.state.name.length === 0 || this.state.passwordUp.length === 0 || this.state.avatarURL.length === 0)} type="Submit"  onClick={this.handleSubmitUp}>Submit</Button>
                </div>
           
                </Card>)
                }
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


