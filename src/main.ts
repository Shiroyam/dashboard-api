import { App } from './app';

const bootstrap = async (): Promise<void> => {
	const app = new App();
	await app.init();
};

bootstrap();
