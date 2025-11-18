import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';
import path from 'path';
import { fileURLToPath } from 'url';
import Routes from './Routes/index.js';
import { errorhandler, notfound } from './Middleware/ErrorHandler.js';

const app = express();

 const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

 app.use(express.static(path.join(__dirname, '../public')));

 app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));
app.use(compression());

 app.use('/api/v1', Routes);

 app.get('/', (req, res) => res.json({ status: 'ok', service: 'SlackApp' }));

 app.use(notfound);
app.use(errorhandler);

export default app;
