import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import express from 'express';

import router from './routers/router.js';
import theme from './routers/theme.js'
import test from './database/script.js';

const app = express();

const port = Number(process.env.PORT) || 8000;
const host = '0.0.0.0';

// thanks to the Socket.IO docs for this
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(express.static(join(__dirname, '..', '..', 'dist'))); // evidently this is relative to the compiled index.js file

app.use(router);
app.use('/theme', theme);
app.listen(port, host, () => {
  console.info(`Listening on http://localhost:${port}`);
});
