import { Server } from './server';

export class PokerBackendApp {
  server?: Server;

  async start() {
    const port = process.env['PORT'] || '5000';
    this.server = new Server(port);
    return this.server.listen();
  }

  get expressApp() {
    return this.server?.app;
  }

  async stop() {
    return this.server?.stop();
  }
}
