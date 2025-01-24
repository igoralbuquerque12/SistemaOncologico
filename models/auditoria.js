const { sequelize } = require('../config/database');
const { DataTypes } = require('sequelize');

const Auditoria = sequelize.define(
    'Auditoria', {
        entidade: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        acao: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        dados_anteriores: {
            type: DataTypes.JSON, 
            allowNull: true
        },
        dados_novos: {
            type: DataTypes.JSON, 
            allowNull: true
        },
        usuario_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'usuarios', 
                key: 'id'
            }
        },
        data: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW 
        }
    }, { 
        tableName: 'auditorias',
        timestamps: false  
    }
);

module.exports = Auditoria;
