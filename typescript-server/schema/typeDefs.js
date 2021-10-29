// const { gql } = require('apollo-server-express')
import { gql } from "apollo-server-express";

const typeDefs = gql`
    type User {
        id: ID
        username: String
        password: String
        chats: [UserChat]
        token: String
    }
    type UserChat {
        usersId: [Int]
        chatId: String
    }
    type Chat {
        usersId: [Int]
        chatId: String
        messages: [Message]
    }
    type Message {
        messageText: String
        senderName: String
        userId: Int
        messageId: String
    }
    input registerUserInput {
        id: ID
        username: String!
        password: String!
        token: String
    }
    input loginUserInput {
        username: String!
        password: String!
    }
    input checkUserInput {
        username: String!
    }
    input MessageInput {
        messageText: String!
        senderName: String!
        userId: Int!
        messageId: String!
        chatId: String!
        usersId: [Int]!
    }
    input ChatInput {
        chatId: String
        usersId: [Int]
    }
    input UserInput {
        usersId: [Int]!
    }
    input RemoveMessageInput {
        chatId: String!
        messageId: String!
    }
    type Query {
        getAllUsers: [User]
        getUser(id: ID): User
        getAllChat: [Chat]
        getUserForChat(usersId: [[Int]]): [User],
        getChat(input: ChatInput): Chat
        removeMessage(input: RemoveMessageInput): Chat
    }
    type Mutation {
        registration(input: registerUserInput): User
        login(input: loginUserInput): User
        checkAuth(input: checkUserInput) : User
        addMessage(input: MessageInput): Message
    }
    type Subscription {
        newMessage(input: ChatInput): Chat
        newChat(input: UserInput): User
    }
`
export default typeDefs
