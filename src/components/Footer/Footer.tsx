import { Filter } from '../TodoList/TodoList';

type Props = {
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
  statuses: boolean[];
};

export const Footer: React.FC<Props> = ({ filter, setFilter, statuses }) => {
  const count = statuses.filter(s => !s).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${count} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          onClick={() => setFilter('all')}
          className={`filter__link${filter === 'all' ? ' selected' : ''}`}
          data-cy="FilterLinkAll"
        >
          All
        </a>

        <a
          href="#/active"
          onClick={() => setFilter('active')}
          className={`filter__link${filter === 'active' ? ' selected' : ''}`}
          data-cy="FilterLinkActive"
        >
          Active
        </a>

        <a
          href="#/completed"
          onClick={() => setFilter('completed')}
          className={`filter__link${filter === 'completed' ? ' selected' : ''}`}
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
        disabled={count === statuses.length}
      >
        Clear completed
      </button>
    </footer>
  );
};
