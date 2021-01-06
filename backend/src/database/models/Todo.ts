import mongoose from 'mongoose';

const { Schema } = mongoose;
const TodoSchema = new Schema({
  todo_name: { type: String },
  isChecked: { type: Boolean },
  timeWork: { type: Date },
  timeBreak: { type: Date },
});

export default mongoose.model('todos', TodoSchema);
