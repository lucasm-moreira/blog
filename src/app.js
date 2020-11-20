import express from 'express';
import cors from 'cors';
import routes from './routes';
import bodyParser from 'body-parser';
import session from 'express-session';
import path from 'path';

// Importando arquivo de conexão do banco de dados com os models
import './database/index';

class App {
  constructor() { 
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());

    // View engine
    this.server.set('views','./src/views');
    this.server.set('view engine','ejs');

    // Sessions
    this.server.use(session({
        secret: "fb663f5329362e2646c367ac909f99e0",
        cookie: { maxAge: 30000000 }
    }))

    // Static
    this.server.use(express.static(path.join(__dirname, 'public')));

    //Body parser
    this.server.use(bodyParser.urlencoded({extended: false}));
    this.server.use(bodyParser.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;