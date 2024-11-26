const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sistemaoncologico', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
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

module.exports = sequelize;

