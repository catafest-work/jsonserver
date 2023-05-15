import { performance,PerformanceObserver } from 'perf_hooks';
//
// this source code with PerformanceObserver not works with json-server
// The PerformanceObserver is primarily used to measure application performance 
//at the client side in a browser and can capture performance-related events such as
// the start and end of a downloaded resource or the processing time of a resource.
//

import axios from 'axios';
const numRequests = 100; // Numărul de cereri de efectuat

function measureRequestDuration() {
  let startTime;
  let numResponses = 0;
  let totalDuration = 0;

  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    for (const entry of entries) {
      if (entry.name === 'http') {
        numResponses++;
        totalDuration += entry.duration;
      }
    }
  });

  observer.observe({ entryTypes: ['measure'] });

  // Efectuați cererile în paralel
  const requests = [];
  for (let i = 0; i < numRequests; i++) {
    requests.push(
      axios.get('http://localhost:3000/companies', {
        headers: { 'X-Request-Id': i.toString() },
      })
    );
  }

  Promise.all(requests)
    .then(() => {
      observer.disconnect();

      console.log(`Numărul total de răspunsuri: ${numResponses}`);
      console.log(`Durata totală a ${numRequests} cereri: ${totalDuration} ms`);
      console.log(`Durata medie a unei cereri: ${totalDuration / numRequests} ms`);
    })
    .catch((error) => {
      observer.disconnect();
      console.error(`Eroare la efectuarea request-urilor către serverul JSON: ${error.message}`);
    });
}

measureRequestDuration();