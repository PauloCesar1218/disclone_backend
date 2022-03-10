import { ObjectType, InputType, Field } from 'type-graphql'
import { Length } from 'class-validator'

@ObjectType()
export class UserType {
    @Field()
    id: number;
    
    @Field()
    name: string

    @Field()
    email: string

    @Field()
    @Length(8, 16)
    password: string;

    @Field({nullable: true})
    accessToken?: string;
}

@InputType()
export class UserInput {
    @Field({nullable: true})
    id?: number;

    @Field()
    name: string

    @Field()
    email: string

    @Field()
    @Length(8, 16)
    password: string
}

@InputType()
export class UserLoginInput {
    @Field()
    email: string

    @Field()
    @Length(8, 16)
    password: string
}