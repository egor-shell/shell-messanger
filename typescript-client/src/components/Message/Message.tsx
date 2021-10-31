// NPM
import React from 'react';
import {useSelector} from "react-redux";
import {ListGroup, Card} from "react-bootstrap";

// Files
import {selectId} from "../../features/currentUserSlice/currentUserSlice";
import './Message.css'

const messageEl: React.CSSProperties = {
    backgroundColor: "#202442",
    border: "none"
}
const messageFrom: React.CSSProperties  = {
    backgroundColor: "#406ae0",
    width: '55%'
}
const messageTo: React.CSSProperties = {
    backgroundColor: "#2b2b57",
    width: '55%'
}
const Message = ({ msg }: any) => {
    const idUser = useSelector(selectId)
    if(msg.userId === idUser) {
        msg = {...msg, currentUser: true}
    }
    const { messageText, senderName, currentUser } = msg
    return (
        <ListGroup.Item
            className={`d-flex ${currentUser ? 'justify-content-end' : ''}`}
            style={messageEl}
        >
            <Card
                style={currentUser ? messageFrom : messageTo}
                text='light'
            >
                <Card.Header className='d-flex justify-content-between align-items-center'>
                    <Card.Text>{senderName}</Card.Text>
                </Card.Header>
                <Card.Body className='d-flex justify-content-between align-items-center'>
                    <Card.Text>{messageText}</Card.Text>
                </Card.Body>
            </Card>
        </ListGroup.Item>
    );
};

export default Message;