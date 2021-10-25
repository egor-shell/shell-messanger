// NPM
import React from "react";
import { Button, Card, Container, Form, Row } from 'react-bootstrap'
import {NavLink, useHistory, useLocation} from 'react-router-dom'
import {useMutation} from "@apollo/client";
import jwt_decode from "jwt-decode";
import {useDispatch, useSelector} from "react-redux";

// Files
import {LOGIN_ROUTE, REGISTRATION_ROUTE} from "../../utils/urlpath";
import {CHECK_USER, LOGIN_USER, REGISTER_USER} from "../../mutations/mutations";
import {auth, logout, selectValue} from "../../features/isAuth/isAuth";
import {setId} from "../../features/id/idSlice";
import {adjustUsername} from "../../features/username/usernameSlice";
import './Auth.css'

const Auth = () => {
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    const history = useHistory()

    // State
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')

    // Redux
    const isAuth = useSelector(selectValue)
    const dispatch = useDispatch()

    // GraphQL
    const [registerUser] = useMutation(REGISTER_USER)
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
                user = jwt_decode(dataRegister.registration.token)
            }
            dispatch(setId(user.id))
            dispatch(adjustUsername(user.username))
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
        if(data.checkAuth === null || !data.checkAuth) {
            dispatch(logout())
            localStorage.removeItem('token')
        } else {
            localStorage.setItem('token', data.checkAuth.token)
        }
    }

    if(isAuth === false) {
        localStorage.removeItem('token')
    }


    return (
        <Container
            className='d-flex justify-content-center align-items-center'
            style={{height: window.innerHeight}}
        >
            <Card style={{width: 600}} className='p-5 auth'>
                <h2 className='m-auto'>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                {isLogin ?
                    <Form className='d-flex flex-column'>
                        <Form.Control
                            className='mt-3 auth-input'
                            placeholder='Введите логин'
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                        <Form.Control
                            className='mt-3 auth-input'
                            placeholder='Введите пароль'
                            value={password}
                            type='password'
                            onChange={e => setPassword(e.target.value)}
                        />
                        <Row className='d-flex justify-content-between mt-3 pl-3 pr-3'>
                            <div className='align-self-center'>
                                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегестрируйтесь!</NavLink>
                            </div>
                            <Button
                                variant={'outline-success'}
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
                            className='mt-3 auth-input'
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
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                            </div>
                            <Button
                                variant={'outline-success'}
                                onClick={click}
                                className='auth-button'
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