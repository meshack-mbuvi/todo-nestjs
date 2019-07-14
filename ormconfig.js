const NODE_ENV = process.env.NODE_ENV;
const PASSWORD = process.env.PASSWORD;
const INSTANCE = process.env.INSTANCE;
const instance = `/cloudsql/${INSTANCE}`;

let db = process.env.DB_TODO;

if (NODE_ENV === 'test') {
  db = process.env.DB_TEST;
}

module.exports = {
  name: 'default',
  type: 'postgres',
  host: instance,
  port: 5432,
  username: 'todo-nest',
  password: PASSWORD,
  database: db,
  logging: false,
  synchronize: true,
  entities: ['dist/entity/**/*.js'],
  migrations: ['src/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};
