"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = __importStar(require("body-parser"));
const express_1 = __importDefault(require("express"));
const RutasCategoria_1 = __importDefault(require("./RutasCategoria"));
class api {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        /*const MONGO_URI = 'mongodb://localhost/mongobase'
        mongoose.set('useFindAndModify', true)
        mongoose.connect(MONGO_URI || process.env.MONGO_URL, {
            useNewUrlParser: true,
            useCreateIndex: true

        })
        .then(db=> console.log('DB conectada'))*/
        // support application/json type post data
        this.app.use(bodyParser.json());
        // support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
    routes() {
        const router = express_1.default.Router();
        this.app.use("/", router);
        this.app.use("/api/v1/alumno", RutasCategoria_1.default);
    }
}
exports.default = new api();
//# sourceMappingURL=api.js.map