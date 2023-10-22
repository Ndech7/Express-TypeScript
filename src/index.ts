import express, {Request, Response, NextFunction} from 'express';
import taskRoutes from './routes/tasks';

// initialize app
const app = express()
const PORT = process.env.PORT || 3500

// middleware to handle json data
app.use(express.json())
app.use('/tasks', taskRoutes)

// a simple get route
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript Express!');
})

// error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
})

// Server service
app.listen(PORT, () => {
    console.log(`Server is listening at Port ${PORT}`);
})