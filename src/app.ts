import dotenv from 'dotenv';
import express, { Express } from 'express';
import { Server } from 'http';
import { ExeptionFilter } from './errors/exeption.filter';
import { LoggerService } from './logger/logger.service';
import { UserController } from './users/users.controller';

dotenv.config();

export class App {
	app: Express;
	server: Server;
	port: string;
	logger: LoggerService;
	userController: UserController;
	exeptionFilter: ExeptionFilter;

	constructor(
		logger: LoggerService,
		userController: UserController,
		exeptionFilter: ExeptionFilter,
	) {
		this.app = express();
		this.port = process.env.PORT || '8000';
		this.logger = logger;
		this.userController = userController;
		this.exeptionFilter = exeptionFilter;
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
