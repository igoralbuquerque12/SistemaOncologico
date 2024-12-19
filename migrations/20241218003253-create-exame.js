'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Exames', {
      cod_exame: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      hora: {
        type: Sequelize.TIME,
        allowNull: false
      },
      data: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      cod_tipo: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      crm: {
        type: Sequelize.STRING(6),
        references: {
          model: 'medicos',
          key: 'crm'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      cpf: {
        type: Sequelize.STRING(11),
        references: {
          model: 'pacientes',
          key: 'cpf'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      laudo_exame: {
        type: Sequelize.STRING
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
      tableName: 'exames'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Exames');
  }
};