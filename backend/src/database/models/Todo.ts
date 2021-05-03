import mongoose from 'mongoose';

const { Schema } = mongoose;

export interface ITodo extends mongoose.Document {
  todo_name: string;
  isChecked: boolean;
  timeWork?: Date;
  timeBreak?: Date;
}

const TodoSchema = new Schema({
  todo_name: { type: String, required: true },
  isChecked: { type: Boolean, required: true },
  timeWork: { type: Date },
  timeBreak: { type: Date },
});

export default mongoose.model<ITodo>('todos', TodoSchema);
