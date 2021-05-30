import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
// import { handleAnswerQuestion } from '../actions/questions'
import { Button, Container, Card } from 'semantic-ui-react'

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
                <h1 style={{textAlign : 'center', marginBottom:'20px'}}>Home Page</h1>
                <div  style={{textAlign:'center', display:'flex', justifyContent: 'space-around'}}>
                    <div >
                        <Button primary id="unanswered" onClick={this.handleChange}>Unanswered Questions</Button>
                    </div>
                    <div >
                        <Button primary id="answered" onClick={this.handleChange}>Answered Questions</Button>
                    </div>
                </div>
                <div>
                {this.state.status === false ? 
                (
                    unanswered.length !== 0? 
                    (   
                        <Container >            
                            <div  style={{textAlign:'center', justifyContent: 'space-around'}}>
                                <h1 style={{marginBottom:'20px', color:'red'}}>Unanswered Questions</h1>
                            </div>
                            {unanswered.map((question) => 
                            <Card color='red' key={question.id} style={{textAlign:'center', width:'50%', margin:'auto', paddingBottom:'50px', paddingTop:'50px', marginBottom:'50px'}}>
                                
                                <h1 key={question.author}>Asked By: {question.author} </h1>
                                <h2 style={{textAlign:'center'}}>Would You Rather ?</h2>
                                <div  style={{textAlign:'center', display:'flex', justifyContent: 'space-around'}}>
                                        
                                        <Button primary disabled name="OptionOne" value={['optionOne', question.id, authedUser]} onClick={this.handleChoice}>
                                        {question.optionOne.text}
                                        </Button>

                                        <div>
                                            <Link to={{pathname: "/Questions/"+question.id,state: {condition: false,},}}>Click to Vote</Link>
                                        </div>

                                        <Button primary disabled name="OptionTwo" value={['optionTwo', question.id, authedUser]} onClick={this.handleChoice}>
                                        {question.optionTwo.text}
                                        </Button>
                                </div>

                            </Card>
                            )}
                        </Container>
                    )
                    :
                    (
                        <Container style={{textAlign:'center', justifyContent: 'space-around'}}>
                            <h3>No Unaswered questions</h3>
                        </Container>
                    )

                )
                   :
                (
                    answered.length !== 0 ? 
                    (   
                        <Container >            
                            <div  style={{textAlign:'center', justifyContent: 'space-around'}}>
                                <h1 style={{marginBottom:'20px', color:'Purple'}}>Answered Questions</h1>
                            </div>
                            {answered.map((question) => 
                                question.optionOne.votes.includes(authedUser) ?
                                (<Card color='purple' key={question.id}  style={{textAlign:'center', width:'50%', margin:'auto',marginBottom:'50px', paddingBottom:'50px', paddingTop:'50px'}}>
                                    <h1 key={question.author}>Asked By: {question.author} </h1>
                                    <h2 style={{textAlign:'center'}}>Would You Rather ?</h2>
                                    <div  style={{textAlign:'center', display:'flex', justifyContent: 'space-around'}}>
                                        <div  >
                                            <Button primary key={question.optionOne.text} style={{ fontStyle: 'italic'}}>{question.optionOne.text} </Button>
                                            <h4 key={question.optionOne.votes.length}>{Math.round(((question.optionOne.votes.length) / (question.optionOne.votes.length + question.optionTwo.votes.length)) * 100)}%</h4>
                                            <h6>Votes : {question.optionOne.votes.length}</h6>
                                        </div>

                                        <div >
                                            <Button key={question.optionTwo.text}>{question.optionTwo.text} </Button>
                                            <h4 key={question.optionTwo.votes.length}>{Math.round(((question.optionTwo.votes.length) / (question.optionOne.votes.length + question.optionTwo.votes.length)) * 100)}%</h4>
                                            <h6>Votes : {question.optionTwo.votes.length}</h6>
                                        </div>
                                    </div>
                                        <div>
                                            <Link to={{pathname: "/Questions/"+question.id,state: {condition: true,},}}><span>Poll Link</span></Link>
                                        </div>
                                        <h5 >Total Votes : {question.optionTwo.votes.length+question.optionOne.votes.length}</h5>

                                </Card>)
                                :
                                (<Card color='purple' key={question.id} style={{textAlign:'center',  width:'50%', margin:'auto', marginBottom:'50px', paddingBottom:'50px', paddingTop:'50px'}}>
                                    <h1 key={question.author}>Asked By: {question.author} </h1>
                                    <h2 style={{textAlign:'center'}}>Would You Rather ?</h2>
                                    <div  style={{textAlign:'center', display:'flex', justifyContent: 'space-around'}}>
                                        <div  >
                                            <Button  key={question.optionOne.text} >{question.optionOne.text} </Button>
                                            <h4 key={question.optionOne.votes.length}>{Math.round(((question.optionOne.votes.length) / (question.optionOne.votes.length + question.optionTwo.votes.length)) * 100)}%</h4>
                                            <h6>Votes : {question.optionOne.votes.length}</h6>

                                        </div>
 
                                        <div >
                                            <Button primary key={question.optionTwo.text} style={{fontStyle: 'italic'}}>{question.optionTwo.text}</Button>
                                            <h4 key={question.optionTwo.votes.length}>{Math.round(((question.optionTwo.votes.length) / (question.optionOne.votes.length + question.optionTwo.votes.length)) * 100)}%</h4>
                                            <h6>Votes : {question.optionTwo.votes.length}</h6>
                                        </div>
                                    </div>
                                    <h5 >Total Votes : {question.optionTwo.votes.length+question.optionOne.votes.length}</h5>

                                        <div>
                                            <Link to={{pathname: "/Questions/"+question.id,state: {condition: true,},}}><span>Poll Link</span></Link>
                                        </div>
                                </Card>)
    
                            )}
                        </Container>
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