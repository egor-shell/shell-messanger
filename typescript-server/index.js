var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// NPM
import { makeExecutableSchema } from "@graphql-tools/schema";
import * as express from 'express';
import { createServer } from "http";
import { ApolloServer } from "apollo-server-express";
// Files
import { typeDefs } from "./schema/typeDefs.js";
import { resolvers } from './controllers/resolvers.js';
const startServer = (() => __awaiter(void 0, void 0, void 0, function* () {
    const PORT = 5000;
    const app = express();
    app.get('/', (req, res) => {
        res.send('Hello World!');
    });
    const httpServer = createServer(app);
    const schema = makeExecutableSchema({ typeDefs, resolvers });
    const server = new ApolloServer({
        schema
    });
    yield server.start();
    // server.applyMiddleware({ app })
    // SubscriptionServer.create(
    //     {schema, execute, subscribe},
    //     { server: httpServer, path: server.graphqlPath}
    // )
    httpServer.listen(PORT, () => {
        console.log(`Query endpoint ready http://localhost:${PORT}`);
        console.log(`🚀 Subscription endpoint ready at ws://localhost:${PORT}`);
    });
}));
startServer().then((e) => console.log(e));
//# sourceMappingURL=index.js.map