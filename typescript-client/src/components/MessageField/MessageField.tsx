import React from 'react';

// Files
import {Container, ListGroup} from "react-bootstrap";
import {IMessage} from "../../interfaces/interfaces";
import Message from "../Message/Message"
import './MessageField.css'

type PropMessages = {
    messages: IMessage[]
}
const listStyle: React.CSSProperties | undefined
    = {
    height: '100%',
    borderRadius: '4px',
    overflow: 'auto'
}
const emptyList: React.CSSProperties | undefined = {
    height: '100%',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '4px',
    overflow: 'auto'
}
const notMessage: React.CSSProperties | undefined = {
    width: '100%'
}
type PropsMessages = {
        messageId: string,
        messageText: string,
        senderName: string,
        userId: number
}[]
const MessageField: React.FC<PropMessages & {className: string}> = ({ messages }: any) => {
    const messagesEndRef = React.useRef<null | HTMLElement>(null)
    const scrollBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth"})
    }
    React.useEffect(() => {
        scrollBottom()
    }, [messages])
    if(!messages) {
        return (
            <Container style={emptyList}>
                <div style={notMessage}>Нет сообщений</div>
            </Container>
        )
    }
    return (
        <ListGroup variant='flush' style={listStyle} className='messageField'>
            {messages.map((msg: IMessage) => (
                <Message key={msg.messageId} msg={msg}/>
            ))}
        </ListGroup>
    );
};

export default MessageField;