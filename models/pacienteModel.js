const pool = require('./db')

exports.getAllPacientes = async () => {
    try {
        const [pacientes] = await pool.query("SELECT * FROM paciente")
        return pacientes
    } catch (err) {
        console.log(err.message)
    }
}

exports.getPacienteNome = async (nome) => {
    try {
        const [paciente] = await pool.query("SELECT * FROM paciente WHERE nome LIKE ?", [`%${nome}%`])
        return paciente || []
    } catch (err) {
        console.log(err.message)
        throw err
    }
}

exports.getPacienteCpf = async (cpf) => {
    try {
        const [paciente] = await pool.query("SELECT * FROM paciente WHERE cpf = ?", cpf)
        return paciente
    } catch (err) {
        console.log(err.message)
        throw err
    }   
}

exports.createPaciente = async (novoPaciente) => {
    try {
        const { cpf, nome, data_nasc, sexo, telefone } = novoPaciente
        const [paciente] = await pool.query("INSERT INTO paciente (CPF, nome, Data_nasc, sexo, telefone) VALUES (?, ?, ?, ?, ?)", [cpf, nome, data_nasc, sexo, telefone])
        return paciente
    } catch (err) {
        console.log(err.message)
    }
}

exports.updatePaciente = async (atualizacoes, cpf) => {
    try {
        const [paciente] = await pool.query("UPDATE paciente SET ? WHERE cpf = ?", [atualizacoes, cpf])
        return paciente
    } catch (err) {
        console.log(err.message)
        throw err
    }
}

exports.deletePaciente = async (cpf) => {
    try {
        const [paciente] = await pool.query("DELETE FROM paciente WHERE cpf = ?", cpf)
        return paciente
    } catch (err) {
        console.log(err.message)
    }
}