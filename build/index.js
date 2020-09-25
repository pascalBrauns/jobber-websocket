"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.io = void 0;
var http_1 = __importDefault(require("http"));
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var socket_io_1 = __importDefault(require("socket.io"));
var Router_1 = __importDefault(require("./Router"));
var app = express_1["default"]();
var server = http_1["default"].createServer(app);
exports.io = socket_io_1["default"](server);
app.use(body_parser_1["default"].json());
app.use(body_parser_1["default"].urlencoded({ extended: true }));
app.use(Router_1["default"]);
server.listen(process.env.PORT, function () {
    console.info("Server listening on port " + process.env.PORT);
});
