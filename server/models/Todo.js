const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ['done', 'pending', 'in progress', 'completed'], default: 'pending' }
});

module.exports = mongoose.model('Todo', todoSchema);
