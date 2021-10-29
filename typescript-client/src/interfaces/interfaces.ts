export interface IDataUser {
    getUser: {
        id: number,
        username: string,
        chats: {
            usersId: number[],
            chatId: string
        }[]
    }
}
export interface IDataChat {
    getChat: {
        chatId: string,
        messages: {
            messageId: string,
            messageText: string,
            senderName: string,
            userId: number
        }[]
    }
}
export interface IUsers {
    username: string,
    id: number,
    chats: {
        usersId: number[],
        chatId: string
    }[]
}
export interface IMessage {
    messageId: string,
    messageText: string,
    senderName: string,
    userId: number,
    currentUser?: boolean
}