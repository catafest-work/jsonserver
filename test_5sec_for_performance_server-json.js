
import { performance } from 'perf_hooks';
// for testing with request 
import axios from 'axios';

const numRequests = 100; // Numărul de cereri de efectuat

async function makeRequests() {
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

    console.log(`Durata totală a ${numRequests} cereri: ${duration} ms`);
    console.log(`Durata medie a unei cereri: ${duration / numRequests} ms`);
  } catch (error) {
    console.error(`Eroare la efectuarea request-urilor către serverul JSON: ${error.message}`);
  }
}

// Apelați funcția `makeRequests` la fiecare 5 secunde
setInterval(makeRequests, 5000);