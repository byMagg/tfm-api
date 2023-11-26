import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { connect } from "./db";

import { typeDefs } from "./models/typeDef";
import { resolvers } from "./resolvers";

const port = Number(process.env.PORT) || 3000;

connect();

const server = new ApolloServer({ typeDefs, resolvers });

const startServer = async () => {
  try {
    const { url } = await startStandaloneServer(server, {
      listen: { port },
    });
    console.log(`Server ready at ${url}`);
  } catch (error: any) {
    console.error("Error starting server: ", error.message);
  }
};

startServer();
