const { sequelize } = require('./dbS');
const { DataTypes } = require('sequelize');

const Medico = sequelize.define(
    'Medico', {
        nome: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        crm: {
            type: DataTypes.STRING(6),
            primaryKey: true,
            unique: true
        },
        telefone: {
            type: DataTypes.STRING(15)
        },
        email: {
            type: DataTypes.STRING(50)
        }
    }, { 
        tableName: 'medicos'
    }
);

module.exports = Medico;