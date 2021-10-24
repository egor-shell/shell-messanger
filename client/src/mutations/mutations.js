import { gql } from '@apollo/client'

export const LOGIN_USER = gql`
    mutation login($input: loginUserInput) {
        login(input: $input) {
            token
        }
    }
`
export const CHECK_USER = gql`
    mutation checkAuth($input: checkUserInput) {
        checkAuth(input: $input) {
            token
        }
    }
`
export const SEND_MESSAGE = gql`
    mutation addMessage($input: MessageInput) {
        addMessage(input: $input) {
            messageText, senderName, userId
        }
    }
`
