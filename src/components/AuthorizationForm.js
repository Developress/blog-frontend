import {Form, Button} from 'react-bootstrap'
import '../App.css';
import React from 'react';
import {withRouter} from "react-router-dom";
import {setAuthenticated, user} from "../utils/user";

class AuthorizationForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
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
        event.preventDefault();
        fetch(`http://localhost:3000/login`, {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state)
            })
            .then((response) => response.json())
            .then((data) => {
                if('error' in data){
                    alert('Wrong password! Try again')
                } else {
                    setAuthenticated(true);
                    this.props.history.push('/posts');
                }
            })
            .catch((error) => {

                console.log(error);
            });
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