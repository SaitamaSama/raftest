import * as express from 'express';
import { config as dotenv } from 'dotenv';
import { apiMiddleWare } from './middleware/api';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { Person } from './entities/person';
import { Tag } from './entities/tag';
import { createConnection } from 'typeorm';
import { setDB } from './middleware/database';
import { PersonRouter } from './routers/person';
import 'reflect-metadata';
import { TagRouter } from './routers/tag';

async function startApp(): Promise<void> {
  const app = express();
  app.use(express.json());
  app.use(apiMiddleWare);

  const connectionConfig: PostgresConnectionOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB || 'raftest-default',
    entities: [Person, Tag],
    logging: process.env.APP_MODE === 'development',
    synchronize: true,
  };
  const connection = await createConnection(connectionConfig);
  app.use(setDB(connection));

  app.use('/person', PersonRouter);
  app.use('/tag', TagRouter);

  app.listen(process.env.HTTP_PORT, () =>
    console.log('Server started on port ' + process.env.HTTP_PORT),
  );
}

dotenv();
startApp();
