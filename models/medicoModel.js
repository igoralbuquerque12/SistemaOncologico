const sequelize = require('./dbS');
const { DataTypes } = require('sequelize');

const Medico = sequelize.define(
    'Medico',
    {
        Nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        CRM: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        Telefone: {
            type: DataTypes.STRING
        },
        Email: {
            type: DataTypes.STRING
        }
    },
    { 
        tableName: 'medico_oncologista',
        timestamps: false
    }
);

module.exports = Medico;