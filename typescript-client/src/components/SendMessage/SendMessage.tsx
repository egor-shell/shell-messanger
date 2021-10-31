import React, {useState} from 'react';
import {IDataChat} from "../../interfaces/interfaces";
import {nanoid} from "@reduxjs/toolkit";
import {useSelector} from "react-redux";
import {selectUsersId} from "../../features/usersIdSilce/usersIdSlice";
import {useMutation} from "@apollo/client";
import {SEND_MESSAGE} from "../../mutations/mutations";
import {Button, Form} from "react-bootstrap";
import {FiSend} from "react-icons/all";
import './SendMessage.css'

type TSendMessage = {
    username: string | undefined,
    userId: number,
    chatId: string,
    update: Function
}

const SendMessage = ({ username, userId, chatId, update }: TSendMessage) => {
    // State
    const [text, setText] = useState('')
    const id: string = nanoid(8)
    // Redux
    const usersId = useSelector(selectUsersId)
    // GraphQL
    const [addMessage] = useMutation(SEND_MESSAGE)

    const sendMessage = (event: { preventDefault: () => void; }) => {
        event.preventDefault()
        update()
        const trimmed = text.trim()
        if(trimmed) {
            const message = {
                messageText: text,
                senderName: username,
                userId: userId
            }
        }
        addMessage({
            variables: {
                input: {
                    messageText: text,
                    senderName: username,
                    userId: userId,
                    usersId: usersId,
                    chatId: chatId,
                    messageId: id
                }
            }
        }).then(r => {
            return r
        })
        setText('')
    }
    return (
        <div className='Send-field'>
            <Form onSubmit={sendMessage}>
                <Form.Group className='d-flex justify-content-center sendMessage-el'>
                    <Form.Control
                        value={text}
                        onChange={event => setText(event.target.value)}
                        type='text'
                        placeholder='Сообщение...'
                        className='sendMessage-input'
                    />
                    <Button
                        type='submit'
                        className='sendMessage-send'
                    >
                        <FiSend/>
                    </Button>
                </Form.Group>
            </Form>
        </div>
    );
};

export default SendMessage;