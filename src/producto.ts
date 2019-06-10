import {Categoria} from "./categoria";

export class Producto {
    public idProducto: number;
    public nombre: string;
    public categoria: Categoria;

    constructor(idProducto: number, nombre: string, categoria: Categoria) {
        this.idProducto = idProducto;
        this.nombre = nombre;
        this.categoria = categoria;
    }
}
