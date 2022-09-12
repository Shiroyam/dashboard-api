import { Request, Response } from 'express';
import { LoggerService } from '../logger/logger.service';
import { IExeptionFilter } from './exeption.interface';
import { HTTPError } from './http-error.class';

export class ExeptionFilter implements IExeptionFilter {
	logger: LoggerService;

	constructor(logger: LoggerService) {
		this.logger = logger;
	}

	catch(error: Error | HTTPError, req: Request, res: Response): void {
		if (error instanceof HTTPError) {
			this.logger.error(`[${error.message}] Ошибка ${error.statusCode}: ${error.message}`);
			res.status(error.statusCode).send({ error: error.message });
		} else {
			this.logger.error(`${error.message}`);
			res.status(500).send({ error: error.message });
		}
	}
}
