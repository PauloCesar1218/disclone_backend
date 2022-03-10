import { ObjectType, InputType, Field } from 'type-graphql'

@ObjectType()
export class MessagesType {
    @Field()
    id: number;
    
    @Field()
    content: string;

    @Field()
    channel_id: number;
}

@InputType()
export class MessagesInput {
    @Field({nullable: true})
    id?: number;
    
    @Field()
    content: string;

    @Field()
    channel_id: number;
}