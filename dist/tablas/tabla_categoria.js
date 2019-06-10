"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.tabla_categoria = new Schema({
    nombre: { type: String, required: true }
});
const categoria = mongoose.model("category", exports.tabla_categoria);
exports.default = categoria;
//# sourceMappingURL=tabla_categoria.js.map