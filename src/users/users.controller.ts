import { BaseController } from '../common/base.controller';
import { Request, Response } from 'express';
import { IUserController } from './users.interface';
import { injectable } from 'inversify/lib/annotation/injectable';
import { inject } from 'inversify/lib/annotation/inject';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import 'reflect-metadata';
@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
		super(loggerService);
		this.bindRoutes([{ path: '/register', method: 'post', func: this.register }]);
		this.bindRoutes([{ path: '/login', method: 'post', func: this.login }]);
	}

	login(req: Request, res: Response): void {
		res.send('login');
	}

	register(req: Request, res: Response): void {
		res.send('register');
	}
}
