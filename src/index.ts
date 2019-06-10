import { AsyncResource } from "async_hooks";
import express from "express";
import * as http from "http";
import { connect } from "http2";
import path from "path";
import App from "./api";
import { Categoria } from "./categoria";
import { Persona } from "./persona";
import { Producto } from "./producto";
// import category, { tabla_categoria } from "./tablas/tabla_categoria";
// import categoria from "./tablas/tabla_categoria";
// import person from "./tablas/tabla_persona";
// import product from "./tablas/tabla_producto";

const web = express();
const portApi = 8120;
const portweb = 8080;
App.app.set("port", portApi);
App.app.set( "views", path.join( __dirname, "views" ) );
App.app.set( "view engine", "ejs" );
const server = http.createServer(App.app);

const mongoUrl: string = "mongodb://localhost:27017/mongobase";
const mongoose = require("mongoose");
const Schema =  mongoose.Schema;
mongoose.connect(mongoUrl, {
	useNewUrlParser: true,
	useCreateIndex: true
});

web.set( "views", path.join( __dirname, "views" ) );
web.set( "view engine", "ejs" );
web.use(express.urlencoded());

const tabla_categoria = new mongoose.Schema(
    {
        nombre: String
    }
);
const modelC = mongoose.model("categoria", tabla_categoria);
const tabla_producto = new mongoose.Schema(
    {
        idProducto: Number,
        nombre: String,
        categoria:  [{ type: Schema.Types.ObjectId, ref: "categoria" }]
    }
);
const modelP = mongoose.model("producto", tabla_producto);
const tabla_persona = new mongoose.Schema(
    {
        dni: Number,
        nombre: String,
        apellido: String
    }
);
const modelPers = mongoose.model("persona", tabla_persona);

const lista_personas: Persona[] = [];
let lista_productos: Producto[] = [];
let lista_categorias: Categoria[] = [];

web.get("/", (req, res) => {

	res.render("index");
});

web.post( "/pedirdatos", ( req, res ) => {

	const productos = modelP.find();
	productos.exec(function(err: any, pr: any) {
    	for (const item of pr) {
			lista_productos = [];
   const dni_persona: Number = item.dni;
   for (const item2 of lista_personas) {
            	if (dni_persona == item2.dni) {
                	const prod = new Producto(item.idProducto, item.nombre, item.categoria);
                	prod.idProducto = item.id;
                	lista_productos.push(prod);
            	}
        	}
    	}
    });

	const categorias = modelC.find();
	categorias.exec(function(err: any, cat: any[]) {
		lista_categorias = [];
  for (const item of cat) {
        	const c = new Categoria(item.nombre);
        	c.idCategoria = item._id;
        	lista_categorias.push(c);
    	}

    });
 res.render( "index");
} );

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
    const c = new Categoria(nombre);
	   (async () => {
		 const nueva_categoria = new modelC({
        	nombre: c.nombre
    	});

		 await nueva_categoria.save();
		 const categorias = modelC.find().sort({$natural: -1}).limit(1);
	  categorias.exec(function(err: any, cat: any) {
		console.log(cat);
		c.idCategoria = cat[0]._id;
		lista_categorias.push(c);
		console.log(lista_categorias);
		});
    })();

    res.redirect("/");
});

web.post("/BajaCategoria", (req, res) => {
	const idCategoria = req.body.idCategoria;

	const categoria_eliminada = modelC.deleteOne({_id: idCategoria});
	categoria_eliminada.exec(function(err: any, cat: any) {
		console.log(cat); // const unaCategoria = new Categoria(cat.idCategoria, cat.nombre);
		for (const item of lista_categorias) {
			const pos: number = lista_categorias.indexOf(item);
			lista_categorias.splice(pos, 1);
		}
		res.redirect("/");
	});
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
    res.render("Ver_Categorias", {categorias: lista_categorias});
});

web.post("/EliminarCategoria", (req, res) => {
	const idCategoria = req.body.idCategoria;

	const categoria_eliminada = modelC.deleteOne({_id: idCategoria});
	categoria_eliminada.exec(function(err: any, cat: any) {
		console.log(cat); // const unaCategoria = new Categoria(cat.idCategoria, cat.nombre);
		for (const item of lista_categorias) {
			const pos: number = lista_categorias.indexOf(item);
			lista_categorias.splice(pos, 1);
		}
		res.redirect("/");
	});
});

web.post("/irHtmlCategoria", (req, res) => {
    res.render("Dar_de_Alta_unaCategoria");
});

web.post("/CrearPersona", (req, res) => {
	const dni = req.body.dni;
	const nombre = req.body.nombre;
	const apellido = req.body.apellido;

	(async () => {
    	const p: Persona = new Persona(dni, nombre, apellido);
    	const nueva_persona = new modelPers({
        	dni: p.dni,
        	nombre: p.nombre,
        	apellido: p.apellido
    	});
    	await nueva_persona.save();
	})();

	res.redirect("/");
});
/*
web.post("/BajaCategoria", (req, res) => {
	const idCategoria = req.body.idCategoria;

	const categoria_eliminada = modelC.deleteOne({_id: idCategoria});
	categoria_eliminada.exec(function(err: any, cat: any) {
		console.log(cat); // const unaCategoria = new Categoria(cat.idCategoria, cat.nombre);
		for (const item of lista_categorias) {
			const pos: number = lista_categorias.indexOf(item);
			lista_categorias.splice(pos, 1);
		}

		res.redirect("/");
	});
});*/
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
web.listen( portweb, () => {
	console.log( `Servidor iniciado: http://localhost:${ portweb }` );
} );

server.listen( portApi, () => {
	// tslint:disable-next-line:no-console
	console.log( `Servidor Api iniciado: http://localhost:${ portApi }` );
} );
