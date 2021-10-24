// NPM
import React from "react";
import {useSelector} from "react-redux";
import {Container, ListGroup} from "react-bootstrap";
import {useQuery, useSubscription} from "@apollo/client";

// Files
import {selectUsersId} from "../../features/usersId/usersIdSlice";
import {GET_CHAT} from "../../query/query";
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

export const MessageField = ({ messages }) => {
    const usersId = useSelector(selectUsersId)
    const messagesEndRef = React.useRef(null)
    const { refetch } = useQuery(GET_CHAT, {
        variables: {
            usersId: usersId
        }
    })
    const { data: subMessage, loading: loadMessage } = useSubscription(MESSAGE_ADD)
    if(subMessage) {
        console.log(subMessage)
        messages = subMessage.newMessage.messages
    }

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
    React.useEffect(() => {
        scrollToBottom()
        refetch().then(() => {
            return console.log('REFETCH MESSAGES')
        })
    }, [messages])
    if(!messages) {
        return (
            <Container style={emptyList}>
                <div style={notMessage}>Нет сообщений</div>
            </Container>
        )
    }
    return (
        <ListGroup variant='flush' style={listStyles}>
            {messages.map((msg) => (
                <Message key={msg.messageId} msg={msg}/>
            ))}
            <span ref={messagesEndRef}></span>
        </ListGroup>
    )
}