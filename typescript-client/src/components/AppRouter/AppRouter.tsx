// NPM
import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useMutation} from "@apollo/client";
import jwtDecode from "jwt-decode";

// Files
import {authRoutes, publicRoutes} from "../Routers";
import {auth, logout, selectValue} from "../../features/isAuthSlice/isAuthSlice";
import {CHECK_USER} from "../../mutations/mutations";
import {createId} from "../../features/currentUserSlice/currentUserSlice";

const AppRouter = () => {
    const isAuth = useSelector(selectValue)
    const dispatch = useDispatch()

    // GraphQL
    const [checkUser] = useMutation(CHECK_USER)

    const checkedAuth = async () => {
        const token = localStorage.getItem('token')
        if(token) {
            const decode: {id: number, username: string} = jwtDecode(token)
            const { data } = await checkUser({
                variables: {
                    input: {
                        username: decode.username
                    }
                }
            })
            localStorage.setItem('token', data.checkAuth.token)
            if(data) {
                dispatch(auth())
                dispatch(createId(decode.id))
            } else {
                dispatch(logout())
            }
        }
    }

    React.useEffect(() => {
        checkedAuth()
    }, [])

    return isAuth ? (
        <Switch>
            {
                authRoutes.map(({ path, Component }) =>
                    <Route key={path} path={path} component={Component} exact />
                )
            }
            <Redirect to='/im' />
        </Switch>
        )
        :
        (
            <Switch>
                {
                    publicRoutes.map(({ path, Component }) =>
                        <Route key={path} path={path} component={Component} exact />
                    )
                }
                <Redirect to='/login' />
            </Switch>
        )

};

export default AppRouter;