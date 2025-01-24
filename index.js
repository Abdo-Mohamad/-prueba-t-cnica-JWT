document.getElementById('validateButton').addEventListener('click', async () => {
    const token = document.getElementById('token').value;
  
    try {
      const response = await fetch('http://localhost:3000/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
  
      const result = await response.json();
  
      if (result.valid) {
        document.getElementById('result').innerHTML = `
          <p><strong>Nombre:</strong> ${result.name}</p>
          <img src="${result.profileImage}" alt="Imagen de perfil" width="100" height="100">
        `;
      } else {
        document.getElementById('result').innerHTML = `<p>Error: ${result.message}</p>`;
      }
    } catch (error) {
      document.getElementById('result').innerHTML = `<p>Error: No se pudo conectar con el servidor.</p>`;
    }
  });
  
  document.getElementById('generateTokenButton').addEventListener('click', async () => {
    try {
      const response = await fetch('http://localhost:3000/generate', {
        method: 'POST',
      });
  
      const result = await response.json();
      document.getElementById('token').value = result.token;
      document.getElementById('result').innerHTML = `<p>Token generado exitosamente.</p>`;
    } catch (error) {
      document.getElementById('result').innerHTML = `<p>Error: No se pudo generar el token.</p>`;
    }
  });
  