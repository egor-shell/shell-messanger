const { User } = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { SECRET_KEY } = require('../config/jwt')
const {Op} = require("sequelize");
const {Chat} = require("../models/chat");
const {nanoid} = require("nanoid");
const sequelize = require("../models/db");
const {PubSub, withFilter} = require("graphql-subscriptions");
const colors = require('colors')

const pubSub = new PubSub()

const generateJwt = (id, username) => {
    return jwt.sign(
        { id, username },
        SECRET_KEY,
        { expiresIn: '24h'}
    )
}

const resolvers = {
    Query: {
        getAllUsers: async () => {
            const users = await User.findAll({
                raw: true
            })
            return users
        },
        getUser: async (_, { id }) => {
            const user = await User.findOne({
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
            const users = await User.findAll({
                where: {
                    chats: {
                        [Op.contains]: [usersId]
                    }
                },
                raw: true
            })
            return users
        },
        getChat: async (_, { input }) => {
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
        },
        removeMessage: async (_, { input }) => {
            const { chatId, messageId } = input
            const chat = await Chat.findOne({
                where: {chatId},
                raw: true
            })
            return chat
        }
    },
    Mutation: {
        registration: async (_, { input }) => {
            const { username, password } = input

            const candidate = await User.findOne({
                where: { username: username },
                raw: true
            })

            if(!candidate || candidate === null) {
                const hashPassword = await bcrypt.hash(password, 5)
                const usersLength = await User.findAll({
                    raw: true
                })
                const id = usersLength.length + 1
                await User.create({
                    id: id,
                    username: username,
                    password: hashPassword,
                    chats: []
                }).then(res => {
                    return res.dataValues
                }).catch(err => console.log(`USER CREATE ERROR: ${err}`))
                const newUser = await User.findOne({
                    where: { username },
                    raw: true
                })
                const token = generateJwt(newUser.id, newUser.username)
                newUser.token = token
                return newUser
            }
        },
        login: async (_, { input }) => {
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
        checkAuth: async (_, { input }) => {
            const { username } = input
            const user = await User.findOne({
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
        addMessage: async (_, { input }) => {
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
                    console.log(payload)
                    console.log(input)
                    return (payload.newChat.id === input.usersId[0] || payload.newChat.id === input.usersId[1])

                }
            )
        }
    }
}

module.exports = resolvers