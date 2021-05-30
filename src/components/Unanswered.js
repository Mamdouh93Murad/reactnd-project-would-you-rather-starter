import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { handleAnswerQuestion } from '../actions/questions'

import { Button, Card } from 'semantic-ui-react'

export class Unanswered extends Component {
    state = 
    {
        authedUser: '',
        qid: '',
        answer: '',
        toHome: false
    }
    handleChoice = (event) =>
    {
        const str = event.target.value
        const array = str.split(",")
        this.setState(() => ({
            qid:array[1],
            answer:array[0],
            authedUser:array[2],
            toHome:true
        }))
    }
    componentDidUpdate(prevPros, prevState)
    {
        if(prevState.qid !== this.state.qid)
        {
            this.props.dispatch(handleAnswerQuestion(this.state.authedUser, this.state.qid, this.state.answer))
            
        }
    }
    render() {
        const {authedUser, questions} = this.props
        const path = window.location.pathname
        const url = path.split('/');
        const id = url[2]
        if (this.state.toHome === true) {
            return <Redirect to={{pathname: "/Questions/"+this.state.qid ,state: {condition: true,},}}/>
          } else {
        return (
            <div>
                <h1 style={{textAlign:'center'}}>Poll Details</h1>
                {questions.map((question) =>
                    question.id === id ?
                    (<Card color='red' key={question.id} style={{textAlign:'center', width:'50%', margin:'auto', paddingBottom:'50px', paddingTop:'50px', marginBottom:'50px'}}>
                                
                    <h1 key={question.author}>Asked By: {question.author} </h1>
                    <h2 style={{textAlign:'center'}}>Would You Rather ?</h2>
                    <div  style={{textAlign:'center', display:'flex', justifyContent: 'space-around'}}>
                            
                            <Button primary name="OptionOne" value={['optionOne', question.id, authedUser]} onClick={this.handleChoice}>
                            {question.optionOne.text}
                            </Button>

                            <Button primary  name="OptionTwo" value={['optionTwo', question.id, authedUser]} onClick={this.handleChoice}>
                            {question.optionTwo.text}
                            </Button>
     
                    </div>
                </Card>)
                :
                (null))}
            </div>
            
            
        )
    }
}}
function mapStateToProps({authedUser, questions}) {
    return{authedUser, questions: Object.values(questions)}
}
export default connect(mapStateToProps)(Unanswered)