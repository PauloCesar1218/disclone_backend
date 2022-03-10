import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { PrismaClient } from "@prisma/client";
import { UserInput, UserType, UserLoginInput } from "./types";
import { UserInputError } from "apollo-server";
import JWToken from 'jsonwebtoken';

@Resolver()
export default class User {
  prisma = new PrismaClient();

  @Query(() => [UserType])
  async getUser() {
    try {
      const user = await this.prisma.users.findMany();
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  @Query(() => UserType)
  async getUserById(@Arg("id") id: number) {
    try {
      const user = await this.prisma.users.findUnique({
        where: {
          id,
        },
      });
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  @Query(() => UserType)
  async login(@Arg("UserData") UserData: UserLoginInput) {
    try {
      const { email, password } = UserData;

      const user = await this.prisma.users.findUnique({
        where: {
          email,
        },
      });

      if (!user || user.password !== password) throw new Error('Email ou senha incorreto(s)')

      return {
        ...user,
        accessToken: JWToken.sign(user, process.env.SECRET_KEY)
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  @Mutation(() => UserType)
  async createUser(@Arg("UserData") UserData: UserInput) {
    try {
      return await this.prisma.users.create({
        data: {
          name: UserData.name,
          email: UserData.email,
          password: UserData.password,
        },
      });
    } catch (error) {
      throw new Error("Erro ao criar usuario!");
    }
  }
}
