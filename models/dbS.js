const { Sequelize } = require('sequelize');

const dbConfig = {
    username: "root",
    password: "",
    database: "sistemaoncologico",
    host: "127.0.0.1",
    dialect: "mysql"
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