import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { PrismaClient } from "@prisma/client";
import { ServerInput, ServerType, ServerChannelType } from "./types";

@Resolver()
export default class Server {
  prisma = new PrismaClient();

  @Query(() => [ServerType])
  async getServers() {
    try {
      const servers = await this.prisma.servers.findMany();
      return servers;
    } catch (error) {
      console.log(error);
    }
  }

  @Query(() => [ServerChannelType])
  async getServerByUserId(@Arg("id") id: number) {
    try {
      const servers = await this.prisma.servers_users.findMany({
          where: {
              user_id: id
          },
          select: {
              servers: {
                select: {
                    id: true,
                    name: true,
                    admin_id: true,
                    channel: true
                }
              }
          }
      })
      const result = servers.map(s => s.servers)
      console.log(result, 'RESULT');
      
      return result
    } catch (error) {
      console.log(error);
    }
  }

  @Mutation(() => ServerType)
  async createServer(@Arg("ServerData") ServerData: ServerInput) {
    try {
      return await this.prisma.servers.create({
        data: {
          name: ServerData.name,
          admin_id: ServerData.admin_id,
          channel: {
            create: {
              name: "Canal Geral de Texto",
            },
          },
          servers_users: {
            create: {
              user_id: ServerData.admin_id,
            },
          },
        },
      });
    } catch (error) {
      throw new Error("Erro ao criar servidor!");
    }
  }
}
