const { dbConfig } = require('./database')

module.exports = {
    development: dbConfig,
    test: dbConfig,
    production: dbConfig
}