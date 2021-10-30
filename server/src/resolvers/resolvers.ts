import {
    Chat as ChatModel,
    Message,
    MutationAddMessageArgs,
    MutationCheckAuthArgs,
    MutationLoginArgs,
    MutationRegistrationArgs,
    QueryGetChatArgs,
    QueryGetUserArgs,
    QueryGetUserForChatArgs,
    User as UserModel
} from "../generated/graphql";
import {IResolvers, Maybe} from '@graphql-tools/utils'
import {User} from "../db/models/user";
import { Chat } from "../db/models/chat";
import sequelize from "sequelize";
import * as bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import {PubSub, withFilter} from "graphql-subscriptions";

const Op: any = sequelize.Op
const pubSub = new PubSub()
interface IUser {
    id: number,
    username: string,
    password: string,
    chats?: {
        usersId: number[],
        chatId: string
    },
    token?: string
}
const generateJwt = (id: number, username: string) => {
    return jwt.sign(
        { id, username},
        "SECRET_KEY",
        { expiresIn: '24h'}
    )
}

export const Resolvers: IResolvers = {
    Query: {
        getAllUsers: async (): Promise<Array<UserModel> | any> => {
            const users = User.findAll({
                raw: true
            })
            return users
        },
        getUser: async (_: void, args: QueryGetUserArgs): Promise<UserModel | any> => {
            const user = User.findOne({
                where: { id: args.id },
                raw: true
            })
            return user
        },
        getUserForChat: async (_: void, args: QueryGetUserForChatArgs): Promise<UserModel | any> => {
            const users = await User.findAll({
                where: {
                    chats: {
                        [Op.contains]: [args.usersId]
                    }
                }
            })
            return users
        },
        getChat: async (_: void, args: QueryGetChatArgs): Promise<ChatModel | any> => {
            if(args.input!.usersId) {
                const chat = await Chat.findOne({
                    where: {
                        usersId: args.input!.usersId
                    }
                })
                return chat
            } else {
                const chat = await Chat.findOne({
                    where: {
                        chatId: args.input!.chatId
                    }
                })
                return chat
            }
        }
    },
    Mutation: {
        registration: async (_: void, args: MutationRegistrationArgs): Promise<UserModel | any> => {
            const candidate = await User.findOne({
                where: { username: args.input!.username },
                raw: true
            })
            if(!candidate || candidate === null) {
                const hashPassword = await bcrypt.hash(args.input!.password, 5)
                const usersLength = await User.findAll({
                    raw: true
                })
                const id = usersLength.length + 1
                await User.create({
                    id: id,
                    username: args.input!.username,
                    password: hashPassword,
                    chats: []
                })
                const newUser: IUser | any = await User.findOne({
                    where: {username: args.input!.username},
                    raw: true
                })
                const token = generateJwt(newUser!.id, newUser.username)
                newUser.token = token
                return newUser
            }
        },
        login: async (_: void, args: MutationLoginArgs): Promise<UserModel | any> => {
            const user: IUser | any = await User.findOne({
                where: {username: args.input!.username},
                raw: true
            })
            console.log(user)
            const comparePassword = bcrypt.compareSync(args.input!.password, user.password)
            if(comparePassword) {
                const token: string = generateJwt(user.id, user.username)
                user.token = token
                return user
            }
        },
        checkAuth: async (_: void, args: MutationCheckAuthArgs): Promise<UserModel | any> => {
            const user: IUser | any = await User.findOne({
                where: { username: args.input!.username },
                raw: true
            })
            if(user) {
                const token: string = generateJwt(user.id, user.username)
                user.token = token
                return user
            }
        },
        addMessage: async (_: void, args: MutationAddMessageArgs): Promise<Message> => {
            console.log('MESSAGE')
            const userId = args.input!.userId
            const messageText = args.input!.messageText
            const senderName = args.input!.senderName
            const messageId = args.input!.messageId
            const chatId = args.input!.chatId
            const usersId = args.input!.usersId
            let newMessage = { userId, messageText, senderName, messageId }
            let checkChat = await Chat.findOne({
                where: { chatId: chatId },
                raw: true
            })
            if(checkChat === null || !checkChat) {
                checkChat = await Chat.create({
                    usersId: usersId,
                    chatId: chatId,
                    messages: []
                })
                const newChat = {
                    usersId,
                    chatId
                }
                usersId.map(async (userId) => {
                    await User.update({
                        chats: sequelize.fn(
                            'array_append',
                            sequelize.col('chats'),
                            JSON.stringify(newChat)
                        )
                    }, {
                        where: {id: userId}
                    })
                    const user = await User.findOne({
                        where: {id: userId},
                        raw: true
                    })
                    pubSub.publish('CHAT_ADD', { newChat: user }).then(() => console.log('CHAT_ADD'))
                })

            }
            await Chat.update({
                messages: sequelize.fn(
                    'array_append',
                    sequelize.col('messages'),
                    JSON.stringify(newMessage)
                )
            }, {
                where: { chatId: chatId}
            })
            const chat = await Chat.findOne({
                where: { chatId: chatId },
                raw: true
            })
            pubSub.publish('MESSAGE_ADD', { newMessage: chat}).then(() => console.log('WORKED'))
            return newMessage
        }
    },
    Subscription: {
        newMessage: {
            subscribe: withFilter(
                () => pubSub.asyncIterator('MESSAGE_ADD'),
                (payload, variables) => {
                    return (payload.newMessage.chatId === variables.input.chatId)
                }
            )
        },
        newChat: {
            subscribe: withFilter(
                () => pubSub.asyncIterator('CHAT_ADD'),
                (payload, { input }) => {
                    return (payload.newChat.id === input.usersId[0] || payload.newChat.id === input.usersId[1])

                }
            )
        }
    }
}