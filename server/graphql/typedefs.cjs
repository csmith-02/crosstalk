const { GraphQLObjectType, GraphQLString, GraphQLScalarType, GraphQLBoolean, GraphQLList, GraphQLID, GraphQLInt } = require("graphql");
const { GraphQLDateTime } = require("graphql-scalars");

const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        first_name: { type: GraphQLString },
        last_name: { type: GraphQLString },
        email: { type: GraphQLString },
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        createdAt: { type: GraphQLDateTime },
    })
});

const MessageType = new GraphQLObjectType({
    name: "Message",
    fields: () => ({
        user_src: { type: UserType },
        user_dest: { type: UserType },
        body: { type: GraphQLString },
        conversation_id: { type: GraphQLID },
        createdAt: { type: GraphQLString },
    }),
});

const ConversationType = new GraphQLObjectType({
    name: "Conversation",
    fields: () => ({
        _id: { type: GraphQLID },
        user_one: { type: UserType },
        user_two: { type: UserType },
        messages: {
            type: new GraphQLList(MessageType),
            args: {
                limit: { type: GraphQLInt, defaultValue: 10 },
            },
            resolve: async (parent, args, { models }) => {
                const messages = await models.Messages.find({ conversation_id: parent._id }).populate({
                    path: "messages",
                    options: { sort: { createdAt: -1 } }
                });
                
                return messages;
            }
        }
    }),
});

const FriendRequestType = new GraphQLObjectType({
    name: "Friend_Request",
    fields: () => ({
        user_src: { type: UserType },
        user_dest: { type: UserType },
        accepted: { type: GraphQLBoolean },
    })
});

const FriendshipType = new GraphQLObjectType({
    name: "Friendship",
    fields: () => ({
        user_one: { type: UserType },
        user_two: { type: UserType }
    }),
});

const ResponseType = new GraphQLObjectType({
    name: "Error",
    fields: () => ({
        error: { type: GraphQLString },
        success: { type: GraphQLBoolean }
    }),
});

module.exports = { ConversationType, MessageType, UserType, FriendRequestType, FriendshipType, ResponseType };
