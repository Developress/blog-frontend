import {Button, CardColumns, CardDeck, Form} from 'react-bootstrap'
import '../App.css';
import React from 'react';
import {Post} from './Post'
import {Link, withRouter} from "react-router-dom";
import {getUser, setUser} from "../utils/user";
import {getCategories, retrieveCategories} from "../utils/categories";
import {retrievePosts} from "../utils/posts";
import {getReadableDatetime} from "../utils/date";


export class SearchField extends React.Component{
    render() {
        return (
            <div className="flex-div">
                <Form inline>
                    <Form.Group>
                        <Form.Control name="search" type="search"
                                      placeholder="Enter the title of the post to search"/>
                        <Button variant="primary" type="submit">Search</Button>
                    </Form.Group>
                </Form>
            </div>
        )
    }
}

export class Categories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories_ids: []
        }
    }

    myChangeHandler = (event) => {
        let target = event.target;
        let value = event.target.value;

        if(target.checked){
            this.state.categories_ids.push(value);
        }else{
            this.state.categories_ids.splice(this.state.categories_ids.indexOf(value), 1);
        }

    }

    mySubmitHandler = (event) =>{
        event.preventDefault();
        fetch(`http://localhost:3000/posts/filter`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                this.props.updatePosts('Filtering posts by categories', data);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    render() {
        const categories = getCategories();
        console.log(categories);
        return (
            <div className="flex-div text-md-left">
                <Form onSubmit={this.mySubmitHandler}>
                    <Form.Label className="middle-text">Category</Form.Label>
                    {categories.map(category =>  <Form.Check type="checkbox" label={category.name} name="category" value={category.id}
                    onChange={this.myChangeHandler}/>)}
                    <div className="flex-div">
                        <Button variant="primary" type="submit">Filter</Button>
                    </div>

                </Form>
            </div>
        )
    }
}

export class Posts extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            title: 'All posts',
            promiseIsResolved: false,
            posts: []
        }
    }

    updatePosts = (title, posts) => {this.setState({
        title: title,
        posts: posts
    })}

    componentDidMount() {
        retrievePosts().then((posts) => {
            this.setState({
                posts: posts,
                promiseIsResolved: true
            });
        })
    }

    render() {
        const user = getUser();
        return (
            user && user.authenticated ?
            <>
                <div className="flex-div">
                   <h1>{this.state.title}</h1>
                </div>
                <Link className="mt-3 btn btn-primary" to="/posts/new">+ New post</Link>
                <SearchField/>
                <div className="d-flex">
                    <div className="align-self-lg-start m-lg-5">
                        <Categories updatePosts={this.updatePosts}/>
                    </div>

                    <div className="flex-div">
                        <CardColumns>
                            {
                                this.state.promiseIsResolved ?
                                this.state.posts.map((post) => <Post post={post}/>) : ''
                            }
                        </CardColumns>
                    </div>
                </div>
            </>: <h1>Not authenticated</h1>
        )
    }
}