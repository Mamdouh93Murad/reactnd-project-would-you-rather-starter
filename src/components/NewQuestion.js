import React, { Component } from 'react'
// import Nav from './Nav'
import {connect} from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'

export class NewQuestion extends Component {
    state = {
        OptionOne:'',
        OptionTwo:'',
        toHome: false
      }
      handleChange = (event) => {
        if (event.target.name === 'OptionOne') {
            this.setState({OptionOne:event.target.value})
          } else {
            this.setState({OptionTwo: event.target.value})
          }
      }
      handleSubmit = (event) => {
        event.preventDefault()
        const{dispatch} = this.props
        dispatch(handleAddQuestion(this.state.OptionOne, this.state.OptionTwo))
        
        this.setState(() => ({
            OptionOne: '',
            OptionTwo:'',
            toHome: true
          }))
        }

          
    render() {
        const {OptionOne, OptionTwo, toHome} = this.state
        if (toHome === true) {
            return <Redirect to='/'/>
          } else {
        return (
            <div>
                
                <h1 style={{textAlign : 'center'}}>New Question</h1>
                <div style={{textAlign:'center', justifyContent: 'space-around'}}>
                    <h2>Would You Rather</h2>
                </div>
                <div style={{textAlign:'center', display:'flex', justifyContent: 'space-evenly'}}>
                    <div className="new-question">
                        
                        <input
                            name='OptionOne'
                            className="question-input"
                            type="text"
                            placeholder="Please Enter Option One"
                            value={OptionOne}
                         onChange={this.handleChange}
                         />   
                    </div>
                    <h3>OR</h3>
                    <div className="new-question">
                        <input
                            name ='OptionTwo'
                            className="question-input"
                            type="text"
                            placeholder="Please Enter Option Two"
                            value={OptionTwo}
                            onChange={this.handleChange}
                        />   
                    </div>
                </div>
                <div style={{textAlign:'center'}}>
                    <button disabled={this.state.OptionOne.length === 0 || this.state.OptionTwo.length === 0} type="Submit"  onClick={this.handleSubmit}>Submit</button>
                </div>
            </div>
            
        )
    }
}
}
export default connect()(NewQuestion)