import {gql} from "@apollo/client";

export const MESSAGE_ADD = gql`
    subscription {
        newMessage {
            messages {
                messageText
            }
        }
    }
`