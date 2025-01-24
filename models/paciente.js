const { sequelize } = require('../config/database');
const { DataTypes } = require('sequelize');

const Paciente = sequelize.define(
    'Paciente', {
      cpf: {
        type: DataTypes.STRING(11),
        primaryKey: true,
        unique: true
      },
      nome: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      data_nasc: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      sexo: {
        type: DataTypes.CHAR(1)
      },
      telefone: {
        type: DataTypes.STRING(15),
        allowNull: false,
      }
    }, { 
        tableName: 'pacientes'
    }
);

module.exports = Paciente;