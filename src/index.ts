import express from 'express';
import router from '@/Infrastructure/Web/Routes';
import { DatabaseConfig } from './Infrastructure/Config/database.config';
import { Container } from 'typedi';

DatabaseConfig.initialize()
  .then(async () => {
    Container.set('DatabaseConfig', DatabaseConfig);
    const app = express();
    const port = 8001;

    app.use(express.json());

    app.use(router);

    app.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`);
    });
  })
  .catch((error) => console.log(error));
