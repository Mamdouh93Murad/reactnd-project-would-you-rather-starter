import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
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
            // console.log(this.state.status)
        }
        else
        {
            this.setState(() => ({
                status : true
            }))
            // console.log(this.state.status)
        }
    }
    handleChoice = (event) =>
    {
        console.log('still building ...')
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
                            <div key={question.id} style={{textAlign:'center', border:'solid', width:'50%', margin:'auto'}}>
                                <h1 key={question.author}>Asked By: {question.author} </h1>
                                <div  style={{textAlign:'center', display:'flex', justifyContent: 'space-around'}}>
                                    <label key={question.optionOne.text}>
                                        <input type="radio" name="OptionOne" value='optionOne' onChange={this.handleChoice}/>
                                        {question.optionOne.text}
                                    </label>
                                    <label key={question.optionTwo.text}>
                                        <input type="radio" name="OptionTwo" value='OptionTwo' onChange={this.handleChoice}/>
                                        {question.optionTwo.text}
                                    </label>
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
                                (<div key={question.id}  style={{textAlign:'center', border:'solid', width:'50%', margin:'auto'}}>
                                    <h1 key={question.author}>Asked By: {question.author} </h1>
                                    <div  style={{textAlign:'center', display:'flex', justifyContent: 'space-around'}}>
                                        <div  >
                                            <h3 key={question.optionOne.text} style={{color:'blue', textDecoration:'underline', fontStyle: 'italic'}}>{question.optionOne.text} </h3>
                                            <h4 key={question.optionOne.votes.length}>{((question.optionOne.votes.length) / (question.optionOne.votes.length + question.optionTwo.votes.length)) * 100}%</h4>
                                        </div>

                                        <div >
                                            <h3 key={question.optionTwo.text}>{question.optionTwo.text} </h3>
                                            <h4 key={question.optionTwo.votes.length}>{((question.optionTwo.votes.length) / (question.optionOne.votes.length + question.optionTwo.votes.length)) * 100}%</h4>
                                        </div>
                                    </div>
                                        <div>
                                            <Link to = {'/Questions/'+question.id}><span>Poll Link</span></Link>
                                        </div>
                                </div>)
                                :
                                (<div key={question.id} style={{textAlign:'center', border:'solid', width:'50%', margin:'auto'}}>
                                    <h1 key={question.author}>Asked By: {question.author} </h1>
                                    <div  style={{textAlign:'center', display:'flex', justifyContent: 'space-around'}}>
                                        <div  >
                                            <h3 key={question.optionOne.text} >{question.optionOne.text} </h3>
                                            <h4 key={question.optionOne.votes.length}>{((question.optionOne.votes.length) / (question.optionOne.votes.length + question.optionTwo.votes.length)) * 100}%</h4>
                                        </div>
 
                                        <div >
                                            <h3 key={question.optionTwo.text} style={{color:'blue',textDecoration:'underline', fontStyle: 'italic'}}>{question.optionTwo.text}</h3>
                                            <h4 key={question.optionTwo.votes.length}>{((question.optionTwo.votes.length) / (question.optionOne.votes.length + question.optionTwo.votes.length)) * 100}%</h4>
                                        </div>
                                    </div>
                                        <div>
                                            <Link to = {'/Questions/'+question.id}><span>Poll Link</span></Link>
                                        </div>
                                </div>)
    
                            )}
                        </div>
                    )
                    :
                    (
                        <div key={'answered'} style={{textAlign:'center', justifyContent: 'space-around'}}>
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