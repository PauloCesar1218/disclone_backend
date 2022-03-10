import { ObjectType, InputType, Field } from 'type-graphql'

@ObjectType()
export class ChannelType {
    @Field()
    id: number;
    
    @Field()
    name: string;

    @Field()
    server_id: number;

    @Field()
    video: boolean;
}

@InputType()
export class ChannelInput {
    @Field({nullable: true})
    id?: number;
    
    @Field()
    name: string;

    @Field()
    server_id: number;

    @Field()
    video: boolean;
}