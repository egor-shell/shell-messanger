// NPM
import React from "react";
import { useMutation } from "@apollo/client";
import jwt_decode from 'jwt-decode'

// Files
import { CHECK_USER } from '../mutations/mutations'

const Check = async () => {
    const [checkUser] = useMutation(CHECK_USER)
    const token = localStorage.getItem('token')
    const decode = jwt_decode(token)
    const { data } = await checkUser({
        variables: {
            username: decode.username
        }
    })
    console.log(data)
    return data

}

export default Check