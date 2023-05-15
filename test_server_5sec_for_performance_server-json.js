import { performance } from 'perf_hooks';
import express from 'express';
import axios from 'axios';

import { fileURLToPath } from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3001;

const numRequests = 100; // Numărul de cereri de efectuat
const performances = [];

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', async (req, res) => {
  try {
    const startTime = performance.now();

    // Efectuați cererile în paralel
    const requests = [];
    for (let i = 0; i < numRequests; i++) {
      requests.push(axios.get('http://localhost:3000/companies'));
    }

    // Așteptați finalizarea tuturor cererilor
    await Promise.all(requests);
    const endTime = performance.now();
    const duration = endTime - startTime;

    const totalDuration = performances.reduce((sum, p) => sum + p.totalDuration, 0) + duration;
    const averageDuration = totalDuration / (performances.length + 1);

    const performanceData = {
      numRequests,
      totalDuration,
      averageDuration,
    };

    performances.push(performanceData);

    res.render('performance', { performances });
  } catch (error) {
    console.error(`Eroare la efectuarea request-urilor către serverul JSON: ${error.message}`);
    res.status(500).send('A apărut o eroare în procesarea cererilor');
  }
});

app.listen(port, () => {
  console.log(`Serverul rulează pe portul ${port}`);
});
