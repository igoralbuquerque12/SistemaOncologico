const { sequelize } = require('./dbS')
const { DataTypes } = require('sequelize');

const Usuario = sequelize.define(
  'Usuario', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    usuario: {
      type: DataTypes.STRING(20),
      unique: true,
      allowNull: false
    },
    senha: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, { 
      tableName: 'usuarios'
  }
);

module.exports = Usuario;