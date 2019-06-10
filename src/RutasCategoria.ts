import {NextFunction, Request, Response, Router} from "express";
import { Categoria } from "./categoria";
import category from "./tablas/tabla_categoria";

const mongoUrl: string = "mongodb://localhost:27017/mongobase";
const mongoose = require("mongoose");
mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useCreateIndex: true
});
const Schema = mongoose.Schema;

// const listaCategoria: Categoria[] = [];
const idCategoria: number = 0;

export class rutas {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public async getCategorias(req: Request, res: Response, next: NextFunction) {
        /* error
        const listaCategoria = [];
        const c = category.find();
        (async () => {
            const categorias = await c.exec();
            for (const item of categorias) {
                const una_c = new Categoria(item.idCategoria, item.nombre);
                una_c.idCategoria = item.id;
                listaCategoria.push(una_c);
            }
            res.json(listaCategoria);
        })();
        */
        const listaCategoria = await category.find();
        res.json(listaCategoria);
    }

    public async crearCategoria(req: Request, res: Response) {
        const {idCategoria, nombre} = req.body;
        const nueva_categoria = new category({idCategoria, nombre});
        await nueva_categoria.save();
        res.json({data: nueva_categoria});
        /*
        console.log(req.body);

        const unCategoria: Categoria = new Categoria(req.body.id,req.body.nombre);
        listaCategoria.push(unCategoria);

        idCategoria += 1;

        res.json("Categoria creada");*/
    }
    public async getCategoria(req: Request, res: Response) {
        const unaCategoria = await category.findOne({idCategoria: req.params.idCategoria});
        res.json(unaCategoria);
        /*for (const item of listaCategoria) {
            if (item.idCategoria == req.params.url) {
                res.send(item);
            }
        }*/
    }

    public async eliminarCategoria(req: Request, res: Response) {
        const {idCategoria} = req.params;
        await category.findOneAndDelete({idCategoria});

        /*for (const item of listaCategoria) {
            if (item.idCategoria == req.params.url) {
                const posicion: number = listaCategoria.indexOf(item);
                listaCategoria.splice(posicion, 1);

                res.json("Categoria eliminada");
            }
        }*/
    }

    public async modificarCategoria(req: Request, res: Response) {
        const {idCategoria} = req.params;
        const categoria_actualizada = await category.findOneAndUpdate({idCategoria}, req.body, {new: true});
        res.json(categoria_actualizada);
        /*for (let item of listaCategoria) {
            if (item.idCategoria == req.params.url) {
                item.idCategoria= req.body.id
                item.nombre = req.body.nombre
                res.json("Categoria modificada");
            }
        }*/

    }

    public routes() {
        this.router.get("/", this.getCategorias);
        this.router.get("/:url", this.getCategoria);
        this.router.post("/", this.crearCategoria);
        this.router.delete("/:url", this.eliminarCategoria);
        this.router.put("/:url", this.modificarCategoria);
    }
}

const RutasCategoria = new rutas ();
RutasCategoria.routes();

export default RutasCategoria.router;
