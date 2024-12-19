'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(
      'medicos', {
        nome: {
          type: Sequelize.STRING(100),
          allowNull: false
        },
        crm: {
          type: Sequelize.STRING(6),
          primaryKey: true,
          unique: true
        },
        telefone: {
          type: Sequelize.STRING(15)
        },
        email: {
          type: Sequelize.STRING(50)
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      }
    )
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('medicos')
  }
};
