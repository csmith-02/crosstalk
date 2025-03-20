const express = require('express');
const graphql = require('graphql');
const { createHandler } = require('graphql-http/lib/use/express')
const schema = require('./graphql/schema.cjs');
const mongoose = require("mongoose");
const models = require('./models/models.cjs');

require('dotenv').config();

const PORT = process.env.PORT || 3000;
const ENV = process.env.ENV;
const DB_CONNECT = process.env.DB_CONNECT;

const playground = require('graphql-playground-middleware-express').default;

mongoose.connect(DB_CONNECT)
    .then(()=> {
        const app = express();

        app.use("/graphql", createHandler({
            schema: schema,
            context: {
                models
            }
        }));
        
        if (ENV == 'dev') {
            app.get('/playground', playground({ endpoint: "/graphql"} ));
        }
            
        app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
    })
    .catch((exception)=>{
        console.log(exception.message);
    });