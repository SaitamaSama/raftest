"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const dotenv_1 = require("dotenv");
const api_1 = require("./middleware/api");
const person_1 = require("./entities/person");
const tag_1 = require("./entities/tag");
const typeorm_1 = require("typeorm");
const database_1 = require("./middleware/database");
const person_2 = require("./routers/person");
require("reflect-metadata");
const tag_2 = require("./routers/tag");
const search_1 = require("./routers/search");
async function startApp() {
    const app = express();
    app.use(express.json());
    app.use(api_1.apiMiddleWare);
    const connectionConfig = {
        type: 'postgres',
        host: process.env.DB_HOST,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB || 'raftest-default',
        entities: [person_1.Person, tag_1.Tag],
        logging: process.env.APP_MODE === 'development',
        synchronize: true,
    };
    const connection = await typeorm_1.createConnection(connectionConfig);
    app.use(database_1.setDB(connection));
    app.use('/person', person_2.PersonRouter);
    app.use('/tag', tag_2.TagRouter);
    app.use('/search', search_1.SearchRouter);
    app.listen(process.env.HTTP_PORT, () => console.log('Server started on port ' + process.env.HTTP_PORT));
}
dotenv_1.config();
startApp();
//# sourceMappingURL=index.js.map