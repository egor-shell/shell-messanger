const { gql } = require('apollo-server-express')
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
    type Query {
        getAllUsers: [User]
        getUser(id: ID): User
        getAllChat: [Chat]
        getUserForChat(usersId: [[Int]]): [User],
        getChat(usersId: [Int]): Chat
    }
    type Mutation {
        registration(input: registerUserInput): User
        login(input: loginUserInput): User
        checkAuth(input: checkUserInput) : User
        addMessage(input: MessageInput): Message
    }
    type Subscription {
        newMessage: Chat
    }
`

module.exports = typeDefs
