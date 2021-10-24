import jwt_decode from "jwt-decode";
import {useMutation} from "@apollo/client";

// Files
import {CHECK_USER} from "../mutations/mutations";

const Check = async () => {
    // GraphQL
    const [checkUser] = useMutation(CHECK_USER)

    const token = localStorage.getItem('token')
    const decode = jwt_decode(token)
    const { data } = await checkUser({
        variables: {
            input: {
                username: decode.username
            }
        }
    })
    if(data && data !== null) {
        localStorage.setItem('token', data.checkAuth.token)
        return true
    } else {
        return false
    }
}

export default Check