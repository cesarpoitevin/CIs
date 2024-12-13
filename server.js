const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Simula banco de dados
const comunicacoes = new Set();

// Endpoint para obter números marcados
app.get('/api/comunicacoes', (req, res) => {
  res.json([...comunicacoes]); // Retorna os números marcados
});

// Endpoint para marcar um número
app.post('/api/comunicacoes/:numero', (req, res) => {
  const numero = parseInt(req.params.numero, 10);

  if (isNaN(numero) || numero < 0 || numero > 2000) {
    return res.status(400).json({ error: 'Número inválido' });
  }

  if (comunicacoes.has(numero)) {
    return res.status(400).json({ error: 'Esse número já foi marcado' });
  }

  comunicacoes.add(numero);
  res.status(200).json({ message: 'Número marcado com sucesso' });
});

// Endpoint para desmarcar um número
app.delete('/api/comunicacoes/:numero', (req, res) => {
  const numero = parseInt(req.params.numero, 10);

  if (isNaN(numero) || numero < 0 || numero > 2000) {
    return res.status(400).json({ error: 'Número inválido' });
  }

  if (!comunicacoes.has(numero)) {
    return res.status(400).json({ error: 'Esse número não está marcado' });
  }

  comunicacoes.delete(numero);
  res.status(200).json({ message: 'Número desmarcado com sucesso' });
});

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
