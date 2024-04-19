module.exports = {
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_DATABASE || "chatbot",
  synchronize: process.env.TYPEORM_SYNCHRONIZE === "true",
  logging: process.env.TYPEORM_LOGGING === "true",
  entities: [  ],
  migrations: [
    "src/Infrastructure/Database/migrations/**/*.ts"
  ],
  subscribers: [
    "src/Infrastructure/Database/subscribers/**/*.ts"
  ]
};
