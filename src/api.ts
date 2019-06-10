import * as bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import { runInNewContext } from "vm";
import CategoriaRoutes from "./RutasCategoria";

class api {

    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    private config(): void {
        /*const MONGO_URI = 'mongodb://localhost/mongobase'
        mongoose.set('useFindAndModify', true)
        mongoose.connect(MONGO_URI || process.env.MONGO_URL, {
            useNewUrlParser: true,
            useCreateIndex: true

        })
        .then(db=> console.log('DB conectada'))*/
    // support application/json type post data
        this.app.use(bodyParser.json());
    // support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    private routes(): void {
        const router = express.Router();

        this.app.use("/", router);
        this.app.use("/api/v1/alumno", CategoriaRoutes);
    }
}

export default new api();
