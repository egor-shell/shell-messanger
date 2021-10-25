// NPM
import React from "react";
import {Container, ListGroup, Spinner} from "react-bootstrap";
import {useSubscription} from "@apollo/client";

// Files
import {Message} from "../Message/Message";
import './MessageField.css'

const listStyles = {
    height: '100%',
    borderRadius: '4px',
    overflow: 'auto'
}
const emptyList = {
    height: '100%',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '4px',
    overflow: 'auto'
}
const notMessage = {
    width: '100%'
}

export const MessageField = ({ messages, chatId, oldMessage }) => {
    const messagesEndRef = React.useRef(null)
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
    React.useEffect(() => {
        scrollToBottom()
    }, [messages])
    if(!messages) {
        return (
            <Container style={emptyList} >
                <div style={notMessage} >Нет сообщений</div>
            </Container>
        )
    }
    return (
        <ListGroup variant='flush' style={listStyles} className='messageField'>
            {messages.map((msg) => (
                <Message key={msg.messageId} msg={msg}/>
            ))}
            <span ref={messagesEndRef}/>
        </ListGroup>
    )
}