//NPM
import React from "react";
import {useHistory, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {useQuery, useSubscription} from "@apollo/client";
import {Col, Container, Row, Spinner} from "react-bootstrap";

// Files
import {selectId, selectUsername} from "../../features/currentUserSlice/currentUserSlice";
import {selectUsersId} from "../../features/usersIdSilce/usersIdSlice";
import {GET_CHAT, GET_USER} from "../../query/query";
import {MESSAGE_ADD} from "../../sub/subscribrion";
import {IDataChat, IDataUser, IMessage} from "../../interfaces/interfaces";
import Header from "../Header/Header";
import Users from "../Users/Users";
import EmptyField from "../EmptyField/EmptyField";
import MessageField from "../MessageField/MessageField";
import SendMessage from "../SendMessage/SendMessage";
import './Layout.css'

export const Layout = () => {
    const location = useLocation()
    const roomId: string = location.pathname.substr(4)
    const history = useHistory()
    let messages: any

    // Redux
    const idUser: number = useSelector(selectId)
    const usersId: number[] = useSelector(selectUsersId)

    // GraphQL
    const { data: dataUser, loading: loadUser } = useQuery<IDataUser>(GET_USER, {
        variables: {
            id: idUser
        }
    })
    const { data: dataChat, loading: loadChat, refetch: refChat } = useQuery<IDataChat>(GET_CHAT, {
        variables: {
            input: {
                usersId: usersId,
                chatId: roomId
            }
        }
    })
    const { data: subMessage } = useSubscription(MESSAGE_ADD, {
        variables: {
            input: {
                chatId: roomId
            }
        }
    })
    // Redux
    const username: string = useSelector(selectUsername)

    // Func
    const escFunc = ((event: KeyboardEvent): void => {
        if(event.key === 'Escape') {
            history.push('')
            localStorage.removeItem('path')
        }
    })

    React.useEffect(() => {
        document.addEventListener("keydown", escFunc);
        const path: string | null = localStorage.getItem('path')
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
    if(loadUser || loadChat) {
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
    }
    if(subMessage && roomId === subMessage.newMessage.chatId) {
        messages = subMessage.newMessage.messages
    }
    if(location.pathname === '/im') {
        return (
            <Container className='layout-container'>
                <Row className='layout-row'>
                    <Col sm={1}>
                        <Header/>
                    </Col>
                    <Col sm={3}>
                        <Users username={username}/>
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
                    <Users username={username}/>
                </Col>
                <Col sm={8} className='d-flex flex-column layout-bigCol'>
                    <div className='layout-message'>
                        <MessageField className='layout-messageField' messages={messages} />
                        <SendMessage username={username} userId={idUser} chatId={roomId} update={refChat}/>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}