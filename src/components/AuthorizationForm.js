import {Form, Button} from 'react-bootstrap'
import '../App.css';
import React from 'react';
import {withRouter} from "react-router-dom";

class AuthorizationForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,
            username: "",
            password: ""
        };
    }

    myChangeHandler = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({[name]: value})
    }

    mySubmitHandler = (event) => {
        this.isAuthenticated = true
        if(this.isAuthenticated){
            this.props.history.push('/posts')
        }
        //TODO send post request
        // fetch(`url`, {
        //         method: 'POST',
        //         headers: {
        //           'Accept': 'application/json',
        //           'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify(this.state)
        //     })
        //     .then((response) => response.json())
        //     .then((data) => {
        //         //TODO redirect or 404
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });
    }

    render () {
        return (
            <>
                <div className="flex-div">
                    <h1>Sign in</h1>
                </div>
                <div className="flex-div">
                    <Form onSubmit={this.mySubmitHandler}>
                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control name="username" onChange={this.myChangeHandler} type="text"
                                          placeholder="Enter the username"/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="password" onChange={this.myChangeHandler} type="password"
                                          placeholder="Enter the password"/>
                        </Form.Group>
                        <div className="flex-div">
                            <Button variant="primary" type="submit">Submit</Button>
                        </div>
                    </Form>
                </div>
            </>

        )
    }
}

export default withRouter(AuthorizationForm);