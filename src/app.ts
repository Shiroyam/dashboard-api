import dotenv from 'dotenv';
import express, { Express } from 'express';
import { Server } from 'http';
import { inject } from 'inversify/lib/annotation/inject';
import { injectable } from 'inversify/lib/annotation/injectable';
import { ExeptionFilter } from './errors/exeption.filter';
import { ILogger } from './logger/logger.interface';
import { TYPES } from './types';
import { UserController } from './users/users.controller';
import 'reflect-metadata';

dotenv.config();

@injectable()
export class App {
	app: Express;
	server: Server;
	port: string;

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.UserController) private userController: UserController,
		@inject(TYPES.ExeptionFilter) private exeptionFilter: ExeptionFilter,
	) {
		this.app = express();
		this.port = process.env.PORT || '8000';
	}

	useRouter(): void {
		this.app.use('/users', this.userController.router);
	}

	useExeptionFilters(): void {
		this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
	}

	public async init(): Promise<void> {
		this.useRouter();
		this.useExeptionFilters();
		this.server = this.app.listen(this.port);
		this.logger.log(`Сервер запущен на http://localhost:${this.port}`);
	}
}
