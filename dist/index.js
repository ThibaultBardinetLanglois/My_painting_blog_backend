"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const api_routes_1 = __importDefault(require("./routes/api.routes"));
const database_config_1 = require("./config/database.config");
const cli_color_1 = __importDefault(require("cli-color"));
function loggerMiddleware(request, response, next) {
    console.log("\nIncomming request from:");
    console.log(cli_color_1.default.bgMagenta(request.method) + cli_color_1.default.bgWhiteBright(` ${request.protocol}://${request.hostname}:${request.socket.localPort}${request.path}`));
    console.log("");
    next();
}
const app = (0, express_1.default)();
app.use(loggerMiddleware)
    // If you are running express 4.16 or greater, you no longer need to use body-parser to pass data and manipulate it, in order to parse the incomming request
    .use(express_1.default.json())
    .use('/api', api_routes_1.default);
app.listen(process.env.SERVER_PORT, () => {
    console.log(cli_color_1.default.bgGreenBright(`The application is listening on port ${process.env.SERVER_PORT}!`));
    database_config_1.Database.checkConnection;
});
