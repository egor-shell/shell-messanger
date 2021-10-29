// NPM
import React from 'react';
import {useSelector} from "react-redux";
import {ListGroup, Card} from "react-bootstrap";

// Files
import {selectId} from "../../features/currentUserSlice/currentUserSlice";
import './Message.css'

const Message = ({ msg }: any) => {
    const idUser = useSelector(selectId)
    if(msg.userId === idUser) {
        msg = {...msg, currentUser: true}
    }
    const { messageText, senderName, currentUser } = msg
    return (
        <ListGroup.Item
            className={`d-flex ${currentUser ? 'justify-content-end' : ''} message-el`}
        >
            <Card
                className={`${currentUser ? 'message-from' : 'message-to'} message-item`}
                text='light'
                style={{ width: '55%'}}
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