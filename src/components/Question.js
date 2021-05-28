import React, { Component } from 'react'
import { connect } from 'react-redux'
export class Question extends Component {
    render() {
        const {authedUser, questions} = this.props
        const path = window.location.pathname
        const url = path.split('/');
        const id = url[2]
        return (
            <div style={{textAlign:'center', justifyContent: 'space-around'}}>
                <h1 >Poll Details</h1>
                {questions.map((question) =>
                    question.id === id ?
                    (question.optionOne.votes.includes(authedUser) ?
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
                                <h3 key={question.optionTwo.text} style={{color:'blue', textDecoration:'underline', fontStyle: 'italic'}}>{question.optionTwo.text}</h3>
                                <h4 key={question.optionTwo.votes.length}>{((question.optionTwo.votes.length) / (question.optionOne.votes.length + question.optionTwo.votes.length)) * 100}%</h4>
                            </div>
                        </div>
                    </div>))
                    :
                    (null)
                )}
            </div>
        )
    }
}
function mapStateToProps({authedUser, questions}) {
    return{authedUser, questions: Object.values(questions)}
}
export default connect(mapStateToProps)(Question)