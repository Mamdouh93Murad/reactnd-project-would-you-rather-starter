import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
export default class ErrorPage extends Component {
    render() {
        return (
            <div style={{textAlign:'center'}}>
                <h1 >Page Not Found! 404</h1>
                <Button secondary  to='/'><span >Go to Home Page!</span></Button>
            </div>
        )
    }
}
