const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './../static_pages/home.html'));
});

router.get('/medicos', (req, res) => {
    res.sendFile(path.join(__dirname, './../static_pages/medicos.html'));
});

router.get('/pacientes', (req, res) => {
    res.sendFile(path.join(__dirname, './../static_pages/pacientes.html'));
});

router.get('/exames', (req, res) => {
    res.sendFile(path.join(__dirname, './../static_pages/exames.html'));
});

router.get('/tipoExames', (req, res) => {
    res.sendFile(path.join(__dirname, './../static_pages/tipoExames.html'));
});

router.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, './../static_pages/cadastro.html'));
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, './../static_pages/login.html'));
});

module.exports = router;
