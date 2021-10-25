import {gql} from "@apollo/client";

export const GET_USER = gql`
    query getUser($id: ID) {
        getUser(id: $id) {
            id, username, chats {
                usersId, chatId
            }
        }
    }
`

export const GET_USERS_FOR_CHAT = gql`
    query getUserForChat($chatId: String) {
        getUserForChat(chatId: $chatId) {
            username
        }
    }
`

export const GET_USERS = gql`
    query {
        getAllUsers {
            id, username, chats {
                usersId, chatId
            }
        }
    }
`
// export const GET_CHAT = gql`
//     query getChat($usersId: [Int]) {
//         getChat(usersId: $usersId) {
//             chatId, messages {
//                 messageText, senderName, userId, messageId
//             }
//         }
//     }
// `
export const GET_CHAT = gql`
    query getChat($input: ChatInput) {
        getChat(input: $input) {
            chatId, messages {
                messageText, senderName, userId, messageId
            }
        }
    }
`