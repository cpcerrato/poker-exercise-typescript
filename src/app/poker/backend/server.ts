import bodyParser from 'body-parser';
import compress from 'compression';
import express, { Request, Response, Router, Express } from 'express';
import helmet from 'helmet';
import * as http from 'http';
import httpStatus from 'http-status';
import morgan from 'morgan';

import { registerRoutes } from './route';

export class Server {
  private readonly express: Express;
  private port: string;
  private httpServer?: http.Server;

  constructor(port: string) {
    this.port = port;
    this.express = express();
    const router = Router();

    this.initializeMiddlewares();
    registerRoutes(router);
    this.express.use(router);

    this.express.use((err: Error, _req: Request, res: Response, _next: Function) => {
      console.log(err);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ msg: 'internal server error' });
    });
  }

  private initializeMiddlewares(): void {
    if (process.env['NODE_ENV'] !== 'test') this.express.use(morgan('combined'));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(helmet.xssFilter());
    this.app.use(helmet.noSniff());
    this.app.use(helmet.hidePoweredBy());
    this.app.use(helmet.frameguard({ action: 'deny' }));
    this.app.use(compress());
  }

  get app(): Express {
    return this.express;
  }

  async listen(): Promise<void> {
    return new Promise(resolve => {
      this.httpServer = this.express.listen(this.port, () => {
        console.log(`Poker Backend App is running at http://localhost:${this.port} in ${this.express.get('env')} mode`);
        console.log('Press CTRL-C to stop\n');
        resolve();
      });
    });
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.httpServer) {
        this.httpServer.close(error => {
          if (error) {
            return reject(error);
          }
          return resolve();
        });
      }

      return resolve();
    });
  }
}
