/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editStatus, setEditStatus] = useState<number | null>(null);
  const [loading, setLoading] = useState<number | null>(null);
  const [errors, setErrors] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const activeTodosCount = todos.filter(todo => !todo.completed).length;

  const allCompleted = todos.length > 0 && activeTodosCount === 0;
  const allActive = todos.length > 0 && activeTodosCount === todos.length;

  const visibleTodos = [...todos].filter(todo => {
    if (filter === 'active') {
      return !todo.completed;
    }

    if (filter === 'completed') {
      return todo.completed;
    }

    return true;
  });

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const todosFromServer = await getTodos();

        setTodos(todosFromServer);
      } catch (error) {
        setErrors('Unable to load todos');
      }
    };

    loadTodos();
    setLoading(null);
  }, []);

  useEffect(() => {
    if (errors === '') {
      return;
    }

    const timer = setTimeout(() => {
      setErrors('');
    }, 3000);

    return () => clearTimeout(timer);
  }, [errors]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className={
              allCompleted
                ? 'todoapp__toggle-all active'
                : 'todoapp__toggle-all'
            }
            data-cy="ToggleAllButton"
          />

          {/* Add a todo on form submit */}
          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {visibleTodos.map(todo => {
            const { id, title, completed } = todo;

            return (
              <div
                data-cy="Todo"
                className={completed ? 'todo completed' : 'todo'}
                key={id}
              >
                <label className="todo__status-label">
                  <input
                    data-cy="TodoStatus"
                    type="checkbox"
                    className="todo__status"
                    checked={completed}
                  />
                </label>

                {editStatus === null ? (
                  <>
                    <span
                      data-cy="TodoTitle"
                      className="todo__title"
                      onDoubleClick={() => setEditStatus(id)}
                    >
                      {title}
                    </span>
                    <button
                      type="button"
                      className="todo__remove"
                      data-cy="TodoDelete"
                    >
                      ×
                    </button>
                  </>
                ) : (
                  <form>
                    <input
                      data-cy="TodoTitleField"
                      type="text"
                      className="todo__title-field"
                      placeholder="Empty todo will be deleted"
                      autoFocus
                    />
                  </form>
                )}
                <div
                  data-cy="TodoLoader"
                  className={
                    loading ? 'modal overlay is-active' : 'modal overlay'
                  }
                >
                  <div className="modal-background has-background-white-ter" />
                  <div className="loader" />
                </div>
              </div>
            );
          })}
        </section>

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${activeTodosCount} items left`}
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                onClick={() => setFilter('all')}
                className={
                  filter === 'all' ? 'filter__link selected' : 'filter__link'
                }
                data-cy="FilterLinkAll"
              >
                All
              </a>

              <a
                href="#/active"
                onClick={() => setFilter('active')}
                className={
                  filter === 'active' ? 'filter__link selected' : 'filter__link'
                }
                data-cy="FilterLinkActive"
              >
                Active
              </a>

              <a
                href="#/completed"
                onClick={() => setFilter('completed')}
                className={
                  filter === 'completed'
                    ? 'filter__link selected'
                    : 'filter__link'
                }
                data-cy="FilterLinkCompleted"
              >
                Completed
              </a>
            </nav>

            {/* this button should be disabled if there are no completed todos */}
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={allActive}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={
          `notification is-danger is-light has-text-weight-normal` +
          (errors === '' ? ' hidden' : '')
        }
      >
        <button data-cy="HideErrorButton" type="button" className="delete" />
        {errors}
      </div>
    </div>
  );
};
