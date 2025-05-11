import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    text: { type: String, required: true },
    isComplete: { type: Boolean, default: false },
    addTime: { type: Date, default: Date.now },
    editTime: { type: Date },
    duration: { type: Number },
});

export const Todo = mongoose.models.Todo || mongoose.model('Todo', TodoSchema);
