## Free AI GPT

### Installation 

- Install the dependencies

```bash
npm run ci
```

- Rename the `.env.example` to `.env`
```bash
mv .env.example .env
```

- Paste your `OPENAI_API_KEY` to the env
- Genrate a JWT secret key and replace it in `.env`

## Run the project

Project is Dockerized properly and there is no need to install anything else besides

```bash
npm run dev:docker
```

It will run the project on docker

#### Docker containers 

- ElasticSearch
- Kibanna
- PostgresSql

All the containers are run under `esnet` network 

#### Use the project 

You can have access to the project by calling `localhost:3000`
