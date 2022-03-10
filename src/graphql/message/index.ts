import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { PrismaClient } from "@prisma/client";
import { MessagesInput, MessagesType  } from "./types";

@Resolver()
export default class Messages {
  prisma = new PrismaClient();

  @Query(() => [MessagesType])
  async getMessage() {
    try {
      const messages = await this.prisma.messages.findMany();
      return messages;
    } catch (error) {
      console.log(error);
    }
  }

  @Query(() => [MessagesType])
  async getmessageByServerId(@Arg("id") channel_id: number) {
    try {
      const message = await this.prisma.messages.findMany({
        where: {
          channel_id 
        },
      });
      return message;
    } catch (error) {
      console.log(error);
    }
  }

  @Mutation(() => MessagesType)
  async createMessage(@Arg("MessageData") MessageData: MessagesInput) {
    try {
      return await this.prisma.messages.create({
        data: {
            content: MessageData.content,
            channel_id: MessageData.channel_id
        },
      });
    } catch (error) {
      throw new Error("Erro ao enviar messagem!");
    }
  }
}
