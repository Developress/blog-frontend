import '../App.css';
import {Button, Card, Form} from 'react-bootstrap';
import React from 'react';
import {getUser} from "../utils/user";
import {getCategories} from "../utils/categories";
import {withRouter} from "react-router-dom";
import {retrievePost} from "../utils/posts";
import {getReadableDatetime} from "../utils/date";

export function Post({post}){
    return (
        <Card style={{width: '18rem'}}>
            <Card.Body>
                <Card.Img variant="top" src="https://www.eea.europa.eu/themes/biodiversity/state-of-nature-in-the-eu/state-of-nature-2020-subtopic/image_large" />
                <Card.Title>{post.title}</Card.Title>
                <Card.Subtitle className="small-text text-left mb-2 text-muted">{`Created by ${post.username} at ${getReadableDatetime(post.created_at)}`}</Card.Subtitle>
                <Card.Subtitle className="small-text text-left mb-2 text-muted">{`Category: ${post.category}`}</Card.Subtitle>
                <Card.Text max_ className="text-truncate text-left">{post.text}</Card.Text>
                <Card.Link href={`/posts/${post.id}/edit`}>Edit post</Card.Link>
                <Card.Link href={`/posts/${post.id}/delete`}>Delete post</Card.Link>
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
            text: "",
            promiseIsResolved: false
        }
    }

    componentDidMount() {
        if(this.props.match && !this.state.promiseIsResolved){
            const {id} = this.props.match.params;
            retrievePost(id).then((post) => {
            this.post = post;
            console.log(this.post);
            this.setState({
                id: post.id,
                title: post.title,
                category_id: post.category_id,
                user_id: post.user_id,
                text: post.text,
                promiseIsResolved: true
            });
        })
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
        if(this.post && this.post.id){
            fetch(`http://localhost:3000/posts/${this.state.id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state)
            })
                .then((response) => response.json())
                .then((data) => {
                    alert('Post updated!')
                    this.props.history.push('/posts')
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
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
    }

    render () {
        const user = getUser();
        return (
            user && user.authenticated && user.id === this.state.user_id ? <>
                <div className="flex-div">
                    <h1>{this.post && this.post.id ? `Edit post`: "Create post"}</h1>
                </div>
                <div className="flex-div">
                    <Form onSubmit={this.mySubmitHandler}>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control name="title" onChange={this.myChangeHandler} type="text"
                                          placeholder="Enter the title" value={this.state.title}/>
                        </Form.Group>
                        <CategoriesList onChangeHandler={this.myChangeHandler} value={this.state.category_id}/>
                        <Form.Group>
                            <Form.Label>Text</Form.Label>
                            <Form.Control name="text" onChange={this.myChangeHandler} as="textarea"
                            value={this.state.text}/>
                        </Form.Group>
                        <div className="flex-div">
                            <Button variant="primary" type="submit">{this.post && this.post.id ? "Update post" : "Create post"}</Button>
                        </div>
                    </Form>
                </div>
            </> : <h1>Not authenticated</h1>
        )
    }
}

function CategoriesList({value, onChangeHandler}){
    const categories = getCategories();

    return (
        <Form.Group controlId="exampleForm.SelectCustom">
            <Form.Label>Choose category</Form.Label>
            <Form.Control onChange={onChangeHandler} name="category_id" as="select" custom value={value}>
                {categories.map(category => <option value={category.id}>{category.name}</option>)}
            </Form.Control>
        </Form.Group>
    )
}

export default withRouter(PostForm);