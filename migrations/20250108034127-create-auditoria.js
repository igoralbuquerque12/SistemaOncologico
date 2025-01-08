module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('auditorias', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      entidade: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      acao: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dados_anteriores: {
        type: Sequelize.JSONB,  // ou JSON, dependendo do banco
        allowNull: true,
      },
      dados_novos: {
        type: Sequelize.JSONB,  // ou JSON
        allowNull: true,
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'usuarios',  // Supondo que você tenha a tabela usuarios
          key: 'id',
        },
      },
      data: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,  // ou usar o valor atual diretamente
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('auditorias');
  },
};
