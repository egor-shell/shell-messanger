// NPM
import React, {useState} from "react";
import {Form} from "react-bootstrap";
import {useMutation, useQuery, useSubscription} from "@apollo/client";
import {GET_CHAT} from "../../query/query";
import {useSelector} from "react-redux";
import {SEND_MESSAGE} from "../../mutations/mutations";
import {Button} from "react-bootstrap";
import {FiSend} from "react-icons/all";
import {nanoid} from "@reduxjs/toolkit";
import {CHAT_ADD, MESSAGE_ADD} from "../../subscribe/sub";
import {selectUsersId} from "../../features/usersId/usersIdSlice";

// Files
import './SendMessage.css'

export const SendMessage = ({ username, userId, chatId, update }) => {
    // State
    const [text, setText] = useState('')
    const id = nanoid(8)
    // Redux
    const usersId = useSelector(selectUsersId)
    // GraphQL
    const {data: dataChat, refetch} = useQuery(GET_CHAT, {
        variables: {
            usersId: usersId
        }
    })
    const [addMessage] = useMutation(SEND_MESSAGE)


    const sendMessage = (e) => {
        e.preventDefault()
        update().then((data) => {
            return data
        })
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
        }).then(({data}) => {
            return data
        })
        setText('')
    }

    return (
        <div className="Send-field">
            <Form onSubmit={sendMessage}>
                <Form.Group className='d-flex justify-content-center sendMessage-el'>
                    <Form.Control
                        value={text}
                        onChange={e => setText(e.target.value)}
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
    )
}