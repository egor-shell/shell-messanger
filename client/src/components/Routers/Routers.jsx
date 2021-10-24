import { Layout } from "../Layout/Layout";

import {LOGIN_ROUTE, MESSENGER_ROUTE, REGISTRATION_ROUTE, SENDING_ROUTE} from "../../utils/urlpath";
import Auth from "../Auth/Auth";

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