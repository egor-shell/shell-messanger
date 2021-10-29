// NPM
import {makeExecutableSchema} from "@graphql-tools/schema";
import express from 'express';
import {createServer} from "http";
import {ApolloServer} from "apollo-server-express";
import {SubscriptionServer} from "subscriptions-transport-ws";
import {execute, subscribe} from 'graphql';
import {PORT} from "./config/PORT.js";

// Files
import {typeDefs} from "./schema/typeDefs.js";
import {resolvers} from './controllers/resolvers.js';
import {Users} from "./models/user.js";
import {ChatsStart} from "./models/chat.js";

const startServer = (async () => {
    await Users.init()
    await ChatsStart.init()
    const app = express()

    const httpServer = createServer(app)

    const schema = makeExecutableSchema({ typeDefs, resolvers})
    const server = new ApolloServer({
        schema
    })
    await server.start()
    server.applyMiddleware({ app })
    SubscriptionServer.create(
        {schema, execute, subscribe},
        { server: httpServer, path: server.graphqlPath}
    )
    httpServer.listen(PORT, () => {
        console.log(
            `Query endpoint ready http://localhost:${PORT}`
        )
        console.log(
            `🚀 Subscription endpoint ready at ws://localhost:${PORT}`
        )
    })
})
startServer().then((e) => console.log(e))