import {Router, Request, Response} from 'express';
import { body, validationResult } from 'express-validator';
import { Task } from '../models/tasks';

const router = Router();
let tasks: Task[] = [];

const taskValidationRules = [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('completed').isBoolean().withMessage('Completed must be a boolean')
]

// create a task
router.post('/',taskValidationRules, (req:Request, res:Response) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const task: Task = {
        id: tasks.length + 1,
        title: req.body.title,
        description: req.body.description,
        completed: false
    }

    tasks.push(task);
    res.status(200).json(task);
})

// get all tasks
router.get('/', (req:Request, res:Response) => {
    res.json(tasks);
})

// get a task by its id
router.get('/:id', (req:Request, res:Response) => {
    const task = tasks.find((t) => t.id === parseInt(req.params.id));

    if(!task){
        res.status(404).send('No task found');
    } else{
        res.json(task);
    }
})

// update an existing task by its id
router.put('/:id',taskValidationRules, (req:Request, res:Response) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    
    const task = tasks.find((t) => t.id === parseInt(req.params.id));

    if(!task){
        res.status(404).send('No task found');
    } else{
        task.title = req.body.title || task.title;
        task.description = req.body.description || task.description;
        task.completed = req.body.completed || task.completed;

        res.json(task)
    }
})

// delete a task
router.delete('/:id', (req:Request, res:Response) => {
    const index = tasks.findIndex((t) => t.id === parseInt(req.params.id));

    if(index === -1){
        res.status(404).send('Task not found');
    } else{
        tasks.splice(index, 1)
        res.status(204).send()
    }
})

export default router;