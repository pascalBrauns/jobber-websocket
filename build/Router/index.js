"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var __1 = require("..");
var router = express_1["default"].Router();
router.get('/ping', function (_request, response) { return response.send('pong'); });
router.put('/job/:id', function (request, response) {
    var id = request.params.id;
    var job = request.body;
    __1.io.emit("job/" + id, job);
    console.log("[" + id + "] " + JSON.stringify(job, null, 2));
    response.end();
});
router.post('/job/:id/lifetime', function (request, response) {
    var id = request.params.id;
    var _a = request.body, start = _a.start, end = _a.end;
    console.log("[" + id + "] " + start + " " + end);
    response.end();
});
router.post('/job/:id/status', function (request, response) {
    var id = request.params.id;
    var status = request.body.status;
    __1.io.emit("job/" + id + "/status", { status: status });
    console.log("[" + id + "] " + status);
    response.end();
});
router.post('/job/:id/log', function (request, response) {
    var id = request.params.id;
    var message = request.body.message;
    __1.io.emit("job/" + id + "/log", { message: message });
    console.log("[" + id + "] " + message);
    response.end();
});
router.post('/job/:id/progress', function (request, response) {
    var id = request.params.id;
    var _a = request.body, completed = _a.completed, pending = _a.pending;
    __1.io.emit("job/" + id + "/progress", { completed: completed, pending: pending });
    console.log("[" + id + "] (" + completed + "/" + (completed + pending) + ")");
    response.end();
});
router["delete"]('/blueprint/:id', function (request, response) {
    var id = request.params.id;
    __1.io.emit("blueprint/" + id, { message: 'removed' });
    console.log("[" + id + "] removed");
    response.end();
});
exports["default"] = router;
