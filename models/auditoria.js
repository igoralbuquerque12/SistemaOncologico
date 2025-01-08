'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Auditoria extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Auditoria.init({
    entidade: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Auditoria',
  });
  return Auditoria;
};