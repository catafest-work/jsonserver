
import { performance } from 'perf_hooks';
// for testing with request 
import axios from 'axios';
import http from 'http';

const numRequests = 100; // Numărul de cereri de efectuat

async function makeRequests(response) {
  const startTime = performance.now();

  // Efectuați cererile în paralel
  const requests = [];
  for (let i = 0; i < numRequests; i++) {
    requests.push(axios.get('http://localhost:3000/companies'));
  }

  try {
    // Așteptați finalizarea tuturor cererilor
    await Promise.all(requests);
    const endTime = performance.now();
    const duration = endTime - startTime;

    const responseData = {
      numRequests,
      totalDuration: duration,
      averageDuration: duration / numRequests,
    };

    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(responseData));
  } catch (error) {
    console.error(`Eroare la efectuarea request-urilor către serverul JSON: ${error.message}`);
    response.writeHead(500, { 'Content-Type': 'text/plain' });
    response.end('A apărut o eroare la efectuarea request-urilor către serverul JSON');
  }
}

// Creați un server HTTP pentru a afișa rezultatele performanței într-o pagină web
const server = http.createServer((request, response) => {
  if (request.url === '/') {
    makeRequests(response);
  } else {
    response.writeHead(404, { 'Content-Type': 'text/plain' });
    response.end('Pagina nu a fost găsită');
  }
});

// Ascultați pe portul 3000 pentru cereri HTTP
server.listen(3001, () => {
  console.log('Server running on port 3001. See performance at http://localhost:3001 !');
});