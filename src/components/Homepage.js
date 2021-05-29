import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import { handleAnswerQuestion } from '../actions/questions'


export class HomePage extends Component {
    state = 
    {
        authedUser: '',
        qid: '',
        answer: '',
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
    // handleChoice = (event) =>
    // {
    //     const str = event.target.value
    //     const array = str.split(",")
    //     this.setState(() => ({
    //         qid:array[1],
    //         answer:array[0],
    //         authedUser:array[2],
    //     }))
    // }
    // componentDidUpdate(prevPros, prevState)
    // {
    //     if(prevState.qid !== this.state.qid)
    //     {
    //         this.props.dispatch(handleAnswerQuestion(this.state.authedUser, this.state.qid, this.state.answer))
    //     }
    // }
        
    
    render() { 
        const { authedUser, answered, unanswered } = this.props
        
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
                                <h2 style={{textAlign:'center'}}>Would You Rather ?</h2>
                                <div  style={{textAlign:'center', display:'flex', justifyContent: 'space-around'}}>
                                        
                                        <button disabled name="OptionOne" value={['optionOne', question.id, authedUser]} onClick={this.handleChoice}>
                                        {question.optionOne.text}
                                        </button>

                                        <div>
                                            <Link to={{pathname: "/Questions/"+question.id,state: {condition: false,},}}>Click to Vote</Link>
                                        </div>

                                        <button disabled name="OptionTwo" value={['optionTwo', question.id, authedUser]} onClick={this.handleChoice}>
                                        {question.optionTwo.text}
                                        </button>
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
                                    <h2 style={{textAlign:'center'}}>Would You Rather ?</h2>
                                    <div  style={{textAlign:'center', display:'flex', justifyContent: 'space-around'}}>
                                        <div  >
                                            <h3 key={question.optionOne.text} style={{color:'blue', textDecoration:'underline', fontStyle: 'italic'}}>{question.optionOne.text} </h3>
                                            <h4 key={question.optionOne.votes.length}>{Math.round(((question.optionOne.votes.length) / (question.optionOne.votes.length + question.optionTwo.votes.length)) * 100)}%</h4>
                                            <h6>Votes : {question.optionOne.votes.length}</h6>
                                        </div>

                                        <div >
                                            <h3 key={question.optionTwo.text}>{question.optionTwo.text} </h3>
                                            <h4 key={question.optionTwo.votes.length}>{Math.round(((question.optionTwo.votes.length) / (question.optionOne.votes.length + question.optionTwo.votes.length)) * 100)}%</h4>
                                            <h6>Votes : {question.optionTwo.votes.length}</h6>
                                        </div>
                                    </div>
                                        <div>
                                            <Link to={{pathname: "/Questions/"+question.id,state: {condition: true,},}}><span>Poll Link</span></Link>
                                        </div>
                                        <h5 >Total Votes : {question.optionTwo.votes.length+question.optionOne.votes.length}</h5>

                                </div>)
                                :
                                (<div key={question.id} style={{textAlign:'center', border:'solid', width:'50%', margin:'auto'}}>
                                    <h1 key={question.author}>Asked By: {question.author} </h1>
                                    <h2 style={{textAlign:'center'}}>Would You Rather ?</h2>
                                    <div  style={{textAlign:'center', display:'flex', justifyContent: 'space-around'}}>
                                        <div  >
                                            <h3 key={question.optionOne.text} >{question.optionOne.text} </h3>
                                            <h4 key={question.optionOne.votes.length}>{Math.round(((question.optionOne.votes.length) / (question.optionOne.votes.length + question.optionTwo.votes.length)) * 100)}%</h4>
                                            <h6>Votes : {question.optionOne.votes.length}</h6>

                                        </div>
 
                                        <div >
                                            <h3 key={question.optionTwo.text} style={{color:'blue',textDecoration:'underline', fontStyle: 'italic'}}>{question.optionTwo.text}</h3>
                                            <h4 key={question.optionTwo.votes.length}>{Math.round(((question.optionTwo.votes.length) / (question.optionOne.votes.length + question.optionTwo.votes.length)) * 100)}%</h4>
                                            <h6>Votes : {question.optionTwo.votes.length}</h6>
                                        </div>
                                    </div>
                                    <h5 >Total Votes : {question.optionTwo.votes.length+question.optionOne.votes.length}</h5>

                                        <div>
                                            <Link to={{pathname: "/Questions/"+question.id,state: {condition: true,},}}><span>Poll Link</span></Link>
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