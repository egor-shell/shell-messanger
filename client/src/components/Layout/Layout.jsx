// NPM
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router-dom";
import {useQuery} from "@apollo/client";
import {Col, Container, Row, Spinner} from "react-bootstrap";

// Files
import { logout } from "../../features/isAuth/isAuth";
import {Header} from "../Header/Header";
import {GET_CHAT, GET_USER} from "../../query/query";
import {selectId} from "../../features/id/idSlice";
import {EmptyField} from "../EmptyField/EmptyField";
import Users from "../Users/Users";
import {MessageField} from "../MessageField/MessageField";
import {SendMessage} from "../SendMessage/SendMessage";
import {selectUsersId, setUsersId} from "../../features/usersId/usersIdSlice";

export function Layout() {
    const path = useLocation()
    const roomId = path.pathname.substr(4)

    // Redux
    const dispatch = useDispatch()
    const idUser = useSelector(selectId)
    const usersId = useSelector(selectUsersId)

    // GraphQL
    const { data: dataUser, loading: loadUser } = useQuery(GET_USER, {
        variables: {
            id: idUser
        }
    })
    const { data: dataChat, loading: loadChat } = useQuery(GET_CHAT, {
        variables: {
            usersId: usersId
        }
    })

    if(loadUser || loadChat) {
        return (
            <Spinner animation='border'/>
        )
    }
    if(path.pathname === '/im') {
        return (
            <Container>
                <Header />
                <Row>
                    <Col sm={4}>
                        <Users />
                    </Col>
                    <Col sm={8}>
                        <EmptyField/>
                    </Col>
                </Row>
            </Container>
        )
    }
    return (
        <Container>
            <Header />
            <Row>
                <Col sm={4}>
                    <Users />
                </Col>
                <Col sm={8}>
                    <MessageField messages={dataChat.getChat.messages}/>
                    <SendMessage username={dataUser.getUser.username} userId={idUser} chatId={roomId}/>
                </Col>
            </Row>
        </Container>
    )
}