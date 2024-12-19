const { dbConfig } = require('./../models/dbS')

module.exports = {
    development: dbConfig,
    test: dbConfig,
    production: dbConfig
}