const { GraphQLSchema } = require("graphql");
const RootQuery = require('./query.cjs');
const RootMutation = require('./mutation.cjs');

const Schema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
});

module.exports = Schema;