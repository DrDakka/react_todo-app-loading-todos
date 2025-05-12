import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 2827;

export const method = {
  get: () => {
    return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
  },
};

// Add more methods here
