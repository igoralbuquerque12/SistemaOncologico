const { Sequelize } = require('sequelize');
require('dotenv').config({ path: './.env' })

const dbConfig = {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_DIALECT
};

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect
});

async function validarBanco(){
    try {
        await sequelize.authenticate();
        console.log('A conexão com o banco de dados foi estabelecida com sucesso.');
    } catch (err) {
        console.log('Erro na conexão com o banco de dados: ', err.message);
    }
}

validarBanco();

module.exports = { sequelize, dbConfig };