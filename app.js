const express = require('express');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const medicoRoute = require('./routes/medicoRoutes');
const pacienteRoute = require('./routes/pacienteRoutes');
const exameRoute = require('./routes/exameRoutes');
const usuarioRoute = require('./routes/usuarioRoutes');
const templatesRoute = require('./routes/templatesRoutes');

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.use('/api/v1/usuario', usuarioRoute);
app.use('/api/v1/medico', medicoRoute);
app.use('/api/v1/paciente', pacienteRoute);
app.use('/api/v1/exame', exameRoute);

app.get('/medico/atualizar/:crm', (req, res) => {
    res.render('atualizarMedico', { crm: req.params.crm });
});

app.get('/paciente/atualizar/:cpf', (req, res) => {
    res.render('atualizarPaciente', { cpf: req.params.cpf });
});

app.get('/exame/atualizar/:cod_exame', (req, res) => {
    res.render('atualizarExame', { cod_exame: req.params.cod_exame });
});

app.use('/', templatesRoute);

module.exports = app;
