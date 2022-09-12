import { Router } from 'express';
import { LoggerService } from '../logger/logger.service';
import { IRouteController } from './route.interface';

export abstract class BaseController {
	private readonly _router: Router;

	constructor(private logger: LoggerService) {
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
