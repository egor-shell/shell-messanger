const { ApolloServer } = require('apollo-server-express')
const express = require('express')
const { createServer } = require('http')
const { execute, subscribe } = require('graphql')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { SubscriptionServer } = require('subscriptions-transport-ws')

//Files
const { Users } = require('./models/user')
const typeDefs = require('./schema/typeDefs')
const resolvers = require('./controllers/resolvers')
const {Chats} = require("./models/chat");

const startServer = (async () => {
    await Users.init()
    await Chats.init()
    const PORT = 5000
    const app = express()
    const httpServer = createServer(app)

    const schema = makeExecutableSchema({ typeDefs, resolvers })

    const server = new ApolloServer({
        schema
    })
    await server.start()
    server.applyMiddleware({ app })

    SubscriptionServer.create(
        { schema, execute, subscribe },
        { server: httpServer, path: server.graphqlPath}
    )

    httpServer.listen(PORT, () => {
        console.log(
            `Query endpoint ready http://localhost:${PORT}${server.graphqlPath}`
        )
        console.log(
            `🚀 Subscription endpoint ready at ws://localhost:${PORT}${server.graphqlPath}`
        )
    })
})
startServer().then((e) => console.log(e))