import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
export class HomePage extends Component {
    state = 
    {
        status : false
    }
    handleChange = (event) =>
    {
        if(event.target.id === 'unanswered')
        {
            this.setState(() => ({
                status: false
            }))
            console.log(this.state.status)
        }
        else
        {
            this.setState(() => ({
                status : true
            }))
            console.log(this.state.status)
        }
    }
    render() { 
        const { authedUser, answered, unanswered } = this.props
        // console.log('answered: ', answered.length)
        // console.log('unanswered: ', unanswered.length)
        // console.log('authedUser: ', authedUser)
        return (
            <div >
                <h1 style={{textAlign : 'center', textDecoration: 'underline'}}>Home Page</h1>
                <div  style={{textAlign:'center', display:'flex', justifyContent: 'space-around'}}>
                    <div >
                        <button id="unanswered" onClick={this.handleChange}>Unanswered Questions</button>
                    </div>
                    <div >
                        <button id="answered" onClick={this.handleChange}>Answered Questions</button>
                    </div>
                </div>
                <div>
                {this.state.status === false ? 
                (
                    unanswered.length !== 0? 
                    (   
                        <div >            
                            <div  style={{textAlign:'center', justifyContent: 'space-around'}}>
                                <h1 >Unanswered Questions</h1>
                            </div>
                            {unanswered.map((question) => 
                            <div style={{textAlign:'center', border:'solid', width:'50%', margin:'auto'}}>
                                <h1>Asked By: {question.author} </h1>
                                <div  style={{textAlign:'center', display:'flex', justifyContent: 'space-around'}}>
                                    <div ><h3>{question.optionOne.text}</h3></div>
                                    <div  ><h3>{question.optionTwo.text}</h3></div>
                                </div>
                            </div>
                            )}
                        </div>
                    )
                    :
                    (
                        <div style={{textAlign:'center', justifyContent: 'space-around'}}>
                            <h3>No Unaswered questions</h3>
                        </div>
                    )

                )
                   :
                (
                    answered.length !== 0 ? 
                    (   
                        <div >            
                            <div  style={{textAlign:'center', justifyContent: 'space-around'}}>
                                <h1 >Answered Questions</h1>
                            </div>
                            {answered.map((question) => 
                                question.optionOne.votes.includes(authedUser) ?
                                (<div  style={{textAlign:'center', border:'solid', width:'50%', margin:'auto'}}>
                                    <h1>Asked By: {question.author} </h1>
                                    <div  style={{textAlign:'center', display:'flex', justifyContent: 'space-around'}}>
                                        <div  >
                                            <h3 style={{textDecoration:'underline', fontStyle: 'italic'}}>{question.optionOne.text} </h3>
                                            <h4>{((question.optionOne.votes.length) / (question.optionOne.votes.length + question.optionTwo.votes.length)) * 100}%</h4>
                                        </div>

                                        <div >
                                            <h3>{question.optionTwo.text} </h3>
                                            <h4>{((question.optionTwo.votes.length) / (question.optionOne.votes.length + question.optionTwo.votes.length)) * 100}%</h4>
                                        </div>
                                    </div>
                                        <div>
                                            <Link to = {'/'+question.id}><span>Poll Link</span></Link>
                                        </div>
                                </div>)
                                :
                                (<div  style={{textAlign:'center', border:'solid', width:'50%', margin:'auto'}}>
                                    <h1>Asked By: {question.author} </h1>
                                    <div  style={{textAlign:'center', display:'flex', justifyContent: 'space-around'}}>
                                        <div  >
                                            <h3 >{question.optionOne.text} </h3>
                                            <h4>{((question.optionOne.votes.length) / (question.optionOne.votes.length + question.optionTwo.votes.length)) * 100}%</h4>
                                        </div>
 
                                        <div >
                                            <h3 style={{textDecoration:'underline', fontStyle: 'italic'}}>{question.optionTwo.text}</h3>
                                            <h4>{((question.optionTwo.votes.length) / (question.optionOne.votes.length + question.optionTwo.votes.length)) * 100}%</h4>
                                        </div>
                                    </div>
                                        <div>
                                            <Link to = {'/'+question.id}><span>Poll Link</span></Link>
                                        </div>
                                </div>)
    
                            )}
                        </div>
                    )
                    :
                    (
                        <div  style={{textAlign:'center', justifyContent: 'space-around'}}>
                            <h3>No Answered questions</h3>
                        </div>
                    )
                )}

            </div>
            </div>
        )
    }
}

function mapStateToProps({authedUser, questions}) {
    return {authedUser,
         answered: Object.values(questions).filter((question) =>
        question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser)).sort((a, b) => b.timestamp - a.timestamp),
         unanswered: Object.values(questions).filter((question) =>
            !question.optionOne.votes.includes(authedUser) && !question.optionTwo.votes.includes(authedUser)).sort((a, b) => b.timestamp - a.timestamp) }
  }
export default connect(mapStateToProps)(HomePage)