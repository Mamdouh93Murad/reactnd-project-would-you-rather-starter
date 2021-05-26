
import React, { Component } from 'react'
import { connect } from 'react-redux'
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
        const {authedUser, questions } = this.props
        console.log('Questions: ', questions.length)
        return (
            <div>
                <h1 style={{textAlign : 'center', textDecoration: 'underline'}}>Home Page</h1>
                <div style={{textAlign:'center', display:'flex', justifyContent: 'space-around'}}>
                    <div>
                        <button id="unanswered" onClick={this.handleChange}>Unanswered Questions</button>
                    </div>
                    <div>
                        <button id="answered" onClick={this.handleChange}>Answered Questions</button>
                    </div>
                </div>
                <div>
                {this.state.status === false ? 
                (
                    <h1 style={{textAlign : 'center'}}>Unanswered</h1>
                    
                    , questions.length !== 0 ? 
                    (questions.map((question) =>
                        !question.optionOne.votes.includes(authedUser) && !question.optionTwo.votes.includes(authedUser) ?
                            (<div style={{textAlign:'center', display:'flex', justifyContent: 'space-around'}}>
                                <h1>{question.optionOne.text}</h1>
                                <h1>{question.optionTwo.text}</h1>
                            </div>)
                            :
                            (null)
                                )
                    
                    )
                    :
                    (<h3>no unanswered questions</h3>))
                :
                    (<h3 style={{textAlign : 'center'}}>Answered</h3>
                    ,questions.length !== 0 ? 
                    (questions.map((question) =>
                        question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser) ?
                        (<div style={{textAlign:'center', display:'flex', justifyContent: 'space-around'}}>
                            <h1>{question.optionOne.text}</h1>
                            <h1>{question.optionTwo.text}</h1>
                        </div>)
                        :
                    (null)
                    ))
                    :
                    (<h3>no answered questions</h3>)
        )}

            </div>
            </div>
        )
    }
}

function mapStateToProps({authedUser, questions}) {
    
    return {authedUser, questions: Object.values(questions).sort((a, b) => b.timestamp - a.timestamp)}
    
  }
export default connect(mapStateToProps)(HomePage)