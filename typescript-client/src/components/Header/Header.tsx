// NPM
import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {BiExit} from "react-icons/all";
import {Button, NavLink} from "react-bootstrap";

// Files
import {selectId} from "../../features/currentUserSlice/currentUserSlice";
import {logout} from "../../features/isAuthSlice/isAuthSlice";
import {LOGIN_ROUTE} from "../../utils/usrpath";
import './Header.css'

const Header = () => {
    // Redux
    const dispatch = useDispatch()
    const idUser = useSelector(selectId)

    const click = () => {
        localStorage.removeItem('token')
        dispatch(logout())
    }

    return (
        <div className='d-flex justify-content-center flex-column header align-items-center'>
            <NavLink href={LOGIN_ROUTE} className='header-exit'>
                <Button
                    onClick={click}
                    className='header-exitBtn'
                >
                    <BiExit size={25}/>
                </Button>
            </NavLink>
        </div>
    );
};

export default Header;