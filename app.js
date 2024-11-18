const express = require('express')
const path = require('path')

const app = express()

app.use('/', express.static(path.join(__dirname + '/public')))
app.use('/medicos/', express.static(path.join(__dirname + '/public')))
app.use('/pacientes/', express.static(path.join(__dirname + '/public')))
app.use('/exame/', express.static(path.join(__dirname + '/public')))

const medicoRoute = require('./routes/medicoRoute')
const pacienteRoute = require('./routes/pacienteRoute')
const exameRoute = require('./routes/exameRoute')

app.use(express.json());

app.use('/api/v1/medico', medicoRoute)
app.use('/api/v1/paciente', pacienteRoute)
app.use('/api/v1/exame', exameRoute)

module.exports = app