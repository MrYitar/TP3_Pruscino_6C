"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const categoria_1 = require("../categoria");
const tabla_producto = new mongoose_1.Schema({
    idProducto: { type: Number, required: true, },
    nombre: { type: String, required: true },
    categoria: { type: categoria_1.Categoria, required: true }
});
exports.default = mongoose_1.model("product", tabla_producto);
//# sourceMappingURL=tabla_producto.js.map