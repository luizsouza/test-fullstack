//Server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const { v4: uuidv4 } = require('uuid'); // Importa a função v4 do módulo uuid

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database setup
const db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    console.error('Erro ao abrir o banco de dados:', err.message);
  } else {
    console.log('Conexão estabelecida com o banco de dados');
    // Crie sua tabela de clientes aqui se ainda não existir
    db.run(`CREATE TABLE IF NOT EXISTS clients (
      id TEXT NOT NULL PRIMARY KEY,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT NOT NULL,
      status TEXT NOT NULL,
      cpf TEXT NOT NULL
    )`);
  }
});

// Rotas para manipulação de clientes
// Obter todos os clientes
app.get('/api/clients', (req, res) => {
  db.all('SELECT * FROM clients', (err, rows) => {
    if (err) {
      console.error('Erro ao buscar clientes:', err.message);
      res.status(500).send('Erro ao buscar clientes');
    } else {
      res.json(rows);
    }
  });
});

app.get('/api/clients/:id', (req, res) => {
  const clientId = req.params.id;

  db.get('SELECT * FROM clients WHERE id = ?', [clientId], (err, row) => {
    if (err) {
      console.error('Erro ao buscar cliente:', err.message);
      res.status(500).send('Erro ao buscar cliente');
    } else {
      if (row) {
        // Cliente encontrado
        res.json(row);
      } else {
        // Cliente não encontrado
        res.status(404).send('Cliente não encontrado');
      }
    }
  });
});

// Adicionar um novo cliente
app.post('/api/clients', (req, res) => {
  const { name, phone, email, cpf, status } = req.body;
  if (!name || !phone || !email || !cpf || !status) {
    return res.status(400).send('Todos os campos são obrigatórios');
  }

  const id = uuidv4(); // Gera um UUID
  console.log('Id criado: ',id);
  db.run('INSERT INTO clients (id, name, phone, email, cpf, status) VALUES (?, ?, ?, ?, ?, ?)', [id,name, phone, email, cpf, status], function(err) {
    if (err) {
      console.error('Erro ao adicionar cliente:', err.message);
      res.status(500).send('Erro ao adicionar cliente');
    } else {
      res.json({ id, name, phone, email, cpf, status });
    }
  });
});

// Atualizar um cliente existente
app.put('/api/clients/:id', (req, res) => {
  const { name, phone, email, cpf, status } = req.body;
  const clientId = req.params.id;
  if (!name || !phone || !email || !cpf || !status) {
    return res.status(400).send('Todos os campos são obrigatórios');
  }

  db.run('UPDATE clients SET name = ?, phone = ?, email = ?, cpf = ?, status = ? WHERE id = ?', [name, phone, email, cpf, status, clientId], function(err) {
    if (err) {
      console.error('Erro ao atualizar cliente:', err.message);
      res.status(500).send('Erro ao atualizar cliente');
    } else {
      res.json({ id: clientId, name, phone, email, cpf, status });
    }
  });
});

// Excluir um cliente existente
app.delete('/api/clients/:id', (req, res) => {
  const clientId = req.params.id;

  db.run('DELETE FROM clients WHERE id = ?', [clientId], function(err) {
    if (err) {
      console.error('Erro ao excluir cliente:', err.message);
      res.status(500).send('Erro ao excluir cliente');
    } else {
      res.sendStatus(204); // OK, sem conteúdo
    }
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});