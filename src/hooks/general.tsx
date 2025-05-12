import { useEffect, useState } from 'react';
import { Todo } from '../types/Todo';
import { method } from '../api/todos';

export const useHooks = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const todosApi = await method.get();

        setTodosFromServer(todosApi);
      } catch (e) {
        setError('Unable to load todos');
      }
    };

    loadTodos();
  }, []);

  useEffect(() => {
    if (error === '') {
      return;
    }

    const timer = setTimeout(() => {
      setError('');
    }, 3000);

    return () => clearTimeout(timer);
  }, [error]);

  return { todosFromServer, error, setError };
};
