import {Producto} from "./producto";

export class Persona {
    public dni: number;
    public nombre: string;
    public apellido: string;
    public lista_productos: Producto[];

    constructor(nombre: string, DNI: number, apellido: string) {
        this.dni = DNI;
        this.nombre = nombre;
        this.apellido = apellido;
        this.lista_productos = [];
    }
}
