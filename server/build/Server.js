"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var app = express_1.default();
app.use(cors_1.default());
app.get("/", function (req, res) {
    res.status(200).send("Hello World!");
});
app.listen(8000, function () {
    console.log("Server Started at Port, 8000");
});
