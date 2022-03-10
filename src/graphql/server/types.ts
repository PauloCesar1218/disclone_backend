import { ObjectType, InputType, Field } from 'type-graphql'
import { ChannelType } from './../channel/types'
@ObjectType()
export class ServerType {
    @Field()
    id: number;
    
    @Field()
    name: string;

    @Field()
    admin_id: number;
}

@ObjectType()
export class ServerChannelType {
    @Field()
    id: number;
    
    @Field()
    name: string;

    @Field()
    admin_id: number;

    @Field(type => [ChannelType])
    channel: ChannelType[];
}

@InputType()
export class ServerInput {
    @Field({nullable: true})
    id?: number;
    
    @Field()
    name: string;

    @Field()
    admin_id: number;
}