import { model, Schema } from "mongoose";
import { Categoria } from "../categoria";

const tabla_producto = new Schema(
    {
        idProducto: {type: Number, required: true, },
        nombre: {type: String, required: true},
        categoria: {type: Categoria, required: true}
    }
);
export default model("product", tabla_producto);
