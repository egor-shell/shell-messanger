import {gql} from "@apollo/client";

export const MESSAGE_ADD = gql`
    subscription newMessage($input: ChatInput) {
        newMessage(input: $input)  {
            chatId, messages {
                messageText, senderName, userId, messageId
            }
        }
    }
`
export const CHAT_ADD = gql`
    subscription newChat($input: UserInput) {
        newChat(input: $input)  {
            username, id, chats {
                usersId, chatId
            }
        }
    }
`