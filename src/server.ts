import 'reflect-metadata';
import * as dotenv from "dotenv";
import { ApolloServer } from "apollo-server";

import Schema from "./schema";

const startApp = async () => {
  dotenv.config();

  const server = new ApolloServer({
    cors: {
      origin: "*",
    },
    schema: await Schema,
    context: ({ req }) => {
      const context = {
        req,
        token: req?.headers?.authorization,
      };

      return context;
    },
  });

  server.listen({ port: 5000 }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
};

startApp();
