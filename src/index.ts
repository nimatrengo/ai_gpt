import express from 'express';
import router from '@/Infrastructure/Web/Routes';
import { DatabaseConfig } from './Infrastructure/Config/database.config';
import { Container } from 'typedi';
import cors from 'cors';

const whitelist = ['http://localhost:3000'];

DatabaseConfig.initialize()
  .then(async () => {
    Container.set('DatabaseConfig', DatabaseConfig);
    const app = express();
    const port = 8001;

    app.use(express.json());
    app.use(cors({
      origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORSSSS'));
        }
      },
      credentials: true  // reflecting the requested withCredentials
    }));

    app.use(router);

    app.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`);
    });
  })
  .catch((error) => console.log(error));
