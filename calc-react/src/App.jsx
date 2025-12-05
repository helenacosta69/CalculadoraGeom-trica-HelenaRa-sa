import { useState } from 'react';

function App() {
  const [forma, setForma] = useState('');
  const [medidas, setMedidas] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMedidas((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calcularArea = async () => {
    const response = await fetch('http://localhost:3000/area', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ forma, ...medidas }),
    });
    const data = await response.json();
    alert(`A área do ${data.forma} é: ${data.area}`);
  };

  return (
    <div>
      <h1>Calculadora de Áreas Geométricas</h1>
      <select value={forma} onChange={(e) => setForma(e.target.value)}>
        <option value="">Escolha a forma</option>
        <option value="circulo">Círculo</option>
        <option value="retangulo">Retângulo</option>
        <option value="triangulo">Triângulo</option>
      </select>

      {forma === 'circulo' && (
        <input
          type="number"
          name="raio"
          placeholder="Raio"
          value={medidas.raio || ''}
          onChange={handleInputChange}
        />
      )}
      {forma === 'retangulo' && (
        <>
          <input
            type="number"
            name="largura"
            placeholder="Largura"
            value={medidas.largura || ''}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="altura"
            placeholder="Altura"
            value={medidas.altura || ''}
            onChange={handleInputChange}
          />
        </>
      )}
      {forma === 'triangulo' && (
        <>
          <input
            type="number"
            name="base"
            placeholder="Base"
            value={medidas.base || ''}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="altura"
            placeholder="Altura"
            value={medidas.altura || ''}
            onChange={handleInputChange}
          />
        </>
      )}

      <button onClick={calcularArea}>Calcular Área</button>
    </div>
  );
}

export default App;
