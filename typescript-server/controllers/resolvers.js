import {UserModel} from "../models/user.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {SECRET_KEY} from '../config/jwt.js'
import pkg from 'sequelize';
const { Op } = pkg;
import {ChatModel} from "../models/chat.js";
import sequelize from '../models/db.js'
import {PubSub, withFilter} from "graphql-subscriptions";
import colors from 'colors'

const pubSub = new PubSub()

const generateJwt = (id, username) => {
    return jwt.sign(
        { id, username },
        SECRET_KEY,
        { expiresIn: '24h'}
    )
}

export const resolvers = {
    Query: {
        getAllUsers: async () => {
            console.log('HELLO')
            const users = await UserModel.findAll({
                raw: true
            })
            return users
        },
        getUser: async (_, {id}) => {
            const user = await UserModel.findOne({
                where: { id: id },
                raw: true
            })
            return user
        },
        getAllChat: async () => {
            const chats = await Chat.findAll({
                raw: true
            })
            return chats
        },
        getUserForChat: async (_, {usersId}) => {
            const users = await UserModel.findAll({
                where: {
                    chats: {
                        [Op.contains]: [usersId]
                    }
                },
                raw: true
            })
            return users
        },
        getChat: async (_, {input}) => {
            const { usersId, chatId } = input
            let chat
            if(chatId) {
                chat = await Chat.findOne({
                    where: {chatId},
                    raw: true
                })
            } else {
                chat = await Chat.findOne({
                    where: { usersId: usersId },
                    raw: true
                })
            }
            return chat
        }
    },
    Mutation: {
        registration: async (_, {input}) => {
            const { username, password } = input

            const candidate = await UserModel.findOne({
                where: { username: username },
                raw: true
            })

            if(!candidate || candidate === null) {
                const hashPassword = await bcrypt.hash(password, 5)
                const usersLength = await UserModel.findAll({
                    raw: true
                })
                const id = usersLength.length + 1
                await UserModel.create({
                    id: id,
                    username: username,
                    password: hashPassword,
                    chats: []
                }).then((res) => {
                    return res.dataValues
                }).catch((err) => console.log(`USER CREATE ERROR: ${err}`))
                const newUser = await UserModel.findOne({
                    where: { username },
                    raw: true
                })
                const token = generateJwt(newUser.id, newUser.username)
                newUser.token = token
                return newUser
            }
        },
        login: async (_, {input}) => {
            const { username, password } = input
            const user = await User.findOne({
                where: { username },
                raw: true
            })
            const comparePassword = bcrypt.compareSync(password, user.password)
            if(comparePassword) {
                const token = generateJwt(user.id, user.username)
                user.token = token
                return user
            }
        },
        checkAuth: async (_, {input}) => {
            const { username } = input
            const user = await UserModel.findOne({
                where: { username },
                raw: true
            })
            if(user) {
                const token = generateJwt(user.id, user.username)
                user.token = token
                console.log(token)
                return user
            }
        },
        addMessage: async (_, {input}) => {
            const { messageText, senderName, userId, usersId, chatId, messageId } = input
            console.log(colors.red(usersId))
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
                    await UserModel.update({
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
                (payload, {input}) => {
                    console.log(payload)
                    console.log(input)
                    return (payload.newChat.id === input.usersId[0] || payload.newChat.id === input.usersId[1])

                }
            )
        }
    }
}