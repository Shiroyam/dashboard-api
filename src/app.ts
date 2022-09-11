import dotenv from 'dotenv';
import express, { Express } from 'express';
import { Server } from 'http';

dotenv.config();

export class App {
	app: Express;
	server: Server;
	port: string;

	constructor() {
		this.app = express();
		this.port = process.env.PORT || '8000';
	}

	public async init(): Promise<void> {
		this.server = this.app.listen(this.port);
		console.log(`Сервер запущен на http://localhost:${this.port}`);
	}
}
