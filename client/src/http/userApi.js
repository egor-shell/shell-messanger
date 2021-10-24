// NPM
import { useMutation } from "@apollo/client";
import jwt_decode from 'jwt-decode'

// Files
import { CHECK_USER } from '../mutations/mutations'

export const check = async () => {
    const token = localStorage.getItem('token')
    const decode = jwt_decode(token)
    const { data } = await checkUser({
        variables: {
            username: decode.username
        }
    })

}