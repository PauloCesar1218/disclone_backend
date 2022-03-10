import { buildSchema } from "type-graphql";
import ClientResolver from "./graphql/user";
import ServerResolver from "./graphql/server";
import ChannelResolver from "./graphql/channel";
import MessageResolver from "./graphql/message";

const schema = buildSchema({
  resolvers: [ClientResolver, ServerResolver, ChannelResolver, MessageResolver],
});

export default schema;
