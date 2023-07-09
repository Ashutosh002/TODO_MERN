const express  = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express()

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/MERN", {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then(( () => console.log("Connected to DB")))
.catch(console.error);

const Todo = require("./models/Todo");


app.get('/todos', async (req, res) => {
    
    const todos = await Todo.find();
    res.send(todos);
})


app.post('/todos/new', (req, res) => {
    const todo = new Todo({
        text: req.body.text
    });

    todo.save();

    res.send(todo);
})

app.delete('/todos/delete/:id', async (req, res) => {
    const result = await Todo.findByIdAndDelete(req.params.id)

    res.json(result);
})

app.put('/todos/update/:id', async(req, res) => {
    const result = await Todo.findById(req.params.id);

    result.complete = !result.complete

    result.save();

    res.json(result);
})


app.listen(3010, () => console.log("Listening on port 3010"));