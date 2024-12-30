const express = require('express')
const path = require('path')

const app = express()

app.set('view engine', 'ejs') // Configurar o ejs como mecanismo de renderização
app.set('views', path.join(__dirname, 'views'))

app.get('/medico/atualizar/:crm', (req, res) => {
    res.render('atualizarMedico', { crm: req.params.crm })
})

app.get('/paciente/atualizar/:cpf', (req, res) => {
    res.render('atualizarPaciente', { cpf: req.params.cpf })
})

app.get('/exame/atualizar/:cod_exame', (req, res) => {
    res.render('atualizarExame', { cod_exame: req.params.cod_exame })
})

app.use('/', express.static(path.join(__dirname + '/public')))

const medicoRoute = require('./routes/medicoRoute')
const pacienteRoute = require('./routes/pacienteRoute')
const exameRoute = require('./routes/exameRoute')

app.use(express.json());

app.use('/api/v1/medico', medicoRoute)
app.use('/api/v1/paciente', pacienteRoute)
app.use('/api/v1/exame', exameRoute)

module.exports = app