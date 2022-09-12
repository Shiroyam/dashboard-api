import { BaseController } from '../common/base.controller';
import { LoggerService } from '../logger/logger.service';
import { Request, Response } from 'express';

export class UserController extends BaseController {
	constructor(logger: LoggerService) {
		super(logger);
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