const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql2');

exports.Medico = sequelize.define(
    'Medico',
    {
        Nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        CRM: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Telefone: {
            type: DataTypes.STRING
        },
        Email: {
            type: DataTypes.STRING
        }
    },
    { tableName: 'medico_oncologista' }
)