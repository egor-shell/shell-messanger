// NPM
import React from "react";
import {Card, ListGroup} from "react-bootstrap";
import {useSelector} from "react-redux";
// Files
import {selectId} from "../../features/id/idSlice";
import {Button} from "bootstrap";

export const Message = ({ msg }) => {
    const { messageText, senderName, userId } = msg
    const idUser = useSelector(selectId)
    // msg.userId === userId ? msg.currentUser = true : msg
    if(userId === idUser) {
        msg = {...msg, currentUser: true}
    }
    return (
        <ListGroup.Item
            className={`d-flex ${msg.currentUser ? 'justify-content-end' : ''}`}
        >
            <Card
                bg={`${msg.currentUser ? 'primary' : 'secondary'}`}
                text='light'
                style={{ width: '55%' }}
            >
                <Card.Header className='d-flex justify-content-between align-items-center'>
                    <Card.Text>{senderName}</Card.Text>
                </Card.Header>
                <Card.Body className='d-flex justify-content-between align-items-center'>
                    <Card.Text>{messageText}</Card.Text>
                </Card.Body>
            </Card>
        </ListGroup.Item>
    )
}