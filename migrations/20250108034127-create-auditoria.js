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
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      acao: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      dados_anteriores: {
        type: Sequelize.JSON, 
        allowNull: true,
      },
      dados_novos: {
        type: Sequelize.JSON, 
        allowNull: true,
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'usuarios', 
          key: 'id',
        },
      },
      data: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW, 
      }
    }, {
      tableName: 'auditorias',
      timestamps: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('auditorias');
  },
};
