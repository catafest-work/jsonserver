import axios from 'axios';

axios.get('http://localhost:3000/companies')
  .then(response => {
    console.log(response.data); // Afișați răspunsul în consolă
  })
  .catch(error => {
    console.error(`Eroare la efectuarea request-ului către serverul JSON: ${error.message}`);
  });
