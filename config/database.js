const DB_USERNAME = 'postgres'
const DB_HOST = 'localhost'
const DB_NAME = 'jsl-postgres'
const DB_PWD = 'postgres'

module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PWD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: 'postgres',
    ssl: true,
  },
  test: {
    username: DB_USERNAME,
    password: DB_PWD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: 'postgres',
    ssl: true,
  },
  production: {
    username: DB_USERNAME,
    password: DB_PWD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: 'postgres',
    ssl: true,
  }
}