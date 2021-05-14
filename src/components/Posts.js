import {Button, CardColumns, Form} from 'react-bootstrap'
import '../App.css';
import React from 'react';
import {Post} from './Post'
import {Link} from "react-router-dom";
import {isAuthenticated} from "../utils/user";

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
        return (
            <div className="flex-div text-md-left">
                <Form>
                    <Form.Label className="middle-text">Category</Form.Label>
                    <Form.Check type="checkbox" label="General" name="category" value="1"/>
                    <Form.Check type="checkbox" label="Science" name="category" value="2"/>
                    <Form.Check type="checkbox" label="Tech" name="category" value="3"/>
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
    }
    render(){
        let title = ""
        if (this.title_beginning !== undefined){
            title = <h3>{`Searching post starting with ${this.title_beginning}`}</h3>
        } else if (this.category_to_filter !== undefined){
            title = <h3>{`Post with ${this.category_to_filter} category`}</h3>
        } else {
            title = <h3>All posts</h3>
        }
        return(
            isAuthenticated() ?
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
                            <Post title="First post" author="Olena" category="1" created_at="1"
                                  text="This is first post"/>
                            <Post title="Second post" author="Olena" category="1" created_at="1"
                                  text="This is second post"/>
                            <Post title="Third post" author="Olena" category="1" created_at="1"
                                  text="This is third post"/>
                            <Post title="Fourth post" author="Olena" category="1" created_at="1"
                                  text="This is fourth post"/>
                            <Post title="Fifth post" author="Olena" category="1" created_at="1"
                                  text="This is fifth post"/>
                        </CardColumns>
                    </div>
                </div>

            </> : <h1>Not authenticated</h1>
        )
    }
}