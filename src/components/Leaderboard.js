import React, { Component, Fragment } from 'react'
import Nav from './Nav'
import { connect } from 'react-redux'
// import {  useHistory } from "react-router-dom";
export class Leaderboard extends Component {

    render() {
        const {users} = this.props
        // const sorted = users.sort((a, b) => (b.questions.length+Object.keys(b.answers).length) - (a.questions.length+Object.keys(a.answers).length))
        return (
            <div>
            <Nav />
                <h1 style={{textAlign : 'center'}}>Leaderboard</h1>
                <div style={{textAlign : 'center', border:'1px, solid, black'}}>
                {users.map((user) =>
                (
                    <div >
                        <img style={{width:'10%'}}src={user.avatarURL} alt={`${user.name}'s avatar`} className="avatar"/>
                        <div className="leaderboard-details">
                            <h2>{user.name}</h2>
                            <h3>score : {user.questions.length+Object.keys(user.answers).length}</h3>
                            <p>Answered questions {Object.keys(user.answers).length}</p>
                            <p>Created questions {user.questions.length}</p>
                            
                        </div>
                    </div>
                    
                ))}
            </div>
            </div>
        )
    }
}


// {Object.keys(user.answers).length}
// {user.questions.length}
// .sort((a, b) => b.questions.length+Object.keys(b.answers).length - a.questions.length+Object.keys(a.answers).length)
function mapStateToProps({users}) {
    return {users: Object.values(users).sort((a, b) => (b.questions.length+Object.keys(b.answers).length) - (a.questions.length+Object.keys(a.answers).length))}
  }
export default connect(mapStateToProps)(Leaderboard)