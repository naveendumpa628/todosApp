const Todo = require('../models/Todo');

const createTodo = async (req, res) => {
    const { title, description } = req.body;

    try {
        console.log('inside createTodo before save db call', req)
        const todo = new Todo({
            userId: req.userId,
            title,
            description,
        });

        await todo.save();

        res.status(201).json(todo);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

const getTodos = async (req, res) => {
    try {
        console.log('inside getTodos before API call', req)
        const todos = await Todo.find({ userId: req.userId });
        console.log('inside getTodos after API call')
        res.status(200).json(todos);
    } catch (err) {
        console.log('inside getTodos in error')
        res.status(500).json({ msg: 'Server error' });
    }
};

const updateTodo = async (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;

    try {
        const todo = await Todo.findById(id);
        if (!todo) return res.status(404).json({ msg: 'Todo not found' });

        if (todo.userId.toString() !== req.userId) return res.status(403).json({ msg: 'Not authorized' });

        todo.title = title || todo.title;
        todo.description = description || todo.description;
        todo.status = status || todo.status;

        await todo.save();

        res.status(200).json(todo);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

const deleteTodo = async (req, res) => {
    const { id } = req.params;

    try {
        const todo = await Todo.findById(id);
        if (!todo) return res.status(404).json({ msg: 'Todo not found' });

        if (todo.userId.toString() !== req.userId) return res.status(403).json({ msg: 'Not authorized' });

        await todo.remove();

        res.status(200).json({ msg: 'Todo deleted' });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

module.exports = { createTodo, getTodos, updateTodo, deleteTodo };
