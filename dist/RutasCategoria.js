"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tabla_categoria_1 = __importDefault(require("./tablas/tabla_categoria"));
const mongoUrl = "mongodb://localhost:27017/mongobase";
const mongoose = require("mongoose");
mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useCreateIndex: true
});
const Schema = mongoose.Schema;
// const listaCategoria: Categoria[] = [];
const idCategoria = 0;
class rutas {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    getCategorias(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
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
            const listaCategoria = yield tabla_categoria_1.default.find();
            res.json(listaCategoria);
        });
    }
    crearCategoria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idCategoria, nombre } = req.body;
            const nueva_categoria = new tabla_categoria_1.default({ idCategoria, nombre });
            yield nueva_categoria.save();
            res.json({ data: nueva_categoria });
            /*
            console.log(req.body);
    
            const unCategoria: Categoria = new Categoria(req.body.id,req.body.nombre);
            listaCategoria.push(unCategoria);
    
            idCategoria += 1;
    
            res.json("Categoria creada");*/
        });
    }
    getCategoria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const unaCategoria = yield tabla_categoria_1.default.findOne({ idCategoria: req.params.idCategoria });
            res.json(unaCategoria);
            /*for (const item of listaCategoria) {
                if (item.idCategoria == req.params.url) {
                    res.send(item);
                }
            }*/
        });
    }
    eliminarCategoria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idCategoria } = req.params;
            yield tabla_categoria_1.default.findOneAndDelete({ idCategoria });
            /*for (const item of listaCategoria) {
                if (item.idCategoria == req.params.url) {
                    const posicion: number = listaCategoria.indexOf(item);
                    listaCategoria.splice(posicion, 1);
    
                    res.json("Categoria eliminada");
                }
            }*/
        });
    }
    modificarCategoria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idCategoria } = req.params;
            const categoria_actualizada = yield tabla_categoria_1.default.findOneAndUpdate({ idCategoria }, req.body, { new: true });
            res.json(categoria_actualizada);
            /*for (let item of listaCategoria) {
                if (item.idCategoria == req.params.url) {
                    item.idCategoria= req.body.id
                    item.nombre = req.body.nombre
                    res.json("Categoria modificada");
                }
            }*/
        });
    }
    routes() {
        this.router.get("/", this.getCategorias);
        this.router.get("/:url", this.getCategoria);
        this.router.post("/", this.crearCategoria);
        this.router.delete("/:url", this.eliminarCategoria);
        this.router.put("/:url", this.modificarCategoria);
    }
}
exports.rutas = rutas;
const RutasCategoria = new rutas();
RutasCategoria.routes();
exports.default = RutasCategoria.router;
//# sourceMappingURL=RutasCategoria.js.map