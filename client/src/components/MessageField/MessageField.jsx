// NPM
import React from "react";
import {Container, ListGroup, Spinner} from "react-bootstrap";
import {useSubscription} from "@apollo/client";

// Files
import {Message} from "../Message/Message";
import {MESSAGE_ADD} from "../../subscribe/sub";

const listStyles = {
    height: '75vh',
    border: '1px solid rgba(0,0,0,.4)',
    borderRadius: '4px',
    overflow: 'auto'
}
const emptyList = {
    height: '75vh',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    border: '1px solid rgba(0,0,0,.4)',
    borderRadius: '4px',
    overflow: 'auto'
}
const notMessage = {
    width: '100%'
}

export const MessageField = ({ messages, chatId, oldMessage }) => {
    console.log(messages)
    const messagesEndRef = React.useRef(null)
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
    React.useEffect(() => {
        scrollToBottom()
    }, [messages])
    if(!messages) {
        return (
            <Container style={emptyList}>
                <div style={notMessage}>Нет сообщений</div>
            </Container>
        )
    }
    // if(loadMessages) {
    //     return (
    //         <Spinner animation='border'/>
    //     )
    // }
    return (
        <ListGroup variant='flush' style={listStyles}>
            {messages.map((msg) => (
                <Message key={msg.messageId} msg={msg}/>
            ))}
            <span ref={messagesEndRef}/>
        </ListGroup>
    )
}