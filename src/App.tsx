/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Header } from './components/header/Header';
import { useHooks } from './hooks/general';
import { TodoList } from './components/TodoList/TodoList';
import { ErrorMsg } from './components/ErrorMsg/ErrorMsg';

export const App: React.FC = () => {
  const hooks = useHooks();

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todos={hooks.todosFromServer} />

        <TodoList todos={hooks.todosFromServer} />
      </div>

      <ErrorMsg error={hooks.error} setError={hooks.setError} />
    </div>
  );
};
