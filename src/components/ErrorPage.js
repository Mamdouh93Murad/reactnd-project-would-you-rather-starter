import React, { Component } from 'react'
import {Link, withRouter} from 'react-router-dom'

export default class ErrorPage extends Component {
    render() {
        return (
            <div style={{textAlign:'center'}}>
                <h1 >Page Not Found! 404</h1>
                <Link  to='/'><span >Go to Home Page!</span></Link>
            </div>
        )
    }
}
