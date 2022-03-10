import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { PrismaClient } from "@prisma/client";
import { ChannelInput, ChannelType } from "./types";

@Resolver()
export default class Channel {
  prisma = new PrismaClient();

  @Query(() => [ChannelType])
  async getChannel() {
    try {
      const channels = await this.prisma.channel.findMany();
      return channels;
    } catch (error) {
      console.log(error);
    }
  }

  @Query(() => [ChannelType])
  async getChannelByServerId(@Arg("id") server_id: number) {
    try {
      const channel = await this.prisma.channel.findMany({
        where: {
          server_id
        },
      });
      return channel;
    } catch (error) {
      console.log(error);
    }
  }

  @Mutation(() => ChannelType)
  async createChannel(@Arg("ChannelData") ChannelData: ChannelInput) {
    try {
      return await this.prisma.channel.create({
        data: {
          name: ChannelData.name,
          server_id: ChannelData.server_id,
          video: ChannelData.video
        },
      });
    } catch (error) {
      throw new Error("Erro ao criar usuario!");
    }
  }
}
