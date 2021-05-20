import '../App.css';
import {Button, Card, Form} from 'react-bootstrap';
import React from 'react';
import {getUser} from "../utils/user";
import {getCategories} from "../utils/categories";
import {Redirect, withRouter} from "react-router-dom";
import {deletePost, retrievePost} from "../utils/posts";
import {getReadableDatetime} from "../utils/date";
import S3FileUpload from 'react-s3';

export function Post({post}){
    return (
        <Card style={{width: '18rem'}}>
            <Card.Body>
                <Card.Img variant="top" src={post.image} />
                <Card.Title>{post.title}</Card.Title>
                <Card.Subtitle className="small-text text-left mb-2 text-muted">{`Created by ${post.username} at ${getReadableDatetime(post.created_at)}`}</Card.Subtitle>
                <Card.Subtitle className="small-text text-left mb-2 text-muted">{`Category: ${post.category}`}</Card.Subtitle>
                <Card.Text max_ className="text-truncate text-left">{post.text}</Card.Text>
                <Card.Link href={`/posts/${post.id}/edit`}>Edit post</Card.Link>
                <Card.Link href={`/posts/${post.id}/${post.user_id}`}>Delete post</Card.Link>
            </Card.Body>
        </Card>
    )
}

class PostForm extends React.Component{
    constructor(props) {
        super(props);
        const user = getUser();
        const categories = getCategories();
        this.state = {
            title: "",
            user_id: user ? user.id : "",
            category_id: categories ? categories[0].id : "",
            text: "",
            image: "",
            promiseIsResolved: false
        }
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        if (id) {
            retrievePost(id).then((post) => {
                this.post = post;
                this.setState({
                    id: post.id,
                    title: post.title,
                    category_id: post.category_id,
                    user_id: post.user_id,
                    text: post.text,
                    image: post.image,
                    promiseIsResolved: true
                });
            })
        }
    }

    handleFileInputChange = (event) => {
        this.setState({
            [event.target.name]: [event.target.files[0]]
        });
    };

    handleUpload = async () => {
        const config = {
            bucketName: process.env.REACT_APP_BUCKET_NAME,
            region: 'us-east-1',
            accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
            secretAccessKey: process.env.REACT_APP_SECRET_KEY_ID
        }

        await S3FileUpload.uploadFile(this.state.image[0], config).then(data => {
            this.setState({
                    image: data.location
                }
            )
        }
        ).catch(err => alert(err));
    };

    myChangeHandler = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({[name]: value})
    }

    mySubmitHandler = (event) => {
        event.preventDefault();
        if(this.post && this.post.id){
            this.handleUpload().then(() => {
                if (this.state.image === '') {
                    this.setState({
                        image: this.post.image
                    })
                }
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
            })
        } else {
            this.handleUpload().then(() => {
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
            })
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
                        <div className="mb-3">
                            <input type="file" name="image" onChange={this.handleFileInputChange}/>
                        </div>
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

class PostDelete extends React.Component {
    render() {
        const user = getUser();
        const {id, user_id} = this.props.match.params;
        if (user && user.authenticated && user.id == user_id) {
            let shouldDelete = window.confirm('Do you really want to delete this post?');
            if (shouldDelete) {
                deletePost(id);
                return <Redirect to='/posts'/>
            }
            return (
                <div className='container'>
                </div>
            )
        } else {
            return (
                <h1>Not authenticated</h1>
            )
        }
    }
}

withRouter(PostDelete);

export default withRouter(PostForm);
export {PostDelete};