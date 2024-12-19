'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pacientes', {
      cpf: {
        type: Sequelize.STRING(11),
        primaryKey: true,
        unique: true
      },
      nome: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      data_nasc: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      sexo: {
        type: Sequelize.CHAR(1)
      },
      telefone: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }, {
      tableName: 'pacientes'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('pacientes');
  }
};