// NPM
import React from "react";
import {useQuery} from "@apollo/client";
import {GET_CHAT, GET_USERS} from "../../query/query";
import {useDispatch, useSelector} from "react-redux";

// Files
import {selectId} from "../../features/id/idSlice";
import {Container, ListGroup} from "react-bootstrap";
import {Link} from "react-router-dom";
import {setUsersId} from "../../features/usersId/usersIdSlice";

const Users = () => {
    const [idUsers, setIdUsers] = React.useState([])
    const [link, setLink] = React.useState('')
    let users
    const usersChat = []
    let chatId = ''
    // Redux
    const userId = useSelector(selectId)
    const dispatch = useDispatch()
    // GraphQL
    const {data: dataUsers, loading: loadUsers} = useQuery(GET_USERS)
    const {data: dataChat, loading: loadChat} = useQuery(GET_CHAT, {
        variables: {
            usersId: idUsers
        }
    })
    if(loadUsers || loadChat) {
        console.log(loadChat)
        return (
            <div>Загрузка</div>
        )
    }
    users = dataUsers.getAllUsers
    const chatWithUsers = users.find(user => String(user.id) === String(userId))
    if(chatWithUsers) {
        const chats = chatWithUsers.chats
        const idUserChats = []
        if(chats) {
            chats.map((chat) => {
                if(chat) {
                    console.log(chat)
                    const idUser = chat.usersId.find((id) => {
                        return id !== userId
                    })
                    idUserChats.push(idUser)
                }
            })
            idUserChats.map((id) => {
                let user = users.find((user) => String(user.id) === String(id))
                usersChat.push(user)
            })
        }
    }
    return (
        <Container>
            <h3>Список контактов</h3>
            <ListGroup variant={"flush"}>
                {usersChat.map((user) => (
                    <Link
                        onClick={async () => {
                            const usersId = [Number(userId), Number(user.id)].sort((a,b) => {
                                return a - b
                            })
                            const currentChat = user.chats.find(c => String(c.usersId) === String(usersId))
                            chatId = currentChat.chatId
                            dispatch(setUsersId(currentChat.usersId))

                        }}
                        to={() => `/im/${chatId}`}
                    >
                        <ListGroup.Item
                            className='user-item'
                            key={user.id}
                        >
                            {user.username}
                        </ListGroup.Item>
                    </Link>
                ))}
            </ListGroup>
        </Container>
    )
}


export default Users