import './App.css';
import {Button, Card} from 'react-bootstrap';

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