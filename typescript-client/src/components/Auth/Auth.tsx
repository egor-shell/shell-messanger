// NPM
import React from 'react';
import {useLocation} from "react-router-dom";
import {useMutation} from "@apollo/client";
import {useDispatch, useSelector} from "react-redux";
import {Button, Card, Container, Form, NavLink, Row} from "react-bootstrap";
import jwtDecode from "jwt-decode";
// Files
import {LOGIN_ROUTE, REGISTRATION_ROUTE} from "../../utils/usrpath";
import {auth, logout, selectValue} from "../../features/isAuthSlice/isAuthSlice";
import {CHECK_USER, LOGIN_USER, REGISTER_USER} from "../../mutations/mutations";
import {createId, createUsername} from "../../features/currentUserSlice/currentUserSlice";
import './Auth.css'

const Auth = () => {
    const location = useLocation()
    const isLogin: boolean = location.pathname === LOGIN_ROUTE

    // State
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')

    // Redux
    const isAuth: boolean = useSelector(selectValue)
    const dispatch = useDispatch()

    // GraphQL
    const [registerUser] = useMutation(REGISTER_USER)
    const [loginUser] = useMutation(LOGIN_USER)
    const [checkUser] = useMutation(CHECK_USER)

    // Func
    const click = async () => {
        let user: {id: number, username: string}
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
                console.log(data)
                localStorage.setItem('token', data.login.token)
                user = jwtDecode(data.login.token)
            } else {
                const { data: dataRegister } = await registerUser({
                    variables: {
                        input: {
                            username, password
                        }
                    }
                })
                setUsername('')
                setPassword('')
                localStorage.setItem('token', dataRegister.registration.token)
                user = jwtDecode(dataRegister.registration.token)
            }
            dispatch(createId(user.id))
            dispatch(createUsername(user.username))
            dispatch(auth())
        } catch (e) {
            console.log(e)
            dispatch(logout())
        }
    }

    if(isAuth === false) {
        localStorage.removeItem('token')
    }
    return (
        <Container
            className='d-flex justify-content-center align-content-center'
            style={{height: window.innerHeight}}
        >
            <Card
                style={{width: 600}}
                className='p-5 auth'
            >
                <h2 className='m-auto'>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                {isLogin ?
                    <Form className='d-flex flex-column'>
                        <Form.Control
                            className='mt-3 auth-input'
                            placeholder='Введите логин'
                            value={username}
                            onChange={event => setUsername(event.target.value)}
                        />
                        <Form.Control
                            className='mt-3 auth-input'
                            placeholder='Введите пароль'
                            value={password}
                            type='password'
                            onChange={event => setPassword(event.target.value)}
                        />
                        <Row className='d-flex justify-content-between mt-3 pl-3 pr-3'>
                            <div className='align-self-center'>
                                Нет аккаунта? <NavLink href={REGISTRATION_ROUTE}>Зарегестрируйтесь</NavLink>
                            </div>
                            <Button
                                variant='outline-success'
                                onClick={click}
                                className='auth-button'
                            >
                                Войти
                            </Button>
                        </Row>
                    </Form>
                    :
                    <Form className='d-flex flex-column'>
                        <Form.Control
                            className='mt-e auth-input'
                            placeholder='Введите логин'
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                        <Form.Control
                            className='mt-3 auth-input'
                            placeholder='Введите пароль'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <Row className='d-flex justify-content-between mt-3 pl-3 pr-3'>
                            <div className='align-self-center'>
                                Есть аккаунт? <NavLink href={LOGIN_ROUTE}>Зарегестрируйтесь</NavLink>
                            </div>
                            <Button
                                variant='outline-success'
                                onClick={click}
                                className='auth-bottom'
                            >
                                Зарегестрироваться
                            </Button>
                        </Row>
                    </Form>
                }
            </Card>
        </Container>
    );
};

export default Auth;