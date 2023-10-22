"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tasks_1 = __importDefault(require("./routes/tasks"));
// initialize app
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3500;
// middleware to handle json data
app.use(express_1.default.json());
app.use('/tasks', tasks_1.default);
// a simple get route
app.get('/', (req, res) => {
    res.send('Hello, TypeScript Express!');
});
// error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});
// Server service
app.listen(PORT, () => {
    console.log(`Server is listening at Port ${PORT}`);
});
