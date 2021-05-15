import '../App.css';
import {Button, Card, Form} from 'react-bootstrap';
import React from 'react';
import {getUser} from "../utils/user";
import {getCategories} from "../utils/categories";
import {Redirect, withRouter} from "react-router-dom";

export function Post({title, author, created_at, category, text}){
    let id = 5;
    return (
        <Card style={{width: '18rem'}}>
            <Card.Body>
                <Card.Img variant="top" src="https://www.eea.europa.eu/themes/biodiversity/state-of-nature-in-the-eu/state-of-nature-2020-subtopic/image_large" />
                <Card.Title>{title}</Card.Title>
                <Card.Subtitle className="small-text text-left mb-2 text-muted">{`Created by ${author} at ${created_at}`}</Card.Subtitle>
                <Card.Subtitle className="small-text text-left mb-2 text-muted">{`Category: ${category}`}</Card.Subtitle>
                <Card.Text max_ className="text-truncate text-left">{text}</Card.Text>
                <Card.Link href={`/posts/${id}/edit`}>Edit post</Card.Link>
                <Card.Link href={`/posts/${id}/delete`}>Delete post</Card.Link>
            </Card.Body>
        </Card>
    )
}

class PostForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            user_id: getUser().id,
            category_id: getCategories()[0].id,
            text: ""
        }
    }

    myChangeHandler = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({[name]: value})
        console.log(this.state)
    }

    mySubmitHandler = (event) => {
        console.log(this.state)
        event.preventDefault();
        fetch(`http://localhost:3000/posts`, {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state)
            })
            .then((response) => response.json())
            .then((data) => {
                alert('Post created!')
                this.props.history.push('/posts')
            })
            .catch((error) => {

                console.log(error);
            });
    }

    render () {
        const user = getUser();
        const {id} = this.props.match ? this.props.match.params : {undefined};
        return (
            user && user.authenticated ? <>
                <div className="flex-div">
                    <h1>{id ? `Edit post with id ${id}`: "Create post"}</h1>
                </div>
                <div className="flex-div">
                    <Form onSubmit={this.mySubmitHandler}>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control name="title" onChange={this.myChangeHandler} type="text"
                                          placeholder="Enter the title"/>
                        </Form.Group>
                        <CategoriesList onChangeHandler={this.myChangeHandler} />
                        <Form.Group>
                            <Form.Label>Text</Form.Label>
                            <Form.Control name="text" onChange={this.myChangeHandler} as="textarea" />
                        </Form.Group>
                        <div className="flex-div">
                            <Button variant="primary" type="submit">Create post</Button>
                        </div>
                    </Form>
                </div>
            </> : <h1>Not authenticated</h1>
        )
    }
}

function CategoriesList({onChangeHandler}){
    const categories = getCategories();

    return (
        <Form.Group controlId="exampleForm.SelectCustom">
            <Form.Label>Choose category</Form.Label>
            <Form.Control onChange={onChangeHandler} name="category_id" as="select" custom>
                {categories.map(category => <option value={category.id}>{category.name}</option>)}
            </Form.Control>
        </Form.Group>
    )
}

export default withRouter(PostForm);