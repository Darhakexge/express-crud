import compression from 'compression';
import express, { Application } from 'express';
import { glob } from 'glob';
import { default as cors, default as helmet } from 'helmet';
import { connect } from 'mongoose';
import morgan from 'morgan';
import config, { Config } from 'src/common/config';
import errorMiddleware from 'src/common/middlewares/error.middleware';
import Controller from 'src/common/interfaces/controllere.interface';

export default class App {
    #express: Application;
    #config: Config;

    constructor() {
        this.#config = config;
        this.#express = express();

        this.#initializeDatabaseConnection();
        this.#initializeMiddlewares();
        this.#initializeControllers(/* controllers */);
        this.#initializeErrorHandling();
    }

    #initializeMiddlewares(): void {
        this.#express.use(helmet());
        this.#express.use(cors());
        this.#express.use(morgan('dev'));
        this.#express.use(express.json());
        this.#express.use(express.urlencoded({ extended: false }));
        this.#express.use(compression());
    }

    async #initializeControllers(/* controllers: Controller[] */): Promise<void> {
        // controllers.forEach((controller) => {
        //     this.#express.use('/api', controller.router);
        // });
        const controllers = await glob(`${__dirname}/**/*.controller.ts`);

        controllers.forEach(async (path: string): Promise<void> => {
            const controller: Controller = await import(path);
            this.#express.use('/api', controller.router);
        });
    }

    #initializeErrorHandling(): void {
        this.#express.use(errorMiddleware);
    }

    async #initializeDatabaseConnection(): Promise<void> {
        const { host, port, user, password, database } = config.database;

        await connect(
            `mongodb://${user}:${password}@${host}:${port}/${database}`,
        );
    }

    public listen(): void {
        this.#express.listen(this.#config.app.port, () => {
            console.log(`App listening in port ${this.#config.app.port}`);
        });
    }
}
