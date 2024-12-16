const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Configuração do middleware
app.use(cors());
app.use(express.json());

// Simula um banco de dados (armazenando os números marcados)
const comunicacoes = new Set();

// Endpoint para obter os números marcados
app.get('/api/comunicacoes', (req, res) => {
  res.json([...comunicacoes]); // Converte o Set para um array antes de enviar
});

// Endpoint para marcar um número
app.post('/api/comunicacoes/:numero', (req, res) => {
  const numero = parseInt(req.params.numero, 10);

  // Validação do número
  if (isNaN(numero) || numero < 0 || numero > 2000) {
    return res.status(400).json({ error: 'Número inválido. Deve ser entre 0 e 2000.' });
  }

  // Verifica se o número já está marcado
  if (comunicacoes.has(numero)) {
    return res.status(400).json({ error: 'Esse número já foi marcado.' });
  }

  // Marca o número
  comunicacoes.add(numero);
  res.status(200).json({ message: 'Número marcado com sucesso.' });
});

// Endpoint para desmarcar um número
app.delete('/api/comunicacoes/:numero', (req, res) => {
  const numero = parseInt(req.params.numero, 10);

  // Validação do número
  if (isNaN(numero) || numero < 0 || numero > 2000) {
    return res.status(400).json({ error: 'Número inválido. Deve ser entre 0 e 2000.' });
  }

  // Verifica se o número está marcado
  if (!comunicacoes.has(numero)) {
    return res.status(400).json({ error: 'Esse número não está marcado.' });
  }

  // Desmarca o número
  comunicacoes.delete(numero);
  res.status(200).json({ message: 'Número desmarcado com sucesso.' });
});

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
