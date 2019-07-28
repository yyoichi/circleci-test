import React, { useState, useCallback, useRef, useEffect } from 'react';
import { render } from 'react-dom';
import styles from './index.css';

const generateId = () => {
  return (
    Math.random()
      .toString(36)
      .substring(2, 12) +
    Math.random()
      .toString(36)
      .substring(2, 12)
  );
};

interface Todo {
  id: string;
  value: string;
}

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = useCallback(
    (value: string) => {
      const todo = { id: generateId(), value };
      setTodos([...todos, todo]);
    },
    [todos]
  );

  const deleteTodo = useCallback((id: string) => {
    setTodos(todos => todos.filter(todo => todo.id !== id));
  }, []);

  const loadTodos = useCallback(() => {
    const todos = localStorage.getItem('todos');
    return JSON.parse(todos);
  }, []);

  const saveTodos = useCallback(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const todosByLocalStorage = loadTodos();
    if (todosByLocalStorage) {
      setTodos(todosByLocalStorage);
    }
  }, [setTodos, loadTodos]);

  useEffect(() => {
    saveTodos();
  }, [saveTodos]);

  return (
    <div className={styles.app}>
      <AddTodo addTodo={addTodo} />
      <TodoList todos={todos} deleteTodo={deleteTodo} />
    </div>
  );
};

const AddTodo = ({ addTodo }: { addTodo: (value: string) => void }) => {
  const input = useRef<HTMLInputElement>();
  const onAddClick = useCallback(() => {
    const value = input.current.value;
    if (value) {
      addTodo(input.current.value);
      input.current.value = '';
    }
  }, [addTodo]);

  return (
    <div className={styles.addTodo}>
      <input className={styles.addTodoForm} type="text" ref={input} />
      <button className={styles.addTodoButton} onClick={onAddClick}>
        Add
      </button>
    </div>
  );
};

const TodoList = ({
  todos,
  deleteTodo
}: {
  todos: Todo[];
  deleteTodo: (id: string) => void;
}) => {
  return (
    <div className={styles.todoList}>
      {todos.map(todo => (
        <TodoListItem todo={todo} deleteTodo={deleteTodo} key={todo.id} />
      ))}
    </div>
  );
};

const TodoListItem = ({
  todo,
  deleteTodo
}: {
  todo: Todo;
  deleteTodo: (id: string) => void;
}) => {
  const onDeleteClick = useCallback(() => {
    deleteTodo(todo.id);
  }, [todo.id, deleteTodo]);

  return (
    <div className={styles.todoListItem} key={todo.id}>
      {todo.value}
      <button className={styles.todoDeleteButton} onClick={onDeleteClick}>
        ×
      </button>
    </div>
  );
};

render(<App />, document.querySelector('#root'));
