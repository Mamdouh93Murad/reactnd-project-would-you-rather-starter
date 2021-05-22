import React, { Component } from 'react'
import Nav from './Nav'
export default class NewQuestion extends Component {
    render() {
        return (
            <div>
                <Nav />
                <h1 style={{textAlign : 'center'}}>New Question</h1>
            </div>
        )
    }
}
