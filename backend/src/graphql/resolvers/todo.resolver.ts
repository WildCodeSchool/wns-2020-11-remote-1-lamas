import validator from 'validator';
import mongoose, { Types } from 'mongoose';
import Todo, { ITodo } from '../../database/models/Todo';
import Users from '../../database/models/User';

import InputError from '../../errors/InputError';
import NotFoundError from '../../errors/NotFoundError';
import CreationError from '../../errors/CreationError';
import UnauthorizedError from '../../errors/UnauthorizedError';
import { Icontext } from './types/user.type';

type ID = Types.ObjectId;

interface IcreateTodo {
  todo_name: string;
}

interface IUpdateTodo {
  _id: ID;
  todo_name: string;
  isChecked: boolean;
}

interface IDeleteTodo {
  _id: ID;
}

export default {
  Query: {
    async getTodos(
      _: void,
      _data: Record<string, never>,
      context: Icontext
    ): Promise<mongoose.Schema.Types.ObjectId[] | undefined> {
      if (!context.user.id) throw new UnauthorizedError();

      const errors: string[] = [];

      if (!mongoose.Types.ObjectId.isValid(context.user.id)) {
        errors.push('missing Id input');
      }

      if (errors.length) {
        throw new InputError(errors);
      }

      const user = await Users.findById(context.user.id).populate('todos_list');

      if (!user) {
        throw new NotFoundError();
      }

      return user.todos_list;
    },
  },
  Mutation: {
    async createTodo(
      _: void,
      data: IcreateTodo,
      context: Icontext
    ): Promise<mongoose.Schema.Types.ObjectId[] | undefined> {
      if (!context.user.id) throw new UnauthorizedError();

      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { todo_name } = data;

      const errors = [];
      if (validator.isEmpty(todo_name)) {
        errors.push('missing todo_name input');
      }

      if (errors.length) {
        throw new InputError(errors);
      }

      const todo = new Todo(data);

      if (!todo) {
        throw new CreationError(['issue with todo creation']);
      }

      const newTodo = await todo.save();

      if (!newTodo) {
        throw new CreationError(['issue with todo save']);
      }

      const result = await Users.findByIdAndUpdate(
        context.user.id,
        { $push: { todos_list: newTodo._id } },
        {
          new: true,
        }
      );

      return result.todos_list;
    },

    async updateTodo(
      _: void,
      data: IUpdateTodo,
      context: Icontext
    ): Promise<ITodo> {
      console.log(data);

      if (!context.user.id) throw new UnauthorizedError();

      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { _id } = data;

      const errors = [];
      if (!mongoose.Types.ObjectId.isValid(_id)) {
        errors.push('missing Id input');
      }

      if (errors.length) {
        throw new InputError(errors);
      }

      const newTodo = await Todo.findByIdAndUpdate(
        _id,
        { ...data },
        { new: true }
      );

      if (!newTodo) {
        throw new CreationError(['issue with todo update']);
      }

      return newTodo;
    },

    async deleteTodo(
      _: void,
      data: IDeleteTodo,
      context: Icontext
    ): Promise<ITodo> {
      if (!context.user.id) throw new UnauthorizedError();

      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { _id } = data;

      const errors = [];

      if (!mongoose.Types.ObjectId.isValid(_id)) {
        errors.push('missing Id input');
      }

      if (errors.length) {
        throw new InputError(errors);
      }

      const deletedTodo = await Todo.findByIdAndDelete(_id);

      if (!deletedTodo) {
        throw new CreationError(['issue with todo update']);
      }

      return deletedTodo;
    },
  },
};
