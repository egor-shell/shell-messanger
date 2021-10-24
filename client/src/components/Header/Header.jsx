// NPM
import React from "react";
import {useQuery} from "@apollo/client";
import {useDispatch, useSelector} from "react-redux";
import {Button} from "react-bootstrap";
import {NavLink} from "react-router-dom";

// Files
import {GET_USER} from "../../query/query";
import {selectId} from "../../features/id/idSlice";
import {logout} from "../../features/isAuth/isAuth";
import {LOGIN_ROUTE} from "../../utils/urlpath";

export const Header = () => {
    // Redux
    const dispatch = useDispatch()
    const idUser = useSelector(selectId)

    // GraphQL
    const { data: userData } = useQuery(GET_USER, {
        variables: {
            id: idUser
        }
    })

    const click = () => {
        localStorage.removeItem('token')
        dispatch(logout())
    }

    return (
        <div className='d-flex justify-content-around m-3'>
            <h2>{userData.getUser.username}</h2>
            <NavLink to={LOGIN_ROUTE}>
                <Button
                    onClick={click}
                >
                    Выйти
                </Button>
            </NavLink>
        </div>

    )
}
