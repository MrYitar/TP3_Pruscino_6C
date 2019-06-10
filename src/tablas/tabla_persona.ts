import { model, Schema } from "mongoose";

const tabla_persona = new Schema(
    {
        dni: {type: Number, required: true, },
        nombre: {type: String, required: true},
        apellido: {type: String, required: true}
    }
);

export default model("person", tabla_persona);
