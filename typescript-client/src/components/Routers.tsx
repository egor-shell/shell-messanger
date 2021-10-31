import {LOGIN_ROUTE, MESSENGER_ROUTE, REGISTRATION_ROUTE, SENDING_ROUTE} from "../utils/usrpath";
import {Layout} from "./Layout/Layout";
import Auth from "./Auth/Auth";
import React from "react";



export const authRoutes = [
    {
        path: MESSENGER_ROUTE,
        Component: Layout
    },
    {
        path: SENDING_ROUTE,
        Component: Layout
    }
]
export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    }
]