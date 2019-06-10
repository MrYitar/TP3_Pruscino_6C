const mongoose = require("mongoose");
const Schema = mongoose.Schema;

export const tabla_categoria = new Schema(
    {
        nombre: {type: String, required: true}
    }
);

const categoria = mongoose.model("category", tabla_categoria);
export default categoria;
