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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http = __importStar(require("http"));
const path_1 = __importDefault(require("path"));
const api_1 = __importDefault(require("./api"));
const categoria_1 = require("./categoria");
const persona_1 = require("./persona");
const producto_1 = require("./producto");
// import category, { tabla_categoria } from "./tablas/tabla_categoria";
// import categoria from "./tablas/tabla_categoria";
// import person from "./tablas/tabla_persona";
// import product from "./tablas/tabla_producto";
const web = express_1.default();
const portApi = 8120;
const portweb = 8080;
api_1.default.app.set("port", portApi);
api_1.default.app.set("views", path_1.default.join(__dirname, "views"));
api_1.default.app.set("view engine", "ejs");
const server = http.createServer(api_1.default.app);
const mongoUrl = "mongodb://localhost:27017/mongobase";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useCreateIndex: true
});
web.set("views", path_1.default.join(__dirname, "views"));
web.set("view engine", "ejs");
web.use(express_1.default.urlencoded());
const tabla_categoria = new mongoose.Schema({
    nombre: String
});
const modelC = mongoose.model("categoria", tabla_categoria);
const tabla_producto = new mongoose.Schema({
    idProducto: Number,
    nombre: String,
    categoria: [{ type: Schema.Types.ObjectId, ref: "categoria" }]
});
const modelP = mongoose.model("producto", tabla_producto);
const tabla_persona = new mongoose.Schema({
    dni: Number,
    nombre: String,
    apellido: String
});
const modelPers = mongoose.model("persona", tabla_persona);
const lista_personas = [];
let lista_productos = [];
let lista_categorias = [];
web.get("/", (req, res) => {
    res.render("index");
});
web.post("/pedirdatos", (req, res) => {
    const productos = modelP.find();
    productos.exec(function (err, pr) {
        for (const item of pr) {
            lista_productos = [];
            const dni_persona = item.dni;
            for (const item2 of lista_personas) {
                if (dni_persona == item2.dni) {
                    const prod = new producto_1.Producto(item.idProducto, item.nombre, item.categoria);
                    prod.idProducto = item.id;
                    lista_productos.push(prod);
                }
            }
        }
    });
    const categorias = modelC.find();
    categorias.exec(function (err, cat) {
        lista_categorias = [];
        for (const item of cat) {
            const c = new categoria_1.Categoria(item.nombre);
            c.idCategoria = item._id;
            lista_categorias.push(c);
        }
    });
    res.render("index");
});
web.get("/Dar_de_Alta_una_Persona", (req, res) => {
    res.render("Dar_de_Alta_una_Persona");
});
web.get("/Dar_de_Alta_un_Producto", (req, res) => {
    res.render("Dar_de_Alta_un_Producto");
});
web.get("/Dar_de_Alta_una_Categoria", (req, res) => {
    res.render("Dar_de_Alta_una_Categoria");
});
web.post("/CrearCategoria", (req, res) => {
    const nombre = req.body.nombre;
    const c = new categoria_1.Categoria(nombre);
    (() => __awaiter(this, void 0, void 0, function* () {
        const nueva_categoria = new modelC({
            nombre: c.nombre
        });
        yield nueva_categoria.save();
        const categorias = modelC.find().sort({ $natural: -1 }).limit(1);
        categorias.exec(function (err, cat) {
            console.log(cat);
            c.idCategoria = cat[0]._id;
            lista_categorias.push(c);
            console.log(lista_categorias);
        });
    }))();
    res.redirect("/");
});
web.post("/verCategorias", (req, res) => {
    /*const categorias = modelC.find();
    categorias.exec(function(err: any, cat: any[]) {
    lista_categorias = [];
    for (const item of cat) {
        const c = new Categoria(item.nombre);
            c.idCategoria = item.idCategoria;
            c.nombre = item.nombre;
            lista_categorias.push(c);
    }

    });*/
    res.render("Ver_Categorias", { categorias: lista_categorias });
});
web.post("/irHtmlCategoria", (req, res) => {
    res.render("Dar_de_Alta_unaCategoria");
});
web.post("/CrearPersona", (req, res) => {
    const dni = req.body.dni;
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    (() => __awaiter(this, void 0, void 0, function* () {
        const p = new persona_1.Persona(dni, nombre, apellido);
        const nueva_persona = new modelPers({
            dni: p.dni,
            nombre: p.nombre,
            apellido: p.apellido
        });
        yield nueva_persona.save();
    }))();
    res.redirect("/");
});
web.post("/BajaCategoria", (req, res) => {
    const idCategoria = req.body.idCategoria;
    const categoria_eliminada = modelC.deleteOne({ _id: idCategoria });
    categoria_eliminada.exec(function (err, cat) {
        console.log(cat); // const unaCategoria = new Categoria(cat.idCategoria, cat.nombre);
        for (const item of lista_categorias) {
            const pos = lista_categorias.indexOf(item);
            lista_categorias.splice(pos, 1);
        }
        res.redirect("/");
    });
});
/*
web.get("/ModificarCategoria", (req, res) => {
    const idCategoria = req.query.idCategoria;

    const categoria = category.findOne({idCategoria});
    (async () => {
        const c = await categoria.exec();
        const ca = new Categoria(c.idCategoria, c.nombre);
        ca.idCategoria = c.id;

        res.render("ModificarCategoria", {categoria : ca});
    })();
});
*/
web.listen(portweb, () => {
    console.log(`Servidor iniciado: http://localhost:${portweb}`);
});
server.listen(portApi, () => {
    // tslint:disable-next-line:no-console
    console.log(`Servidor Api iniciado: http://localhost:${portApi}`);
});
//# sourceMappingURL=index.js.map