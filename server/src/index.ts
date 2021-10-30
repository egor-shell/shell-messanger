import 'graphql-import-node'
import express, { Application, Request, Response } from "express";
import { createServer, IncomingMessage, ServerOptions} from 'http'
import * as schemaTypeDefs from './schema/schema.graphql'
import { makeExecutableSchema } from 'graphql-tools'
import {execute, GraphQLSchema, subscribe} from "graphql";
import {Resolvers} from "./resolvers/resolvers";
import {ApolloServer} from "apollo-server-express";
import {sequelize} from "./db/sequelize";
import {Users} from "./db/models/user";
import {Chats} from "./db/models/chat";
import {SubscriptionServer} from "subscriptions-transport-ws";

const startServer = (async () => {
    const app: Application = express()
    const httpServer = createServer(app)
    const PORT: number = 5000

    await sequelize.sync({force: true}).then(() => console.log('DATABASE'))
    await Users.init()
    await Chats.init()
    const schema: GraphQLSchema = makeExecutableSchema({
        typeDefs: schemaTypeDefs,
        resolvers: Resolvers
    })

    const server = new ApolloServer({
        schema
    })
    await server.start()
    server.applyMiddleware({ app })
    SubscriptionServer.create(
        {schema, execute, subscribe},
        {server: httpServer, path: server.graphqlPath}
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
startServer()

// app.get('/', (req: Request, res: Response) => {
//     res.send('Hello World!')
// })

// httpServer.listen(PORT, () => {
//     console.log(`Server running`)
// })