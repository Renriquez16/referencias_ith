const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 3000;
const DATA_FILE = 'teachers.json';

// Middleware para leer datos JSON
app.use(express.json());
app.use(express.static('public'));

// Endpoint para obtener los datos
app.get('/api/teachers', (req, res) => {
    fs.readFile(DATA_FILE, (err, data) => {
        if (err) return res.status(500).send('Error al leer los datos');
        res.json(JSON.parse(data));
    });
});

// Endpoint para agregar un maestro
app.post('/api/teachers', (req, res) => {
    const newTeacher = req.body;
    fs.readFile(DATA_FILE, (err, data) => {
        if (err) return res.status(500).send('Error al leer los datos');
        const teachers = JSON.parse(data);
        teachers.push(newTeacher);
        fs.writeFile(DATA_FILE, JSON.stringify(teachers, null, 2), (err) => {
            if (err) return res.status(500).send('Error al guardar los datos');
            res.status(201).send('Maestro agregado');
        });
    });
});

// Servidor corriendo
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
