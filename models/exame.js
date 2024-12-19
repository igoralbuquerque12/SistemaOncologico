const { sequelize } = require('./dbS');
const { DataTypes } = require('sequelize');

const Exame = sequelize.define(
  'Exame', {
    cod_exame: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    hora: {
      type: DataTypes.TIME,
      allowNull: false
    },
    data: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    cod_tipo: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    crm: {
      type: DataTypes.STRING(6),
      references: {
        model: 'medicos',
        key: 'crm'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    cpf: {
      type: DataTypes.STRING(11),
      references: {
        model: 'pacientes',
        key: 'cpf'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    laudo_exame: {
      type: DataTypes.STRING
    }
  }, {
    tableName: 'exames'
  }
);

module.exports = Exame;
