import { Request, Response } from 'express';
import { inject } from 'inversify/lib/annotation/inject';
import { injectable } from 'inversify/lib/annotation/injectable';
import { ILogger } from '../logger/logger.interface';
import { LoggerService } from '../logger/logger.service';
import { TYPES } from '../types';
import { IExeptionFilter } from './exeption.interface';
import { HTTPError } from './http-error.class';
import 'reflect-metadata';
@injectable()
export class ExeptionFilter implements IExeptionFilter {
	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
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
