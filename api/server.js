import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import enviarFormulario from './enviar-formulario.js';

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/enviar-formulario', enviarFormulario);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
