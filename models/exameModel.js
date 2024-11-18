const pool = require('./db');

// Consultar todos os exames
exports.getAllExames = async () => {
    try {
        const [exames] = await pool.query("SELECT * FROM exame");
        return exames;
    } catch (err) {
        console.log(err.message);
        throw err;
    }
};

// Consultar exame por código
exports.getExamePorCodTipo = async (codTipo) => {
    try {
        const [exame] = await pool.query("SELECT * FROM exames_completos WHERE Cod_tipo = ?", [codTipo]);
        return exame || [];
    } catch (err) {
        console.log(err.message);
        throw err;
    }
};

// Consultar exame por CPF do paciente
exports.getExamePorCpf = async (cpf) => {
    try {
        const [exames] = await pool.query("SELECT * FROM exames_completos WHERE Cpf = ?", [cpf]);
        console.log(exames)
        return exames || [];
    } catch (err) {
        console.log(err.message);
        throw err;
    }
};

exports.getExamePorCrm = async (crm) => {
    try {
        const [exames] = await pool.query("SELECT * FROM exames_completos WHERE CRM = ?", [crm]);
        return exames || [];
    } catch (err) {
        console.log(err.message);
        throw err;
    }
};

exports.getExamePorData = async (data) => {
    try {
        const [exames] = await pool.query("SELECT * FROM exames_completos WHERE Data = ? ORDER BY Hora ASC", [data]);
        return exames || [];
    } catch (err) {
        console.log(err.message);
        throw err;
    }
};

// Criar novo exame
exports.createExame = async (novoExame) => {
    try {
        const { cod_tipo, hora, data, cpf, crm, laudo_exame } = novoExame;
        const [exame] = await pool.query(
            "CALL inserir_exame(?, ?, ?, ?, ?, ?)",
            [hora, data, cod_tipo, crm, cpf, laudo_exame]
        );
        return exame;
    } catch (err) {
        console.log(err.message);
        throw err;
    }
};

// Atualizar exame
exports.updateExame = async (atualizacoes, codExame) => {
    try {
        const [exame] = await pool.query("UPDATE exame SET ? WHERE Cod_exame = ?", [atualizacoes, codExame]);
        return exame;
    } catch (err) {
        console.log(err.message);
        throw err;
    }
};

// Deletar exame
exports.deleteExame = async (codExame) => {
    try {
        const [exame] = await pool.query("DELETE FROM exame WHERE Cod_exame = ?", [codExame]);
        return exame;
    } catch (err) {
        console.log(err.message);
        throw err;
    }
};
