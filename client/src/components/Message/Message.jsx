// NPM
import React from "react";
import {Card, ListGroup} from "react-bootstrap";
import {useSelector} from "react-redux";
// Files
import {selectId} from "../../features/id/idSlice";
import {Button} from "bootstrap";

export const Message = ({ msg }) => {
    const idUser = useSelector(selectId)
    if(msg.userId === idUser) {
        msg = {...msg, currentUser: true}
    }
    const { messageText, senderName, currentUser } = msg

    const handleRemoveMsg = (id) => {

    }
    return (
        <ListGroup.Item
            className={`d-flex ${currentUser ? 'justify-content-end' : ''}`}
        >
            <Card
                bg={`${currentUser ? 'primary' : 'secondary'}`}
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