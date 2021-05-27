import React, { Component } from 'react'
import { connect } from 'react-redux'
export class Question extends Component {
    render() {
        const path = window.location.pathname
        const url = path.split('/');
        const id = url[2]
        return (
            <div style={{textAlign:'center', justifyContent: 'space-around'}}>
                <h1 >Poll Details</h1>
            </div>
        )
    }
}
// function mapStateToProps({authedUser, questions}) {
//     return{

//     }
// }
export default connect(/*mapStateToProps*/)(Question)