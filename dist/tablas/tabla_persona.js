"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const tabla_persona = new mongoose_1.Schema({
    dni: { type: Number, required: true, },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true }
});
exports.default = mongoose_1.model("person", tabla_persona);
//# sourceMappingURL=tabla_persona.js.map