const pool = require('./db')

exports.getAllMedicos = async () => {
    try {
        const [medicos] = await pool.query("SELECT * FROM Medico_Oncologista")
        return medicos
    } catch (err) {
        console.log(err.message)
    }
}

// A P A G A R
// exports.getOneMedico = async (crm) => {
//     try {
//         const [medico] = await pool.query("SELECT * FROM Medico_Oncologista WHERE crm = ?", crm)
//         return medico || []
//     } catch (err) {
//         console.log(err.message)
//         throw err
//     }
// }

exports.getMedicoNome = async (nome) => {
    try {
        const [medico] = await pool.query("SELECT * FROM Medico_Oncologista WHERE nome LIKE ?", [`%${nome}%`])
        return medico || []
    } catch (err) {
        console.log(err.message)
        throw err
    }
}

exports.getMedicoCrm = async (crm) => {
    try {
        const [medico] = await pool.query("SELECT * FROM Medico_Oncologista WHERE crm = ?", crm)
        return medico
    } catch (err) {
        console.log(err.message)
        throw err
    }   
}

exports.createMedico = async (novoMedico) => {
    try {
        const { crm, nome, telefone, email } = novoMedico
        const [medico] = await pool.query("INSERT INTO Medico_Oncologista (Nome, CRM, Telefone, Email) VALUES (?, ?, ?, ?)", [nome, crm, telefone, email])
        return medico
    } catch (err) {
        console.log(err.message)
    }
}

exports.updateMedico = async (atualizacoes, crm) => {
    try {
        const [result] = await pool.query("UPDATE medico_oncologista SET ? WHERE crm = ?", [atualizacoes, crm])
        return result
    } catch (err) {
        console.log(err.message)
        throw err
    }
}

exports.deleteMedico = async (crm) => {
    try {
        const [medico] = await pool.query("DELETE FROM Medico_Oncologista WHERE crm = ?", crm)
        return medico
    } catch (err) {
        console.log(err.message)
    }
}