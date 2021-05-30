import React, { Component} from 'react'
import { Card } from 'semantic-ui-react'

import { connect } from 'react-redux'

// import {  useHistory } from "react-router-dom";
export class Leaderboard extends Component {
    render() {
        const {users} = this.props
        return (
            <div style={{paddingBottom:'50px'}}>

            <h1 style={{textAlign : 'center'}}>Leaderboard</h1>
                <div style={{textAlign : 'center', border:'1px, solid, black'}}>
                {users.map((user) =>
                (
                    <Card color='blue' key={user.id} style={{textAlign:'center', width:'50%', margin:'auto', paddingBottom:'50px', paddingTop:'50px', marginBottom:'50px'}}>
                        <img style={{alignSelf:'center'}}src={user.avatarURL} alt={`${user.name}'s avatar`} className="avatar"/>
                        <div className="leaderboard-details">
                            <h2>{user.name}</h2>
                            <h3>score : {user.questions.length+Object.keys(user.answers).length}</h3>
                            <p>Answered questions {Object.keys(user.answers).length}</p>
                            <p>Created questions {user.questions.length}</p>
                        </div>
                    </Card>
                ))}
            </div>
            
            </div>
        )
    }
}
function mapStateToProps({users}) {
    
    return {users: Object.values(users).sort((a, b) => (b.questions.length+Object.keys(b.answers).length) - (a.questions.length+Object.keys(a.answers).length))}
  }
export default connect(mapStateToProps)(Leaderboard)