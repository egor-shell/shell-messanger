// NPM
import React from "react";
import { Button, Card, Container, Form, Row } from 'react-bootstrap'
import { NavLink, useLocation } from 'react-router-dom'
import {useMutation} from "@apollo/client";
import jwt_decode from "jwt-decode";
import {useDispatch, useSelector} from "react-redux";

// Files
import {LOGIN_ROUTE, REGISTRATION_ROUTE} from "../../utils/urlpath";
import {CHECK_USER, LOGIN_USER} from "../../mutations/mutations";
import {auth, logout, selectValue} from "../../features/isAuth/isAuth";
import {setId} from "../../features/id/idSlice";

const Auth = () => {
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE

    // State
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')

    // Redux
    const isAuth = useSelector(selectValue)
    const dispatch = useDispatch()

    // GraphQL
    const [loginUser] = useMutation(LOGIN_USER)
    const [checkUser] = useMutation(CHECK_USER)

    // Func
    const click = async () => {
        let user
        try {
            if(isLogin) {
                const { data } = await loginUser({
                    variables: {
                        input: {
                            username, password
                        }
                    }
                })
                setUsername('')
                setPassword('')
                localStorage.setItem('token', data.login.token)
                user = jwt_decode(data.login.token)
                dispatch(setId(user.id))
            }
            dispatch(auth())
        } catch (e) {
            console.log(e)
            dispatch(logout())
        }
    }

    const secondClick = async () => {
        const token = localStorage.getItem('token')
        const decode = jwt_decode(token)
        const { data } = await checkUser({
            variables: {
                input: {
                    username: decode.username
                }
            }
        })
        localStorage.setItem('token', data.checkAuth.token)
    }

    return (
        <Container
            className='d-flex justify-content-center align-items-center'
            style={{height: window.innerHeight}}
        >
            <Card style={{width: 600}} className='p-5'>
                <h2 className='m-auto'>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                {isLogin ?
                    <Form className='d-flex flex-column'>
                        <Form.Control
                            className='mt-3'
                            placeholder='Введите логин'
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                        <Form.Control
                            className='mt-3'
                            placeholder='Введите пароль'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <Row className='d-flex justify-content-between mt-3 pl-3 pr-3'>
                            <div className='align-self-center'>
                                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегестрируйтесь!</NavLink>
                            </div>
                            <Button
                                variant={'outline-success'}
                                onClick={click}
                            >
                                Войти
                            </Button><Button
                                variant={'outline-success'}
                                onClick={secondClick}
                            >
                                SEND DARA
                            </Button>
                        </Row>
                    </Form>
                    :
                    <Form className='d-flex flex-column'>
                        <Form.Control
                            className='mt-3'
                            placeholder='Введите логин'
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                        <Form.Control
                            className='mt-3'
                            placeholder='Введите пароль'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <Row className='d-flex justify-content-between mt-3 pl-3 pr-3'>
                            <div className='align-self-center'>
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                            </div>
                            <Button
                                variant={'outline-success'}
                                onClick={click}
                            >
                                Зарегестрироваться
                            </Button>
                        </Row>
                    </Form>
                }
            </Card>
        </Container>
    )
}

export default Auth