/* eslint-disable import/first */
import 'reflect-metadata';
import { container, inject, singleton } from '@triptyk/nfw-core';
import Koa from 'koa';
import helmet from 'koa-helmet';
import cors from '@koa/cors';
import { koaBody } from 'koa-body';
import { init, requestContext } from '@triptyk/nfw-mikro-orm';
import type { Server } from 'http';
import ConfigurationService from './services/configuration.service.js';
import { MikroORM, PostgreSqlDriver } from '@mikro-orm/postgresql';
import config from './mikro-orm.config.js';
import { createApplication } from '@triptyk/nfw-http';
import MainAreaController from './areas/main.area.js';
import { RequestContext } from '@mikro-orm/core';
import { ResourcesRegistryImpl } from '@triptyk/nfw-resources';
import { registerAccomodationToRegistry } from './resources/accomodation/register.js';
import { registerBookingToRegistry } from './resources/booking/register.js';
import { DatabaseSeeder } from './database/seeders/database.seeder.js';

@singleton()
export class Application {
  private httpServer?: Server;
  private koaServer?: Koa;
  private orm?: MikroORM;

  public constructor (
    @inject(ConfigurationService) private readonly configurationService: ConfigurationService,
  ) {}

  public async setup () {
    this.configurationService.init();
    this.orm = await MikroORM.init<PostgreSqlDriver>(config);
    container.register(MikroORM, {
      useValue: this.orm,
    });

    const registry = container.resolve(ResourcesRegistryImpl)
    registry.setConfig({
      host: '/api/v1',
    });
    registerAccomodationToRegistry(registry);
    registerBookingToRegistry(registry);

    const generator = this.orm.getSchemaGenerator();
    const seeder = this.orm.getSeeder();

    await generator.refreshDatabase();

    await seeder.seed(DatabaseSeeder);

    await this.setupKoaServer();
  }

  public async listen () {
    const port = this.configurationService.get('PORT').unwrapOr(0);
    await new Promise<void>((resolve) => this.httpServer = this.koaServer?.listen(port, resolve));
    console.log(`Server listening on port ${port}`);
    
  }

  private async setupKoaServer () {
    const server = this.koaServer = new Koa();
    server.use(async (ctx, next) => {
      await RequestContext.createAsync(this.orm!.em, next);
    });
    server.use(helmet());
    server.use(cors());
    server.use(koaBody({
      json: true,
    }));

    await createApplication({
      server,
      controllers: [MainAreaController],
    });


    return server;
  }

  public async stop () {
    this.httpServer?.closeAllConnections();
    await this.orm?.close();
    this.httpServer?.close();
    console.log('Server stopped');
    
  }
}
