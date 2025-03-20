const { GraphQLObjectType, GraphQLString, GraphQLID } = require('graphql');
const { ResponseType } = require('./typedefs.cjs');

const RootMutation = new GraphQLObjectType({
    name: "RootMutation",
    fields: {
        createUser: {
            type: ResponseType,
            args: {
                first_name: { type: GraphQLString },
                last_name: { type: GraphQLString },
                email: { type: GraphQLString },
                username: { type: GraphQLString },
                password:  { type: GraphQLString },
            },
            resolve: async (_, args, { models }) => {
                let response = {
                    error: "",
                    success: false
                }
                try {
                    const user = new models.User({
                        first_name: args.first_name,
                        last_name: args.last_name,
                        email: args.email,
                        username: args.username,
                        password: args.password,
                    });
                    await user.save();
                } catch (exception) {
                    if (exception.name == "MongoServerError") { // Duplicate Key

                        let res = exception.errorResponse.keyValue;

                        if (res.email) {
                            return {
                                error: "That email already exists.",
                                success: false
                            }
                        }

                        if (res.username) {
                            return {
                                error: "That username already exists.",
                                success: false
                            }
                        }

                        return {
                            error: "Something went wrong.",
                            success: false
                        }

                    } else if (exception.name == "ValidationError") {
                        let errors = exception.errors;
                        if (errors.first_name) {
                            response.error = errors.first_name.message;
                        } else if (errors.last_name) {
                            response.error = errors.last_name.message;
                        } else if (errors.email) {
                            response.error = errors.email.message;
                        } else if (errors.username) {
                            response.error = errors.username.message;
                        } else if (errors.password) {
                            response.error = errors.password.message;
                        } else {
                            response.error = "Something went wrong!";
                        }
                        return response;
                    }
                }

                response.success = true;
                return response;
            } 
        },
        deleteConversationById: {
            type: GraphQLString,
            args: {
                id: { type: GraphQLID }
            },
            resolve: (_, args, { models }) => {
                try {
                    models.Message.deleteMany({ conversation_id: args.id });
                    models.Conversation.deleteOne({ conversation_id: args.id });
                } catch (exception) {
                    return exception.message || "error";
                }
                return "success";
            }
        },
        addFriendByUsername: {
            type: GraphQLString,
            resolve: (parent, args) => ""
        },
        approveFriendRequest: {
            type: GraphQLString,
            resolve: (parent, args) => ""
        },
        declineFriendRequest: {
            type: GraphQLString,
            resolve: (parent, args) => ""
        },
        createMessage: {
            type: GraphQLString,
            resolve: (parent, args) => ""
        },
        editBioById: {
            type: GraphQLString,
            resolve: (parent, args) => ""
        }
    }
});

module.exports = RootMutation;