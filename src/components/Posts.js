import {Button, CardColumns, CardDeck, Form} from 'react-bootstrap'
import '../App.css';
import React from 'react';
import {Post} from './Post'
import {Link} from "react-router-dom";
import {getUser} from "../utils/user";
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

export class Categories extends React.Component{
    render() {
        const categories = getCategories();
        console.log(categories);
        return (
            <div className="flex-div text-md-left">
                <Form>
                    <Form.Label className="middle-text">Category</Form.Label>
                    {categories.map(category =>  <Form.Check type="checkbox" label={category.name} name="category" value={category.id}/>)}
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
        this.title_beginning = props.title
        this.category_to_filter = props.category
        this.state = {
            promiseIsResolved: false
        }
    }

    componentDidMount() {
        retrievePosts().then((posts) => {
            this.posts = posts;
            console.log(this.posts);
            this.setState({promiseIsResolved: true});
        })
    }

    render() {
        const user = getUser();
        let title = ""
        if (this.title_beginning !== undefined) {
            title = <h3>{`Searching post starting with ${this.title_beginning}`}</h3>
        } else if (this.category_to_filter !== undefined) {
            title = <h3>{`Post with ${this.category_to_filter} category`}</h3>
        } else {
            title = <h3>All posts</h3>
        }
        return (
            user && user.authenticated ?
            <>
                <div className="flex-div">
                    {title}
                </div>
                <Link className="mt-3 btn btn-primary" to="/posts/new">+ New post</Link>
                <SearchField/>
                <div className="d-flex">
                    <div className="align-self-lg-start m-lg-5">
                        <Categories/>
                    </div>

                    <div className="flex-div">
                        <CardColumns>
                            {
                                this.state.promiseIsResolved ?
                                this.posts.map((post) => <Post post={post}/>) : ''
                            }
                        </CardColumns>
                    </div>
                </div>
            </>: <h1>Not authenticated</h1>
        )
    }
}