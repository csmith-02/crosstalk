const { GraphQLList, GraphQLObjectType, GraphQLInt, GraphQLID, GraphQLString } = require('graphql');
const { ConversationType, MessageType, FriendRequestType, UserType } = require('./typedefs.cjs');


const RootQuery = new GraphQLObjectType(
    {
        name: "RootQuery",
        fields: {
            getAllConversations: {
                type: new GraphQLList(ConversationType),
                args: {
                    id: { type: GraphQLID },
                    limit: { type: GraphQLInt, defaultValue: 10 }
                },
                resolve: async (_, args, { models }) => {
                    const conversations = await models.Conversation.find({ $or: [
                        { user_one: args.id },
                        { user_two: args.id },
                    ]}).limit(args.limit);

                    return conversations;
                }
            },
            getConversationById: {
                type: ConversationType,
                args: {
                    id: { type: GraphQLID }
                },
                resolve: async (parent, args, { models }) => {
                    const conversation = await models.Conversation.findById(args.id);
                    return conversation
                }
            },
            getFriendRequests: {
                type: new GraphQLList(FriendRequestType),
                args: {
                    id: { type: GraphQLID }
                },
                resolve: async (parent, args, { models }) => {
                    const requests = await models.FriendRequest.find({ $or: [
                        { user_src: args.id },
                        { user_dest: args.id }
                    ]});

                    return requests;
                }
            },
            getUsersByUsername: {
                type: new GraphQLList(UserType),
                args: {
                    username: { type: GraphQLString },
                },
                resolve: async (parent, args, { models }) => {
                    const users = await models.User.find({ username: { $regex: args.username, $options: "i" }});
                    return users;
                }
            }
        }
    }
)

module.exports = RootQuery;