import axios from 'axios';

(async () => {
  try {
    const response = await axios.get('http://localhost:3000/companies');
    console.log(`Răspunsul serverului JSON:`, response.data);
  } catch (error) {
    console.error(`Eroare la efectuarea request-ului către serverul JSON: ${error.message}`);
  }
})();