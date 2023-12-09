const express = require('express');
const { Surreal } = require('surrealdb.js');
const app = express();
const port = 3000;

app.use(express.json());

// Initialize and connect to SurrealDB



const db = new Surreal('wss://surreal.orizuro.eu/rpc', {
    namespace: 'teste',
    database: 'testedb',
    auth: {
        username: 'admin',
        password: 'admin',
    },
});

// Define API routes
app.use('/api', require('./routes'));

app.listen(port, () => {
  console.log(`API server listening at http://localhost:${port}`);
});

// In server.js
const path = require('path');

// Serve static files from the frontend build directory
app.use(express.static(path.join(__dirname, '../client/build')));

// Handle React routing, return all requests to the frontend
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});
app.get('/api/alunos/:id', async (req, res) => {
    try {
      const alunoId = req.params.id;
      const result = await db.select(`FROM aluno:${alunoId}`);
  
      if (result && result.length > 0) {
        res.json(result[0]);
      } else {
        res.status(404).send('Aluno not found');
      }
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
  });
  