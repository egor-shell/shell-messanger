// NPM
import React from "react";
import {useQuery, useSubscription} from "@apollo/client";
import {GET_CHAT, GET_USERS} from "../../query/query";
import {useDispatch, useSelector} from "react-redux";
import {Container, FormControl, InputGroup, ListGroup} from "react-bootstrap";
import {Link} from "react-router-dom";

// Files
import {selectId} from "../../features/id/idSlice";
import {selectUsersId, setUsersId} from "../../features/usersId/usersIdSlice";
import {CHAT_ADD} from "../../subscribe/sub";
import './users.css'
import {BiSearch} from "react-icons/all";
import {adjustUser} from "../../features/userSlice/userSile";


const Users = ({ username }) => {
    let users
    let usersChat = []
    let chatId = ''
    // State
    const [idUsers, setIdUsers] = React.useState([])
    const [search, setSearch] = React.useState('')
    // Redux
    const userId = useSelector(selectId)
    const usersId = useSelector(selectUsersId)
    const dispatch = useDispatch()
    // GraphQL
    const {data: dataUsers, loading: loadUsers, refetch: refetchUsers} = useQuery(GET_USERS)
    const {loading: loadChat} = useQuery(GET_CHAT, {
        variables: {
            input: {
                usersId: idUsers
            }
        }
    })
    const {data: subUsers} = useSubscription(CHAT_ADD, {
        variables: {
            input: {
                usersId: usersId
            }
        }
    })
    console.log(subUsers)
    React.useEffect(() => {
        refetchUsers()
    }, [dataUsers])
    if(loadUsers || loadChat) {
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
        if(search.length) {
            usersChat = users
        }
    }
    return (
        <Container>
            <h3 className='users-messagesHead'>Сообщения</h3>
            <InputGroup>
                <FormControl
                    placeholder={'Введите имя...'}
                    onChange={(event => {
                        setSearch(event.target.value)
                    })}
                    className='users_search'
                />
            </InputGroup>
            <ListGroup variant={"flush"}>
                {usersChat.filter((user) => {
                  if(search == '') {
                      return user
                  } else if (user.username.toLowerCase().includes(search.toLowerCase())) {
                      return user
                  }
                }).map((user) => (
                    <Link
                        onClick={async () => {
                            const usersId = [Number(userId), Number(user.id)].sort((a,b) => {
                                return a - b
                            })
                            let currentChat = user.chats.find(c => String(c.usersId) === String(usersId))
                            if(!currentChat) {
                                const currentUser = dataUsers.getAllUsers.find(u => u.username === user.username)
                                const usersChat = [
                                    currentUser,
                                    {id: userId, username}
                                ]
                                usersChat.sort((a,b) => {
                                    return a.id - b.id
                                })
                                chatId = usersChat[0].username + usersChat[1].username
                                const usersId = [Number(usersChat[0].id), Number(usersChat[1].id)]
                                dispatch(setUsersId(usersId))
                            } else {
                                chatId = currentChat.chatId
                                dispatch(setUsersId(currentChat.usersId))
                            }
                            localStorage.setItem('user', user.username)

                        }}
                        to={() => `/im/${chatId}`}
                        key={user.id}
                        className='user-link'
                    >
                        <li
                            className='user-item'
                        >
                            <h4 className='user-name'>
                                {user.username}
                            </h4>
                        </li>
                    </Link>
                ))}
            </ListGroup>
        </Container>
    )
}


export default Users