// NPM
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { useMutation } from "@apollo/client";
import jwt_decode from "jwt-decode";

// Files
import { authRoutes, publicRoutes } from '../Routers/Routers'
import {logout, selectValue, auth} from "../../features/isAuth/isAuth";
import {CHECK_USER} from "../../mutations/mutations";
import {setId} from "../../features/id/idSlice";

export const AppRouter = () => {
    const isAuth = useSelector(selectValue)
    const dispatch = useDispatch()

    // GraphQL
    const [checkUser] = useMutation(CHECK_USER)

    const checkedAuth = async () => {
        const token = localStorage.getItem('token')
        if(token) {
            const decode = jwt_decode(token)
            const { data } = await checkUser({
                variables: {
                    input: {
                        username: decode.username
                    }
                }
            })
            if(data) {
                dispatch(auth())
                dispatch(setId(decode.id))
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
                authRoutes.map(({path, Component}) =>
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
                publicRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} component={Component} exact />
                )
            }
            <Redirect to='/login' />
        </Switch>
    )
}
