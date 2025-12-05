const express = require('express');
const app = express();
app.use(express.json());

app.post('/area', (req, res) => {
  const { forma, ...medidas } = req.body;

  if (!forma || Object.keys(medidas).length === 0) {
    return res.status(400).json({ error: 'Faltam dados para cálculo' });
  }

  let area = 0;
  switch (forma) {
    case 'circulo':
      if (!medidas.raio) {
        return res.status(400).json({ error: 'Falta o raio' });
      }
      area = Math.PI * Math.pow(medidas.raio, 2);
      break;
    case 'retangulo':
      if (!medidas.largura || !medidas.altura) {
        return res.status(400).json({ error: 'Faltam medidas de largura ou altura' });
      }
      area = medidas.largura * medidas.altura;
      break;
    case 'triangulo':
      if (!medidas.base || !medidas.altura) {
        return res.status(400).json({ error: 'Faltam medidas de base ou altura' });
      }
      area = (medidas.base * medidas.altura) / 2;
      break;
    default:
      return res.status(400).json({ error: 'Forma inválida' });
  }

  console.log('Dados recebidos:', req.body);
  res.json({ forma, area });
});

app.listen(3000, () => {
  console.log('Backend rodando na porta 3000');
});
