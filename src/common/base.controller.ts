import { Router } from 'express';
import { injectable } from 'inversify/lib/annotation/injectable';
import { ILogger } from '../logger/logger.interface';
import { IRouteController } from './route.interface';
import 'reflect-metadata';

@injectable()
export abstract class BaseController {
	private readonly _router: Router;

	constructor(private logger: ILogger) {
		this._router = Router();
	}

	get router(): Router {
		return this._router;
	}

	protected bindRoutes(routes: IRouteController[]): void {
		for (const route of routes) {
			this.logger.log(`[${route.method}] ${route.path}`);
			const handler = route.func.bind(this);
			this.router[route.method](route.path, handler);
		}
	}
}
