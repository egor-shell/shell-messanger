// NPM
import React from "react";
import {useSelector} from "react-redux";
import {useHistory, useLocation} from "react-router-dom";
import {useQuery, useSubscription} from "@apollo/client";
import {Col, Container, Row, Spinner} from "react-bootstrap";

// Files
import {Header} from "../Header/Header";
import {GET_CHAT, GET_USER, GET_USERS} from "../../query/query";
import {selectId} from "../../features/id/idSlice";
import {EmptyField} from "../EmptyField/EmptyField";
import Users from "../Users/Users";
import {MessageField} from "../MessageField/MessageField";
import {SendMessage} from "../SendMessage/SendMessage";
import {selectUsersId} from "../../features/usersId/usersIdSlice";
import {MESSAGE_ADD} from "../../subscribe/sub";
import './Layout.css'
import {UserInfo} from "../UserInfo/UserInfo";

export function Layout() {
    const location = useLocation()
    const roomId = location.pathname.substr(4)
    const history = useHistory()
    let messages
    // Redux
    const idUser = useSelector(selectId)
    const usersId = useSelector(selectUsersId)

    // GraphQL
    const { data: dataAllUsers } = useQuery(GET_USERS)
    const { data: dataUser, loading: loadUser } = useQuery(GET_USER, {
        variables: {
            id: idUser
        }
    })
    console.log(usersId)
    const { data: dataChat, loading: loadChat, refetch: refChat } = useQuery(GET_CHAT, {
        variables: {
            input: {
                usersId: usersId,
                chatId: roomId
            }
        }
    })
    const { data: subMessage, loading: loadMessage } = useSubscription(MESSAGE_ADD, {
        variables: {
            input: {
                chatId: roomId
            }
        }
    })

    // Func
    const escFunc = ((event) => {
        if(event.key === 'Escape') {
            history.push('')
            localStorage.removeItem('path')
        }
    })
    React.useEffect(() => {
        document.addEventListener("keydown", escFunc, false)
        const path = localStorage.getItem('path')
        if(path) {
            window.onload = () => {
            history.push(path)
        }
        }
        if(location.pathname.length > 3) {
            localStorage.setItem('path', location.pathname)
        }
        return () => {
            document.removeEventListener("keydown", escFunc, false)
        }
    }, [dataChat])
    console.log(dataChat)
    if(loadUser || loadChat ) {
        return (
            <Spinner animation='border'/>
        )
    }
    if(dataChat) {
        if(dataChat.getChat !== null) {
            messages = dataChat.getChat.messages
        }
    } else {
        messages = []
        console.log(messages)
    }
    if(subMessage && roomId === subMessage.newMessage.chatId) {
        messages = subMessage.newMessage.messages
    }
    if(location.pathname === '/im') {
        return (
            <Container className='layout-container'>
                <Row className='layout-row'>
                    <Col sm={1}>
                        <Header />
                    </Col>
                    <Col sm={3}>
                        <Users username={dataUser.getUser.username}/>
                    </Col>
                    <Col sm={8} className='layout-bigCol'>
                        <EmptyField/>
                    </Col>
                </Row>
            </Container>
        )
    }
    return (
        <Container className='layout-container'>
            <Row className='layout-row'>
                <Col sm={1}>
                    <Header />
                </Col>
                <Col sm={3}>
                    <Users username={dataUser.getUser.username}/>
                </Col>
                <Col sm={8} className='layout-bigCol d-flex flex-column'>
                    <div className='layout-message'>
                        <MessageField messages={messages} chatId={roomId} className='layout-messageField'/>
                        <SendMessage username={dataUser.getUser.username} userId={idUser} chatId={roomId} update={refChat}/>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}