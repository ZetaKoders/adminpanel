

async function fetchAlunosFromSurreal() {
    const response = await fetch('https://surreal.orizuro.eu/rpc', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('admin:admin')
      },
      body: JSON.stringify({ query: 'SELECT * FROM aluno;' })
    });
  
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  
    return response.json();
  }