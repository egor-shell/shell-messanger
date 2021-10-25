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
import {BiExit} from "react-icons/all";
import './Header.css'

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
        <div className='d-flex justify-content-center flex-column header align-items-center'>
            <NavLink to={LOGIN_ROUTE} className='header-exit'>
                <Button
                    onClick={click}
                    className='header-exitBtn'
                >
                    <BiExit size={25}/>
                </Button>
            </NavLink>
        </div>

    )
}
