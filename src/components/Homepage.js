import React, { Component } from 'react'
import Nav from './Nav'
export default class HomePage extends Component {
    render() {
        return (
            <div>
                <Nav />
                <h1 style={{textAlign : 'center'}}>Home Page</h1>
                <div style={{textAlign:'center', display:'flex', justifyContent: 'space-around'}}>
                    <div>
                        <h2>
                            Unanswered Questions
                        </h2>
                    </div>
                    <div>
                        <h2>
                            Answered Questions
                        </h2>
                    </div>
                </div>
            </div>
        )
    }
}
