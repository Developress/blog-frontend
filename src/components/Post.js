import '../App.css';
import {Button, Card, Form} from 'react-bootstrap';
import React from 'react';

export function Post({title, author, created_at, category, text}){
    return (
        <Card style={{width: '18rem'}}>
            <Card.Body>
                <Card.Img variant="top" src="https://www.eea.europa.eu/themes/biodiversity/state-of-nature-in-the-eu/state-of-nature-2020-subtopic/image_large" />
                <Card.Title>{title}</Card.Title>
                <Card.Subtitle className="small-text text-left mb-2 text-muted">{`Created by ${author} at ${created_at}`}</Card.Subtitle>
                <Card.Subtitle className="small-text text-left mb-2 text-muted">{`Category: ${category}`}</Card.Subtitle>
                <Card.Text max_ className="text-truncate text-left">{text}</Card.Text>
                <Card.Link href="#">View Post</Card.Link>
            </Card.Body>
        </Card>
    )
}

export class PostForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            author: "",
            category: "",
            text: "",
            image: ""
        }
    }

    myChangeHandler = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({[name]: value})
    }

    mySubmitHandler = (event) => {
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
                    <h1>Create post</h1>
                </div>
                <div className="flex-div">
                    <Form onSubmit={this.mySubmitHandler}>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control name="title" onChange={this.myChangeHandler} type="text"
                                          placeholder="Enter the title"/>
                        </Form.Group>
                        <DropDownList onChangeHandler={this.myChangeHandler} />
                        <Form.Group>
                            <Form.Label>Text</Form.Label>
                            <Form.Control name="text" onChange={this.myChangeHandler} as="textarea" />
                        </Form.Group>
                        <div className="flex-div">
                            <Button variant="primary" type="submit">Create post</Button>
                        </div>
                    </Form>
                </div>
            </>

        )
    }
}

function DropDownList({onChangeHandler}){
    const options = ['Choose option', 'Science', 'Tech', 'Sport'];

    return (
        <Form.Group controlId="exampleForm.SelectCustom">
            <Form.Label>Choose category</Form.Label>
            <Form.Control onChange={onChangeHandler} name="category" as="select" custom>
                {options.map(option => <option value={option}>{option}</option>)}
            </Form.Control>
        </Form.Group>
    )
}